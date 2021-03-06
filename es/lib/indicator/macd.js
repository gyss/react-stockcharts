"use strict";

import { rebind } from "d3fc-rebind";

import { merge } from "../utils";
import { macd } from "./algorithm";

import baseIndicator from "./baseIndicator";
import { MACD as appearanceOptions } from "./defaultOptionsForAppearance";

var ALGORITHM_TYPE = "MACD";

export default function () {

	var base = baseIndicator().type(ALGORITHM_TYPE).fill(appearanceOptions.fill).stroke(appearanceOptions.stroke).accessor(function (d) {
		return d.macd;
	});

	var underlyingAlgorithm = macd();

	var mergedAlgorithm = merge().algorithm(underlyingAlgorithm).merge(function (datum, indicator) {
		datum.macd = indicator;
	});

	var indicator = function indicator(data) {
		if (!base.accessor()) throw new Error("Set an accessor to " + ALGORITHM_TYPE + " before calculating");
		return mergedAlgorithm(data);
	};

	rebind(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type", "tooltipLabel");
	rebind(indicator, underlyingAlgorithm, "sourcePath", "fast", "slow", "signal", "undefinedLength");
	rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");

	return indicator;
}