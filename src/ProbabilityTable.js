import Table from 'cli-table3';
import { ProbabilityCalculator } from './ProbabilityCalculator.js';

export class ProbabilityTable {
  constructor(diceList) {
    this.diceList = diceList;
  }

  render() {
    console.log('Probability of the win for the user:');
    const head = ['User dice'].concat(this.diceList.map(d => d.toString()));
    const table = new Table({ head });

    for (let i = 0; i < this.diceList.length; i++) {
      const row = [this.diceList[i].toString()];
      for (let j = 0; j < this.diceList.length; j++) {
        if (i === j) row.push('—');
        else row.push(ProbabilityCalculator.calc(this.diceList[i], this.diceList[j]));
      }
      table.push(row);
    }

    console.log(table.toString());
  }
}