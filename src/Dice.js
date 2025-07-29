export class Dice {
    constructor(faces) {
      this.faces = faces;
    }
    roll(index) {
      return this.faces[index];
    }
    getSides() {
      return this.faces.length;
    }
    toString() {
      return this.faces.join(',');
    }
  }