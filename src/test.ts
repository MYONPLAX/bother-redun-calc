import { calculate } from './calculate.js';

interface IntfTestFormula {
  form: string;
  answer: string;
}

function test() {
  const testFormula: IntfTestFormula[] = [
    { form: '1+2*3-4', answer: '3' },
    { form: '1-2+3*4', answer: '11' },
    { form: '1.0+1.0+1.0', answer: '3' },
    { form: '1/3', answer: '0.3333333333' },
    { form: '5', answer: '5' },
    { form: '3.000000000000000000', answer: '3' },
    { form: '1 + 3.1415926535897932', answer: '4.1415926536' },
    { form: '12+34-5*6/2', answer: '31' },
    { form: '7*(2+3)', answer: '35' },
    { form: '8/4+6-3', answer: '5' },
    { form: '9-3+2*5', answer: '16' },
    { form: '0.5*10+2.5', answer: '7.5' },
    { form: '10/4*2', answer: '5' },
    { form: '(3+7)/2', answer: '5' },
    { form: '1.5+2.5*2', answer: '6.5' },
    { form: '(10-3)*3', answer: '21' },
    { form: '100/5-7*2', answer: '6' },
    { form: '2*(3+4*(5-2))', answer: '30' },
    { form: '3.3+4.4-5.5', answer: '2.2' },
    { form: '6/4/2', answer: '0.75' },
    { form: '4*(2+3)/5', answer: '4' },
    { form: '7-2*(3+1)', answer: '-1' },
    { form: '8+9-10/2', answer: '12' },
    { form: '5*(3+2.0)', answer: '25' },
    { form: '1.234+5.678', answer: '6.912' },
    { form: '(12.5-2.5)*2', answer: '20' },
    { form: '9/2+0.5', answer: '5' },
    { form: '18/4', answer: '4.5' },
    { form: '100-99.9', answer: '0.1' },
    { form: '3*(4+5)/2', answer: '13.5' },
    { form: '(3+5)*(2-1)', answer: '8' },
    { form: '2+2+2+2+2', answer: '10' },
    { form: '10-2-3', answer: '5' },
    { form: '50/2/5', answer: '5' },
    { form: '(1+2)*(3+4)', answer: '21' },
    { form: '5+6*7-8/4', answer: '45' },
    { form: '3.5+4.5*2', answer: '12.5' },
    { form: '7*(2+3.5)-1', answer: '37.5' },
    { form: '8/3', answer: '2.6666666667' },
    { form: '9.9-1.1', answer: '8.8' },
    { form: '100/3', answer: '33.3333333333' },
    { form: '(50-25)*2', answer: '50' },
    { form: '6+6/6', answer: '7' },
    { form: '5*(5-3)+2', answer: '12' },
    { form: '3*(2+1.5)', answer: '10.5' },
    { form: '7/2*4', answer: '14' },
    { form: '(8+2)/((3-1)*2)', answer: '2.5' },
    { form: '9*(2+1)/3', answer: '9' },
    { form: '4.2-2.1+1.05', answer: '3.15' },
    { form: '0.123+0.877', answer: '1' },
    { form: '(1+2+3)*4', answer: '24' },
    { form: '8/(2+2)', answer: '2' },
    { form: '10*(1+1.5)', answer: '25' },
    { form: '3+3+3+3/3', answer: '10' },
    { form: '4*5-6/3', answer: '18' },
    { form: '(7+3)*((2+3)/5)', answer: '10' },
    { form: '9-3*(2+1)', answer: '0' },
    { form: '1.5*4/2', answer: '3' },
    { form: '7+8/2-3', answer: '8' },
    { form: '(2+3)*(4-1)', answer: '15' },
    { form: '0.5*(10-2)', answer: '4' },
    { form: '6/0.5', answer: '12' },
    { form: '2.5+2.5+5', answer: '10' },
    { form: '15/2-1', answer: '6.5' },
    { form: '(10+5)/3', answer: '5' },
    { form: '100/10*3', answer: '30' },
    { form: '7*(3+2)-5', answer: '30' },
    { form: '9.9/3.3', answer: '3' },
    { form: '8-3+2*2', answer: '9' },
    { form: '(6+4)/5+7', answer: '9' },
    { form: '12/7', answer: '1.7142857143' },
    { form: '3.6+4.4', answer: '8' },
    { form: '5*5-5*4', answer: '5' },
    { form: '6+7-8+9', answer: '14' },
    { form: '(8+2)*3.5', answer: '35' },
    { form: '4-5+6-7+8', answer: '6' },
    { form: '2*(2*(2*(2+1)))', answer: '24' },
    { form: '9*(3+2)/((1+1)*2)', answer: '11.25' },
    { form: '8/2+3*1.5', answer: '8.5' },
    { form: '14-3*2+4/2', answer: '10' },
    { form: '(15-5)/(2+3)', answer: '2' },
    { form: '6*(2+3.5)-4', answer: '29' },
    { form: '0.9*10+1', answer: '10' },
    { form: '7/3+2.3333333333', answer: '4.6666666666' },
  ];

  testFormula.forEach((test) => {
    console.log(`🧮 Testing: ${test.form}`);
    const result = calculate(test.form, 3, 2, 64);
    const answerCheck = result === test.answer ? '✅' : '❌';
    console.log(`${answerCheck} Answer: ${test.answer}, Result: ${result}\n`);
  });
}

test();
