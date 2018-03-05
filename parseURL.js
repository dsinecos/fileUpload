var url = require('url');

// console.log(getS3FilenameFromS3Url());

module.exports = getS3FilenameFromS3Url;

function getS3FilenameFromS3Url (s3Url, bucketName) {

    // var adr = s3location || "https://s3.ap-south-1.amazonaws.com/assets.segmentone.co/test/1520056708648Apple.jpeg"
    
    var adr = s3Url;
    var bucketName = bucketName;

    var parsedURL = url.parse(adr, true);
    var pathnameDivisions = parsedURL.pathname.split('/');

    var bucketName = bucketName || 'assets.segmentone.co';

    while (pathnameDivisions[0] !== bucketName) {
        pathnameDivisions.shift();
    }

    pathnameDivisions.shift();
    var fileName = pathnameDivisions.join('/');
    return fileName

    // console.log(pathnameDivisions.join('/'));
}



