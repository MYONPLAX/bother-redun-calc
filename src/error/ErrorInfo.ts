import { inRangeAB } from '../commonFunc.js';
import { ErrorNo, getMessage, Lang, MessageLevel } from './errorMessage.js';

export default class ErrorInfo {
  public hasError: boolean;
  public errorNumber: ErrorNo;
  public errorFunction: string;
  private readonly messageLevel: MessageLevel;
  private readonly messageLang: Lang;

  constructor(messageLevel: number, language: Lang) {
    const getLevel = (): MessageLevel => {
      switch (messageLevel) {
        case MessageLevel.Simple:
        case MessageLevel.Medium:
        case MessageLevel.Full:
          return messageLevel;
        default:
          return MessageLevel.Minimum;
      }
    };

    const getLanguage = (): Lang => {
      switch (language) {
        case Lang.Eng:
        case Lang.Jpn:
          return language;
        default:
          return Lang.Eng;
      }
    };

    this.hasError = false;
    this.errorNumber = 0;
    this.errorFunction = '';
    this.messageLevel = getLevel();
    this.messageLang = getLanguage();
  }

  private getMessageText(messageIndex: number): string {
    return getMessage(messageIndex, this.messageLang, this.messageLevel);
  }

  private generateMessage(
    messageIndex: number,
    includeErrorNumber: boolean,
    includeFunction: boolean
  ): string {
    const messageText = this.getMessageText(messageIndex);

    const getBaseMessage = (): string => {
      switch (this.messageLang) {
        case Lang.Eng:
          return this.messageLevel === MessageLevel.Minimum
            ? 'Error'
            : 'Error ';
        case Lang.Jpn:
          return 'エラー';
      }
    };

    const errorPart: string = includeErrorNumber
      ? `${this.errorNumber}: ${messageText}`
      : `: ${messageText}`;

    const functionPart: string = includeFunction
      ? ` [function ${this.errorFunction}()]`
      : '';

    return `${getBaseMessage()}${errorPart}${functionPart}`;
  }

  private getSimpleMessage(): string {
    const getMessageIndex = (): number => {
      const errorNumber = this.errorNumber;

      if (inRangeAB(errorNumber, ErrorNo.EmptyInput, ErrorNo.TooLongInput)) {
        return 1;
      } else if (
        inRangeAB(
          errorNumber,
          ErrorNo.InvalidToken,
          ErrorNo.ParenthesisNotFound
        )
      ) {
        return 2;
      } else if (errorNumber === ErrorNo.ZeroDivide) {
        return 3;
      } else {
        return 0;
      }
    };

    return this.generateMessage(getMessageIndex(), false, false);
  }

  private getMediumMessage(): string {
    const getMessageIndex = (): number => {
      const errorNumber = this.errorNumber;

      if (
        inRangeAB(
          errorNumber,
          ErrorNo.InvalidToken,
          ErrorNo.InvalidTokenBeforeLp
        )
      ) {
        return 3;
      } else if (
        inRangeAB(errorNumber, ErrorNo.EmptyInput, ErrorNo.ZeroDivide)
      ) {
        return errorNumber;
      } else {
        return 0;
      }
    };

    return this.generateMessage(getMessageIndex(), true, false);
  }

  private getFullMessage(): string {
    return this.generateMessage(this.errorNumber, true, true);
  }

  private getMinimumMessage(): string {
    return this.getMessageText(0);
  }

  public outputError(): string {
    switch (this.messageLevel) {
      case MessageLevel.Simple:
        return this.getSimpleMessage();
      case MessageLevel.Medium:
        return this.getMediumMessage();
      case MessageLevel.Full:
        return this.getFullMessage();
      case MessageLevel.Minimum:
        return this.getMinimumMessage();
      default:
        return this.getMinimumMessage();
    }
  }

  public setError(error: ErrorNo, func: string) {
    this.errorNumber = error;
    this.errorFunction = func;
    this.hasError = true;
  }
}
