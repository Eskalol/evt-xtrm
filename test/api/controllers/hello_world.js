var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('hello_world', function() {

    describe('GET /hello', function() {

      it('should return a default string', function(done) {

        request(server)
          .get('/hello')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql('Hello, stranger!');

            done();
          });
      });

      it('should accept a name parameter', function(done) {

        request(server)
          .get('/hello')
          .query({ name: 'Scott'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql('Hello, Scott!');

            done();
          });
      });

    });

  });

});

describe('controllers', function() {
  
  describe('event', function() {
    
    describe('GET /api/event', function() {

      it('should return a list', function(done) {
        request(server)
          .get('/api/event')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            should.exist(res.body.events);
            
            done();
          });
      });

    });

  });

});