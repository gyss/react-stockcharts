"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {

	var underlyingAlgorithm = (0, _forceIndex2.default)();
	var smoothing, smoothingType, smoothingWindow;
	var merge = (0, _utils.zipper)().combine(function (force, smoothed) {
		return { force: force, smoothed: smoothed };
	});

	function calculator(data) {
		var force = underlyingAlgorithm(data);
		var ma = smoothingType === "ema" ? (0, _ema2.default)() : (0, _sma2.default)();
		var forceMA = ma.windowSize(smoothingWindow).sourcePath(null);
		var smoothed = forceMA(force);

		return merge(force, smoothed);
	}

	(0, _d3fcRebind.rebind)(calculator, underlyingAlgorithm, "sourcePath", "volumePath");

	calculator.undefinedLength = function () {
		return underlyingAlgorithm.undefinedLength() + smoothingWindow;
	};
	calculator.smoothing = function (x) {
		if (!arguments.length) {
			return smoothing;
		}
		smoothing = x;
		return calculator;
	};
	calculator.smoothingType = function (x) {
		if (!arguments.length) {
			return smoothingType;
		}
		smoothingType = x;
		return calculator;
	};
	calculator.smoothingWindow = function (x) {
		if (!arguments.length) {
			return smoothingWindow;
		}
		smoothingWindow = x;
		return calculator;
	};

	return calculator;
};

var _d3fcRebind = require("d3fc-rebind");

var _forceIndex = require("./forceIndex");

var _forceIndex2 = _interopRequireDefault(_forceIndex);

var _ema = require("./ema");

var _ema2 = _interopRequireDefault(_ema);

var _sma = require("./sma");

var _sma2 = _interopRequireDefault(_sma);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }