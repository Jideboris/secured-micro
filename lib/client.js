const soapntml2 = require('soap-ntlm-2')
const fs = require('fs')
const httpntlm = require('httpntlm')

const client = {   
    url: '',
    password: '',
    username: '',
    wsdlparam: '',
    domain: '',
    params: {},
    callmicro: function () {
        const htmlAuth = {
            url: 'https://cpsoa-webservice-deva.bpweb.bp.com/reports.asmx',
            password: this.password,
            username: this.username,
            workstation: '',
            domain: this.domain
        }
        const params = this.params
        const ws = this.wsdlparam + '.wsdl'
        const options = {
            wsdl_options: {
                ntlm: true,
                username: htmlAuth.username,
                password: htmlAuth.password,
                workstation: '',
                domain: htmlAuth.domain
            }
        }
        return new Promise((resolve, reject) => {
            console.log('Request is made with these params:', JSON.stringify(params));
            httpntlm.get(htmlAuth, (err, wsdl) => {
                if (err) {
                    console.log('Error due to authentication configuration--->' + err)
                    reject({
                        status: 403,
                        message: "Error due to authentication configuration!" + "|Error Details:" + err,
                        data: []
                    })
                } else {
                    fs.writeFile('./' + ws, wsdl.body, () => {
                        if (err) {
                            reject({
                                status: 500,
                                message: "WSDL file not found OR could not write WSDL!" + "|Error Details:" + err,
                                data: []
                            })
                        }
                        console.log('WSDL ->', './' + ws)
                        soapntml2.createClient('./' + ws, (err, client) => {
                            if (err) {
                                reject({
                                    status: 500,
                                    message: "Cannot connect to client, something wrong with WSDL!" + "|Error Details:" + err,
                                    data: []
                                })
                            }
                            client.setSecurity(new soapntml2.NtlmSecurity(options.wsdl_options))
                            console.log(this.wsdlparam)
                            console.log('executing GetAssetDetails->')
                            client.GetAssetDetails(params, (err, res) => {
                                if (err === null && (res !== null || res !== undefined)) {
                                    let output = res.GetAssetDetailsResult.diffgram.NewDataSet
                                    resolve({
                                        status: 200,
                                        message: "Ok",
                                        data: output
                                    })
                                } else {
                                    reject({
                                        status: 500,
                                        message: "No data returned from IPS web service, may not be active" + "|Error Details:" + err,
                                        data: []
                                    })
                                }
                            })
                        })
                    })
                }
            })
        }).catch((error) => {
            return {
                status: error.status,
                message: error.message,
                data: error.data
            }
        })

    }   
}

module.exports = {
    client: client
}