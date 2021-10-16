import { Direction, Warrant } from '..';

const amount = Number(process.env.AMOUNT) || 10000

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
    strike: 13675,
    expiration: new Date("06-16-2023"),
    volatility: 0.2141,
    riskFreeInterest: 0.00,
    direction: Direction.CALL,
}

console.log(new Warrant(params).omega)
console.log(new Warrant(params).price)
console.log("---------------- Benchmark Price | Started ----------")