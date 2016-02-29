var assert = require('chai').assert;

var picture_facade = require('../public/js/pictures');

describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});


describe('picture_facade', function() {

    describe('#pf class creation', function () {

        it('should not be null', function () {
            var pf = new picture_facade();
            assert.isNotNull(pf, "pf is null");
        });

        it('should be undefined', function () {
            var pf = undefined;
            assert.isUndefined(pf, "pf not undefined");
        });

    });

    describe('#add', function () {

        it('should return 2 when adding 1 + 1', function () {
            var pf = new picture_facade();
            assert.equal(2, pf.add(1,1));
        });

    });

    describe('#load_pictures', function () {

        it('should load pictures with length > 0', function (done) {
            var pf = new picture_facade();

            var count = 0;
            pf.load("./test/test_files/", function(err, data) {

                if (err) throw err;

                if (data != null) {
                    count++;
                    assert.isTrue(data.length > 0);
                    assert.isTrue(count > 0, "count <= 0" );
                }
            });

            done();

        });

        it('should load five filenames', function (done) {
            var pf = new picture_facade();

            var count = 0;
            pf.getFilenames("./test/test_files/", function(nameArray) {

                assert.IsTrue(nameArray.length === 5);
                assert.IsFalse(nameArray.length != 5);

            });

            done();

        });
    });


});





