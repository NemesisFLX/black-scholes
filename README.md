# Warrant Price and Greeks calculator


Calculates for warrents the price and greeks according to black scholes with a more human interface.

Usage:
```js
let params = {
    priceUnderlying: 130,
    strike: 130,
    expiration: new Date("04-15-2022"),
    volatility: 0.3,
    riskFreeInterest: 0.12,
    direction: Direction.PUT,
    ratio: 1
}

console.log("omega:", new Warrant(params).omega)
console.log("Price:", new Warrant(params).price)
console.log("theta:", new Warrant(params).theta)
console.log("delta:", new Warrant(params).delta)
console.log("gamma:", new Warrant(params).gamma)
console.log("rho:", new Warrant(params).rho)
console.log("vega:", new Warrant(params).vega)
```

## Caveats

American pricing is still really inaccurate.
