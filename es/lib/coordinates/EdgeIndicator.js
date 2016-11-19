"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from "react";
import { format } from "d3-format";

import { drawOnCanvas as _drawOnCanvas, renderSVG as _renderSVG } from "./EdgeCoordinateV2";
import GenericChartComponent, { getAxisCanvas } from "../GenericChartComponent";

import { first, last, isDefined, functor } from "../utils";

var EdgeIndicator = function (_Component) {
	_inherits(EdgeIndicator, _Component);

	function EdgeIndicator(props) {
		_classCallCheck(this, EdgeIndicator);

		var _this = _possibleConstructorReturn(this, (EdgeIndicator.__proto__ || Object.getPrototypeOf(EdgeIndicator)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(EdgeIndicator, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var edge = helper(this.props, moreProps);
			var props = _extends({}, this.props, edge);
			_drawOnCanvas(ctx, props);
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var edge = helper(this.props, moreProps);
			var props = _extends({}, this.props, edge);
			return _renderSVG(props);
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(GenericChartComponent, {
				canvasToDraw: getAxisCanvas,
				edgeClip: true,
				clip: false,
				svgDraw: this.renderSVG,
				canvasDraw: this.drawOnCanvas,
				drawOnPan: true
			});
		}
	}]);

	return EdgeIndicator;
}(Component);

EdgeIndicator.propTypes = {
	yAccessor: PropTypes.func,

	type: PropTypes.oneOf(["horizontal"]).isRequired,
	className: PropTypes.string,
	fill: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
	textFill: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
	itemType: PropTypes.oneOf(["first", "last"]).isRequired,
	orient: PropTypes.oneOf(["left", "right"]),
	edgeAt: PropTypes.oneOf(["left", "right"]),
	displayFormat: PropTypes.func.isRequired,
	rectHeight: PropTypes.number.isRequired,
	rectWidth: PropTypes.number.isRequired,
	arrowWidth: PropTypes.number.isRequired
};

EdgeIndicator.defaultProps = {
	className: "react-stockcharts-edgeindicator",

	type: "horizontal",
	orient: "left",
	edgeAt: "left",
	textFill: "#FFFFFF",
	displayFormat: format(".2f"),
	yAxisPad: 0,
	rectHeight: 20,
	rectWidth: 50,
	arrowWidth: 10,
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
	fontSize: 13,
	dx: 0,
	hideLine: false,
	fill: "#8a8a8a",
	opacity: 1,
	lineStroke: "#000000",
	lineOpacity: 0.3
};

function helper(props, moreProps) {
	var edgeType = props.type,
	    displayFormat = props.displayFormat,
	    itemType = props.itemType,
	    edgeAt = props.edgeAt,
	    yAxisPad = props.yAxisPad,
	    orient = props.orient;
	var yAccessor = props.yAccessor,
	    fill = props.fill,
	    textFill = props.textFill,
	    rectHeight = props.rectHeight,
	    rectWidth = props.rectWidth,
	    arrowWidth = props.arrowWidth;
	var fontFamily = props.fontFamily,
	    fontSize = props.fontSize;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale,
	    plotData = moreProps.plotData,
	    xAccessor = moreProps.xAccessor;

	// var currentItem = ChartDataUtil.getCurrentItemForChartNew(currentItems, forChart);

	var edge = null;
	// console.log(chartData.config.compareSeries.length);

	var item = itemType === "first" ? first(plotData, yAccessor) : last(plotData, yAccessor);

	if (isDefined(item)) {
		var yValue = yAccessor(item),
		    xValue = xAccessor(item);

		var x1 = Math.round(xScale(xValue)),
		    y1 = Math.round(yScale(yValue));

		var _xScale$range = xScale.range(),
		    _xScale$range2 = _slicedToArray(_xScale$range, 2),
		    left = _xScale$range2[0],
		    right = _xScale$range2[1];

		var edgeX = edgeAt === "left" ? left - yAxisPad : right + yAxisPad;

		edge = {
			// ...props,
			coordinate: displayFormat(yValue),
			show: true,
			type: edgeType,
			orient: orient,
			edgeAt: edgeX,
			fill: functor(fill)(item),
			fontFamily: fontFamily, fontSize: fontSize,
			textFill: functor(textFill)(item),
			rectHeight: rectHeight, rectWidth: rectWidth, arrowWidth: arrowWidth,
			x1: x1,
			y1: y1,
			x2: edgeX,
			y2: y1
		};
	}
	return edge;
}

export default EdgeIndicator;