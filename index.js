// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  // grabbing the date from the url
  const dateString = req.params.date;
  const dateRegex = /^[0-9]+$/;
  const numsOnly = dateRegex.test(dateString);

  // Checking if the request doesnot contain numbers
  if (!numsOnly) {
    const unixTimestamp = Date.parse(dateString);
    const utcDate = new Date(unixTimestamp).toUTCString;

    // checking if the string or text is true or correct
    unixTimestamp
    ? res.json({ "unix": unixTimestamp, "utc": utcDate })
    : res.json({ error: "Invalid Date" })
  } else {
    const unixTimestamp = parseInt(dateString);
    const actualDate = new Date(unixTimestamp);
    const utcDate = actualDate.toUTCString();

    res.json({ "unix": unixTimestamp, "utc": utcDate });
  }
});

// empty request
app.get("/api/", (req, res) => {
  const currentDate = new Date().toUTCString();
  const currentUnix = Date.parse(currentDate);
  res.json({ "unix": currentUnix, "utc": currentDate });
})



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
