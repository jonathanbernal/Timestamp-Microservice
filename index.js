// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

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

app.get('/api', (req, res) => {
    const currentDate = new Date();
    res.json({unix: currentDate.getTime(), utc: currentDate.toUTCString()});  
});

app.get('/api/:date', (req, res) => {
  const parsedUnixValue = parseInt(req.params.date);
  const parsedDate = new Date(req.params.date);
  console.log(parsedDate);

  if(typeof(parsedUnixValue) === 'number' && parsedDate.toString() === 'Invalid Date') {
    res.json({unix: parsedUnixValue, utc: new Date(parsedUnixValue).toUTCString()})
  } else if (parsedDate.toString() !== 'Invalid Date') {
    res.json({unix: parsedDate.valueOf(), utc: parsedDate.toUTCString()});
  } else {
    res.json({error: parsedDate.toString()});
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
