import { Type } from './Type.js';

export default class Token {
  constructor(
    public readonly str: string,
    public readonly type: Type,
    public readonly order: number
  ) {}

  public match(type: Type): boolean {
    return this.type === type;
  }

  public matchAll(types: Set<Type>): boolean {
    return types.has(this.type);
  }

  public isArithmetic() {
    return this.matchAll(new Set([Type.Add, Type.Sub, Type.Mul, Type.Div]));
  }

  public isParenthesis() {
    return this.matchAll(new Set([Type.Lp, Type.Rp]));
  }
}
