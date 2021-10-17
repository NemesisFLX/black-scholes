import { Direction, Warrant } from '..';

const amount = Number(process.env.AMOUNT) || 100000

console.log("--------------- Benchmark Price | Finished ----------")
console.log("------------------ " + amount + " calculations ---------------")

console.time("Warrant Price")
for (let i = 0; i < amount; i++) {
    let price = new Warrant({
        priceUnderlying: Math.random() * 50,
        strike: Math.random() * 50,
        expiration: new Date((new Date()).setMilliseconds((new Date()).getMilliseconds() + (180 * 24 * 60 * 60 * 1000))),
        volatility: Math.random(),
        riskFreeInterest: Math.random(),
        direction: Math.random() >= 0.5 ? Direction.CALL : Direction.PUT,
    }).price
}
console.timeEnd("Warrant Price")

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
console.log("---------------- Benchmark Price | Started ----------")