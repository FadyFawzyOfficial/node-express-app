const express = require("express");
const Joi = require("joi");
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
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const validation = schema.validate(request.body);
  //   console.log(validation);

  if (validation.error) {
    response.status(400).send(validation.error.details[0].message);
    return;
  }

  //   if (!request.body.name) {
  //     // 400 Bad Request
  //     response.status(400).send("Course name is required.");
  //     return;
  //   }

  //   if (request.body.name.length < 3) {
  //     response
  //       .status(400)
  //       .send("Course name should be at least 3 characters long.");
  //     return;
  //   }

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
    response.status(404).send("The course with the given id was not found");

  // Validate
  // If invalid, return 400 - Bad Request
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const validation = schema.validate(request.body);
  //   console.log(validation);

  if (validation.error) {
    response.status(400).send(validation.error.details[0].message);
    return;
  }

  // Update Course
  // Return the updated Course
  course.name = request.body.name;
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
