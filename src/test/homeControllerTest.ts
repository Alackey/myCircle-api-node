import * as chai from "chai";
import * as request from "supertest";
import * as app from "../server";

chai.should();

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