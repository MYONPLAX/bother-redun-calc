import { Lang, MessageLevel } from './error/errorMessage.js';
import { calculate } from './calculate.js';
import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Formula: ', (formula) => {
  console.log(calculate(formula, MessageLevel.Full, Lang.Jpn, 64));
  rl.close();
});
