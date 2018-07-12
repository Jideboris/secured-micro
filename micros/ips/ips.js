const client = require('../../lib/client').client

function isempty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false
  }
  return true
}
function getipsdata(req, res, next) {
  let clients = {}
  let params = {}
  clients.url = process.env.IPS_URL
  clients.password = process.env.CPS_PASSWORD
  clients.username = process.env.IPS_USER
  clients.wsdlparam = 'ips'
  clients.domain = 'BP1'
  params.refinery = req.params.refineryid
  clients.params = params
  client.callmicro.call(clients).then((response) => {
    let data = []
    let finaloutput = {
      assetdetails: [],
      status: response.status,
      errormessage: response.message,
    }
    if (response.status === 200 && response.data !== undefined && response.data.Asset_x0020_details !== undefined) {
       data = response.data.Asset_x0020_details.map((item) => {
        return {
          name: !isempty(item.Name) && item.Name !== undefined && item.Name !== null && item.Name !== '' ? item.Name : '',
          refineryname: !isempty(item.RefineryName) && item.RefineryName !== undefined && item.RefineryName !== null && item.RefineryName !== '' ? item.RefineryName : '',
          lpcode: !isempty(item.LPCode) && item.LPCode !== undefined && item.LPCode !== null && item.LPCode !== '' ? item.LPCode : '',
          percentloss: !isempty(item.PercentLoss) && item.PercentLoss !== undefined && item.PercentLoss !== null && item.PercentLoss !== '' ? item.PercentLoss : '',
          crudemarkermonthm1: !isempty(item.CrudeMarkerMonthM1) && item.CrudeMarkerMonthM1 !== undefined && item.CrudeMarkerMonthM1 !== null && item.CrudeMarkerMonthM1 !== '' ? item.CrudeMarkerMonthM1 : '',
          crudemarkerpricem1: !isempty(item.CrudeMarkerPriceM1) && item.CrudeMarkerPriceM1 !== undefined && item.CrudeMarkerPriceM1 !== null && item.CrudeMarkerPriceM1 !== '' ? item.CrudeMarkerPriceM1 : '',
          crudediffm1: !isempty(item.CrudeDiffM1) && item.CrudeDiffM1 !== undefined && item.CrudeDiffM1 !== null && item.CrudeDiffM1 !== '' ? item.CrudeDiffM1 : '',
          crudepricem1: !isempty(item.CrudePriceM1) && item.CrudePriceM1 !== undefined && item.CrudePriceM1 !== null && item.CrudePriceM1 !== '' ? item.CrudePriceM1 : '',
          workingcapitalm1: !isempty(item.WorkingCapitalM1) && item.WorkingCapitalM1 !== undefined && item.WorkingCapitalM1 !== null && item.WorkingCapitalM1 !== '' ? item.WorkingCapitalM1 : '',
          transportationm1: !isempty(item.TransportationM1) && item.TransportationM1 !== undefined && item.TransportationM1 !== null && item.TransportationM1 !== '' ? item.TransportationM1 : '',
          totaldeliveredcostm1: !isempty(item.TotalDeliveredCostM1) && item.TotalDeliveredCostM1 !== undefined && item.TotalDeliveredCostM1 !== null && item.TotalDeliveredCostM1 !== '' ? item.TotalDeliveredCostM1 : '',
          crudemarkermonthm2: !isempty(item.CrudeMarkerMonthM2) && item.CrudeMarkerMonthM2 !== undefined && item.CrudeMarkerMonthM2 !== null && item.CrudeMarkerMonthM2 !== '' ? item.CrudeMarkerMonthM2 : '',
          crudemarkerpricem2: !isempty(item.CrudeMarkerPriceM2) && item.CrudeMarkerPriceM2 !== undefined && item.CrudeMarkerPriceM2 !== null && item.CrudeMarkerPriceM2 !== '' ? item.CrudeMarkerPriceM2 : '',
          crudediffm2: !isempty(item.CrudeDiffM2) && item.CrudeDiffM2 !== undefined && item.CrudeDiffM2 !== null && item.CrudeDiffM2 !== '' ? item.CrudeDiffM2 : '',
          crudepricem2: !isempty(item.CrudePriceM2) && item.CrudePriceM2 !== undefined && item.CrudePriceM2 !== null && item.CrudePriceM2 !== '' ? item.CrudePriceM2 : '',
          workingcapitalm2: !isempty(item.WorkingCapitalM2) && item.WorkingCapitalM2 !== undefined && item.WorkingCapitalM2 !== null && item.WorkingCapitalM2 !== '' ? item.WorkingCapitalM2 : '',
          transportationm2: !isempty(item.TransportationM2) && item.TransportationM2 !== undefined && item.TransportationM2 !== null && item.TransportationM2 !== '' ? item.TransportationM2 : '',
          totaldeliveredcostm2: !isempty(item.TotalDeliveredCostM2) && item.TotalDeliveredCostM2 !== undefined && item.TotalDeliveredCostM2 !== null && item.TotalDeliveredCostM2 !== '' ? item.TotalDeliveredCostM2 : '',
          crudemarkermonthm3: !isempty(item.CrudeMarkerMonthM3) && item.CrudeMarkerMonthM3 !== undefined && item.CrudeMarkerMonthM3 !== null && item.CrudeMarkerMonthM3 !== '' ? item.CrudeMarkerMonthM3 : '',
          crudemarkerpricem3: !isempty(item.CrudeMarkerPriceM3) && item.CrudeMarkerPriceM3 !== undefined && item.CrudeMarkerPriceM3 !== null && item.CrudeMarkerPriceM3 !== '' ? item.CrudeMarkerPriceM3 : '',
          crudediffm3: !isempty(item.CrudeDiffM3) && item.CrudeDiffM3 !== undefined && item.CrudeDiffM3 !== null && item.CrudeDiffM3 !== '' ? item.CrudeDiffM3 : '',
          crudepricem3: !isempty(item.CrudePriceM3) && item.CrudePriceM3 !== undefined && item.CrudePriceM3 !== null && item.CrudePriceM3 !== '' ? item.CrudePriceM3 : '',
          workingcapitalm3: !isempty(item.WorkingCapitalM3) && item.WorkingCapitalM3 !== undefined && item.WorkingCapitalM3 !== null && item.WorkingCapitalM3 !== '' ? item.WorkingCapitalM3 : '',
          transportationm3: !isempty(item.TransportationM3) && item.TransportationM3 !== undefined && item.TransportationM3 !== null && item.TransportationM3 !== '' ? item.TransportationM3 : '',
          totaldeliveredcostm3: !isempty(item.TotalDeliveredCostM3) && item.TotalDeliveredCostM3 !== undefined && item.TotalDeliveredCostM3 !== null && item.TotalDeliveredCostM3 !== '' ? item.TotalDeliveredCostM3 : '',
          crudemarker: !isempty(item.CrudeMarker) && item.CrudeMarker !== undefined && item.CrudeMarker !== null && item.CrudeMarker !== '' ? item.CrudeMarker : ''
        }

      })
      finaloutput.assetdetails = data
    }
    res.send(finaloutput)
  }) 
}

module.exports = {
  getipsdata: getipsdata
}