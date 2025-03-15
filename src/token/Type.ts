export enum Type {
  Add,
  Sub,
  Mul,
  Div,
  Lp,
  Rp,
  Num,
}

export const tokenMap: Record<Type, string | ((numeric?: string) => string)> = {
  [Type.Add]: '+',
  [Type.Sub]: '-',
  [Type.Mul]: '*',
  [Type.Div]: '/',
  [Type.Lp]: '(',
  [Type.Rp]: ')',
  [Type.Num]: (numeric?: string) => numeric ?? '0',
};

export const reverseTokenMap: Record<string, Type> = Object.fromEntries(
  Object.entries(tokenMap)
    .filter(([__dirname, value]) => typeof value === 'string')
    .map(([key, value]) => [value, Number(key) as Type])
);

export const orderMap: Record<Type, number> = {
  [Type.Num]: 0,
  [Type.Add]: 1,
  [Type.Sub]: 1,
  [Type.Mul]: 2,
  [Type.Div]: 2,
  [Type.Lp]: 3,
  [Type.Rp]: 3,
};
