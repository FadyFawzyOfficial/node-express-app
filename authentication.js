function authenticate(request, response, next) {
  console.log("Authenticating ...");
  next();
}

module.exports = authenticate;
