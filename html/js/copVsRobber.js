/* jshint jquery: true */
/* global Robot */
/* exported runDemo */

(function() {

"use strict";

var wheelRadius = 1.75;

var blue = "KG3G";
var red = "GZP1";

function nighttime () {
  Robot.disconnectRobot(red);
  Robot.disconnectRobot(blue);
  Robot.stop(red);
  Robot.stop(blue);
}

var cop = {
  color: "blue",
  label: "cop",
  data: [],
  speed: 2,
  start: 0,
};
var robber = {
  color: "red",
  label: "robber",
  data: [],
  speed: 0.5,
  start: 6,
};

var xvstSeries = [
  Object.create(cop),
  Object.create(robber)
];

var posSeries = [
  Object.create(cop),
  Object.create(robber)
];
posSeries[0].data = [[1, cop.start]];
posSeries[1].data = [[1, robber.start]];

var xvst = $.plot("#xvst", xvstSeries, {
  xaxis: {
    min: 0,
    max: 6,
    tickSize: 1,
    tickDecimals: 0,
  },
  yaxis: {
    min: -2,
    max: 14,
    tickSize: 2,
    tickDecimals: 0,
  },
});

var pos = $.plot("#pos", posSeries, {
  xaxis: {
    show: false,
    reserveSpace: true,
    min: 0,
    max: 2,
    tickSize: 1,
    tickDecimals: 0,
  },
  yaxis: {
    min: -2,
    max: 14,
    tickSize: 2,
    tickDecimals: 0,
  },
  series: {
    points: { show: true }
  }
});

//var pos = $.plot("#pos", posSeries);

var iterDemo = (function() {
  var iter = 0;
  var timeout = 200; // milliseconds
  var step = timeout/1000.0;
  var tolerance = step / 2;
  var xstop;
  var d1, d2;

  function iterDemo(x) {
    var reset = false;
    var y1, y2;

    if (typeof x !== "undefined" && x !== null) {
      reset = true;
    }

    if (reset) {
      iter = 0;
      xstop = x;
      d1 = [[0, cop.start]];
      d2 = [[0, robber.start]];
    }
    iter = iter + step;
    Robot.printMessage(iter);
    y1 = cop.speed * iter + cop.start;
    y2 = robber.speed * iter + robber.start;
    d1.push([iter, y1]);
    d2.push([iter, y2]);

    xvstSeries[0].data = d1;
    xvstSeries[1].data = d2;
    posSeries[0].data = [[1, y1]];
    posSeries[1].data = [[1, y2]];
    xvst.setData(xvstSeries);
    pos.setData(posSeries);
    xvst.draw();
    pos.draw();
    if((xstop - iter) > (tolerance)) {
      setTimeout(iterDemo, timeout);
    }
    else {
      setTimeout(nighttime, timeout+500);
    }
  }

  return iterDemo;
})();

window.runDemo = function () {
  var intersectGuess = parseFloat($("#guess").val());
  if (!isNaN(intersectGuess)) {
    if (typeof Robot !== 'undefined' && Robot !== null) {
      //var robotList = Robot.getRobotIDList();
      Robot.connectRobot(red);
      Robot.connectRobot(blue);

      Robot.setColorRGB(red, 255, 0, 0);
      Robot.setColorRGB(blue, 0, 0, 255);

      var redfunc = function(x) {
        return robber.speed * x + robber.start;
      };

      var bluefunc = function(x) {
        return cop.speed * x + cop.start;
      };

      var xstart = 0;
      var xstop = intersectGuess;

      var reddist = redfunc(xstop) - redfunc(xstart);
      var bluedist = bluefunc(xstop) - bluefunc(xstart);

      var redradians = reddist / wheelRadius;
      var blueradians = bluedist / wheelRadius;

      var redspeed = robber.speed / wheelRadius;
      var bluespeed = cop.speed / wheelRadius;

      Robot.setJointSpeeds(red, redspeed, redspeed, redspeed, redspeed);
      Robot.setJointSpeeds(blue, bluespeed, bluespeed, bluespeed, bluespeed);

      Robot.moveNB(red, redradians, 0, -redradians, 0);
      Robot.moveNB(blue, blueradians, 0, -blueradians, 0);
      iterDemo(intersectGuess);
    }
  }
};

}());