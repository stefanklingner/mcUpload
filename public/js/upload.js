
//taken from:
//http://www.script-tutorials.com/pure-html5-file-upload/

"use strict";

function Upload(elem, hashId) {

    var self = this;
    self.elem = elem;
    self.counter = 100;
    var elementFullyUploaded = false;


    // common variables
    var iBytesUploaded = 0;
    var iBytesTotal = 0;
    var iPreviousBytesLoaded = 0;
    var iMaxFilesize = 1048576; // 1MB
    var oTimer = 0;
    var sResultFileSize = '';

    self.secondsToTime = function(secs) { //convert seconds in normal time format
        var hr = Math.floor(secs / 3600);
        var min = Math.floor((secs - (hr * 3600)) / 60);
        var sec = Math.floor(secs - (hr * 3600) - (min * 60));

        if (hr < 10) {
            hr = "0" + hr;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        if (hr) {
            hr = "00";
        }
        return hr + ':' + min + ':' + sec;
    };

    self.bytesToSize = function (bytes) {
        var sizes = ['Bytes', 'KB', 'MB'];
        if (bytes == 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };

    //not used
    //fileSelected = function () {
    //
    //    // get selected file element
    //    var oFile = this.elem.file;
    //
    //    // filter for image files
    //    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
    //    if (!rFilter.test(oFile.type)) {
    //        document.getElementById('error').style.display = 'block';
    //        return;
    //    }
    //
    //    // little test for filesize
    //    if (oFile.size > iMaxFilesize) {
    //        this.elem.warnsize = true;
    //        return;
    //    }
    //
    //    // get preview element
    //    var oImage = document.getElementById('preview');
    //
    //    // prepare HTML5 FileReader
    //    var oReader = new FileReader();
    //    oReader.onload = function (e) {
    //
    //        // e.target.result contains the DataURL which we will use as a source of the image
    //        oImage.src = e.target.result;
    //
    //        oImage.onload = function () { // binding onload event
    //
    //            // we are going to display some custom image information here
    //            sResultFileSize = bytesToSize(oFile.size);
    //            //this.elem.fileinfo = 'block';
    //            this.elem.filename = 'Name: ' + oFile.name;
    //            this.elem.filesize = 'Size: ' + sResultFileSize;
    //            this.elem.filetype = 'Type: ' + oFile.type;
    //            this.elem.filedim = 'Dimension: ' + oImage.naturalWidth + ' x ' + oImage.naturalHeight;
    //
    //        };
    //    };
    //
    //    // read selected file as DataURL
    //    oReader.readAsDataURL(oFile);
    //}

    self.startUploading = function () {

        var uploadElem = self.elem.myForm;
        if (uploadElem == undefined) {
            return;
        }

        // cleanup all temp states
        iPreviousBytesLoaded = 0;

        // get form data for POSTing
        var vFD = new FormData(uploadElem);

        // create XMLHttpRequest object, adding few event listeners, and POSTing our data
        var oXHR = new XMLHttpRequest();
        oXHR.upload.addEventListener('progress', self.uploadProgress, false);
        oXHR.addEventListener('load', self.uploadFinish, false);
        oXHR.addEventListener('error', self.uploadError, false);
        oXHR.addEventListener('abort', self.uploadAbort, false);
        oXHR.open('POST', document.URL + 'upload');
        oXHR.send(vFD);

        // set inner timer
        oTimer = setInterval(self.doInnerUpdates, 300);
    };

    self.isElementFullyUploaded = function() {
        return elementFullyUploaded;
    };

    self.doInnerUpdates = function () { // display the upload speed
        var iCB = iBytesUploaded;
        var iDiff = iCB - iPreviousBytesLoaded;

        // if nothing new loaded - exit
        if (iDiff == 0)
            return;

        iPreviousBytesLoaded = iCB;
        iDiff = iDiff * 2;
        var iBytesRem = iBytesTotal - iPreviousBytesLoaded;
        var secondsRemaining = iBytesRem / iDiff;

        // update speed info
        var iSpeed = iDiff.toString() + 'B/s';
        if (iDiff > 1024 * 1024) {
            iSpeed = (Math.round(iDiff * 100 / (1024 * 1024)) / 100).toString() + 'MB/s';
        } else if (iDiff > 1024) {
            iSpeed = (Math.round(iDiff * 100 / 1024) / 100).toString() + 'KB/s';
        }

        self.elem.speed(iSpeed);
        self.elem.remaining(self.secondsToTime(secondsRemaining));
    };

    self.uploadProgress = function (e) { // upload process in progress
        if (e.lengthComputable) {
            iBytesUploaded = e.loaded;
            iBytesTotal = e.total;
            var iPercentComplete = Math.round(e.loaded * 100 / e.total);
            var iBytesTransfered = self.bytesToSize(iBytesUploaded);

            self.elem.processed(iPercentComplete); // * 4).toString() + 'px';
            self.elem.b_transfered = iBytesTransfered;
            if (iPercentComplete == 100) {


            }
        } else {
            console.log("unable to compute");
        }
    };

    self.uploadFinish = function (e) { // upload successfully finished

        console.log("counter " + self.counter);
        self.elem.processed(100);

        clearInterval(oTimer);
        elementFullyUploaded = true;
    };

    self.uploadError = function (e) { // upload error
        console.log("upload error");
        clearInterval(oTimer);
    };

    self.uploadAbort = function (e) { // upload abort
        console.log("upload abort");
        clearInterval(oTimer);
    };

}