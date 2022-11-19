// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var validator = require('validator')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { json } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Route used when no date is specified. Returns the current time since 1970 as an integer
// and the current date
app.get('/api', (req, res) => {
    let currDate = new Date()
    res.json({unix: currDate.valueOf(), utc: currDate.toUTCString()})
})

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  // We need to validate if the input is a valid date, be it in milliseconds format or in mm-dd-yyyy
  let inputDate = req.params.date;

  let integerRegex = /(^[\d]{0,}$)/  

  // validate date
  let outputDate = new Date( Date.parse(inputDate) )

  if( !Number.isNaN(outputDate.valueOf()) ) {
    res.json({unix: outputDate.valueOf(), utc: outputDate.toUTCString()})
  }
  else if(inputDate.match(integerRegex)) { // A separate case had to be created for integer input strings because Date() was not handling this case.
    res.json({unix: outputDate.setTime(inputDate), utc: outputDate.toUTCString()})
  }
  else
    res.json({error: 'Invalid Date'})
});

// listen for requests :)
let PORT = 8001
var listener = app.listen(PORT /*process.env.PORT*/, function () {
  console.log('Your app is listening on port ' + PORT /*listener.address().port*/);
});
