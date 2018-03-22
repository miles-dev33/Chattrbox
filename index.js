

var http = require('http');
var fs = require('fs');
var wss = require("./websockets-server");
var mime = require("mime");
//Update index.js to import the path module and use it to find the file that was requested.
//var path = require('path');
var extract = require('./extract');

//check for a file error and write a 404 error code if one is found:
var handleError = function (err, res){
   //res.writeHead(err);
    res.writeHead(302, {
    Location: "404.html"
    });
    res.end();
};

var server = http.createServer(function (req, res){
  console.log('Responding to a request. ');

  //update your callback to check what file the browser is requesting.
  // var url = req.url;
  // var fileName = 'index.html';
  // if(url.length > 1){
    //Removes the first character '/' in the URL path
    // fileName = url.substring(1);
//  }
//  console.log(fileName);
  // res.end('<h1>Hello, world my name is AI miles</h1>');
  //The readFile method takes a file name and a callback.
  //Inside your callback, you sent the contents of the file instead
  // of the HTML text using res.end.
  //fs.readFile('app/index.html', function (err, data){

//  var filePath = path.resolve(__dirname, 'app', fileName);
  var filePath = extract(req.url);
  var fileType = mime.getType(filePath);
  console.log("File Type: " + fileType);
  fs.readFile(filePath, function (err, data){
    //Handles checking if the webpage was found or not, Error 404
    if(err){
      handleError(err,res);
      return;
    }else{
      res.end(data);
    }

  });
});
server.listen(3000);
