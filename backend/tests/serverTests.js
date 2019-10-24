// Built using examples: https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
//                       https://www.codementor.io/olatundegaruba/integration-testing-supertest-mocha-chai-6zbh6sefz

// Testing Libraries
var request = require('supertest');
var chai = require('chai');

// Utilities
var expect = chai.expect;

describe('loading express', () => {
    var server;

    beforeEach(() => {
        delete require.cache[require.resolve('../core/server')];
        server = require('../core/server');
    });

    afterEach((done) => {
        server.close(done);
    });

    describe('#POST / createUser', function() {
        it('responds to /createUser', function testCreateUser(done) {
            var testUserObj = { name: 'test', password: 'test' };
    
            request(server)
                .post('/createUser')
                .send(testUserObj)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });

    // it('responds to /getUser', function testGetUser(done) {
    //     request(server)
    //         .get('/getUser')
    //         .expect(200)
    //         .end((err, res) => {
    //             if(err)
    //                 return done();
                
    //             return done(err);
    //         });
    // });

    it('404 everything else', function testNonExistantPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done)
    });
});