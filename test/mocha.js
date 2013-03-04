var rewire = require("rewire")
var assert = require("assert")

describe('structUrl', function () {
  var api = rewire("../api")
  var createUrl = api.__get__("createUrl");
  it('should return url', function () {
    var baseUrl = "http://api.github.com"
    var path = "repos/:owner/:repo/pulls"
    var queries = {
      "owner" : "suisho",
      "repo" : "sandbox"
    }
    var result = createUrl(baseUrl, path, queries)
    assert.equal(result, "http://api.github.com/repos/suisho/sandbox/pulls")
  });
});

describe('get', function(){
  var Api = require("../api")
  it('base option', function(done){
    var api = new Api("http://api.github.com", {
      qs : {
        "access_token" : "XXXOOOOXLLXLX"
      }
    });
    var request = require("request");
    var mockRequest = require("request");
    mockRequest = function(url, options, callback){
      assert.equal(url, "http://api.github.com/repos/suisho/sandbox/pulls")
      assert.deepEqual(options, {
        uri : "http://api.github.com/repos/suisho/sandbox/pulls",
        method : "get",
        qs : {
          "access_token" : "XXXOOOOXLLXLX"
        },
      })
      done();
    }
    mockRequest.initParams = request.initParams;
    api.setRequest(mockRequest)
    api.get("/repos/:owner/:repo/pulls", {
      queries : {
        "owner" : "suisho",
        "repo" : "sandbox"
      },
    })
  })
})