var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = (q.pathname==='/' ||q.pathname===''||q.pathname==='index.html') ? 'index.html': "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
    fs.readFile('404.html', function(err, errorData) {
      if (err) {
          // If error.html is not found, respond with a generic error message
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
      }
      
      // Serve the error.html file if found
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(errorData);
      return res.end();
  });
  } else {
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    res.write(data);
    return res.end();
  }
  });
}).listen(8080);
