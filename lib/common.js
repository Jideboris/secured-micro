const crypto = require('crypto')
const alg = 'des-ede-cbc'
const iv = 'pdMBMjde'
const key = new Buffer('BpRy+ae9Nm/MZhQh', 'utf-8')

function checkURL(word) {
    if (word === "" || word === undefined) {
        console.log("The URL is missing")
        return 0
    }
    if (word.slice(-1) === "/") {
        word = word.substring(0, word.length - 1)
    }
    return word
}

function decrypt(cipher) {
    return new Promise((resolve, reject) => {
        var decipher = crypto.createDecipheriv(alg, key, iv)
        var dec = decipher.update(cipher, 'base64', 'ascii')
        dec += decipher.final('ascii')
        resolve(dec)
    })
}

function calculatedays(todaydate, tokendate) {
    let isvalid = false
    let tday = tokendate[0]
    let tmonth = tokendate[1]
    let tyear = tokendate[2]
    let day = todaydate.getDate()
    let month = todaydate.getMonth() + 1
    let year = todaydate.getFullYear()
    if (tmonth > month || tyear > year) {
        isvalid = true
    } else if (tmonth == month && tyear == year) {
        let d = parseInt(day)
        let m = (parseInt(month) / 12 * 365)
        let y = (parseInt(year) * 365)
        let finalcal1 = d + m + y

        let d1 = parseInt(tday)
        let m1 = (parseInt(tmonth) / 12 * 365)
        let y1 = (parseInt(tyear) * 365)
        let finalcal2 = d1 + m1 + y1

        isvalid = parseInt(finalcal1) <= parseInt(finalcal2)
    }
    return isvalid
}
module.exports = {
    checkURL: checkURL,
    decrypt: decrypt,
    calculatedays: calculatedays
}