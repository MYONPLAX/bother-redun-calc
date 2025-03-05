import { Lang, MessageLevel } from './error/errorMessage.js';
import { calculate } from './calculate.js';

const FORMULA = '1+1';

calculate(FORMULA, MessageLevel.Full, Lang.Jpn, 64);
