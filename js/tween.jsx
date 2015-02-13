define(['react'], function(React) {
  function interpolate(a, b, t, d, f) {
    if (Array.isArray(b)) {
      return b.map(function(x, i) {
        return interpolate(a[i], x, t, d, f);
      });
    }
    if (typeof b === 'object') {
      var res = {}, k;
      for (var k in b) {
        // No need to check hasOwnProperty,
        // we are working with object literals
        res[k] = interpolate(a[k], b[k], t, d, f);
      }
      return res;
    }
    if (typeof b === 'number') {
      return f(t, a, b, d);
    }
    return a;
  }

  function copy(obj) {
    var res = {}, k;
    for (k in obj) {
      if (obj.hasOwnProperty(k)) {
        res[k] = obj[k];
      }
    }
    return res;
  }

  var easingTypes = {
    // t: current time, b: beginning value, f: final value, d: duration

    linear: function(t, b, f, d) {
      var c = f - b;
      return t*c/d + b;
    },
    easeInQuad: function (t, b, f, d) {
      var c = f - b;
      return c*(t/=d)*t + b;
    },
    easeOutQuad: function (t, b, f, d) {
      var c = f - b;
      return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (t, b, f, d) {
      var c = f - b;
      if ((t/=d/2) < 1) return c/2*t*t + b;
      return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInElastic: function (t, b, f, d) {
      var c = f - b;
      var s=1.70158;var p=0;var a=c;
      if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (t, b, f, d) {
      var c = f - b;
      var s=1.70158;var p=0;var a=c;
      if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (t, b, f, d) {
      var c = f - b;
      var s=1.70158;var p=0;var a=c;
      if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (t, b, f, d, s) {
      var c = f - b;
      if (s == undefined) s = 1.70158;
      return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (t, b, f, d, s) {
      var c = f - b;
      if (s == undefined) s = 1.70158;
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (t, b, f, d, s) {
      var c = f - b;
      if (s == undefined) s = 1.70158;
      if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (t, b, f, d) {
      var c = f - b;
      return c - easingTypes.easeOutBounce (d-t, 0, c, d) + b;
    },
    easeOutBounce: function (t, b, f, d) {
      var c = f - b;
      if ((t/=d) < (1/2.75)) {
        return c*(7.5625*t*t) + b;
      } else if (t < (2/2.75)) {
        return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
      } else if (t < (2.5/2.75)) {
        return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
      } else {
        return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
      }
    },
    easeInOutBounce: function (t, b, f, d) {
      var c = f - b;
      if (t < d/2) return easingTypes.easeInBounce (t*2, 0, c, d) * .5 + b;
      return easingTypes.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
  };

  /*
   *
   * TERMS OF USE - EASING EQUATIONS
   *
   * Open source under the BSD License.
   *
   * Copyright © 2001 Robert Penner
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   *
   * Redistributions of source code must retain the above copyright notice, this list of
   * conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above copyright notice, this list
   * of conditions and the following disclaimer in the documentation and/or other materials
   * provided with the distribution.
   *
   * Neither the name of the author nor the names of contributors may be used to endorse
   * or promote products derived from this software without specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
   * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
   *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
   *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
   * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
   * OF THE POSSIBILITY OF SUCH DAMAGE.
   *
   */

  return {
    easing: easingTypes,
    Mixin: {
      tweenState: function(target, options) {
        options = options || {};
        var start = Date.now();
        var initialState = copy(this.state);
        var duration = options.duration || 500;
        var easing = options.easing || easingTypes.easeInOutQuad;
        var self = this;

        function updateState() {
          var t = Math.min(Date.now() - start, duration);
          self.setState(interpolate(initialState, target, t, duration, easing));

          if (t < duration) {
            requestAnimationFrame(updateState);
          }
        }

        requestAnimationFrame(updateState);
      }
    }
  };
});