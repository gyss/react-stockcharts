"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _GenericComponent = require("../GenericComponent");

var _GenericComponent2 = _interopRequireDefault(_GenericComponent);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HoverTooltip = function (_Component) {
	_inherits(HoverTooltip, _Component);

	function HoverTooltip(props) {
		_classCallCheck(this, HoverTooltip);

		var _this = _possibleConstructorReturn(this, (HoverTooltip.__proto__ || Object.getPrototypeOf(HoverTooltip)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(HoverTooltip, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var pointer = helper(this.props, moreProps);
			var height = moreProps.height;


			if ((0, _utils.isNotDefined)(pointer)) return null;
			_drawOnCanvas(ctx, this.props, this.context, pointer, height, moreProps);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericComponent2.default, {
				svgDraw: this.renderSVG,
				canvasDraw: this.drawOnCanvas,
				drawOnMouseMove: true,
				drawOnPan: true,
				drawOnMouseExitOfCanvas: true
			});
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var pointer = helper(this.props, moreProps);

			if ((0, _utils.isNotDefined)(pointer)) return null;

			var _props = this.props,
			    chartId = _props.chartId,
			    yAccessor = _props.yAccessor,
			    bgFill = _props.bgFill,
			    bgOpacity = _props.bgOpacity,
			    bgwidth = _props.bgwidth,
			    bgheight = _props.bgheight,
			    backgroundShapeSVG = _props.backgroundShapeSVG;
			var height = moreProps.height,
			    xAccessor = moreProps.xAccessor,
			    xScale = moreProps.xScale,
			    chartConfig = moreProps.chartConfig,
			    currentItem = moreProps.currentItem;
			var x = pointer.x,
			    y = pointer.y,
			    content = pointer.content,
			    centerX = pointer.centerX,
			    drawWidth = pointer.drawWidth;


			if (chartId && yAccessor) {
				var xValue = xAccessor(currentItem);
				var yValue = yAccessor(currentItem);
				var chartIndex = chartConfig.findIndex(function (x) {
					return x.id === chartId;
				});

				x = Math.round(xScale(xValue));
				y = Math.round(chartConfig[chartIndex].yScale(yValue));

				x = x - bgwidth - PADDING * 2 < 0 ? x + PADDING : x - bgwidth - PADDING;
				y = y - bgheight < 0 ? y + PADDING : y - bgheight - PADDING;
			}

			return _react2.default.createElement(
				"g",
				null,
				_react2.default.createElement("rect", { x: centerX - drawWidth / 2, y: 0, width: drawWidth, height: height, fill: bgFill, opacity: bgOpacity }),
				_react2.default.createElement(
					"g",
					{ className: "react-stockcharts-tooltip-content", transform: "translate(" + x + ", " + y + ")" },
					backgroundShapeSVG(this.props),
					tooltipSVG(this.props, content)
				)
			);
		}
	}]);

	return HoverTooltip;
}(_react.Component);

HoverTooltip.propTypes = {
	chartId: _react.PropTypes.number,
	yAccessor: _react.PropTypes.func,
	backgroundShapeSVG: _react.PropTypes.func,
	bgwidth: _react.PropTypes.number.isRequired,
	bgheight: _react.PropTypes.number.isRequired,
	bgFill: _react.PropTypes.string.isRequired,
	bgOpacity: _react.PropTypes.number.isRequired,
	tooltipContent: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]).isRequired,
	origin: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.func]).isRequired,
	fontFamily: _react.PropTypes.string,
	fontSize: _react.PropTypes.number
};

HoverTooltip.contextTypes = {
	margin: _react.PropTypes.object.isRequired,
	ratio: _react.PropTypes.number.isRequired
};

