'use strict'

var http = require('http')

http.createServer(function (req, res) {
  var scraper = require('artproject-scraper')

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Max-Age', '86400') // 24 hours
  
  // For OPTIONS method return status 200
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  } 

  // For GET method return data
  else if (req.method === 'GET') {
    scraper(function(err, randomArt) {
      if (err) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({
          error: err
        }))
      } else {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(randomArt))
      }
    })
  }

  // Otherwise return 404
  else {
    res.writeHead(404)
    res.end(JSON.stringify({
      error: 'Method not found'
    }))
  }
}).listen(process.env.PORT || 3001)
