import { Dice } from './Dice.js';
export class DiceParser {
  parse(args) {
    if (args.length < 3) throw new Error('You must provide at least 3 dice.');
    return args.map((str, i) => {
      const nums = str.split(',').map(Number);
      if (nums.length < 2 || nums.some(n => !Number.isInteger(n))) {
        throw new Error(`Dice #${i} is invalid. Each dice must have integers separated by commas.`);
      }
      return new Dice(nums);
    });
  }
}