"use strict";

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

import { first, last, getClosestItemIndexes, isDefined, isNotDefined, identity } from "../utils";

var debug = false;

function extentsWrapper(inputXAccessor, realXAccessor, useWholeData, clamp) {
	function domain(data, inputDomain, xAccessor, initialXScale, currentPlotData, currentDomain) {
		if (useWholeData) {
			return { plotData: data, domain: inputDomain };
		}

		var left = first(inputDomain);
		var right = last(inputDomain);

		var filteredData = getFilteredResponse(data, left, right, xAccessor);
		var clampedDomain = [Math.max(left, realXAccessor(first(data))), Math.min(right, realXAccessor(last(data)))];

		var realInputDomain = realXAccessor === xAccessor ? clamp ? clampedDomain : inputDomain : [realXAccessor(first(filteredData)), realXAccessor(last(filteredData))];

		var xScale = initialXScale.copy().domain(realInputDomain);

		var width = Math.floor(xScale(realXAccessor(last(filteredData))) - xScale(realXAccessor(first(filteredData))));

		var plotData, domain;

		var chartWidth = last(xScale.range()) - first(xScale.range());

		if (debug) console.debug("Trying to show " + filteredData.length + " in " + width + "px, I can show up to " + showMax(width) + " in that width. Also FYI the entire chart width is " + chartWidth + "px");

		if (canShowTheseManyPeriods(width, filteredData.length)) {
			plotData = filteredData;
			domain = realInputDomain;
			if (debug) console.debug("AND IT WORKED");
		} else {
			plotData = currentPlotData || filteredData.slice(filteredData.length - showMax(width));
			domain = currentDomain || [realXAccessor(first(plotData)), realXAccessor(last(plotData))];

			var newXScale = xScale.copy().domain(domain);
			var newWidth = Math.floor(newXScale(realXAccessor(last(plotData))) - newXScale(realXAccessor(first(plotData))));

			if (debug) console.debug("and ouch, that is too much, so instead showing " + plotData.length + " in " + newWidth + "px");
		}

		return { plotData: plotData, domain: domain };
	}

	return domain;
}

function canShowTheseManyPeriods(width, arrayLength) {
	var threshold = 2; // number of datapoints per 1 px
	return arrayLength > 1 && arrayLength < width * threshold;
}

function showMax(width) {
	var threshold = 1.80; // number of datapoints per 1 px
	return Math.floor(width * threshold);
}

function getFilteredResponse(data, left, right, xAccessor) {
	var newLeftIndex = getClosestItemIndexes(data, left, xAccessor).right;
	var newRightIndex = getClosestItemIndexes(data, right, xAccessor).left;

	var filteredData = data.slice(newLeftIndex, newRightIndex + 1);
	// console.log(right, newRightIndex, dataForInterval.length);

	return filteredData;
}

function compose(funcs) {
	if (funcs.length === 0) {
		return identity;
	}

	if (funcs.length === 1) {
		return funcs[0];
	}

	var _funcs = _toArray(funcs),
	    head = _funcs[0],
	    tail = _funcs.slice(1);

	return function (args) {
		return tail.reduce(function (composed, f) {
			return f(composed);
		}, head(args));
	};
}

export default function () {

	var xAccessor,
	    useWholeData,
	    width,
	    xScale,
	    map,
	    calculator = [],
	    scaleProvider,
	    indexAccessor,
	    indexMutator,
	    clamp;

	function evaluate(data) {

		if (process.env.NODE_ENV !== "production") {
			if (debug) console.time("evaluation");
		}
		var mappedData = data.map(map);

		var composedCalculator = compose(calculator);

		var calculatedData = composedCalculator(mappedData);

		if (process.env.NODE_ENV !== "production") {
			if (debug) console.timeEnd("evaluation");
		}

		if (isDefined(scaleProvider)) {
			var scaleProvider2 = scaleProvider.inputDateAccessor(xAccessor).indexAccessor(indexAccessor).indexMutator(indexMutator);

			var _scaleProvider = scaleProvider2(calculatedData),
			    finalData = _scaleProvider.data,
			    modifiedXScale = _scaleProvider.xScale,
			    realXAccessor = _scaleProvider.xAccessor,
			    displayXAccessor = _scaleProvider.displayXAccessor;

			return {
				filterData: extentsWrapper(xAccessor, realXAccessor, useWholeData || isNotDefined(modifiedXScale.invert), clamp),
				fullData: finalData,
				xScale: modifiedXScale,
				xAccessor: realXAccessor,
				displayXAccessor: displayXAccessor
			};
		}

		return {
			filterData: extentsWrapper(xAccessor, xAccessor, useWholeData || isNotDefined(xScale.invert), clamp),
			fullData: calculatedData,
			xScale: xScale,
			xAccessor: xAccessor,
			displayXAccessor: xAccessor
		};
	}
	evaluate.clamp = function (x) {
		if (!arguments.length) return clamp;
		clamp = x;
		return evaluate;
	};
	evaluate.xAccessor = function (x) {
		if (!arguments.length) return xAccessor;
		xAccessor = x;
		return evaluate;
	};
	evaluate.map = function (x) {
		if (!arguments.length) return map;
		map = x;
		return evaluate;
	};
	evaluate.indexAccessor = function (x) {
		if (!arguments.length) return indexAccessor;
		indexAccessor = x;
		return evaluate;
	};
	evaluate.indexMutator = function (x) {
		if (!arguments.length) return indexMutator;
		indexMutator = x;
		return evaluate;
	};
	evaluate.scaleProvider = function (x) {
		if (!arguments.length) return scaleProvider;
		scaleProvider = x;
		return evaluate;
	};
	evaluate.xScale = function (x) {
		if (!arguments.length) return xScale;
		xScale = x;
		return evaluate;
	};
	evaluate.useWholeData = function (x) {
		if (!arguments.length) return useWholeData;
		useWholeData = x;
		return evaluate;
	};
	evaluate.width = function (x) {
		if (!arguments.length) return width;
		width = x;
		return evaluate;
	};
	evaluate.calculator = function (x) {
		if (!arguments.length) return calculator;
		calculator = x;
		return evaluate;
	};

	return evaluate;
}