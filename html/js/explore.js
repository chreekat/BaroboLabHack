// Generated by CoffeeScript 1.7.1
angular.module('explore', []).controller('Eqns', function($scope) {
  $scope.x1 = -1;
  $scope.y1 = 2;
  $scope.z1 = 8;
  $scope.x2 = -2;
  $scope.y2 = 1;
  return $scope.z2 = -2;
}).controller('Graph', function($scope) {
  var chartCfg;
  chartCfg = {
    grid: {
      markings: [
        {
          linewidth: 1,
          yaxis: {
            from: 0,
            to: 0
          },
          color: "#8A8A8A"
        }, {
          linewidth: 1,
          xaxis: {
            from: 0,
            to: 0
          },
          color: "#8A8A8A"
        }
      ]
    },
    xaxis: {
      min: -10,
      max: 10,
      tickSize: 2,
      tickDecimals: 0
    },
    yaxis: {
      min: -10,
      max: 10,
      tickSize: 2,
      tickDecimals: 0
    },
    colors: ["red", "blue"]
  };
  $('#chartGoesHere').height("400px").width("400px");
  return $scope.$watch(function() {
    return [[$scope.x1, $scope.y1, $scope.z1], [$scope.x2, $scope.y2, $scope.z2]];
  }, function() {
    var a, b, serieses, x, y, z;
    serieses = (function() {
      var _i, _len, _ref, _ref1, _results;
      _ref = [[$scope.x1, $scope.y1, $scope.z1], [$scope.x2, $scope.y2, $scope.z2]];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], x = _ref1[0], y = _ref1[1], z = _ref1[2];
        a = -x / y;
        b = z / y;
        _results.push((function() {
          var _j, _len1, _ref2, _results1;
          _ref2 = [-10, 10];
          _results1 = [];
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            x = _ref2[_j];
            _results1.push([x, a * x + b]);
          }
          return _results1;
        })());
      }
      return _results;
    })();
    return $.plot("#chartGoesHere", serieses, chartCfg);
  });
});