HoverTooltip.defaultProps = {
	bgwidth: 150,
	bgheight: 50,
	tooltipSVG: tooltipSVG,
	tooltipCanvas: tooltipCanvas,
	origin: origin,
	fill: "#D4E2FD",
	bgFill: "#D4E2FD",
	bgOpacity: 0.5,
	stroke: "#9B9BFF",
	fontFill: "#000000",
	opacity: 0.8,
	backgroundShapeSVG: backgroundShapeSVG,
	backgroundShapeCanvas: backgroundShapeCanvas,
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
	fontSize: 12
};

var PADDING = 5;
var X = 10;
var Y = 10;

/* eslint-disable react/prop-types */
function backgroundShapeSVG(_ref) {
	var bgheight = _ref.bgheight,
	    bgwidth = _ref.bgwidth,
	    fill = _ref.fill,
	    stroke = _ref.stroke,
	    opacity = _ref.opacity;

	return _react2.default.createElement("rect", { height: bgheight, width: bgwidth, fill: fill, opacity: opacity, stroke: stroke });
}

function tooltipSVG(_ref2, content) {
	var fontFamily = _ref2.fontFamily,
	    fontSize = _ref2.fontSize,
	    fontFill = _ref2.fontFill;

	var tspans = [];
	for (var i = 0; i < content.y.length; i++) {
		var y = content.y[i];
		tspans.push(_react2.default.createElement(
			"tspan",
			{ key: "L-" + i, x: 10, dy: fontSize, fill: y.stroke },
			y.label
		));
		tspans.push(_react2.default.createElement(
			"tspan",
			{ key: "" + i },
			": "
		));
		tspans.push(_react2.default.createElement(
			"tspan",
			{ key: "V-" + i },
			y.value
		));
	}
	return _react2.default.createElement(
		"text",
		{ fontFamily: fontFamily, fontSize: fontSize, fill: fontFill },
		_react2.default.createElement(
			"tspan",
			{ x: 10, y: 15 },
			content.x
		),
		tspans
	);
}
/* eslint-enable react/prop-types */

function calculateTooltipSize(_ref3, content) {
	var fontFamily = _ref3.fontFamily,
	    fontSize = _ref3.fontSize,
	    fontFill = _ref3.fontFill;

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var width = 0;
	var height = content.y.length * fontSize + fontSize;

	ctx.font = fontSize + "px " + fontFamily;
	ctx.fillStyle = fontFill;
	ctx.textAlign = "left";
	for (var i = 0; i < content.y.length; i++) {
		var y = content.y[i];
		var textWidth = ctx.measureText(y.label + ": " + y.value).width;
		if (textWidth > width) width = textWidth;
	}
	return {
		width: width + 2 * X,
		height: height + 2 * Y
	};
}

function backgroundShapeCanvas(props, content, ctx) {
	var fill = props.fill,
	    stroke = props.stroke,
	    opacity = props.opacity;

	var _calculateTooltipSize = calculateTooltipSize(props, content),
	    width = _calculateTooltipSize.width,
	    height = _calculateTooltipSize.height;

	ctx.fillStyle = (0, _utils.hexToRGBA)(fill, opacity);
	ctx.strokeStyle = stroke;
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.fill();
	ctx.stroke();
}

function tooltipCanvas(_ref4, content, ctx) {
	var fontFamily = _ref4.fontFamily,
	    fontSize = _ref4.fontSize,
	    fontFill = _ref4.fontFill;

	var startY = Y + fontSize * 0.9;
	ctx.font = fontSize + "px " + fontFamily;
	ctx.fillStyle = fontFill;
	ctx.textAlign = "left";
	ctx.fillText(content.x, X, startY);

	for (var i = 0; i < content.y.length; i++) {
		var y = content.y[i];
		var textY = startY + fontSize * (i + 1);
		ctx.fillStyle = y.stroke || fontFill;
		ctx.fillText(y.label, X, textY);

		ctx.fillStyle = fontFill;
		ctx.fillText(": " + y.value, X + ctx.measureText(y.label).width, textY);
	}
}

