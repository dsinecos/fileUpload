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

        var formData = {
            title: "Title",
            message: "Message",
            url: "Redirect URL"
        }

        chai
            .request(server)
            .post('/submitForm')
            .attach('iconFile', fs.readFileSync(__dirname + '/test.png'), 'avatar.png')
            .attach('imageFile', fs.readFileSync(__dirname + '/Apple.jpeg'), 'apple.jpeg')
            .send(formData)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });



    })

    it("Can submit params", function (done) {

        var id = 1234;

        chai
            .request(server)
            .get('/testParam/' + id + '/test')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });


    })
})

// Loading a file into a variable

// describe.skip("Test POST Notification request", function () {
//     it("Form submitted without file upload", function (done) {
//         var formData = {
//             title: "Title",
//             message: "Message",
//             onClickUrl: "Redirect URL when notification is clicked",
//         }

//         chai
//             .request(server)
//             .post('/notifications')
//     })
// })
