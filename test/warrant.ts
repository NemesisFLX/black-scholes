import { Direction, Warrant } from '..';
import * as chai from "chai";
const assert = chai.assert;



describe("Black-Scholes", function () {
  describe("t>0, v>0", function () {
    it("should return a call price of 0.23834902311961947", function () {
      let price = new Warrant({
        priceUnderlying: 30,
        strike: 34,
        expiration: new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))),
        volatility: .2,
        riskFreeInterest: .08,
        direction: Direction.CALL,
      }).price().toFixed(8)
      assert.equal(0.23834902311962125.toFixed(8), price);
    });
    it("should return a put price of 3.5651039155492974", function () {
      let price = new Warrant({
        priceUnderlying: 30,
        strike: 34,
        expiration: new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))),
        volatility: .2,
        riskFreeInterest: .08,
        direction: Direction.PUT,
      }).price().toFixed(8)
      assert.equal(3.565103915549301.toFixed(8), price);
    });
  });
  describe("t>0, v=0, out-of-the-money", function () {
    it("should return a call price of 0", function () {
      let price = new Warrant({
        priceUnderlying: 30,
        strike: 34,
        expiration: new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))),
        volatility: 0,
        riskFreeInterest: .08,
        direction: Direction.CALL,
      }).price().toFixed(8)
      assert.equal("0.00000000", price);
    });
    it("should return a put price of 0", function () {
      let price = new Warrant({
        priceUnderlying: 35,
        strike: 34,
        expiration: new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))),
        volatility: 0,
        riskFreeInterest: .08,
        direction: Direction.PUT,
      }).price().toFixed(8)
      assert.equal("0.00000000", price);
    });
  });
  describe("t=0, v>0, out-of-the-money", function () {
    it("should return a call price of 0", function () {
      let price = new Warrant({
        priceUnderlying: 30,
        strike: 34,
        expiration: new Date(),
        volatility: 0.1,
        riskFreeInterest: .08,
        direction: Direction.CALL,
      }).price().toFixed(8)
      assert.equal("0.00000000", price);
    });
    it("should return a put price of 0", function () {
      let price = new Warrant({
        priceUnderlying: 35,
        strike: 34,
        expiration: new Date(),
        volatility: 0.1,
        riskFreeInterest: .08,
        direction: Direction.PUT,
      }).price().toFixed(8)
      assert.equal("0.00000000", price);
    });
  });
  describe("t=0, v=0, out-of-the-money", function () {
    it("should return a call price of 0", function () {
      let price = new Warrant({
        priceUnderlying: 30,
        strike: 34,
        expiration: new Date(),
        volatility: 0,
        riskFreeInterest: .08,
        direction: Direction.CALL,
      }).price().toFixed(8)
      assert.equal("0.00000000", price);
    });
    it("should return a put price of 0", function () {
      let price = new Warrant({
        priceUnderlying: 35,
        strike: 34,
        expiration: new Date(),
        volatility: 0,
        riskFreeInterest: .08,
        direction: Direction.PUT,
      }).price().toFixed(8)
      assert.equal("0.00000000", price);
    });
  });
  // It may seem odd that the call is worth significantly more than the put when
  // they are both $2 in the money.  This is because the call theoretically has
  // unlimited profit potential.  The put can only make money until the underlying
  // goes to zero.  Therefore the call has more value.
  describe("t>0, v=0, in-the-money", function () {
    it("should return a call price of 2.673245107570324", function () {
      let price = new Warrant({
        priceUnderlying: 36,
        strike: 34,
        expiration: new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))),
        volatility: 0,
        riskFreeInterest: .08,
        direction: Direction.CALL,
      }).price().toFixed(8)
      assert.equal(2.673245107570324.toFixed(8), price);
    });
    it("should return a put price of 1.3267548924296761", function () {
      let price = new Warrant({
        priceUnderlying: 32,
        strike: 34,
        expiration: new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))),
        volatility: 0,
        riskFreeInterest: .08,
        direction: Direction.PUT,
      }).price().toFixed(8)
      assert.equal(1.3267548924296761.toFixed(8), price);
    });
  });
  describe("t=0, v>0, in-the-money", function () {
    it("should return a call price of 2", function () {
      let price = new Warrant({
        priceUnderlying: 36,
        strike: 34,
        expiration: new Date(),
        volatility: 0.1,
        riskFreeInterest: .08,
        direction: Direction.CALL,
      }).price().toFixed(8)
      assert.equal("2.00000000", price);
    });
    it("should return a put price of 2", function () {
      let price = new Warrant({
        priceUnderlying: 32,
        strike: 34,
        expiration: new Date(),
        volatility: 0.1,
        riskFreeInterest: .08,
        direction: Direction.PUT,
      }).price().toFixed(8)
      assert.equal("2.00000000", price);
    });
  });
  describe("t=0, v=0, in-the-money", function () {
    it("should return a call price of 2", function () {
      let price = new Warrant({
        priceUnderlying: 36,
        strike: 34,
        expiration: new Date(),
        volatility: 0,
        riskFreeInterest: .08,
        direction: Direction.CALL,
      }).price().toFixed(8)
      assert.equal("2.00000000", price);
    });
    it("should return a put price of 2", function () {
      let price = new Warrant({
        priceUnderlying: 32,
        strike: 34,
        expiration: new Date(),
        volatility: 0,
        riskFreeInterest: .08,
        direction: Direction.PUT,
      }).price().toFixed(8)
      assert.equal("2.00000000", price);
    });
  });
  describe("getW", function () {
    it("should return -1.00163142954006", function () {
      let omega = new Warrant({
        priceUnderlying: 30,
        strike: 34,
        expiration: new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (91.20833334 * 24 * 60 * 60 * 1000))),
        volatility: 0.2,
        riskFreeInterest: .08,
        direction: Direction.PUT,
      }).omega().toFixed(8)
      assert.equal((-1.00163142954006).toFixed(8), omega);
    });
  });
});
