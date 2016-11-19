"use strict";

import { rebind } from "d3fc-rebind";

import { merge } from "../utils";

import { sma } from "./algorithm";

import baseIndicator from "./baseIndicator";

var ALGORITHM_TYPE = "SMA";

export default function () {

	var base = baseIndicator().type(ALGORITHM_TYPE).accessor(function (d) {
		return d.sma;
	});

	var underlyingAlgorithm = sma();

	var mergedAlgorithm = merge().algorithm(underlyingAlgorithm).merge(function (datum, indicator) {
		datum.sma = indicator;
	});

	var indicator = function indicator(data) {
		if (!base.accessor()) throw new Error("Set an accessor to " + ALGORITHM_TYPE + " before calculating");
		var newData = mergedAlgorithm(data);
		return newData;
	};
	indicator.undefinedLength = function () {
		return underlyingAlgorithm.windowSize();
	};

	base.tooltipLabel(function () {
		return ALGORITHM_TYPE + "(" + underlyingAlgorithm.windowSize() + ")";
	});

	rebind(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type", "tooltipLabel");
	rebind(indicator, underlyingAlgorithm, "windowSize", "undefinedLength", "sourcePath");
	rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");

	return indicator;
}