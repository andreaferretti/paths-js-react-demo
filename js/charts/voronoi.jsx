'use strict';
//CONTROLLA CHE L'OGGETTO RESTITUITO ABBIA LE CHIAVI GIUSTE
define(['paths/polygon', 'fortune/fortune'],
  function(Polygon, Fortune){
    return function Voronoi(args){ //data, accessor, width, height, xrange, yrange, compute

      if(typeof args.accessor!=="function"){
        args.accessor = function(x){
          return x;
        }
      };
      var width=args.width||500;
      var height=args.height||380;
      var xrange=args.xrange||[-1,1];
      var yrange=args.yrange||[-1,1];

      function enhance(compute, curve){
        var obj = (compute || {});
        for(var key in obj) {
          var method = obj[key];
          curve[key] = method(curve.index, curve.item, curve.group);
        };
        return curve;
      }

      function scale(iIn, iOut) {
        return function(x){
          return iOut[0] + (iOut[1] - iOut[0]) * (x - iIn[0]) / (iIn[1] - iIn[0]);
        }
      }
      var sites=args.data.map(args.accessor);

      var xm=(xrange[0]+xrange[1])/2;
      var ym=(yrange[0]+yrange[1])/2;
      var diag=Math.sqrt(Math.pow(xrange[0]-xrange[1], 2)+Math.pow(yrange[0]-yrange[1], 2));
      var xscale=scale(xrange, [0, width]);
      var yscale=scale(yrange, [height, 0]);

      var closingPoints=[[1e5*(xrange[0]-diag), 1e5*ym],[1e5*(xrange[1]+diag), 1e5*ym],
              [1e5*xm,1e5*(yrange[0]-diag)],[1e5*xm,1e5*(yrange[1]+diag)]];

      var points=closingPoints.concat(sites);

      var fortune=new Fortune(points);
      var patches=fortune.getPatches();
      var edges=fortune.edges;
      var nodes=[];
      var curves=[];

      sites.forEach(function(site, i){
        var scaledPatch=patches[site].map(function(vertex){
          return [xscale(vertex[0]), yscale(vertex[1])];
        });
        nodes.push({
          point: [xscale(site[0]), yscale(site[1])],
          item: args.data[i]
        });
        curves.push(enhance(args.compute, {
          line: Polygon({
              points: scaledPatch,
              closed: true,
            }),
          index: i,
          item: args.data[i],
        }));
      });

      return {
        curves: curves,
        nodes: nodes,
        xscale: xscale,
        yscale: yscale
      };
    }
  }
);
