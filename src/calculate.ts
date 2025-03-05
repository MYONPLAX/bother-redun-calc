import Calculator from './Calculator.js';

export const calculate = (
  formula: string,
  errorLevel: number,
  errorLang: number,
  maxFromulaLength: number
): string =>
  new Calculator(errorLevel, errorLang, maxFromulaLength).run(formula);
