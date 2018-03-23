var express = require('express')
var app = express()
var multer = require('multer')
var path = require('path');
var http = require('http');

var PORT = process.env.PORT || 2501;

// var server = app.listen(PORT, function() {
//     var host = server.address().address;
//     var port = server.address().port;

//     console.log("App listening at http://%s:%s", host, port);
// });

var server = http.createServer(app);
server.listen(PORT);

module.exports = server;

var publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

// App should use Multer here

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/form.html");
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 //Refer - https://stackoverflow.com/a/38692588/7640300 | For Error Handling refer - Comments - https://stackoverflow.com/a/34698643/7640300
    }
});

var multipleUploads = upload.fields([{ name: 'iconFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]);

app.post('/submitForm', multipleUploads, function (req, res) {
    // console.log(req.headers);
    // console.log(req.body);
    // console.log("Form submission received");
    // console.log((req.files['iconFile']) ? "Icon received" : "Icon not received");

    var testObj = req.body;

    console.log(testObj);

    res.send("Form submission received");

})

// Learning to use express-validator

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

var validators = [
    check('username', "Username should be at least 5 characters").isLength({min: 5}),
    check('password', 'Enter Password').exists(),
]

var handleValidationErrors = function (req, res, next) {

    var errors = validationResult(req);
    console.log("Inside handleValidationErrors");

    if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.status(400).json({ errors: errors.mapped() });
    } else {
        next();        
    }

}

app.post('/testValidation', multer().none(), validators, handleValidationErrors, function (req, res, next) {

    res.status(200).send("Success");

})