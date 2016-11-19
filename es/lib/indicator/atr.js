"use strict";

import { rebind } from "d3fc-rebind";

import { merge } from "../utils";
import { atr } from "./algorithm";

import baseIndicator from "./baseIndicator";
import { ATR as defaultOptions } from "./defaultOptionsForComputation";

var ALGORITHM_TYPE = "ATR";

export default function () {

	var base = baseIndicator().type(ALGORITHM_TYPE).accessor(function (d) {
		return d.atr;
	});

	var underlyingAlgorithm = atr().windowSize(defaultOptions.period);

	var mergedAlgorithm = merge().algorithm(underlyingAlgorithm).merge(function (datum, indicator) {
		datum.atr = indicator;
	});

	var indicator = function indicator(data) {
		if (!base.accessor()) throw new Error("Set an accessor to " + ALGORITHM_TYPE + " before calculating");
		return mergedAlgorithm(data);
	};

	base.tooltipLabel(function () {
		return ALGORITHM_TYPE + "(" + underlyingAlgorithm.windowSize() + ")";
	});

	rebind(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type", "tooltipLabel");
	rebind(indicator, underlyingAlgorithm, "windowSize");
	rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");

	return indicator;
}