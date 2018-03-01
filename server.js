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

    res.send("Form submission received");

})