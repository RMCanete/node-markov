/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i=0; i<this.words.length; i+=1) {
      let word = this.words[i];
      let nextWord = this.words[i+1] || null;
      if (chains.has(word)){
        chains.get(word).push(nextWord);
      } else chains.set(word, [nextWord]);
    }
    this.chains = chains;
  }


  /** return random text from chains */

  static randomNum(number) {
    return number[Math.floor(Math.random() * number.length)];
  }

  makeText(numWords = 100) {
    let nums = Array.from(this.chains.keys());
    let word = MarkovMachine.randomNum(nums);
    let output = [];
    while (output.length < numWords && word !== null) {
      output.push(word);
      word = MarkovMachine.randomNum(this.chains.get(word));
    }
    return output.join(` `);
  }
}

module.exports = {
  MarkovMachine
};