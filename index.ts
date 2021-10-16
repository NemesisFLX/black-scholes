import { Time } from './src/time'
import { Statistics } from './src/statistics'
import { IWarrant, Direction} from './src/warrant'
export { Direction } from './src/warrant'

export class Warrant {
  private warrant: IWarrant;

  public price : number;
  public omega : number;
  public theta : number;
  public vega : number;
  public rho : number;
  public gamma : number;
  public delta : number;

  constructor(warrant: IWarrant) {
    this.warrant = warrant
    this.price = this._price()
    this.omega = this._omega()
  }

  // https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model#Black-Scholes_formula
  private _price(): number {
    let time = Time.untilExpiry(this.warrant.expiration)
    let d1 = this.d1()
    if (this.warrant.direction === Direction.CALL) {
      return this.warrant.priceUnderlying * Statistics.normCDF(d1) - this.warrant.strike * Math.pow(Math.E, -1 * this.warrant.riskFreeInterest * time) * Statistics.normCDF(d1 - this.warrant.volatility * Math.sqrt(time));
    } else {
      return this.warrant.strike * Math.pow(Math.E, -1 * this.warrant.riskFreeInterest * time) * Statistics.normCDF(this.warrant.volatility * Math.sqrt(time) - d1) - this.warrant.priceUnderlying * Statistics.normCDF(-d1);
    }
  }

  private d1(): number {
    let time = Time.untilExpiry(this.warrant.expiration)
    return (this.warrant.riskFreeInterest * time + Math.pow(this.warrant.volatility, 2) * time / 2 + Math.log(this.warrant.priceUnderlying / this.warrant.strike)) / (this.warrant.volatility * Math.sqrt(time));
  }

  private _omega(): number {
    return Statistics.normCDF(this.d1()) * (this.warrant.priceUnderlying / this.price)
  }

}
