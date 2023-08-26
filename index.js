const express = require("express");
const app = express();

app.get("/", (request, response) => response.send("Hello World!!!"));

app.get("/api/courses", (request, response) => response.send([1, 2, 3]));

app.get("/api/posts/:id", (request, response) =>
  response.send(request.params.id)
);

// app.get("/api/posts/:year/:month", (request, response) =>
//   response.send(request.params)
// );

app.get("/api/posts/:year/:month", (request, response) =>
  response.send(request.query)
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
