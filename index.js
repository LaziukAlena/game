import { DiceParser } from './src/DiceParser.js';
import { Game } from './src/Game.js';
import { ProbabilityTable } from './src/ProbabilityTable.js';

try {
  const args = process.argv.slice(2);
  const parser = new DiceParser();
  const diceList = parser.parse(args);
  const game = new Game(diceList);
  await game.start();

  const table = new ProbabilityTable(diceList);
  table.render();
} catch (e) {
  console.log(`Error: ${e.message}`);
  console.log('Example: node index.js "2,2,4,4,9,9" "1,1,6,6,8,8" "3,3,5,5,7,7"');
}