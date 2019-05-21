const chai = require('chai');
const request = require('supertest');
const app = require('../src/server').default;
const third = require("./third.json");
const second = require("./second.json")
const first  = require("./first.json")

chai.should();

    

describe("API",()=>{
    it("first",(done)=>{
        request(app)
            .post('/auth/first')
            .send(first)
            .expect((res) => {
                res.status.should.equal(201);
            })
            .end(done);
    })
    it("second",(done)=>{
        request(app)
            .post('/auth/second')
            .send(second)
            .expect((res) => {
                res.status.should.equal(200);
            })
            .end(done);
    })
    it("Third",(done)=>{
        request(app)
            .post('/auth/third')
            .send(third)
            .expect((res) => {
                res.status.should.equal(403);
            })
            .end(done);

    });
})