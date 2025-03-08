import { orderMap, tokenMap, Type } from './Type.js';

export default class Token {
  public readonly str: string;
  public readonly order: number;

  constructor(
    public readonly type: Type,
    numeric?: string
  ) {
    const token = tokenMap[type];
    this.str = typeof token === 'function' ? token(numeric) : token;
    this.order = orderMap[type];
  }

  public match(type: Type): boolean {
    return this.type === type;
  }

  public matchAll(types: Set<Type>): boolean {
    return types.has(this.type);
  }

  public isSign() {
    return this.matchAll(new Set([Type.Add, Type.Sub]));
  }

  public isArithmetic() {
    return this.matchAll(new Set([Type.Add, Type.Sub, Type.Mul, Type.Div]));
  }

  public isParenthesis() {
    return this.matchAll(new Set([Type.Lp, Type.Rp]));
  }
}
