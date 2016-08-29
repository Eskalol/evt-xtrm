var should = require('should');
var request = require('supertest');
var server = require('../../../app');
var User = require('../../../models/User');

describe('controllers', function() {
  
  describe('user', function() {
    
    describe('GET /api/user', function() {

      it('should Forbidden 403', function(done) {
        request(server)
          .get('/api/user')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(403)
          .end(function(err, res) {
            should.not.exist(err);
            
            done();
          });
      });

    });

    describe('GET /api/user/1', function() {

      it('should Forbidden 403', function(done) {
        request(server)
          .get('/api/user')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(403)
          .end(function(err, res) {
            should.not.exist(err);
            
            done();
          });
      });

    });


    describe('POST /api/user', function() {
      it('should Forbidden 403', function(done) {
        request(server)
        .post('/api/user')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json')
        .expect(403)
        .end(function(err, res) {
          should.not.exist(err);

          done();
        });
      });
    });

    describe('DELETE /api/user/1', function() {
      it('should Forbidden 403', function(done) {
        request(server)
        .delete('/api/user/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json')
        .expect(403)
        .end(function(err, res) {
          should.not.exist(err);

          done();
        });
      });
    });

  });
});
