import * as chai from "chai";
import * as request from "supertest";
import * as app from "../server";

chai.should();


// Home Controller
describe("HomeController", function () {
  describe("index()", function () {

    it("should return hello world json", function () {
      return request(app)
        .get("/")
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          response.body.should.exist;
          response.body.hello.should.exist;
          response.body.hello.should.equal("world");
        });
    });
  });
});


// Users Controller
describe("UsersController", function () {
  describe("Create a user", function () {
    it("should create a new user", function () {
      return request(app)
        .post("/users")
        .type('json')
        .send(`{"username": "alackey","photoUrl": "googlestorage","firstname": "Anthony","lastname": "lackey","email": "alackey96@gmail.com"}`)
        .then(response => {
          response.body.should.have.property("status");
          response.body.status.toLowerCase().should.equal("success");
        });
    });
  });

  describe("Get a user by username", function () {
    it("should return an error of no username provided", function () {
      return request(app)
        .get("/users")
        .expect(400)
        .expect('Content-Type', /json/)
        .then(response => {
          response.body.should.have.property("error");
          response.body.error.toLowerCase().should.equal("no username provided");
        });
    });
  });

  describe("Delete a user by username", function () {
    it("should return success while deleting a user", function () {
      return request(app)
        .delete("/users")
        .query({ username: "alackey" })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          response.body.should.have.property("status");
          response.body.status.toLowerCase().should.equal("success");
        });
    });
  });
});