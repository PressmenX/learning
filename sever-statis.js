const http = require('http');
const fs = require('fs');
const path = require('path');

const mapMime = {
  ".html" : "text/html",
  ".png" : "image/png",
  ".css" : "text/css",
  ".js" : "application/javascript"
}


const server = http.createServer(async(req, res)=>{
  
})