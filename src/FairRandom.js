import { HMACGenerator } from './HMACGenerator.js';
import readlineSync from 'readline-sync';
export class FairRandom {
  constructor(range) {
    this.range = range;
    this.hmacGen = new HMACGenerator();
  }
  async generate(label = '') {
    const compNumber = this.hmacGen.generateRandomInt(this.range);
    const key = this.hmacGen.generateKey();
    const hmac = this.hmacGen.generateHMAC(key, compNumber);
    console.log(`I selected a random value in the range 0..${this.range - 1} (HMAC=${hmac})`);
    const choices = [...Array(this.range).keys()].map(n => `${n} - ${n}`);
    choices.push('X - exit', '? - help');
    const userInput = readlineSync.question(`Add your number modulo ${this.range} (${label}):
${choices.join('\n')}\nYour selection: `);
    if (userInput.toUpperCase() === 'X') process.exit(0);
    if (userInput === '?') return { help: true };
    const userNumber = parseInt(userInput, 10);
    if (isNaN(userNumber) || userNumber < 0 || userNumber >= this.range) throw new Error('Invalid input.');
    const result = (compNumber + userNumber) % this.range;
    console.log(`My number is ${compNumber} (KEY=${key})`);
    console.log(`The fair number generation result is ${compNumber} + ${userNumber} = ${result} (mod ${this.range})`);
    return { result };
  }
}
