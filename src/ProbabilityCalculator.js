export class ProbabilityCalculator {
    static calc(d1, d2) {
      let wins = 0;
      let total = d1.faces.length * d2.faces.length;
      for (let a of d1.faces) for (let b of d2.faces) if (a > b) wins++;
      return (wins / total).toFixed(4);
    }
  }