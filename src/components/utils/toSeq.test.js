const { listToSeq, objToSeq } = require('./toSeq');

describe('listToSeq', () => {
  it('should return an empty string when passed an empty array', () => {
    const array = [];

    const result = listToSeq(array);

    expect(result).toBe('');
  });

  it('should return a string with numbered placeholders when passed a non-empty array', () => {
    const array = ['desenrola', 'bate', 'joga de ladin'];

    const result = listToSeq(array);

    expect(result).toBe('$1, $2, $3');
  });
});

describe('objToSeq', () => {
  it('should return an empty string when passed an empty object', () => {
    const obj = {};

    const result = objToSeq(obj);

    expect(result).toBe('');
  });

  it('should return a string with key-value pairs when passed a non-empty object', () => {
    const obj = {
      human: 9,
      elves: 3,
      dwarves: 7,
      sauron: 1
    };

    const result = objToSeq(obj);

    expect(result).toBe('human = $1, elves = $2, dwarves = $3, sauron = $4');
  });
});
