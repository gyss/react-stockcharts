"use strict";

import { rebind } from "d3fc-rebind";

import { merge } from "../utils";
import { rsi } from "./algorithm";

import baseIndicator from "./baseIndicator";

var ALGORITHM_TYPE = "RSI";

export default function () {
	var overSold = 70,
	    middle = 50,
	    overBought = 30;

	var base = baseIndicator().type(ALGORITHM_TYPE).accessor(function (d) {
		return d.rsi;
	});

	var underlyingAlgorithm = rsi();

	var mergedAlgorithm = merge().algorithm(underlyingAlgorithm).merge(function (datum, indicator) {
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

	rebind(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type", "tooltipLabel", "domain", "tickValues");
	rebind(indicator, underlyingAlgorithm, "sourcePath", "windowSize");
	rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");

	return indicator;
}