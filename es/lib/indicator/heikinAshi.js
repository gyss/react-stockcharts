"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { rebind } from "d3fc-rebind";

import { heikinAshi } from "./algorithm";
import baseIndicator from "./baseIndicator";

import { merge } from "../utils";

var ALGORITHM_TYPE = "HeikinAshi";

export default function () {

	var base = baseIndicator().type(ALGORITHM_TYPE).accessor(function (d) {
		return d.ha;
	});

	var underlyingAlgorithm = heikinAshi();

	var mergedAlgorithm = merge().algorithm(underlyingAlgorithm).merge(function (datum, indicator) {
		return _extends({}, datum, indicator);
	});

	var indicator = function indicator(data) {
		if (!base.accessor()) throw new Error("Set an accessor to " + ALGORITHM_TYPE + " before calculating");
		return mergedAlgorithm(data);
	};

	rebind(indicator, base, "accessor", "stroke", "fill", "echo", "type");
	// rebind(indicator, underlyingAlgorithm, "windowSize", "source");
	rebind(indicator, mergedAlgorithm, "merge");

	return indicator;
}