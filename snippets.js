//  test in new style
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});


pm.test("Test id field in the response body", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.id).not.to.eql(0);
    pm.globals.set("gist_id", jsonData.id);
});

pm.test("Test the count of gists", function () {
    var jsonData = pm.response.json();
    var previous_gists_count = pm.globals.get("gists_count");
    pm.expect(jsonData.length).to.eql(1+previous_gists_count);
    pm.globals.set("gists_count", jsonData.length);
});

//  test in old style
var jsonData = pm.response.json();
var previous_gists_count = pm.globals.get("gists_count");
tests['Test the response body is an array'] = jsonData instanceof Array;
tests['Test the count of gists'] = jsonData.length === previous_gists_count-1;