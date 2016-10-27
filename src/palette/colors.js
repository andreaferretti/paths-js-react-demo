function cut(x) {
  return Math.min(255, Math.floor(x));
}

function multiply(factor) {
  return function(c) {
    return {
      r: cut(factor * c.r),
      g: cut(factor * c.g),
      b: cut(factor * c.b)
    };
  };
}

function average(c1, c2) {
  return {
    r: cut((c1.r + c2.r) / 2),
    g: cut((c1.g + c2.g) / 2),
    b: cut((c1.b + c2.b) / 2)
  };
}

var lighten = multiply(1.2);
var darken = multiply(0.8);

function mix(c1, c2) {
  var c3 = average(c1, c2);
  return [lighten(c1), c1, darken(c1), lighten(c3), c3, darken(c3), lighten(c2), c2, darken(c2)];
}

function string(c) {
  return "rgb(" + (Math.floor(c.r)) + "," + (Math.floor(c.g)) + "," + (Math.floor(c.b)) + ")";
}

module.exports = {
  multiply: multiply,
  average: average,
  lighten: lighten,
  darken: darken,
  mix: mix,
  string: string
};