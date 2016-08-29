var should = require('should');
var request = require('supertest');
var server = require('../../../app');

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

    describe('POST /api/event', function() {
      it('should Forbidden 403', function(done) {
        request(server)
        .post('/api/event')
        .set('Accept', 'application/json')
        .expect('Content-Type', '/json/')
        .expect(403)
        .end(function(err, res) {
          // console.log(res);

          done();
        });
      });
    });

    describe('DELETE /api/event/1', function() {
      it('should Forbidden 403', function(done) {
        request(server)
        .delete('/api/event/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', '/json/')
        .expect(403)
        .end(function(err, res) {

          done();
        });
      });
    });

    describe('PATCH /api/event/1', function() {
      it('should Forbidden 403', function(done) {
        request(server)
        .patch('/api/event/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', '/json/')
        .expect(403)
        .end(function(err, res) {

          done();
        });
      });
    });
  });
});