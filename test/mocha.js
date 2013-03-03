var rewire = require("rewire")
var assert = require("assert")
describe('structUrl', function () {
  var api = rewire("../api")
  var createUrl = api.__get__("createUrl");
  it('should set placeholder', function () {
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