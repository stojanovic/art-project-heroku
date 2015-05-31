'use strict'

var http = require('http')

http.createServer(function (req, res) {
  var scraper = require('artproject-scraper')

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
}).listen(process.env.PORT || 3001)
