const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

app.get("/", (request, response) => response.send("Hello World!!!"));

app.get("/api/courses", (request, response) => response.send(courses));

app.get("/api/courses/:id", (request, response) => {
  const course = courses.find(
    (course) => course.id === parseInt(request.params.id)
  );
  if (!course)
    response.status(404).send("The course with the given id was not found");
  response.send(course);
});

app.post("/api/courses", (request, response) => {
  const course = {
    id: courses.length + 1,
    name: request.body.name,
  };
  courses.push(course);
  response.send(course);
});

// app.get("/api/posts/:year/:month", (request, response) =>
//   response.send(request.params)
// );

app.get("/api/posts/:year/:month", (request, response) =>
  response.send(request.query)
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
