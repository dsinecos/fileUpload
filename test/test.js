var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
let expect = chai.expect;

// To upload file
var fs = require("fs");
var path = require("path");
var util = require("util");

chai.use(chaiHttp);

describe("Test File Upload", function () {

    it("Test if form is submitted", function (done) {

        // fs.readFile(path.join(__dirname, "../Icon.png"), function (err, data) {
        //     if (err) {
        //         console.log(err);
        //         process.exit(1);
        //     }

        //     // content = util.format(data, "test", "test", "test");
        //     // console.log(content);

        // });

        var formData = {
            title: "Title",
            message: "Message",
            url: "Redirect URL"
        }

        // formData.iconFile = data;

        // console.log(data);
        chai
            .request(server)
            .post('/submitForm')
            .send(formData)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
            });
        done();


    })
})

// Loading a file into a variable
