/**
 * Black-Scholes option pricing formula and supporting statistical functions.
 * @module black-scholes
 * @author Matt Loppatto <mattloppatto@gmail.com>
 * @copyright 2014 Matt Loppatto
 */


const sqrt2PI = Math.sqrt(2 * Math.PI);



export module BlackScholes {
  
  export enum Direction {
    CALL,
    PUT
  }

  /**
   * Standard normal cumulative distribution function.  The probability is estimated
   * by expanding the CDF into a series using the first 100 terms.
   * See {@link http://en.wikipedia.org/wiki/Normal_distribution#Cumulative_distribution_function|Wikipedia page}.
   *
   * @param {number} x The upper bound to integrate over.  This is P{Z <= x} where Z is a standard normal random variable.
   * @returns {number} The probability that a standard normal random variable will be less than or equal to x
   */
  export function stdNormCDF(x: number) : number {
    if (x >= 8) return 1;
    if (x <= -8) return 0;
    let xx = x * x;
    let probability = 0;
    let n = x;
    let d = 1;
    for (let i = 3; i <= 199; i += 2) {
      let prev = probability;
      probability += n / d;
      if (prev === probability) break;
      n *= xx;
      d *= i;
    }
    probability *= Math.exp(-0.5 * xx);
    probability /= sqrt2PI;
    probability += 0.5;
    return probability;
  }

  /**
   * Black-Scholes option pricing formula.
   * See {@link http://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model#Black-Scholes_formula|Wikipedia page}
   * for pricing puts in addition to calls.
   *
   * @param   {number} s            Current price of the underlying
   * @param   {number} k            Strike price
   * @param   {number} t            Time to experiation in years
   * @param   {number} v            Volatility as a decimal
   * @param   {number} r            Anual risk-free interest rate as a decimal
   * @param   {Direction} direction The type of option to be priced - "call" or "put"
   * @returns {number}              Price of the option
   */
  export function blackScholes(s: number, k: number, t: number, v: number, r: number, direction: Direction) : number{
    var w = (r * t + Math.pow(v, 2) * t / 2 - Math.log(k / s)) / (v * Math.sqrt(t));
    if (direction === Direction.CALL) {
      return s * stdNormCDF(w) - k * Math.pow(Math.E, -1 * r * t) * stdNormCDF(w - v * Math.sqrt(t));
    } else {
      return k * Math.pow(Math.E, -1 * r * t) * stdNormCDF(v * Math.sqrt(t) - w) - s * stdNormCDF(-w);
    }
  }

  /**
   * Calcuate omega as defined in the Black-Scholes formula.
   *
   * @param   {number} s Current price of the underlying
   * @param   {number} k Strike price
   * @param   {number} t Time to experiation in years
   * @param   {number} v Volatility as a decimal
   * @param   {number} r Anual risk-free interest rate as a decimal
   * @returns {number} The value of omega
   */
  export function getW(s: number, k: number, t: number, v: number, r: number) : number{
    return (r * t + Math.pow(v, 2) * t / 2 - Math.log(k / s)) / (v * Math.sqrt(t));
  }
}








