"use strict";

require(["./voronoi", "./geom"],
    function(Voronoi, Geom){

        var vFourPoints=[[0,-0.3], [0,-0.1], [0, 0.1], [0,0.3]];
        var hFourPoints=[[-0.3,0], [-0.1,0], [0.1,0], [0.3,0]];
        var vTriangle=[[0,-0.5], [0.5,0.5], [-0.5,0.5]];
        var hTriangle=[[0,0.5], [0.5,-0.5], [-0.5,-0.5]]
        var vRectangle=[[0,-0.5],[-0.5,0],[0.5,0],[0,0.65]];
        var hRectangle=[[-0.5,0],[0,-0.5],[0,0.5],[0.65,0]];
        var vSquare=[[0,-0.5],[-0.5,0],[0.5,0],[0,0.5]];
        var vCSquare=[[0,0],...vSquare];
        var hSquare=[[-0.5,-0.5],[0.5,-0.5],[0.5,0.5],[-0.5,0.5]];
        var hCSquare=[[0,0],[-0.5,-0.5],[0.5,-0.5],[0.5,0.5],[-0.5,0.5]];
        var vOctagon=[[0,-0.5],[-Math.sqrt(2)/4, -Math.sqrt(2)/4], [Math.sqrt(2)/4,-Math.sqrt(2)/4],[-0.5,0],
                [0.5,0] ,[Math.sqrt(2)/4, Math.sqrt(2)/4], [-Math.sqrt(2)/4, Math.sqrt(2)/4], [0, 0.5]];
        var vCOctagon=[[0,0],...vOctagon];
        var [x1, y1, x2, y2]=[Math.cos(Math.PI/8)/2, Math.sin(Math.PI/8)/2,
                Math.cos(3*Math.PI/8)/2, Math.sin(3*Math.PI/8)/2];
        var hOctagon=[[x1,y1],[x2,y2],[-x1,y1],[-x2,y2],[-x1,-y1],[-x2,-y2],[x1,-y1],[x2,-y2]];
        var hCOctagon=[[0,0],...hOctagon];
        var random=[];
        for(var i=0; i<1000; i++){
          random.push([2*(Math.random()-0.5), 2*(Math.random()-0.5)]);
        }

        var [width, height]=[800, 800];
        var [xrange,yrange]=[[-1, 1], [-1, 1]];
        var sites=random;

        function scale(iIn, iOut) {
          return function(x){
            return iOut[0] + (iOut[1] - iOut[0]) * (x - iIn[0]) / (iIn[1] - iIn[0]);
          }
        }

        var [xm, ym]=[(xrange[0]+xrange[1])/2, (yrange[0]+yrange[1])/2];
        var diag=Geom.distPointToPoint([xrange[0],yrange[0]],[xrange[1],yrange[1]]);
        var [xscale, yscale]=[scale(xrange, [width, 0]), scale(yrange, [height, 0])];

        var closingPoints=[[xrange[0]-diag, ym],[xrange[1]+diag, ym],
                [xm,yrange[0]-diag],[xm,yrange[1]+diag]];
        var points=[...closingPoints,...sites].map(function(p){
          return [xscale(p[0]), yscale(p[1])];
        });

        var v=new Voronoi(points);
        v.plotEdges(width, height, 2);
        })
//