function origin(mouseXY, bgheight, bgwidth, xAccessor, currentItem, xScale) {
	var y = (0, _utils.last)(mouseXY);

	var snapX = xScale(xAccessor(currentItem));
	var originX = snapX - bgwidth - PADDING * 2 < 0 ? snapX + PADDING : snapX - bgwidth - PADDING;
	// originX = (x - width - PADDING * 2 < 0) ? x + PADDING : x - width - PADDING;

	var originY = y - bgheight / 2;
	return [originX, originY];
}

function _drawOnCanvas(ctx, props, context, pointer, height, moreProps) {
	var margin = context.margin,
	    ratio = context.ratio;
	var bgwidth = props.bgwidth,
	    bgheight = props.bgheight,
	    bgFill = props.bgFill,
	    bgOpacity = props.bgOpacity,
	    chartId = props.chartId,
	    yAccessor = props.yAccessor;
	var backgroundShapeCanvas = props.backgroundShapeCanvas,
	    tooltipCanvas = props.tooltipCanvas;
	var xAccessor = moreProps.xAccessor,
	    xScale = moreProps.xScale,
	    chartConfig = moreProps.chartConfig,
	    currentItem = moreProps.currentItem;


	var originX = 0.5 * ratio + margin.left;
	var originY = 0.5 * ratio + margin.top;

	ctx.save();

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.scale(ratio, ratio);

	ctx.translate(originX, originY);

	var x = pointer.x,
	    y = pointer.y,
	    content = pointer.content,
	    centerX = pointer.centerX,
	    drawWidth = pointer.drawWidth;


	if (chartId && yAccessor) {
		var xValue = xAccessor(currentItem);
		var yValue = yAccessor(currentItem);
		var chartIndex = chartConfig.findIndex(function (x) {
			return x.id === chartId;
		});

		x = Math.round(xScale(xValue));
		y = Math.round(chartConfig[chartIndex].yScale(yValue));

		x = x - bgwidth - PADDING * 2 < 0 ? x + PADDING : x - bgwidth - PADDING;
		y = y - bgheight < 0 ? y + PADDING : y - bgheight - PADDING;
	}

	ctx.fillStyle = (0, _utils.hexToRGBA)(bgFill, bgOpacity);
	ctx.beginPath();
	ctx.rect(centerX - drawWidth / 2, 0, drawWidth, height);
	ctx.fill();

	ctx.translate(x, y);
	backgroundShapeCanvas(props, content, ctx);
	tooltipCanvas(props, content, ctx);

	ctx.restore();
}

function helper(props, moreProps) {
	var show = moreProps.show,
	    xScale = moreProps.xScale,
	    mouseXY = moreProps.mouseXY,
	    currentItem = moreProps.currentItem,
	    plotData = moreProps.plotData;
	var bgheight = props.bgheight,
	    bgwidth = props.bgwidth,
	    origin = props.origin,
	    tooltipContent = props.tooltipContent;
	var xAccessor = moreProps.xAccessor,
	    displayXAccessor = moreProps.displayXAccessor;


	if (!show || (0, _utils.isNotDefined)(currentItem)) return;

	var xValue = xAccessor(currentItem);

	if (!show || (0, _utils.isNotDefined)(xValue)) return;

	var _origin = origin(mouseXY, bgheight, bgwidth, xAccessor, currentItem, xScale),
	    _origin2 = _slicedToArray(_origin, 2),
	    x = _origin2[0],
	    y = _origin2[1];

	var content = tooltipContent({ currentItem: currentItem, xAccessor: displayXAccessor });
	var centerX = xScale(xValue);
	var drawWidth = Math.abs(xScale(xAccessor((0, _utils.last)(plotData))) - xScale(xAccessor((0, _utils.first)(plotData)))) / (plotData.length - 1);

	return { x: x, y: y, content: content, centerX: centerX, drawWidth: drawWidth };
}

exports.default = HoverTooltip;