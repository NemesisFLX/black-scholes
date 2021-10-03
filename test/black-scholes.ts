import { BlackScholes } from '..';
import * as chai from "chai";
const assert = chai.assert;


describe("Black-Scholes", function () {
  describe("t>0, v>0", function () {
    it("should return a call price of 0.23834902311961947", function () {
      assert.equal(0.23834902311962125.toFixed(8), BlackScholes.getPrice(30, 34, new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))), .2, .08, BlackScholes.Direction.CALL).toFixed(8));
    });
    it("should return a put price of 3.5651039155492974", function () {
      assert.equal(3.565103915549301.toFixed(8), BlackScholes.getPrice(30, 34, new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))), .2, .08, BlackScholes.Direction.PUT).toFixed(8));
    });
  });
  describe("t>0, v=0, out-of-the-money", function () {
    it("should return a call price of 0", function () {
      assert.equal("0.00000000", BlackScholes.getPrice(30, 34, new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))), 0, .08, BlackScholes.Direction.CALL).toFixed(8));
    });
    it("should return a put price of 0", function () {
      assert.equal("0.00000000", BlackScholes.getPrice(35, 34, new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))), 0, .08, BlackScholes.Direction.PUT).toFixed(8));
    });
  });
  describe("t=0, v>0, out-of-the-money", function () {
    it("should return a call price of 0", function () {
      assert.equal("0.00000000", BlackScholes.getPrice(30, 34, new Date(), 0.1, .08, BlackScholes.Direction.CALL).toFixed(8));
    });
    it("should return a put price of 0", function () {
      assert.equal("0.00000000", BlackScholes.getPrice(35, 34, new Date(), 0.1, .08, BlackScholes.Direction.PUT).toFixed(8));
    });
  });
  describe("t=0, v=0, out-of-the-money", function () {
    it("should return a call price of 0", function () {
      assert.equal("0.00000000", BlackScholes.getPrice(30, 34, new Date(), 0, .08, BlackScholes.Direction.CALL).toFixed(8));
    });
    it("should return a put price of 0", function () {
      assert.equal("0.00000000", BlackScholes.getPrice(35, 34, new Date(), 0, .08, BlackScholes.Direction.PUT).toFixed(8));
    });
  });
  // It may seem odd that the call is worth significantly more than the put when
  // they are both $2 in the money.  This is because the call theoretically has
  // unlimited profit potential.  The put can only make money until the underlying
  // goes to zero.  Therefore the call has more value.
  describe("t>0, v=0, in-the-money", function () {
    it("should return a call price of 2.673245107570324", function () {
      assert.equal(2.673245107570324.toFixed(8), BlackScholes.getPrice(36, 34, new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))), 0, .08, BlackScholes.Direction.CALL).toFixed(8));
    });
    it("should return a put price of 1.3267548924296761", function () {
      assert.equal(1.3267548924296761.toFixed(8), BlackScholes.getPrice(32, 34, new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))), 0, .08, BlackScholes.Direction.PUT).toFixed(8));
    });
  });
  describe("t=0, v>0, in-the-money", function () {
    it("should return a call price of 2", function () {
      assert.equal("2.00000000", BlackScholes.getPrice(36, 34, new Date(), 0.1, .08, BlackScholes.Direction.CALL).toFixed(8));
    });
    it("should return a put price of 2", function () {
      assert.equal("2.00000000", BlackScholes.getPrice(32, 34, new Date(), 0.1, .08, BlackScholes.Direction.PUT).toFixed(8));
    });
  });
  describe("t=0, v=0, in-the-money", function () {
    it("should return a call price of 2", function () {
      assert.equal("2.00000000", BlackScholes.getPrice(36, 34, new Date(), 0, .08, BlackScholes.Direction.CALL).toFixed(8));
    });
    it("should return a put price of 2", function () {
      assert.equal("2.00000000", BlackScholes.getPrice(32, 34, new Date(), 0, .08, BlackScholes.Direction.PUT).toFixed(8));
    });
  });
  describe("Standard Normal Cumulative Distribution Function", function () {
    it("should return 0.5", function () {
      assert.equal(BlackScholes.getStdNormCDF(0), .5);
    });
    it("should return 1", function () {
      assert.equal(BlackScholes.getStdNormCDF(Infinity), 1);
    });
    it("should return 0", function () {
      assert.equal(BlackScholes.getStdNormCDF(-Infinity), 0);
    });
    it("should return 1 standard deviation", function () {
      assert.equal(BlackScholes.getStdNormCDF(1) - BlackScholes.getStdNormCDF(-1), 0.6826894921370861);
    });
    it("should return 2 standard deviations", function () {
      assert.equal(BlackScholes.getStdNormCDF(2) - BlackScholes.getStdNormCDF(-2), 0.9544997361036414);
    });
    it("should return 3 standard deviations", function () {
      assert.equal(BlackScholes.getStdNormCDF(3) - BlackScholes.getStdNormCDF(-3), 0.9973002039367396);
    });
  });
  describe("getW", function () {
    it("should return -1.00163142954006", function () {
      assert.equal(BlackScholes.getOmega(30, 34, new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))), .2, .08).toFixed(8), (-1.00163142954006).toFixed(8));
    });
  });
});
