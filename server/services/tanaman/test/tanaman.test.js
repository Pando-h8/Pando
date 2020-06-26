const app = require('../app-test')
const request = require('supertest')
const { sequelize, Tanaman } = require('../models');
const { queryInterface } = sequelize;
let id;

afterAll((done) => {
	queryInterface.bulkDelete('Tanamans', {}).then(() => done()).catch((err) => done(err));
});


//  CREATE TANAMAN

describe('POST /tanaman', () => {
  it('should return object result and status 201', done => {
    const data = {
      nama: 'Apel',
      umur: 10,
      gambar: "google.com",
      growth_rate: 1,
      resistance: 5,
    }
    request(app)
      .post('/tanaman')
      .send(data)
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          id = Number(res.body.tanaman.id)
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('tanaman')
          done()
        }
      })
  })
})

//  GET ALL TANAMAN

describe('GET /tanaman', () => {
  it('should return tanaman list', (done) => {
    request(app).get('/tanaman')
    .expect(200)
    .end((err, res) => {
			if (err) {
				done(err);
			} else {
				expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object')
        expect(res.body).toHaveProperty('tanaman')
				done();
			}
		});
	});
})

// GET TANAMAN BY ID

describe('GET /tanaman/:id', () => {
	it('should return one specific tanaman ', (done) => {
    request(app)
    .get(`/tanaman/${id}`)
    .expect(200)
    .end((err, res) => {
			if (err) {
				done(err);
			} else {
				expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object')
        expect(res.body).toHaveProperty('tanaman')
				done();
			}
		});
	});

	it('should return data not found ', (done) => {
    request(app)
    .get(`/tanaman/120313210`)
    .expect(404)
    .end((err, res) => {
			if (err) {
				done(err);
			} else {
				expect(res.status).toBe(404);
				expect(res.body).toHaveProperty('message');
				done();
			}
		});
	});
});

// UPDATE PRODUCT
describe('PUT /tanaman/:id', () => {
	it('should return updated product ', (done) => {
		request(app)
			.put(`/tanaman/${id}`)
			.expect(200)
			.send({
				nama: 'Apel',
        umur: 10,
        gambar: "bing.com",
        growth_rate: 1,
        resistance: 5,
			})
			.end((err, res) => {
				if (err) {
					done(err);
				} else {
					expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('tanaman')
					done();
				}
			});
	});

	it('should return data Not Found ', (done) => {
		request(app)
			.put('/tanaman/120313210')
			.expect(404)
			.send({
				nama: 'Apel',
        umur: 10,
        gambar: "bing.com",
        growth_rate: 1,
        resistance: 5,
			})
			.end((err, res) => {
				if (err) {
					done(err);
				} else {
					expect(res.status).toBe(404);
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('message');
					done();
				}
			});
	});
});

// DELETE PRODUCT
describe('DELETE /tanaman/:id', () => {
	it('should return an object ', (done) => {
    request(app)
    .delete(`/tanaman/${id}`)
    .expect(200)
    .end((err, res) => {
			if (err) {
				done(err);
			} else {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object')
				done();
			}
		});
	});

	it('should return data Not Found ', (done) => {
    request(app)
    .delete('/tanaman/120313210')
    .expect(404)
    .end((err, res) => {
			if (err) {
				done(err);
			} else {
        expect(res.status).toBe(404);
        expect(typeof res.body).toBe('object')
				expect(res.body).toHaveProperty('message');
				done();
			}
		});
	});
});