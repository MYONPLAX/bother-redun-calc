import { isDigit, isEmpty, toNumber } from './commonFunc.js';
import { reverseTokenMap, Type } from './token/Type.js';
import { ErrorNo } from './error/errorMessage.js';
import Token from './token/Token.js';
import ErrorInfo from './error/ErrorInfo.js';
import type IntfResult from './IntfResult.js';

export default class Calculator {
  private formula: Token[];
  private formulaRPN: Token[];
  private result: string;
  private readonly error: ErrorInfo;
  private readonly maxFormulaLength: number;

  constructor(level: number, language: number, maxFormulaLength: number) {
    this.formula = [];
    this.formulaRPN = [];
    this.result = '';
    this.error = new ErrorInfo(level, language);
    this.maxFormulaLength = maxFormulaLength;
  }

  public run(input: string): string {
    this.scanInput(input)
      .checkSyntax()
      .convertRPN()
      .calculateRPN()
      .removeTrailingZero();

    return this.error.hasError ? this.error.outputError() : this.result;
  }

  private catchError(error: ErrorNo, func: string): Calculator {
    this.error.setError(error, func);
    return this;
  }

  private scanInput(input: string): Calculator {
    const FUNC_NAME = 'scanInput';
    const numericBuffer: string[] = [];
    let lastToken: Token | null = null;

    // Error: Formula is empty
    if (input.length < 1) {
      return this.catchError(ErrorNo.EmptyInput, FUNC_NAME);
    }

    // Error: Formula is too long
    if (input.length > this.maxFormulaLength) {
      return this.catchError(ErrorNo.TooLongInput, FUNC_NAME);
    }

    // Scan input formula
    for (const character of input) {
      // Token is digit or decimal point
      if (isDigit(character) || character === '.') {
        numericBuffer.push(character);
        continue;
      }

      if (!isEmpty(numericBuffer)) {
        // Register numericBuffer to formula
        this.formula.push(new Token(Type.Num, numericBuffer.join('')));
        lastToken = this.formula.at(-1)!; // Update lastToken
      }

      // Token is operator or sign
      if (character === '+' || character === '-') {
        // Token is sign
        if (lastToken === null || lastToken.isBeforeSign()) {
          numericBuffer.push(character);
          continue;
        }
      }

      numericBuffer.length = 0; // Clear numericBuffer

      if (!(character === '\n' || character === ' ')) {
        const type = reverseTokenMap[character];

        if (type !== undefined) {
          this.formula.push(new Token(type));
        } else {
          return this.catchError(ErrorNo.InvalidToken, FUNC_NAME);
        }
      }
      lastToken = this.formula.at(-1)!; // update lastToken
    }

    // Formula has only number
    if (numericBuffer.length !== 0) {
      this.formula.push(new Token(Type.Num, numericBuffer.join('')));
    }
    return this;
  }

  private checkSyntax(): Calculator {
    const FUNC_NAME = 'checkSyntax';
    const formula = this.formula;
    let depth = 0;

    if (this.error.hasError) return this; // Skip this function;

    if (formula.length === 1) {
      const firstToken = formula[0];
      if (firstToken.match(Type.Num)) {
        if (!isNaN(Number(firstToken.str))) {
          this.result = firstToken.str;
          return this;
        } else {
          return this.catchError(ErrorNo.InvalidNumber, FUNC_NAME);
        }
      } else {
        return this.catchError(ErrorNo.InvalidToken, FUNC_NAME);
      }
    }

    for (const [index, token] of formula.entries()) {
      if (index === 0) {
        switch (token.type) {
          case Type.Mul:
          case Type.Div:
          case Type.Rp:
            return this.catchError(ErrorNo.InvalidTokenStart, FUNC_NAME);
          case Type.Lp:
            ++depth;
            break;
        }
        continue;
      }

      if (
        index === formula.length - 1 &&
        (token.isArithmetic() || token.match(Type.Lp))
      ) {
        return this.catchError(ErrorNo.InvalidTokenEnd, FUNC_NAME);
      }

      const prevToken = formula[index - 1];

      switch (token.type) {
        case Type.Num:
          switch (prevToken.type) {
            case Type.Rp:
              return this.catchError(
                ErrorNo.InvalidTokenBeforeNumber,
                FUNC_NAME
              );
            case Type.Num:
              return this.catchError(ErrorNo.InvalidOperator, FUNC_NAME);
          }
          break;
        case Type.Add:
        case Type.Sub:
        case Type.Mul:
        case Type.Div:
          if (prevToken.isArithmetic()) {
            return this.catchError(
              ErrorNo.InvalidTokenBeforeOperator,
              FUNC_NAME
            );
          }
          break;
        case Type.Lp:
          ++depth;
          if (prevToken.matchAll([Type.Num, Type.Rp])) {
            return this.catchError(ErrorNo.InvalidTokenBeforeLp, FUNC_NAME);
          }
          break;
        case Type.Rp:
          --depth;
          if (prevToken.match(Type.Lp)) {
            return this.catchError(ErrorNo.InvalidToken, FUNC_NAME);
          }
          break;
      }
    }

    if (!this.error.hasError && depth !== 0) {
      return this.catchError(ErrorNo.ParenthesisNotFound, FUNC_NAME);
    }
    return this;
  }

