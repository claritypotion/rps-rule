'use strict';

var toConst = function(val) {
  // camel to dashed
  val = val.replace(
    /([A-Z])/g, 
    
    function($1)  {
      return '_' + $1;
    }
  ).replace(/(^_)/, '');

  return val.toUpperCase();
};

var RPS = module.exports = function() {
  this.currentSymbolId = 2;
  this.map = {};
  this.dict = {};

  this.LOSE = -1;
  this.WIN  = 1;
  this.DRAW = 0;
};

RPS.prototype.genSymbolId = function() {
  return this.currentSymbolId++;
};

RPS.prototype.getSymbolId = function(name) {
  name = toConst(name);

  if(this[name]) {
    return this[name];
  } 
  
  var symbolId = this.genSymbolId();
  this[name] = symbolId;
  this.dict[symbolId] = name;
  this.map[symbolId] = {};
  this.map[symbolId][symbolId] = this.DRAW;

  return symbolId;
};

RPS.prototype.rule = function(name, weaker) {
  var symbolId = this.getSymbolId(name);
  var weakerSymbolId;

  for(let i = 0; i < weaker.length; i++) {
    weakerSymbolId = this.getSymbolId(weaker[i]);

    this.map[symbolId][weakerSymbolId] = this.WIN;
    this.map[weakerSymbolId][symbolId] = this.LOSE;
  }
};

RPS.prototype.check = function(s1, s2) {
  return this.map[s1][s2];
};

