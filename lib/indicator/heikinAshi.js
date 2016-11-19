"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {

	var base = (0, _baseIndicator2.default)().type(ALGORITHM_TYPE).accessor(function (d) {
		return d.ha;
	});

	var underlyingAlgorithm = (0, _algorithm.heikinAshi)();

	var mergedAlgorithm = (0, _utils.merge)().algorithm(underlyingAlgorithm).merge(function (datum, indicator) {
		return _extends({}, datum, indicator);
	});

	var indicator = function indicator(data) {
		if (!base.accessor()) throw new Error("Set an accessor to " + ALGORITHM_TYPE + " before calculating");
		return mergedAlgorithm(data);
	};

	(0, _d3fcRebind.rebind)(indicator, base, "accessor", "stroke", "fill", "echo", "type");
	// rebind(indicator, underlyingAlgorithm, "windowSize", "source");
	(0, _d3fcRebind.rebind)(indicator, mergedAlgorithm, "merge");

	return indicator;
};

var _d3fcRebind = require("d3fc-rebind");

var _algorithm = require("./algorithm");

var _baseIndicator = require("./baseIndicator");

var _baseIndicator2 = _interopRequireDefault(_baseIndicator);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALGORITHM_TYPE = "HeikinAshi";