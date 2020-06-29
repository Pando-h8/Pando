const request = require("supertest");
const { app } = require("../app");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const User_name = "abc";
const User_email = "abc@email.com";
const User_password = "abc";

afterAll((done) => {
  queryInterface
    .bulkDelete("Users", {})
    .then(() => done())
    .catch((err) => done(err));
});

describe("register", () => {
  test("Register Success", (done) => {
    request(app)
      .post("/register")
      .send({
        name: User_name,
        email: User_email,
        password: User_password,
      })
      .then((res) => {
        const { body, status } = res;
        const { access_token } = body;
        const decoded = jwt.decode(access_token, { complete: true });
        console.log(status);
        expect(status).toBe(201);
        expect(decoded.payload).toHaveProperty("id");
        expect(decoded.payload).toHaveProperty("name", User_name);
        expect(decoded.payload).toHaveProperty("email", User_email);
        expect(decoded.payload).not.toHaveProperty("password");
        expect(body).toHaveProperty("access_token", expect.any(String));
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  describe("RegisterTestFail", () => {
    test("failed to create user with status code 400 (name === null/empty)", (done) => {
      request(app)
        .post("/register")
        .send({
          email: User_email,
          password: User_password,
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("errorCode");
          expect(body).toHaveProperty("message");
          expect(body.message).toHaveProperty(
            "name",
            "Name should not be empty"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("failed to create user with status code 400 (email === null/empty)", (done) => {
      request(app)
        .post("/register")
        .send({
          name: User_name,
          password: User_password,
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("errorCode");
          expect(body).toHaveProperty("message");
          expect(body.message).toHaveProperty(
            "email",
            "Email should not be empty"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("failed to create user with status code 400 (password === null/empty)", (done) => {
      request(app)
        .post("/register")
        .send({
          name: User_name,
          email: User_email,
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("errorCode");
          expect(body).toHaveProperty("message");
          expect(body.message).toHaveProperty(
            "password",
            "Password should not be empty"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("failed to create user with status code 400 (name, email === null/empty)", (done) => {
      request(app)
        .post("/register")
        .send({
          name: "",
          password: User_password,
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("errorCode");
          expect(body).toHaveProperty("message");
          expect(body.message).toHaveProperty(
            "name",
            "Name should not be empty"
          );
          expect(body.message).toHaveProperty(
            "email",
            "Email should not be empty"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("failed to create user with status code 400 (email, password === null/empty)", (done) => {
      request(app)
        .post("/register")
        .send({
          name: User_name,
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("errorCode");
          expect(body).toHaveProperty("message");
          expect(body.message).toHaveProperty(
            "password",
            "Password should not be empty"
          );
          expect(body.message).toHaveProperty(
            "email",
            "Email should not be empty"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("failed to create user with status code 400 (name, password === null/empty)", (done) => {
      request(app)
        .post("/register")
        .send({
          email: User_email,
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("errorCode");
          expect(body).toHaveProperty("message");
          expect(body.message).toHaveProperty(
            "password",
            "Password should not be empty"
          );
          expect(body.message).toHaveProperty(
            "name",
            "Name should not be empty"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("failed to create user with status code 400 (name, password, email === null/empty)", (done) => {
      request(app)
        .post("/register")
        .send({})
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("errorCode");
          expect(body).toHaveProperty("message");
          expect(body.message).toHaveProperty(
            "password",
            "Password should not be empty"
          );
          expect(body.message).toHaveProperty(
            "name",
            "Name should not be empty"
          );
          expect(body.message).toHaveProperty(
            "email",
            "Email should not be empty"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("LoginTest", () => {
    test("user logged-In with status code 201", (done) => {
      request(app)
        .post("/login")
        .send({
          email: User_email,
          password: User_password,
        })
        .then((response) => {
          const { body, status } = response;
          const { access_token } = body;
          const decoded = jwt.decode(access_token, { complete: true });
          expect(status).toBe(200);
          expect(body).toHaveProperty("access_token", expect.any(String));
          expect(decoded.payload).toHaveProperty("id");
          expect(decoded.payload).not.toHaveProperty("password");
          expect(decoded.payload).toHaveProperty("name", User_name);
          expect(decoded.payload).toHaveProperty("email", User_email);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("user failed to logged-In with status code 404", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "",
          password: User_password,
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty("errorCode");
          expect(body).toHaveProperty("message", "Invalid Email/Password");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
