// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var validator = require('validator')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
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
  
  // Use this regex to validate the date entered. It does not validate time, only dates in the formats
  // mm-dd-yyyy, dd-mm-yyyy, mon-dd-yyyy, dd-mon-yyyy, where mon represents a 3-lettered month.
  let dateRegex = new RegExp([
    /[0-9]{1,2}(\s|-)[0-9]{1,2}(\s|-)[0-9]{4}|/,
    /[0-9]{4}(\s|-)[0-9]{1,2}(\s|-)[0-9]{1,2}|/,
    /([Jan|Feb|Mar|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec]{3}(\s|-)[0-9]{1,2}(\s|-)[0-9]{4})|/,
    /([0-9]{1,2}(\s|-)[Jan|Feb|Mar|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec]{3}(\s|-)[0-9]{4})|/,
    /(\s|:)([0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})/gm
  ].map(r => r.source).join(''));

  let integerRegex = /([\d]{0,}$)/

  let outputDate;
  if(inputDate.match(dateRegex)){
    outputDate = new Date(inputDate);
    res.json({unix: outputDate.valueOf(), utc: outputDate.toUTCString()})
  }
  else if(inputDate.match(integerRegex)) {// create a date with the integer provided and treat it as a unix date value
    outputDate = new Date(Number.parseInt(inputDate)); // we need to parse the number out of the string for it to work with the Date constructor
    console.log(outputDate)
    res.json({unix: outputDate.valueOf(), utc: outputDate.toUTCString()})
  }
  else {
    res.json({error: 'Invalid Date'});
  }
});

// listen for requests :)
let PORT = 8001
var listener = app.listen(PORT /*process.env.PORT*/, function () {
  console.log('Your app is listening on port ' + PORT /*listener.address().port*/);
});
