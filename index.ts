import { Time } from './src/time'
import { Statistics } from './src/statistics'
import { IWarrant, Direction} from './src/warrant'
export { Direction } from './src/warrant'

export class Warrant {
  private warrant: IWarrant;

  constructor(warrant: IWarrant) {
    this.warrant = warrant
  }


  price(): number {
    let time = Time.untilExpiry(this.warrant.expiration)
    var omega = this.omega()
    if (this.warrant.direction === Direction.CALL) {
      return this.warrant.priceUnderlying * Statistics.normCDF(omega) - this.warrant.strike * Math.pow(Math.E, -1 * this.warrant.riskFreeInterest * time) * Statistics.normCDF(omega - this.warrant.volatility * Math.sqrt(time));
    } else {
      return this.warrant.strike * Math.pow(Math.E, -1 * this.warrant.riskFreeInterest * time) * Statistics.normCDF(this.warrant.volatility * Math.sqrt(time) - omega) - this.warrant.priceUnderlying * Statistics.normCDF(-omega);
    }
  }

  omega(): number {
    let time = Time.untilExpiry(this.warrant.expiration)
    return (this.warrant.riskFreeInterest * time + Math.pow(this.warrant.volatility, 2) * time / 2 - Math.log(this.warrant.strike / this.warrant.priceUnderlying)) / (this.warrant.volatility * Math.sqrt(time));
  }

}
