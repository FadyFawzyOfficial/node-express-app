const Joi = require("joi");
const logger = require("./logger");
const authenticator = require("./authentication");
const express = require("express");
const app = express();

app.use(express.json());

app.use(logger);

app.use(authenticator);

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
    return response
      .status(404)
      .send("The course with the given id was not found");

  response.send(course);
});

app.post("/api/courses", (request, response) => {
  const { error } = validateCourse(request.body);

  if (error) return response.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: request.body.name,
  };
  courses.push(course);
  response.send(course);
});

app.put("/api/courses/:id", (request, response) => {
  // Look out the course
  // If not exist, return 404
  const course = courses.find(
    (course) => course.id === parseInt(request.params.id)
  );

  if (!course)
    return response
      .status(404)
      .send("The course with the given id was not found");

  // Validate
  // If invalid, return 400 - Bad Request
  const { error } = validateCourse(request.body);

  if (error) return response.status(400).send(error.details[0].message);

  // Update Course
  // Return the updated Course
  course.name = request.body.name;
  response.send(course);
});

app.delete("/api/courses/:id", (request, response) => {
  // Look out the course
  // If not exist, return 404
  const course = courses.find(
    (course) => course.id === parseInt(request.params.id)
  );

  if (!course)
    return response
      .status(404)
      .send("The course with the given id was not found");

  // Delete Course
  const courseIndex = courses.indexOf(course);
  courses.splice(courseIndex, 1);

  // Return the deleted Course
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

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}
