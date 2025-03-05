import type IntfResult from './IntfResult.js';

/**
 * Evaluate the number is in range.
 * @param x Number which evaluated
 * @param above `x >= above`
 * @param below `x <= below`
 * @returns `above` <= `x` <= `below` or not
 */
export const inRangeAB = (x: number, above: number, below: number): boolean =>
  x >= above && x <= below;

/**
 * Evaluate the character is digit (0-9).
 * @param character Character which evaluated
 * @returns Character is digit or not
 */
export const isDigit = (character: string): boolean =>
  character !== ' ' && inRangeAB(Number(character), 0, 9) ? true : false;

/**
 * Detect vector or string is empty.
 * @param vector Vector `T[]` or `string`
 * @returns Vector is empty or not
 */
export const isEmpty = <T>(vector: T[] | string): boolean =>
  vector.length === 0;

/**
 * Convert `string` to `number`.
 * @param str String which want to convert number;
 * @returns Ok => Converted number or `undefined`
 */
export const toNumber = (str: string): IntfResult<number, undefined> => {
  const num = Number(str);
  return isNaN(num) ? {} : { Ok: num };
};
