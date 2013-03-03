var request = require('request')
var util = require('util')
var extend = require('extend')
module.exports = function(baseUrl, baseOptions){
  return new Api(baseUrl, baseOptions);
}

var createUrl = function(baseUrl, path, queries){
  baseUrl = baseUrl.replace(/\/$/,"");
  path = path.replace(/^\//,""); // trim
  if(queries){
    //processing placeholder
    Object.keys(queries).forEach(function(q){
      path = path.replace(":"+q, queries[q])
    })
  }
  return baseUrl + "/" + path
}


var Api = function(baseUrl, baseOptions){
  this.baseUrl = baseUrl.replace(/\/$/,"");
  this.baseOptions = baseOptions;
}


// setter
Api.prototype.setRequest = function(request){
  request = request;
}

Api.prototype.get = function(path, options, callback){
  options.method = "get";
  return this.request(path, options, callback)
}

Api.prototype.request = function(path, options, callback){
  var params = request.initParams("", options, callback)
  var options = extend(this.baseOptions, params.options)
  var url = createUrl(this.baseUrl, path, options);
  params.url = url;
  
  request(params.url, options, params.callback)
}

