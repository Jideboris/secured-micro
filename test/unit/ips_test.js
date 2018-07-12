const URLMOCK = process.env.IPS_SERVICE || 'http://localhost:8080'
const request = require('supertest')(URLMOCK)
const nock = require('nock')
const {
    expect,
    assert,
    should
} = require('chai')
const sho = require('should')
const {
    checkURL,
    decrypt,
    calculatedays
} = require('../../lib/common')
const mapping = [
    'assetdetails',
    'status',
    'errormessage'
]
const properties = [
    'name',
    'refineryname',
    'lpcode' ,
    'percentloss',
    'crudemarkermonthm1',
    'crudemarkerpricem1',
    'crudediffm1',
    'crudepricem1',
    'workingcapitalm1' ,
    'transportationm1',
    'totaldeliveredcostm1',
    'crudemarkermonthm2',
    'crudemarkerpricem2',
    'crudediffm2',
    'crudepricem2' ,
    'workingcapitalm2',
    'transportationm2',
    'totaldeliveredcostm2',
    'crudemarkermonthm3',
    'crudemarkerpricem3',
    'crudediffm3',
    'crudepricem3' ,
    'workingcapitalm3',
    'transportationm3',
    'totaldeliveredcostm3'
    
]
const chai = require('chai')
chai.use(require('chai-http'))

const {
    app
} = require('../../application.js')
describe("Testing IPS webservice", function () {
    //process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
    it('/ should return Service is active', function () {
        return chai.request(app)
            .get('/')
            .then(function (res) {
                assert.deepEqual(res.text, 'Service is active')
            })
    })
    it('ipstoken should always return encrypted token', function () {
        return chai.request(app)
            .get('/ipstoken')
            .then(function (res) {
                assert.isNotEmpty(res.text, 'token')
            })
    })
    it('responds to /api/ips/:refineryid with arrays of objects', (done) => {
        const ipsmockdata = require('./ips-mock')
        nock(URLMOCK)
            .get('/api/ips/31')
            .reply(200, ipsmockdata)
        request
            .get('/api/ips/31')
            .expect(200)
            .end(function (err, res) {
                assert.deepEqual(Object.keys(res.body), mapping)
                done()
            })
    })
    it('responds to /api/ips/:refineryid returned assetdetails array object', (done) => {
        const ipsmockdata = require('./ips-mock')
        nock(URLMOCK)
            .get('/api/ips/31')
            .reply(200, ipsmockdata)
        request
            .get('/api/ips/31')
            .expect(200)
            .end(function (err, res) {
                assert.isArray(res.body.assetdetails)
                done()
            })
    })
    
    it('responds to /api/ips/:refineryid returned valid properties', (done) => {
        const ipsmockdata = require('./ips-mock')
        nock(URLMOCK)
            .get('/api/ips/31')
            .reply(200, ipsmockdata)
        request
            .get('/api/ips/31')
            .expect(200)
            .end(function (err, res) {
                assert.deepEqual(Object.keys(res.body.assetdetails[0]), properties)
                done()
            })
    })
    it('check URL method', () => {
        assert.isFunction(checkURL, 'should be defined')
    })
    it('check URL return 0 if not URL supplied', () => {
        let output = checkURL('')
        assert.equal(output, 0)
    })
    it('token should be valid if todays date and token date is the same', () => {
        let today = new Date()
        let output = calculatedays(today, [today.getDate(), today.getMonth() + 1, today.getFullYear()])
        assert.equal(output, true)
    })
    it('token should not be valid if todays date and token date is in the past', () => {
        let today = new Date()
        let output = calculatedays(today, [today.getDate()-2, today.getMonth() + 1, today.getFullYear()])
        assert.equal(output, false)
    })
    it('token should not be valid if todays date end of february and token day is first of March', () => {
        let today = new Date()
        today.setDate(28)
        today.setMonth(1)
        let output = calculatedays(today, [01, 03, today.getFullYear()])
        assert.equal(output, true)
    })
});