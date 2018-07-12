const jwt = require('jwt-simple')
const dateFormat = require('dateformat')
const crypto = require('crypto')
const alg = 'des-ede-cbc'
const iv = 'pdMBMjde'
const key = new Buffer('BpRy+ae9Nm/MZhQh', 'utf-8')
const {
    validate
} = require('../middlewares/validatereq')

const user = process.env.AUTH_USER
const userpassword = process.env.AUTH_PASSWORD

function encrypt(source) {
    let cipher = crypto.createCipheriv(alg, key, iv)
    let encoded = cipher.update(source, 'ascii', 'base64')
    encoded += cipher.final('base64')
    return encoded
}

function decrypt(encrypted) {
    var decipher = crypto.createDecipheriv(alg, key, iv);
    var decoded = decipher.update(encrypted, 'binary', 'ascii');
    decoded += decipher.final('ascii');
    return decoded
}

function gettoken(req, res) {
    let token = createtoken()
    let data = user + '|' + userpassword + '|' + token.token + '|' + token.expires
    let encrypts = encrypt(data)
    res.send(encrypts)
}

function createtoken() {
    var expires = expiresIn(1)
    var token = jwt.encode({
        exp: expires
    }, require('../lib/secret')())
    return {
        token: token,
        expires: expires
    }
}

function expiresIn(numDays) {
    var dateObj = new Date()
    dateObj.setDate(dateObj.getDate() + numDays)
    let nd = dateFormat(dateObj, "dd/mm/yyyy h:MM:ss")
    return nd
}

function validaterequest(req, res, next) {
    let accesstoken = req.headers.authorization
    let userid = req.headers.userid
    let password = req.headers.password

    if (user !== userid && password !== userpassword) {
        res.send({
            data: [],
            status: 403,
            errormessage: "Not Authorized"
        })
    } else {
        validate(accesstoken).then((resp) => {
            if (resp.status === 200 && resp.errormessage === 'Ok') {
                next()
            } else {
                res.send(resp)
            }
        })
    }
}
module.exports = {
    gettoken: gettoken,
    validaterequest: validaterequest,
    encrypt: encrypt,
    decrypt: decrypt
}