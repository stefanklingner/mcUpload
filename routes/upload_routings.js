var express = require('express');
var router = express.Router();
var Busboy = require('busboy');

var path = require('path');
var util = require('util');

var picture_facade = require('../public/js/pictures');

var home = '/';

//
router.get(home, sendUploadScreen);

router.get(home + 'a*d', sendUploadScreen);

function sendUploadScreen(req, res) {
    //res.sendFile(__dirname + html_dir + 'upload.html');
    //res.sendFile('./../public/html/upload.html');
    //res.sendFile(path.join(__dirname, '../public/html', 'upload.html'));
    res.render('upload');
}
router.get(home + 'samples', function (req, res) {

    var pf = new picture_facade();

    var count = 0;
    pf.getFilenames("./test/test_files/", function(nameArray) {

        if (nameArray === undefined) {
            throw "nameArray undefined";
        }

        res.render('samples', {title: 'Sample Pictures', pictures: nameArray});

    });

});

//
router.get(home + 'simple', function (req, res) {
    res.send(
        '<form action="/upload" method="post" enctype="multipart/form-data">' +
        '<input type="file" name="snapshot" />' +
        '<input type="submit" value="Upload" />' +
        '</form>'
    );
});

//
router.get(home + 'simple2', function (req, res) {
    //res.sendFile(__dirname + html_dir + 'simple2.html');
    res.sendFile(path.join(__dirname, '../public/html', 'simple2.html'));
});

//
router.get(home + 'dnd', function(req, res) {
    //res.sendFile('/html/drag_and_drop.html');
    res.sendFile(path.join(__dirname, '../public/html', 'drag_and_drop.html'));
});

//
router.post(home + 'upload', uploadFile);

//
router.post(home + 'upload' + '/a*d', uploadFile);

//
function uploadFile (req, res) {

    var busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

        console.log('File [' + fieldname + ']: filename: ' + filename);

        file.on('data', function(data) {
            //console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });

        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
        });

    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + util.inspect(val));
    });

    busboy.on('error', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + util.inspect(val));
    });


    busboy.on('finish', function () {
        console.log("finish");
        res.writeHead(200, {'Connection': 'close'});
        res.end("That's all folks!");
    });

    return req.pipe(busboy);

}

module.exports = router;
