'use strict';

var RPS = require('../lib/rps.js');
var assert = require('assert');

var r;

describe('creating instance', function() {
  it('should return RPS instance', function() {
    r = new RPS();
  });
});

describe('adding rules', function() {
  it('should do the thing', function() {
    r.rule('Rock',      ['Scissors']);
    r.rule('Paper',     ['Rock']);
    r.rule('Scissors',  ['Paper']);
  });
});

describe('WIN, LOSE, DRAW ids', function() {
  it('should be numbers', function() {
    [r.WIN, r.LOSE, r.DRAW].forEach(function(n) {
      if(Number(n) !== n || n % 1 !== 0) {
        throw new Error('game result id is not a number');
      }
    });
  });

  it('should have different values', function() {
    if(r.WIN === r.LOSE || r.LOSE === r.DRAW || r.DRAW === r.WIN) {
      throw new Error('game result ids are not different');
    }
  });
});


describe('playing', function() {
  it('should do stuff', function() {

    assert.equal(r.check(r.ROCK,  r.ROCK), r.DRAW);
    assert.equal(r.check(r.PAPER, r.PAPER), r.DRAW);
    assert.equal(r.check(r.SCISSORS, r.SCISSORS), r.DRAW);


    assert.equal(r.check(r.ROCK, r.PAPER),  r.LOSE);
    assert.equal(r.check(r.ROCK, r.SCISSORS), r.WIN);

    assert.equal(r.check(r.PAPER, r.SCISSORS),  r.LOSE);
    assert.equal(r.check(r.PAPER, r.ROCK), r.WIN);

    assert.equal(r.check(r.SCISSORS, r.ROCK),  r.LOSE);
    assert.equal(r.check(r.SCISSORS, r.PAPER), r.WIN);
  });
});