//////////////////////////////////////////////////////
//  1. Get all gists (GET : https://api.github.com/gists)
//  test code
tests["Status code is 200"] = responseCode.code === 200;

responseJson = JSON.parse(responseBody);
pm.globals.set("num_of_gists", responseJson.length);

//////////////////////////////////////////////////////
//  2. Create a new gist (POST : https://api.github.com/gists)
//  body
{
  "description": "the description for this gist",
  "public": true,
  "files": {
    "file1.txt": {
      "content": "Your content"
    }
  }
}
//  test code
tests["Post success"] = responseCode.code === 201;

tests["Has Content"] = responseBody.has("Your content");

responseJson = JSON.parse(responseBody);
pm.globals.set("gist_id", responseJson.id);

//////////////////////////////////////////////////////
//  3. Get all lists (after creation) (GET : https://api.github.com/gists)
//  test code
tests["Status code is 200"] = responseCode.code === 200;

responseJson = JSON.parse(responseBody);
tests["Gists count Increased by 1"] = responseJson.length === pm.globals.get("num_of_gists") + 1;

//////////////////////////////////////////////////////
//  4. Edit a gist (PATCH : https://api.github.com/gists/{{gist_id}})
//  body
{
  "files": {
    "file1.txt": {
      "content": "Changed Context"
    }
  }
}

//  test code
tests["Status code is 200"] = responseCode.code === 200;

var jsonData = pm.response.json();
tests["JSON Body matches string"] = jsonData['files']['file1.txt']['content'] === "Changed Context"

//////////////////////////////////////////////////////
//  5. Get a gist (GET : https://api.github.com/gists/{{gist_id}})
//  test code
tests["Status code is 200"] = responseCode.code === 200;

responseJson = JSON.parse(responseBody);
tests["JSON Body matches string"] = responseJson['files']['file1.txt']['content'] === "Changed Context"

//////////////////////////////////////////////////////
//  6. Delete the gist (DELETE : https://api.github.com/gists/{{gist_id}})
//  test code
tests["Status code is 204"] = responseCode.code === 204;

//////////////////////////////////////////////////////
//  7. Get the gist (GET : https://api.github.com/gists/{{gist_id}})
//  test code
tests["Status code is 404"] = responseCode.code === 404;

pm.globals.unset("gist_id");