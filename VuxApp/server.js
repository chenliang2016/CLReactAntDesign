// require the module as normal
var bs = require("browser-sync").create();

var url = require('url'),
  proxy = require('proxy-middleware');
var proxyOptions = url.parse('http://localhost:3000/api');
proxyOptions.route = '/api';

bs.init({
  server: {
    baseDir: "./dist",
    middleware: [proxy(proxyOptions)]
  }
});

bs.reload("*.html");
