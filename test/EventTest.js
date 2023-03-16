import chai from 'chai';
import {
  describe, it, before, afterEach,
} from 'mocha';

import chaiHttp from 'chai-http';

import Event from '../src/models/Event.js';
import app from '../src/driver/app.js';

process.env.NODE_ENV = 'testing';

chai.should();

chai.use(chaiHttp);

describe('Events', () => {
  before(async () => {
    await Event.deleteMany({});
  });
  afterEach(async () => {
    await Event.deleteMany({});
  });
  describe('/GET events', () => {
    it('it should GET all the events', (done) => {
      chai
        .request(app)
        .get('/api/events')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/event event', () => {
    it('it should create a new event', (done) => {
      const event = {
        title: 'This is the first event',
        body: 'This is a event',
      };
      chai
        .request(app)
        .post('/api/events')
        .send(event)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          res.body.status.should.be.eql('success');
          done();
        });
    });
  });
  describe('/GET/:id event', () => {
    it('it should GET a event by the id', (done) => {
      const event = new Event({
        title: 'This is the first event',
        body: 'This is a event body',
      });
      event.save((err, event) => {
        chai
          .request(app)
          .get(`/api/events/${event.id}`)
          .send(event)
          .end((res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('object');
            res.body.status.should.be.eql('success');
            done();
          });
      });
      done();
    });
  });
  describe('/PUT/:id event', () => {
    it('it should UPDATE a event given the id', (done) => {
      const event = new Event({
        title: 'This is the first event',
        body: 'This is a event body',
      });
      event.save((err, event) => {
        chai
          .request(app)
          .put(`/api/events/${event.id}`)
          .send({
            title: 'The first event was updated',
            body: 'This is a event body',
          })
          .end((res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('object');
            res.body.status.should.be.eql('success');
            done();
          });
      });
      done();
    });
  });
  describe('/DELETE/:id event', () => {
    it('it should DELETE a event given the id', (done) => {
      const event = new Event({
        title: 'This is the first event',
        body: 'This is a event body',
      });
      event.save((err, event) => {
        chai
          .request(app)
          .delete(`/api/events/${event.id}`)
          .end((res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('object');
            res.body.status.should.be.eql('success');
            done();
          });
      });
      done();
    });
  });
});
