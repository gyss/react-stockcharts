"use strict";

import { rebind } from "d3fc-rebind";
import { merge } from "../utils";

import { ema } from "./algorithm";
import baseIndicator from "./baseIndicator";

var ALGORITHM_TYPE = "EMA";

export default function () {

	var base = baseIndicator().type(ALGORITHM_TYPE).accessor(function (d) {
		return d.ema;
	});

	var underlyingAlgorithm = ema();

	var mergedAlgorithm = merge().algorithm(underlyingAlgorithm).merge(function (datum, indicator) {
		datum.ema = indicator;
	});

	var indicator = function indicator(data) {
		if (!base.accessor()) throw new Error("Set an accessor to " + ALGORITHM_TYPE + " before calculating");
		return mergedAlgorithm(data);
	};
	base.tooltipLabel(function () {
		return ALGORITHM_TYPE + "(" + underlyingAlgorithm.windowSize() + ")";
	});

	indicator.undefinedLength = function () {
		return underlyingAlgorithm.windowSize();
	};

	rebind(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type", "tooltipLabel");
	rebind(indicator, underlyingAlgorithm, "windowSize", "sourcePath");
	rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");

	return indicator;
}