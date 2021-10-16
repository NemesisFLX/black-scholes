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
    priceUnderlying: 15595.08,
    strike: 14425,
    expiration: new Date("12-17-2021"),
    volatility: 0.2067,
    riskFreeInterest: 0.0,
    direction: Direction.CALL,
    ratio: .01
}

console.log(new Warrant(params).omega)
console.log(new Warrant(params).price)
console.log(new Warrant(params).theta)
console.log(new Warrant(params).delta)
console.log(new Warrant(params).gamma)
console.log(new Warrant(params).rho)
console.log(new Warrant(params).vega)
console.log("---------------- Benchmark Price | Started ----------")