var express = require('express')
var app = express()
var multer = require('multer')
var path = require('path');

var PORT = process.env.PORT || 2500;

app.listen(PORT);

var publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

// App should use Multer here

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/form.html");
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 //Refer - https://stackoverflow.com/a/38692588/7640300 | For Error Handling refer - Comments - https://stackoverflow.com/a/34698643/7640300
    }
});

var multipleUploads = upload.fields([{ name: 'iconFile', maxCount: 1}, { name: 'imageFile', maxCount: 1}]);

app.post('/submitForm', multipleUploads, function(req, res) {
    console.log("Form submission received");
    console.log((req.files['iconFile']) ? "Icon received" : "Icon not received");

    res.send("Form submission received");

})