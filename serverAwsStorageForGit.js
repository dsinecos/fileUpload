var express = require('express')
var app = express()
var multer = require('multer')
var path = require('path');
var config = require('./config.json')

var aws = require('aws-sdk');
var multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: "",
    accessKeyId: "",
    region: ""
});

var s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'bucket-name',
        key: function(req, file, cb) {
            console.log(file);
            cb(null, "test/" + Date.now() + file.originalname); // This will save the file to a folder 'test' inside the bucket
        }
    }),
    limits: {
        fileSize: 1024
    }
})

var publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/form.html");
});

var multipleUploads = upload.fields([{ name: 'iconFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]);

app.post('/submitForm', multipleUploads, function (req, res) {
    console.log("Form submission received");
    console.log((req.files['iconFile']) ? "Icon received" : "Icon not received");

    res.send("Form submission received");

    console.log("File information");
    console.log("S3 URL :" + req.files['iconFile'][0]['location']);
    console.log("S3 URL :" + req.files['imageFile'][0]['location']);
})

var PORT = process.env.PORT || 2500;
app.listen(PORT);