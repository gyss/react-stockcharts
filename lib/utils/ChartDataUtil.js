"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getChartOrigin = getChartOrigin;
exports.getDimensions = getDimensions;
exports.getNewChartConfig = getNewChartConfig;
exports.getCurrentCharts = getCurrentCharts;
exports.getChartConfigWithUpdatedYScales = getChartConfigWithUpdatedYScales;
exports.getCurrentItem = getCurrentItem;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _d3Array = require("d3-array");

var _d3Collection = require("d3-collection");

var _lodash = require("lodash.flattendeep");

var _lodash2 = _interopRequireDefault(_lodash);

var _Chart = require("../Chart");

var _Chart2 = _interopRequireDefault(_Chart);

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChartOrigin(origin, contextWidth, contextHeight) {
	var originCoordinates = typeof origin === "function" ? origin(contextWidth, contextHeight) : origin;
	return originCoordinates;
}

function getDimensions(_ref, chartProps) {
	var width = _ref.width,
	    height = _ref.height;


	var chartWidth = chartProps.width || width;
	var chartHeight = chartProps.height || height;

	return {
		availableWidth: width,
		availableHeight: height,
		width: chartWidth,
		height: chartHeight
	};
}

function values(func) {
	return function (d) {
		var obj = func(d);
		return (0, _index.isObject)(obj) ? Object.keys(obj).map(function (key) {
			return obj[key];
		}) : obj;
	};
}

function getNewChartConfig(innerDimension, children) {

	return _react2.default.Children.map(children, function (each) {
		if (each.type === _Chart2.default) {
			var _each$props = each.props,
			    id = _each$props.id,
			    origin = _each$props.origin,
			    padding = _each$props.padding,
			    yExtentsProp = _each$props.yExtents,
			    yScale = _each$props.yScale,
			    flipYScale = _each$props.flipYScale,
			    yExtentsCalculator = _each$props.yExtentsCalculator;

			var _getDimensions = getDimensions(innerDimension, each.props),
			    width = _getDimensions.width,
			    height = _getDimensions.height,
			    availableWidth = _getDimensions.availableWidth,
			    availableHeight = _getDimensions.availableHeight;

			var yPan = each.props.yPan;
			// var { yMousePointerRectWidth: rectWidth, yMousePointerRectHeight: rectHeight, yMousePointerArrowWidth: arrowWidth } = each.props;
			// var mouseCoordinates = { at, yDisplayFormat, rectHeight, rectWidth, arrowWidth };

			var yExtents = (0, _index.isDefined)(yExtentsProp) ? (Array.isArray(yExtentsProp) ? yExtentsProp : [yExtentsProp]).map(_index.functor) : undefined;
			// console.log(yExtentsProp, yExtents);
			return {
				id: id,
				origin: (0, _index.functor)(origin)(availableWidth, availableHeight),
				padding: padding,
				yExtents: yExtents,
				yExtentsCalculator: yExtentsCalculator,
				flipYScale: flipYScale,
				yScale: yScale,
				yPan: yPan,
				// mouseCoordinates,
				width: width,
				height: height
			};
		}
		return undefined;
	}).filter(function (each) {
		return (0, _index.isDefined)(each);
	});
}
function getCurrentCharts(chartConfig, mouseXY) {
	var currentCharts = chartConfig.filter(function (eachConfig) {
		var top = eachConfig.origin[1];
		var bottom = top + eachConfig.height;
		return mouseXY[1] > top && mouseXY[1] < bottom;
	}).map(function (config) {
		return config.id;
	});

	return currentCharts;
}

function setRange(scale, height, padding, flipYScale) {
	if (scale.rangeRoundPoints) {
		if (isNaN(padding)) throw new Error("padding has to be a number for ordinal scale");
		scale.rangeRoundPoints(flipYScale ? [0, height] : [height, 0], padding);
	} else {
		var _ref2 = isNaN(padding) ? padding : { top: padding, bottom: padding },
		    top = _ref2.top,
		    bottom = _ref2.bottom;

		scale.range(flipYScale ? [top, height - bottom] : [height - bottom, top]);
	}
	return scale;
}

function yDomainFromYExtents(yExtents, yScale, plotData) {
	var yValues = yExtents.map(function (eachExtent) {
		return plotData.map(values(eachExtent));
	});

	var allYValues = (0, _lodash2.default)(yValues);

	var realYDomain = yScale.invert ? (0, _d3Array.extent)(allYValues) : (0, _d3Collection.set)(allYValues).values();

	return realYDomain;
}

function getChartConfigWithUpdatedYScales(chartConfig, plotData, xDomain, dy, chartsToPan) {

	var yDomains = chartConfig.map(function (_ref3) {
		var yExtentsCalculator = _ref3.yExtentsCalculator,
		    yExtents = _ref3.yExtents,
		    yScale = _ref3.yScale;


		var realYDomain = (0, _index.isDefined)(yExtentsCalculator) ? yExtentsCalculator(plotData, xDomain) : yDomainFromYExtents(yExtents, yScale, plotData);

		var yDomainDY = (0, _index.isDefined)(dy) ? yScale.range().map(function (each) {
			return each - dy;
		}).map(yScale.invert) : yScale.domain();
		return {
			realYDomain: realYDomain,
			yDomainDY: yDomainDY,
			prevYDomain: yScale.domain()
		};
	});

	var combine = (0, _index.zipper)().combine(function (config, _ref4) {
		var realYDomain = _ref4.realYDomain,
		    yDomainDY = _ref4.yDomainDY,
		    prevYDomain = _ref4.prevYDomain;
		var id = config.id,
		    padding = config.padding,
		    height = config.height,
		    yScale = config.yScale,
		    yPan = config.yPan,
		    flipYScale = config.flipYScale,
		    _config$yPanEnabled = config.yPanEnabled,
		    yPanEnabled = _config$yPanEnabled === undefined ? false : _config$yPanEnabled;


		var another = (0, _index.isDefined)(chartsToPan) ? chartsToPan.indexOf(id) > -1 : true;
		var domain = yPan && yPanEnabled ? another ? yDomainDY : prevYDomain : realYDomain;
		// console.log(yPan, yPanEnabled, properYDomain, domain, realYDomain)
		return _extends({}, config, {
			yScale: setRange(yScale.copy().domain(domain), height, padding, flipYScale),
			realYDomain: realYDomain
		});
		// return { ...config, yScale: yScale.copy().domain(domain).range([height - padding, padding]) };
	});

	var updatedChartConfig = combine(chartConfig, yDomains);
	return updatedChartConfig;
}

function getCurrentItem(xScale, xAccessor, mouseXY, plotData) {
	var xValue, item;
	if (xScale.invert) {
		xValue = xScale.invert(mouseXY[0]);
		item = (0, _index.getClosestItem)(plotData, xValue, xAccessor);
	} else {
		var d = xScale.range().map(function (d, idx) {
			return { x: Math.abs(d - mouseXY[0]), idx: idx };
		}).reduce(function (a, b) {
			return a.x < b.x ? a : b;
		});
		item = (0, _index.isDefined)(d) ? plotData[d.idx] : plotData[0];
		// console.log(d, item);
	}
	return item;
}