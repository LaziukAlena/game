import { CLI } from './CLI.js';
import { FairRandom } from './FairRandom.js';
export class Game {
  constructor(diceList) {
    this.diceList = diceList;
  }
  async start() {
    const fair = new FairRandom(2);
    console.log("Let's determine who makes the first move.");
    const { result } = await fair.generate('first move');
    const compFirst = result === 1;
    console.log(compFirst ? 'I make the first move.' : 'You make the first move.');
    const availableDice = [...this.diceList];
    const firstIndex = compFirst
      ? Math.floor(Math.random() * availableDice.length)
      : CLI.menu('Choose your dice:', availableDice.map(d => d.toString()), this.diceList);
    const firstDice = availableDice.splice(firstIndex, 1)[0];
    const secondIndex = compFirst
      ? CLI.menu('Choose your dice:', availableDice.map(d => d.toString()), this.diceList)
      : Math.floor(Math.random() * availableDice.length);
    const secondDice = availableDice[secondIndex];
    const [compDice, userDice] = compFirst ? [firstDice, secondDice] : [secondDice, firstDice];
    console.log(`I choose [${compDice.toString()}], you choose [${userDice.toString()}].`);
    const fairComp = new FairRandom(compDice.getSides());
    const compRoll = (await fairComp.generate('computer roll')).result;
    const compResult = compDice.roll(compRoll);
    console.log(`My roll result is ${compResult}.`);
    const fairUser = new FairRandom(userDice.getSides());
    const userRoll = (await fairUser.generate('your roll')).result;
    const userResult = userDice.roll(userRoll);
    console.log(`Your roll result is ${userResult}.`);
    if (userResult > compResult) console.log('You win (', userResult, '>', compResult, ')!');
    else if (userResult < compResult) console.log('I win (', compResult, '>', userResult, ')!');
    else console.log('Draw!');
  }
}