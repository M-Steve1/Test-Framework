const pawpaw = require('../pawpaw.js');
const tomato = require('../tomato.js');

describe('Describe test', () => {
    it('works', () => {
      expect(1).toBe(1);
    });
  });

it('Very sweet', () => {
  expect(pawpaw).toBe('Sweet');
});

it('It is a fruit', () => {
  expect(tomato).toBe('it is a fruit');
});

  describe('second describe test', () => {
    it(`doesn't work`, async () => {
        await new Promise((resolve) => {
            setTimeout(resolve, 200)
        })
      expect(2).toBe(2);
    });
  });