"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d3Array = require("d3-array");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _StackedBarSeries = require("./StackedBarSeries");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OverlayBarSeries = function (_Component) {
	_inherits(OverlayBarSeries, _Component);

	function OverlayBarSeries(props) {
		_classCallCheck(this, OverlayBarSeries);

		var _this = _possibleConstructorReturn(this, (OverlayBarSeries.__proto__ || Object.getPrototypeOf(OverlayBarSeries)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(OverlayBarSeries, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var yAccessor = this.props.yAccessor;
			var xAccessor = moreProps.xAccessor;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData;


			var bars = getBars(this.props, xAccessor, yAccessor, xScale, yScale, plotData);

			(0, _StackedBarSeries.drawOnCanvas2)(this.props, ctx, bars);
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var yAccessor = this.props.yAccessor;
			var xAccessor = moreProps.xAccessor;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData;


			var bars = getBars(this.props, xAccessor, yAccessor, xScale, yScale, plotData);
			return _react2.default.createElement(
				"g",
				{ className: "react-stockcharts-bar-series" },
				(0, _StackedBarSeries.getBarsSVG2)(this.props, bars)
			);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericChartComponent2.default, {
				canvasToDraw: _GenericChartComponent.getAxisCanvas,
				svgDraw: this.renderSVG,
				canvasDraw: this.drawOnCanvas,
				drawOnPan: true
			});
		}
	}]);

	return OverlayBarSeries;
}(_react.Component);

OverlayBarSeries.propTypes = {
	baseAt: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,
	direction: _react.PropTypes.oneOf(["up", "down"]).isRequired,
	stroke: _react.PropTypes.bool.isRequired,
	widthRatio: _react.PropTypes.number.isRequired,
	opacity: _react.PropTypes.number.isRequired,
	fill: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	className: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	xAccessor: _react.PropTypes.func,
	yAccessor: _react.PropTypes.arrayOf(_react.PropTypes.func),
	xScale: _react.PropTypes.func,
	yScale: _react.PropTypes.func,
	plotData: _react.PropTypes.array
};

OverlayBarSeries.defaultProps = {
	baseAt: function baseAt(xScale, yScale /* , d*/) {
		return (0, _utils.first)(yScale.range());
	},
	direction: "up",
	className: "bar",
	stroke: false,
	fill: "#4682B4",
	opacity: 1,
	widthRatio: 0.5
};

function getBars(props, xAccessor, yAccessor, xScale, yScale, plotData) {
	var baseAt = props.baseAt,
	    className = props.className,
	    fill = props.fill,
	    stroke = props.stroke,
	    widthRatio = props.widthRatio;


	var getClassName = (0, _utils.functor)(className);
	var getFill = (0, _utils.functor)(fill);
	var getBase = (0, _utils.functor)(baseAt);

	var width = Math.abs(xScale(xAccessor((0, _utils.last)(plotData))) - xScale(xAccessor((0, _utils.first)(plotData))));

	var bw = width / (plotData.length - 1) * widthRatio;
	var barWidth = Math.round(bw);
	var offset = barWidth === 1 ? 0 : 0.5 * bw;

	// console.log(xScale.domain(), yScale.domain());

	var bars = plotData.map(function (d) {
		var innerBars = yAccessor.map(function (eachYAccessor, i) {
			var yValue = eachYAccessor(d);
			if ((0, _utils.isNotDefined)(yValue)) return undefined;

			var xValue = xAccessor(d);
			var x = Math.round(xScale(xValue)) - offset;
			var y = yScale(yValue);
			// console.log(yValue, y, xValue, x)
			return {
				width: barWidth,
				x: x,
				y: y,
				className: getClassName(d, i),
				stroke: stroke ? getFill(d, i) : "none",
				fill: getFill(d, i),
				i: i
			};
		}).filter(function (yValue) {
			return (0, _utils.isDefined)(yValue);
		});

		var b = getBase(xScale, yScale, d);
		var h;
		for (var i = innerBars.length - 1; i >= 0; i--) {
			h = b - innerBars[i].y;
			if (h < 0) {
				innerBars[i].y = b;
				h = -1 * h;
			}
			innerBars[i].height = h;
			b = innerBars[i].y;
		}
		return innerBars;
	});

	return (0, _d3Array.merge)(bars);
}

exports.default = OverlayBarSeries;