"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {

	var windowSize = 9,
	    source = function source(d) {
		return { open: d.open, high: d.high, low: d.low, close: d.close };
	};

	function calculator(data) {

		var trueRangeAlgorithm = (0, _utils.slidingWindow)().windowSize(2).source(source).undefinedValue(function (d) {
			return d.high - d.low;
		}) // the first TR value is simply the High minus the Low
		.accumulator(function (values) {
			var prev = values[0];
			var d = values[1];
			return Math.max(d.high - d.low, d.high - prev.close, d.low - prev.close);
		});

		var prevATR;

		var atrAlgorithm = (0, _utils.slidingWindow)().skipInitial(1) // trueRange starts from index 1 so ATR starts from 1
		.windowSize(windowSize).accumulator(function (values) {
			var tr = (0, _utils.last)(values);
			var atr = (0, _utils.isDefined)(prevATR) ? (prevATR * (windowSize - 1) + tr) / windowSize : (0, _d3Array.sum)(values) / windowSize;

			prevATR = atr;
			return atr;
		});

		var newData = atrAlgorithm(trueRangeAlgorithm(data));

		return newData;
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

	calculator.source = function (x) {
		if (!arguments.length) {
			return source;
		}
		source = x;
		return calculator;
	};

	return calculator;
};

var _d3Array = require("d3-array");

var _utils = require("../../utils");