  private convertRPN(): Calculator {
    const FUNC_NAME = 'convertRPN';
    const optStack: Token[] = [];

    if (this.error.hasError) return this; // Skip this function;

    if (isEmpty(this.result)) {
      for (const token of this.formula) {
        switch (token.type) {
          case Type.Num:
            this.formulaRPN.push(token);
            break;
          case Type.Lp:
            optStack.push(token);
            break;
          case Type.Rp:
            let isRp = false;

            while (!isRp) {
              if (isEmpty(optStack)) {
                return this.catchError(ErrorNo.ParenthesisNotFound, FUNC_NAME);
              }

              if (optStack.at(-1)!.match(Type.Lp)) {
                optStack.pop();
                isRp = true;
              } else {
                this.formulaRPN.push(optStack.pop()!);
              }
            }
            break;
          case Type.Add:
          case Type.Sub:
          case Type.Mul:
          case Type.Div:
            while (
              !isEmpty(optStack) &&
              optStack.at(-1)!.isArithmetic() &&
              token.order <= optStack.at(-1)!.order
            ) {
              this.formulaRPN.push(optStack.pop()!);
            }
            optStack.push(token);
            break;
        }
      }

      while (!isEmpty(optStack)) {
        const token = optStack.pop();

        if (token!.isParenthesis()) {
          return this.catchError(ErrorNo.ParenthesisNotFound, FUNC_NAME);
        }

        this.formulaRPN.push(token!);
      }
    }
    return this;
  }

  private calculateRPN(): Calculator {
    const FUNC_NAME = 'calculateRPN';
    const operandStack: number[] = [];

    const binaryOperation = (
      y: number,
      x: number,
      operator: Token
    ): IntfResult<number, ErrorNo> => {
      switch (operator.type) {
        case Type.Add:
          return { Ok: x + y };
        case Type.Sub:
          return { Ok: x - y };
        case Type.Mul:
          return { Ok: x * y };
        case Type.Div:
          return y === 0 ? { Err: ErrorNo.ZeroDivide } : { Ok: x / y };
        default:
          return { Err: ErrorNo.InvalidOperator };
      }
    };

    /**
     * Calculate length of after decimal separator.
     * @param numeric Number to be measured
     * @returns Length of after decimal separator
     */
    const afterDSLength = (numeric: number): number => {
      const DS_LENGTH = 1; // Length of decimal separator (DS)
      const str = Math.abs(numeric).toString(); // Remove minus sign
      const integerLength = str.indexOf('.') + DS_LENGTH; // Length of integer and DS
      return str.includes('.') ? str.length - integerLength : 0; // Length of after DS
    };

    const checkScale = (numeric: number, scale: number): string =>
      afterDSLength(numeric) > scale
        ? numeric.toFixed(scale)
        : numeric.toString();

    if (this.error.hasError) return this; // Skip this function;

    if (isEmpty(this.result)) {
      for (const token of this.formulaRPN) {
        if (token.isArithmetic()) {
          const result = binaryOperation(
            operandStack.pop()!,
            operandStack.pop()!,
            token
          );
          if (result.Ok !== undefined) {
            operandStack.push(result.Ok);
            if (isNaN(result.Ok)) {
              return this.catchError(ErrorNo.InvalidResult, FUNC_NAME);
            }
          } else if (result.Err !== undefined) {
            return this.catchError(result.Err, FUNC_NAME);
          }
        } else if (token.match(Type.Num)) {
          const result = toNumber(token.str);
          if (result.Ok !== undefined) {
            operandStack.push(result.Ok);
          } else {
            return this.catchError(ErrorNo.InvalidNumber, FUNC_NAME);
          }
        }
      }
      this.result = checkScale(operandStack.pop()!, 10);
    }
    return this;
  }

  private removeTrailingZero(): Calculator {
    const rawResult = this.result;

    if (this.error.hasError) return this; // Skip this function;

    if (rawResult.includes('.')) {
      const resultVec: string[] = rawResult.split('');

      // Remove trailing 0
      while (resultVec.at(-1) === '0') resultVec.pop();

      // Remove trailing .
      if (resultVec.at(-1) === '.') resultVec.pop();

      this.result = resultVec.join('');
    }
    return this;
  }
}
