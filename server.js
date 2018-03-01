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

var multipleUploads = upload.fields([{ name: 'iconFile', maxCount: 1}, { name: 'imageFile', maxCount: 1}]);

app.post('/submitForm', multipleUploads, function(req, res) {
    console.log("Form submission received");
    console.log(req.body.title);
    console.log(req.body.message);
    console.log(req.body.url);
    console.log((req.files['iconFile']) ? "Icon received" : "Icon not received");
    console.log((req.files['imageFile']) ? "Image received" : "Image not received");

    console.log("Extracting file information");
    console.info("fieldname : " + req.files['iconFile'][0]['fieldname']);
    console.info("originalname : " + req.files['iconFile'][0]['originalname']);
    console.info("encoding : " + req.files['iconFile'][0]['encoding']);
    console.info("mimetype : " + req.files['iconFile'][0]['mimetype']);
    console.info("size : " + req.files['iconFile'][0]['size']);
    console.info("destination : " + req.files['iconFile'][0]['destination']);
    console.info("filename : " + req.files['iconFile'][0]['filename']);
    console.info("path : " + req.files['iconFile'][0]['path']);

    res.send("Form submission received");

})