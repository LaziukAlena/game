import readlineSync from 'readline-sync';
import { ProbabilityTable } from './ProbabilityTable.js';
export class CLI {
  static menu(prompt, options, diceList) {
    console.log(prompt);
    options.forEach((opt, i) => console.log(`${i} - ${opt}`));
    console.log('X - exit');
    console.log('? - help');
    const ans = readlineSync.question('Your selection: ').trim();
    if (ans.toUpperCase() === 'X') process.exit(0);
    if (ans === '?') {
      const table = new ProbabilityTable(diceList);
      table.render();
      return this.menu(prompt, options, diceList);
    }
    const index = parseInt(ans, 10);
    if (isNaN(index) || index < 0 || index >= options.length) throw new Error('Invalid selection.');
    return index;
  }
}