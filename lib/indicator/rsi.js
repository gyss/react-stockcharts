"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var overSold = 70,
	    middle = 50,
	    overBought = 30;

	var base = (0, _baseIndicator2.default)().type(ALGORITHM_TYPE).accessor(function (d) {
		return d.rsi;
	});

	var underlyingAlgorithm = (0, _algorithm.rsi)();

	var mergedAlgorithm = (0, _utils.merge)().algorithm(underlyingAlgorithm).merge(function (datum, indicator) {
		datum.rsi = indicator;
	});

	var indicator = function indicator(data) {
		if (!base.accessor()) throw new Error("Set an accessor to " + ALGORITHM_TYPE + " before calculating");
		return mergedAlgorithm(data);
	};
	base.tooltipLabel(function () {
		return ALGORITHM_TYPE + " (" + underlyingAlgorithm.windowSize() + "): ";
	});

	base.domain([0, 100]);
	base.tickValues([overSold, middle, overBought]);

	indicator.overSold = function (x) {
		if (!arguments.length) return overSold;
		overSold = x;
		base.tickValues([overSold, middle, overBought]);
		return indicator;
	};
	indicator.middle = function (x) {
		if (!arguments.length) return middle;
		middle = x;
		base.tickValues([overSold, middle, overBought]);
		return indicator;
	};
	indicator.overBought = function (x) {
		if (!arguments.length) return overBought;
		overBought = x;
		base.tickValues([overSold, middle, overBought]);
		return indicator;
	};

	(0, _d3fcRebind.rebind)(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type", "tooltipLabel", "domain", "tickValues");
	(0, _d3fcRebind.rebind)(indicator, underlyingAlgorithm, "sourcePath", "windowSize");
	(0, _d3fcRebind.rebind)(indicator, mergedAlgorithm, "merge", "skipUndefined");

	return indicator;
};

var _d3fcRebind = require("d3fc-rebind");

var _utils = require("../utils");

var _algorithm = require("./algorithm");

var _baseIndicator = require("./baseIndicator");

var _baseIndicator2 = _interopRequireDefault(_baseIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALGORITHM_TYPE = "RSI";