define(['paths/rectangle'],
  function(Rectangle){
    return function Stacked(args){ //data, accessor, width, height, gutter, compute

      if(typeof args.accessor !== "function"){
        args.accessor = function(x){
          return x;
        }
      };
      if(typeof args.gutter !== "number" || args.gutter < 0){
        args.gutter = 10;
      };

      function Scale(intervalIn, intervalOut){
        return function(x){
          return (intervalIn - x) / intervalIn * intervalOut;
        };
      }

      var enhance = function(compute, curve){
        var obj = (compute || {});
        for(var key in obj) {
          var method = obj[key];
          curve[key] = method(curve.index, curve.item, curve.group);
        };
        return curve;
      }

      function maxInVector(array){
        var isNumber = function(value){
          return typeof value  == 'number';
        };
        var toNumber = function(elem){
          return isNumber(elem) ? elem : maxInVector(elem);
        };
        if(!array.every(isNumber)){
          array = array.map(toNumber);
        };
        return Math.max.apply(null, array);
      }

      function cumulateArray(array) {
        cumulated = [0];
        array.forEach(function(value, i){
          cumulated.push(cumulated[i] + value);
        });
        return cumulated.slice(1);
      }

      var accessedData = args.data.map(function(array){
          return array.map(args.accessor);
        });

      var cumData = accessedData.map(cumulateArray);

      var yscale = Scale(maxInVector(cumData), args.height);

      var barWidth = (args.width - (accessedData.length - 1) * args.gutter)/
                      accessedData.length;

      return {
        curves:  accessedData.reduce(function(curves, barData, barI){
          return curves.concat(barData.map(function(value, valueI){
            return(enhance(args.compute, {
              line: Rectangle({
                top: yscale(cumData[barI][valueI]),
                bottom: valueI ? yscale(cumData[barI][valueI-1]) : yscale(0),
                left: barI * (barWidth + args.gutter),
                right: barI * (barWidth + args.gutter) + barWidth
              }),
              index: valueI,
              item: value
            }));
          })
        )}, []),
        scale: yscale,
      };
    }
  }
);
