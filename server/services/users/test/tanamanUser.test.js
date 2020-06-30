const request = require("supertest");
const { app } = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const User_name = "abc";
const User_email = "abc@email.com";
const User_password = "abc";
let access_token = "";
let tanamanUser_id = "";

afterAll((done) => {
  queryInterface
    .bulkDelete("TanamanUsers", null, {})
    .then(() => done())
    .catch((err) => done(err));
  queryInterface
    .bulkDelete("Users", null, {})
    .then(() => done())
    .catch((err) => done(err));
});

beforeAll((done) => {
  request(app)
    .post("/register")
    .send({
      name: User_name,
      email: User_email,
      password: User_password,
    })
    .then((res) => {
      const { body, status } = res;
      access_token = body.access_token;
      done();
    })
    .catch((err) => done(err));
});

describe("TanamanUsers Structure", () => {
  describe("Authentication & Authorization Access", () => {
    describe("Authentication Success", () => {
      test("Authentication Success", (done) => {
        request(app)
          .get("/tanamanUser")
          .set("access_token", access_token)
          .then((result) => {
            const { body, status } = result;
            expect(status).toBe(200);
            done();
          })
          .catch((err) => done(err));
      });
    });
  });

  describe("Authentication Failed", () => {
    test("Authentication Failed caused of Invalid access_token", (done) => {
      request(app)
        .get("/tanamanUser")
        .then((result) => {
          const { body, status } = result;
          expect(status).toBe(404);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("Authorization Success", () => {
    test("Authorization Success", (done) => {
      request(app)
        .get(`/tanamanUser/${tanamanUser_id}`)
        .set("access_token", access_token)
        .set("access_token", access_token)
        .then((result) => {
          const { body, status } = result;
          expect(status).toBe(200);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("TanamanUser Access", () => {
    describe("Get TanamanUser Success", () => {
      test("GET TanamanUsers Success", (done) => {
        request(app)
          .get("/tanamanUser")
          .set("access_token", access_token)
          .then((result) => {
            const { body, status } = result;
            expect(status).toBe(200);
            done();
          })
          .catch((err) => done(err));
      });
    });

    describe("POST TanamanUser Success", () => {
      test("POST TanamanUser Success", (done) => {
        request(app)
          .post("/tanamanUser")
          .send({
            nama: "Apple",
            umur_sekarang: 1,
            form: "1",
            resistance: 3,
            gambar: "http://localhost:3001/",
          })
          .set("access_token", access_token)
          .then((result) => {
            const { body, status } = result;
            tanamanUser_id = body.id;
            expect(status).toBe(201);
            done();
          })
          .catch((err) => done(err));
      });
    });

    describe("POST TanamanUser Failed", () => {
      test("POST TanamanUser Failed Validation in Name", (done) => {
        request(app)
          .post("/tanamanUser")
          .send({
            nama: "",
            umur_sekarang: 1,
            form: "1",
            resistance: 3,
            gambar: "http://localhost:3001/",
          })
          .set("access_token", access_token)
          .then((result) => {
            const { body, status } = result;
            expect(status).toBe(400);
            expect(body).toHaveProperty("errorCode", "VALIDATION_ERROR");
            done();
          })
          .catch((err) => done(err));
      });
    });

    describe("Get TanamanUser By Id Success", () => {
      test("Get TanamanUser By iD Success", (done) => {
        request(app)
          .get(`/tanamanUser/${tanamanUser_id}`)
          .set("access_token", access_token)
          .then((result) => {
            const { body, status } = result;
            expect(status).toBe(200);
            done();
          })
          .catch((err) => done(err));
      });
    });

    describe("Get TanamanUser By Id Failed", () => {
      test("Get TanamanUser By iD Failed because of id is invalid", (done) => {
        request(app)
          .get(`/tanamanUser/1000`)
          .set("access_token", access_token)
          .then((result) => {
            const { body, status } = result;
            expect(status).toBe(404);
            done();
          })
          .catch((err) => done(err));
      });
    });

    describe("PUT TanamanUser By Id Success", () => {
      test("PUT TanamanUser By iD Success", (done) => {
        request(app)
          .put(`/tanamanUser/${tanamanUser_id}`)
          .send({
            terakhir_disiram: new Date(),
            umur_sekarang: 1,
            form: "http://localhost:3001/2",
          })
          .set("access_token", access_token)
          .then((result) => {
            const { body, status } = result;
            expect(status).toBe(200);
            done();
          })
          .catch((err) => done(err));
      });
    });

    describe("Put TanamanUser By Id Failed", () => {
      test("Put TanamanUser By iD Failed because of wrong id", (done) => {
        request(app)
          .put(`/tanamanUser/1000`)
          .send({
            terakhir_disiram: new Date(),
            umur_sekarang: 1,
            form: "http://localhost:3001/2",
          })
          .set("access_token", access_token)
          .then((result) => {
            const { body, status } = result;
            expect(status).toBe(404);
            done();
          })
          .catch((err) => done(err));
      });

      describe("Delete TanamanUser By Id Success", () => {
        test("Delete TanamanUser By iD Success", (done) => {
          request(app)
            .delete(`/tanamanUser/${tanamanUser_id}`)
            .set("access_token", access_token)
            .then((result) => {
              const { body, status } = result;
              expect(status).toBe(200);
              done();
            })
            .catch((err) => done(err));
        });
      });

      describe("Delete TanamanUser By Id Failed", () => {
        test("Delete TanamanUser By iD Failed because of wrong id", (done) => {
          request(app)
            .delete(`/tanamanUser/12312`)
            .set("access_token", access_token)
            .then((result) => {
              const { body, status } = result;
              expect(status).toBe(404);
              done();
            })
            .catch((err) => done(err));
        });
      });
    });
  });
});
