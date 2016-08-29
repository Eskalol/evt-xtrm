var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {
  
  describe('participant', function() {
    

    describe('POST /api/participant/1', function() {
      it('should Forbidden 403', function(done) {
        request(server)
        .post('/api/participant')
        .set('Accept', 'application/json')
        .expect('Content-Type', '/json/')
        .expect(403)
        .end(function(err, res) {
          // console.log(res);

          done();
        });
      });
    });

    describe('DELETE /api/participant/1', function() {
      it('should Forbidden 403', function(done) {
        request(server)
        .delete('/api/participant/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', '/json/')
        .expect(403)
        .end(function(err, res) {

          done();
        });
      })
    });

    describe('PATCH /api/participant/1', function() {
      it('should Forbidden 403', function(done) {
        request(server)
        .patch('/api/participant/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', '/json/')
        .expect(403)
        .end(function(err, res) {

          done();
        });
      })
    });
  });
});