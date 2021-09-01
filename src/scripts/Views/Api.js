import Default from './Default'

var Airtable = require('airtable');


Default()
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyNXNLgJCOcwP46h'
});
var base = Airtable.base('appH7L7OJGtBM3Ftf')

const table = base('records')

const getRecords = async () => {
  const records= await table.select().firstPage()
  console.log(records)
}

getRecords()