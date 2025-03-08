import type IntfMessage from './IntfErrorMessage.js';

export enum MessageLevel {
  Minimum = 0,
  Simple = 1,
  Medium = 2,
  Full = 3,
}

export enum Lang {
  Eng = 0,
  Jpn = 1,
}

export enum ErrorNo {
  Unknown = 0,
  EmptyInput = 1,
  TooLongInput = 2,
  InvalidToken = 3,
  InvalidTokenStart = 4,
  InvalidTokenEnd = 5,
  InvalidTokenBeforeNumber = 6,
  InvalidTokenBeforeOperator = 7,
  InvalidTokenBeforeLp = 8,
  InvalidNumber = 9,
  InvalidOperator = 10,
  ParenthesisNotFound = 11,
  ZeroDivide = 12,
  InvalidResult = 13,
}

// prettier-ignore
const ERROR_MESSAGE = {
  SIMPLE: [
    { eng: "Unknown error", jpn: "未知のエラー" }, // Index 0 (errorNo: _)
    { eng: "Input error", jpn: "入力エラー" }, // Index 1 (errorNo: 1-2)
    { eng: "Syntax error", jpn: "構文エラー" }, // Index 2 (errorNo: 3-11)
    { eng: "Calculate error", jpn: "計算エラー" }, // Index 3 (errorNo: 12-13)
  ] as IntfMessage[],
  MEDIUM: [
    { eng: "Unknown error", jpn: "未知のエラーです" }, // Index 0 (errorNo: _)
    { eng: "Input is empty", jpn: "式を入力してください" }, // Index 1 (errorNo: 1)
    { eng: "Input is too long", jpn: "式が長すぎます" }, // Index 2 (errorNo: 2)
    { eng: "Invalid token", jpn: "無効な文字があります" }, // Index 3 (errorNo: 3-8)
    { eng: "Invalid number", jpn: "無効な数値があります" }, // Index 4 (errorNo: 9)
    { eng: "Invalid operator", jpn: "無効な演算子があります" }, // Index 5 (errorNo: 10)
    { eng: "() is not found", jpn: "対応する () がありません" }, // Index 6 (errorNo: 11)
    { eng: "Zero divide", jpn: "ゼロ除算はできません" }, // Index 7 (errorNo: 12)
    { eng: "Invalid Result", jpn: "計算結果が無効です" }, // Index 8 (errorNo: 13)
  ] as IntfMessage[],
  FULL: [
    { eng: "Unknown error", jpn: "未知のエラーです" }, // Index 0 (errorNo: _)
    { eng: "Input is empty", jpn: "式を入力してください" }, // Index 1 (errorNo: 1)
    { eng: "Input is too long", jpn: "式が長すぎます" }, // Index 2 (errorNo: 2)
    { eng: "Invalid token", jpn: "無効な文字が入っています" }, // Index 3 (errorNo: 3)
    { eng: "Invalid token at start", jpn: "先頭に無効な文字が入っています"}, // Index 4 (errorNo: 4)
    { eng: "Invalid token at end", jpn: "末尾に無効な文字が入っています" }, // Index 5 (errorNo: 5)
    { eng: "Invalid token before number", jpn: "数値の前に無効な文字が入っています" }, // Index 6 (errorNo: 6)
    { eng: "Invalid token before operator", jpn: "演算子の前に無効な文字が入っています" }, // Index 7 (errorNo: 7)
    { eng: "Invalid token before (", jpn: "( の前に無効な文字が入っています" }, // Index 8 (errorNo: 8)
    { eng: "Invalid number", jpn: "この数値は無効です" }, // Index 9 (errorNo: 9)
    { eng: "Invalid operator", jpn: "この演算子は使用できません" }, // Index 10 (errorNo: 10)
    { eng: "() is not found", jpn: "対応する () が見つかりません" }, // Index 11 (errorNo: 11)
    { eng: "Zero divide", jpn: "ゼロ除算はできません" }, // Index 12 (errorNo: 12)
    { eng: "Result is not a number", jpn: "計算結果が数値ではありません" }, // Index 13 (errorNo: 13)
  ] as IntfMessage[],
  MINIMUM: [{ eng: "Error", jpn: "エラー" }] as IntfMessage[],
} as const;

export function getMessage(
  messageIndex: number,
  errorLang: Lang,
  messageLevel: MessageLevel
): string {
  const getMessage = (level: MessageLevel): IntfMessage[] => {
    switch (level) {
      case MessageLevel.Simple:
        return ERROR_MESSAGE.SIMPLE;
      case MessageLevel.Medium:
        return ERROR_MESSAGE.MEDIUM;
      case MessageLevel.Full:
        return ERROR_MESSAGE.FULL;
      case MessageLevel.Minimum:
        return ERROR_MESSAGE.MINIMUM;
      default:
        return ERROR_MESSAGE.MINIMUM;
    }
  };

  const extractMessage = (lang: Lang, message: IntfMessage): string => {
    switch (lang) {
      case Lang.Eng:
        return message.eng;
      case Lang.Jpn:
        return message.jpn;
      default:
        return ERROR_MESSAGE.MINIMUM[0].eng;
    }
  };

  const messages = getMessage(messageLevel);
  const index = messageIndex < messages.length ? messageIndex : 0;

  return extractMessage(errorLang, messages[index]);
}
