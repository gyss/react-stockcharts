"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {

	var base = (0, _baseIndicator2.default)().type(ALGORITHM_TYPE).accessor(function (d) {
		return d.elderRay;
	});

	var underlyingAlgorithm = (0, _algorithm.elderRay)();

	var mergedAlgorithm = (0, _utils.merge)().algorithm(underlyingAlgorithm).merge(function (datum, indicator) {
		datum.elderRay = indicator;
	});

	var indicator = function indicator(data) {
		if (!base.accessor()) throw new Error("Set an accessor to " + ALGORITHM_TYPE + " before calculating");
		return mergedAlgorithm(data);
	};

	base.tooltipLabel(ALGORITHM_TYPE + ": ");

	(0, _d3fcRebind.rebind)(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type", "tooltipLabel");
	(0, _d3fcRebind.rebind)(indicator, underlyingAlgorithm, "windowSize", "movingAverageType", "sourcePath");
	(0, _d3fcRebind.rebind)(indicator, mergedAlgorithm, "merge", "skipUndefined");

	return indicator;
};

var _d3fcRebind = require("d3fc-rebind");

var _utils = require("../utils");

var _algorithm = require("./algorithm");

var _baseIndicator = require("./baseIndicator");

var _baseIndicator2 = _interopRequireDefault(_baseIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALGORITHM_TYPE = "ElderRay";