var request = require('request')
var util = require('util')
module.exports = function(baseUrl, baseOptions){
  return new Api(baseUrl, baseOptions);
}

var Api = function(baseUrl, baseOptions){
  this.baseUrl = baseUrl.replace(/\/$/,"");
  this.baseOptions = baseOptions;
}

var placeHolder = function(path, queries){
  path = path.replace(/^\//,""); // trim
  if(queries){
    //processing placeholder
    Object.keys(queries).forEach(function(q){
      path = path.replace(":"+q, queries[q])
    })
  }
  return path
}

var extendOption = function(baseOption, extendOption){
  
}

Api.prototype.get = function(path, options, callback){
  var params = request.initParams("", options, callback)
  
  
  path = placeHolder(path, options);
  
  option = extendOption(baseOptions, options.query)
  
  var url  = this.baseUrl + "/" + path
  params.url = url;
  params.options.url = url;
  request.get(params.url, params.options, params.callback)
}

