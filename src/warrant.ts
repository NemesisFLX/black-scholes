export interface IWarrant {
    riskFreeInterest: number,
    volatility: number,
    expiration: Date,
    strike: number,
    priceUnderlying: number,
    direction: Direction,
    ratio?: number
}

export enum Direction {
    CALL,
    PUT
}