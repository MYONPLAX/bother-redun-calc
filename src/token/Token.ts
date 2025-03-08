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

  public matchAll(types: Type[]): boolean {
    return new Set(types).has(this.type);
  }

  public isSign() {
    return this.matchAll([Type.Add, Type.Sub]);
  }

  public isBeforeSign() {
    return this.matchAll([Type.Add, Type.Sub, Type.Mul, Type.Div, Type.Lp]);
  }

  public isArithmetic() {
    return this.matchAll([Type.Add, Type.Sub, Type.Mul, Type.Div]);
  }

  public isParenthesis() {
    return this.matchAll([Type.Lp, Type.Rp]);
  }
}
