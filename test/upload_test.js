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

        it('should be five pictures', function () {
            var pf = new picture_facade();
            assert.equal(2, pf.add(1,1));
        });

    });
});





