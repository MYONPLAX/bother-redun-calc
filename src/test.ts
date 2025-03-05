import { calculate } from './calculate.js';

interface IntfTestFormula {
  form: string;
  result: string;
}

function test() {
  const testFormula: IntfTestFormula[] = [
    { form: '1+2*3-4', result: '3' },
    { form: '1-2+3*4', result: '11' },
    { form: '1.0+1.0+1.0', result: '3' },
    { form: '1/3', result: '0.3333333333' },
    { form: '5', result: '5' },
    { form: '3.000000000000000000', result: '3' },
    { form: '1 + 3.1415926535897932', result: '4.141592654' },
  ];

  testFormula.forEach((test) => {
    console.log(`Testing: ${test.form}`);
    const result = calculate(test.form, 3, 2, 64);
    const resultCheck = result === test.result ? '✅' : '❌';
    console.log(`${resultCheck} Expected: ${test.result}, Result: ${result}\n`);
  });
}

test();
