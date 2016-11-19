"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var windowSize = _defaultOptionsForComputation.SMA.windowSize,
	    sourcePath = _defaultOptionsForComputation.SMA.sourcePath;


	function calculator(data) {

		var average = (0, _utils.slidingWindow)().windowSize(windowSize).sourcePath(sourcePath).accumulator(function (values) {
			return (0, _d3Array.mean)(values);
		});

		return average(data);
	}
	calculator.undefinedLength = function () {
		return windowSize;
	};
	calculator.windowSize = function (x) {
		if (!arguments.length) {
			return windowSize;
		}
		windowSize = x;
		return calculator;
	};

	calculator.sourcePath = function (x) {
		if (!arguments.length) {
			return sourcePath;
		}
		sourcePath = x;
		return calculator;
	};

	return calculator;
};

var _d3Array = require("d3-array");

var _utils = require("../../utils");

var _defaultOptionsForComputation = require("../defaultOptionsForComputation");