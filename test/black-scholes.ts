import { BlackScholes } from '..';
import * as chai from "chai";
const assert = chai.assert;



describe("Black-Scholes", function () {
  describe("t>0, v>0", function () {
    it("should return a call price of 0.23834902311961947", function () {
      assert.equal(0.23834902311962125, BlackScholes.blackScholes(30, 34, .25, .2, .08, BlackScholes.Direction.CALL));
    });
    it("should return a put price of 3.5651039155492974", function () {
      assert.equal(3.565103915549301, BlackScholes.blackScholes(30, 34, .25, .2, .08, BlackScholes.Direction.PUT));
    });
  });
  describe("t>0, v=0, out-of-the-money", function () {
    it("should return a call price of 0", function () {
      assert.equal(0, BlackScholes.blackScholes(30, 34, .25, 0, .08, BlackScholes.Direction.CALL));
    });
    it("should return a put price of 0", function () {
      assert.equal(0, BlackScholes.blackScholes(35, 34, .25, 0, .08, BlackScholes.Direction.PUT));
    });
  });
  describe("t=0, v>0, out-of-the-money", function () {
    it("should return a call price of 0", function () {
      assert.equal(0, BlackScholes.blackScholes(30, 34, 0, 0.1, .08, BlackScholes.Direction.CALL));
    });
    it("should return a put price of 0", function () {
      assert.equal(0, BlackScholes.blackScholes(35, 34, 0, 0.1, .08, BlackScholes.Direction.PUT));
    });
  });
  describe("t=0, v=0, out-of-the-money", function () {
    it("should return a call price of 0", function () {
      assert.equal(0, BlackScholes.blackScholes(30, 34, 0, 0, .08, BlackScholes.Direction.CALL));
    });
    it("should return a put price of 0", function () {
      assert.equal(0, BlackScholes.blackScholes(35, 34, 0, 0, .08, BlackScholes.Direction.PUT));
    });
  });
  // It may seem odd that the call is worth significantly more than the put when
  // they are both $2 in the money.  This is because the call theoretically has
  // unlimited profit potential.  The put can only make money until the underlying
  // goes to zero.  Therefore the call has more value.
  describe("t>0, v=0, in-the-money", function () {
    it("should return a call price of 2.673245107570324", function () {
      assert.equal(2.673245107570324, BlackScholes.blackScholes(36, 34, .25, 0, .08, BlackScholes.Direction.CALL));
    });
    it("should return a put price of 1.3267548924296761", function () {
      assert.equal(1.3267548924296761, BlackScholes.blackScholes(32, 34, .25, 0, .08, BlackScholes.Direction.PUT));
    });
  });
  describe("t=0, v>0, in-the-money", function () {
    it("should return a call price of 2", function () {
      assert.equal(2, BlackScholes.blackScholes(36, 34, 0, 0.1, .08, BlackScholes.Direction.CALL));
    });
    it("should return a put price of 2", function () {
      assert.equal(2, BlackScholes.blackScholes(32, 34, 0, 0.1, .08, BlackScholes.Direction.PUT));
    });
  });
  describe("t=0, v=0, in-the-money", function () {
    it("should return a call price of 2", function () {
      assert.equal(2, BlackScholes.blackScholes(36, 34, 0, 0, .08, BlackScholes.Direction.CALL));
    });
    it("should return a put price of 2", function () {
      assert.equal(2, BlackScholes.blackScholes(32, 34, 0, 0, .08, BlackScholes.Direction.PUT));
    });
  });
  describe("Standard Normal Cumulative Distribution Function", function () {
    it("should return 0.5", function () {
      assert.equal(BlackScholes.stdNormCDF(0), .5);
    });
    it("should return 1", function () {
      assert.equal(BlackScholes.stdNormCDF(Infinity), 1);
    });
    it("should return 0", function () {
      assert.equal(BlackScholes.stdNormCDF(-Infinity), 0);
    });
    it("should return 1 standard deviation", function () {
      assert.equal(BlackScholes.stdNormCDF(1) - BlackScholes.stdNormCDF(-1), 0.6826894921370861);
    });
    it("should return 2 standard deviations", function () {
      assert.equal(BlackScholes.stdNormCDF(2) - BlackScholes.stdNormCDF(-2), 0.9544997361036414);
    });
    it("should return 3 standard deviations", function () {
      assert.equal(BlackScholes.stdNormCDF(3) - BlackScholes.stdNormCDF(-3), 0.9973002039367396);
    });
  });
  describe("getW", function () {
    it("should return -1.00163142954006", function () {
      assert.equal(BlackScholes.getW(30, 34, .25, .2, .08), -1.00163142954006);
    });
  });
});
