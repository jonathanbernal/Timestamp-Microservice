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

  if(parsedDate.toString() === 'Invalid Date') {
    res.json({error: parsedDate.toString()});
  } else if (!Number.isNaN(parsedUnixValue)) {
    res.json({unix: parsedUnixValue, utc: parsedDate.toUTCString()});
  } else {
    res.json({unix: parsedDate.toUTCString(), utc: parsedDate});
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
