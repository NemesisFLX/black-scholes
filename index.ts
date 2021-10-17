import { Time } from './src/time'
import { Statistics } from './src/statistics'
import { IWarrant, Direction} from './src/warrant'
export { Direction } from './src/warrant'

export class Warrant {
  private warrant: IWarrant;

  private _price : number;
  public omega : number;
  public theta : number;
  public vega : number;
  public rho : number;
  public gamma : number;
  public delta : number;
  private d1 : number;
  private time : number;

  public get price() {
    return this._price * this.warrant.ratio;
  }

  constructor(warrant: IWarrant) {
    this.warrant = warrant
    this.warrant.ratio = this.warrant.ratio ?? 1
    this.time = Time.untilExpiry(this.warrant.expiration)
    this.d1 = this._d1()
    this._price = this._createPrice()
    this.omega = this._omega()
    this.theta = this._theta()
    this.vega = this._vega()
    this.rho = this._rho()
    this.gamma = this._gamma()
    this.delta = this._delta()
  }

  // https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model#Black-Scholes_formula
  private _createPrice(): number {
    if (this.warrant.direction === Direction.CALL) {
      return this.warrant.priceUnderlying * Statistics.norm.cdf(this.d1) - this.warrant.strike * Math.pow(Math.E, -1 * this.warrant.riskFreeInterest * this.time) * Statistics.norm.cdf(this.d1 - this.warrant.volatility * Math.sqrt(this.time));
    } else {
      return this.warrant.strike * Math.pow(Math.E, -1 * this.warrant.riskFreeInterest * this.time) * Statistics.norm.cdf(this.warrant.volatility * Math.sqrt(this.time) - this.d1) - this.warrant.priceUnderlying * Statistics.norm.cdf(-this.d1);
    }
  }

  private _d1(): number {
    return (this.warrant.riskFreeInterest * this.time + Math.pow(this.warrant.volatility, 2) * this.time / 2 + Math.log(this.warrant.priceUnderlying / this.warrant.strike)) / (this.warrant.volatility * Math.sqrt(this.time));
  }

  private _omega(): number {
    if(Direction.CALL === this.warrant.direction)
      return Statistics.norm.cdf(this.d1) * (this.warrant.priceUnderlying / this._price)
    if(Direction.PUT === this.warrant.direction)
      return Statistics.norm.cdf((this.d1) - 1) * (this.warrant.priceUnderlying / this._price)
  }

  private _theta(): number {
    if(Direction.CALL === this.warrant.direction)
      return (-1 * ((this.warrant.priceUnderlying * Statistics.norm.pdf(this.d1) * this.warrant.volatility)/(2 * Math.sqrt(this.time))) -  this.warrant.riskFreeInterest * this.warrant.strike * Math.pow(Math.E, -1 * this.warrant.riskFreeInterest * this.time) * Statistics.norm.cdf(this.d1 - this.warrant.volatility * Math.sqrt(this.time))) * this.warrant.ratio /365 
      
    if(Direction.PUT === this.warrant.direction)
      return (-1 * ((this.warrant.priceUnderlying * Statistics.norm.pdf(this.d1) * this.warrant.volatility)/(2 * Math.sqrt(this.time))) +  this.warrant.riskFreeInterest * this.warrant.strike * Math.pow(Math.E, -1 * this.warrant.riskFreeInterest * this.time) * Statistics.norm.cdf(-(this.d1 - this.warrant.volatility * Math.sqrt(this.time)))) * this.warrant.ratio /365
  }

  private _vega(): number {
    return ((this.warrant.priceUnderlying * Statistics.norm.pdf(this.d1) * Math.sqrt(this.time)) * this.warrant.ratio)/100
  }

  private _rho(): number {
    if(Direction.CALL === this.warrant.direction)
      return (this.time * this.warrant.strike * Math.pow(Math.E, -1 * this.warrant.riskFreeInterest * this.time) * Statistics.norm.cdf(this.d1 - this.warrant.volatility * Math.sqrt(this.time))) * this.warrant.ratio /100
      
    if(Direction.PUT === this.warrant.direction)
      return (-1 * this.time * this.warrant.strike * Math.pow(Math.E, -1 * this.warrant.riskFreeInterest * this.time) * Statistics.norm.cdf(-(this.d1 - this.warrant.volatility * Math.sqrt(this.time)))) * this.warrant.ratio /100
  }

  private _gamma(): number {
    return Statistics.norm.pdf(this.d1) / (this.warrant.priceUnderlying * this.warrant.volatility * Math.sqrt(this.time))
  }

  private _delta(): number {
    return Statistics.norm.cdf(this.d1)
  }
}
