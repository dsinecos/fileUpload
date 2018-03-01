var express = require('express')
var app = express()
var multer = require('multer')
var upload = multer({ dest: 'uploads/'})
var path = require('path');

var PORT = process.env.PORT || 2500;

app.listen(PORT);

var publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

// App should use Multer here

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/form.html");
});

app.post('/submitForm', upload.array('iconFile'), function(req, res) {
    console.log("Form submission received");
    console.log(req.body.title);
    console.log(req.body.message);
    console.log(req.body.url);
    console.log((req.file) || (req.files.length > 0) ? "Icon received" : "Icon not received");
    console.log("No. of icons received " + req.files.length);

    res.send("Form submission received");

})