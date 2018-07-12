const jwt = require('jwt-simple')
const {
    calculatedays
} = require('../lib/common')
function validate(token) {
    return new Promise((resolve, reject) => {
        try {
            let decoded = token !== undefined ? jwt.decode(token, require('../lib/secret')()) : ''
            if (decoded !== '') {
                let tok = decoded.exp.split(' ')[0].split('/')
                let isvalid = calculatedays(new Date(), tok)
                if (isvalid) {
                    resolve({
                        data: [],
                        status: 200,
                        errormessage: "Ok"
                    })

                } else if (decoded === null || decoded === undefined || decoded === '') {
                    resolve({
                        data: [],
                        status: 403,
                        errormessage: "Not Authorized"
                    })

                } else {
                    resolve({
                        data: [],
                        status: 400,
                        errormessage: "Token Expired"
                    })
                }
            } else {
                resolve({
                    data: [],
                    status: 403,
                    errormessage: "Not Authorized"
                })
            }
        } catch (err) {
            reject({
                data: [],
                status: 500,
                errormessage: "Token is not Valid",
            })
        }
    }).catch((err) => {
        return {
            data: [],
            status: err.status,
            errormessage: err.errormessage

        }
    })
}
module.exports = {
    validate: validate
}