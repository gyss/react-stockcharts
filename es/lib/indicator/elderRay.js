"use strict";

import { rebind } from "d3fc-rebind";

import { merge } from "../utils";
import { elderRay } from "./algorithm";

import baseIndicator from "./baseIndicator";

var ALGORITHM_TYPE = "ElderRay";

export default function () {

	var base = baseIndicator().type(ALGORITHM_TYPE).accessor(function (d) {
		return d.elderRay;
	});

	var underlyingAlgorithm = elderRay();

	var mergedAlgorithm = merge().algorithm(underlyingAlgorithm).merge(function (datum, indicator) {
		datum.elderRay = indicator;
	});

	var indicator = function indicator(data) {
		if (!base.accessor()) throw new Error("Set an accessor to " + ALGORITHM_TYPE + " before calculating");
		return mergedAlgorithm(data);
	};

	base.tooltipLabel(ALGORITHM_TYPE + ": ");

	rebind(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type", "tooltipLabel");
	rebind(indicator, underlyingAlgorithm, "windowSize", "movingAverageType", "sourcePath");
	rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");

	return indicator;
}