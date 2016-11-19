"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d3Collection = require("d3-collection");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CandlestickSeries = function (_Component) {
	_inherits(CandlestickSeries, _Component);

	function CandlestickSeries(props) {
		_classCallCheck(this, CandlestickSeries);

		var _this = _possibleConstructorReturn(this, (CandlestickSeries.__proto__ || Object.getPrototypeOf(CandlestickSeries)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(CandlestickSeries, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			_drawOnCanvas(ctx, this.props, moreProps);
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props = this.props,
			    className = _props.className,
			    wickClassName = _props.wickClassName,
			    candleClassName = _props.candleClassName;


			return _react2.default.createElement(
				"g",
				{ className: className },
				_react2.default.createElement(
					"g",
					{ className: wickClassName, key: "wicks" },
					getWicksSVG(this.props, moreProps)
				),
				_react2.default.createElement(
					"g",
					{ className: candleClassName, key: "candles" },
					getCandlesSVG(this.props, moreProps)
				)
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

	return CandlestickSeries;
}(_react.Component);

CandlestickSeries.propTypes = {
	className: _react.PropTypes.string,
	wickClassName: _react.PropTypes.string,
	candleClassName: _react.PropTypes.string,
	widthRatio: _react.PropTypes.number.isRequired,
	classNames: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	fill: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	stroke: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	wickStroke: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	xAccessor: _react.PropTypes.func,
	yAccessor: _react.PropTypes.func.isRequired,
	xScale: _react.PropTypes.func,
	yScale: _react.PropTypes.func,
	plotData: _react.PropTypes.array
};

CandlestickSeries.defaultProps = {
	className: "react-stockcharts-candlestick",
	wickClassName: "react-stockcharts-candlestick-wick",
	candleClassName: "react-stockcharts-candlestick-candle",
	yAccessor: function yAccessor(d) {
		return { open: d.open, high: d.high, low: d.low, close: d.close };
	},
	classNames: function classNames(d) {
		return d.close > d.open ? "up" : "down";
	},
	widthRatio: 0.8,
	wickStroke: "#000000",
	// wickStroke: d => d.close > d.open ? "#6BA583" : "#FF0000",
	fill: function fill(d) {
		return d.close > d.open ? "#6BA583" : "#FF0000";
	},
	// stroke: d => d.close > d.open ? "#6BA583" : "#FF0000",
	stroke: "#000000",
	candleStrokeWidth: 0.5,
	// stroke: "none",
	opacity: 0.5
};

function getWicksSVG(props, moreProps) {

	/* eslint-disable react/prop-types */
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale,
	    plotData = moreProps.plotData,
	    xAccessor = moreProps.xAccessor;
	/* eslint-enable react/prop-types */

	var wickData = getWickData(props, xAccessor, xScale, yScale, plotData);
	var wicks = wickData.map(function (d, idx) {
		return _react2.default.createElement("path", { key: idx,
			className: d.className, stroke: d.stroke, style: { shapeRendering: "crispEdges" },
			d: "M" + d.x + "," + d.y1 + " L" + d.x + "," + d.y2 + " M" + d.x + "," + d.y3 + " L" + d.x + "," + d.y4 });
	});
	return wicks;
}

function getCandlesSVG(props, moreProps) {

	/* eslint-disable react/prop-types */
	var opacity = props.opacity,
	    candleStrokeWidth = props.candleStrokeWidth;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale,
	    plotData = moreProps.plotData,
	    xAccessor = moreProps.xAccessor;
	/* eslint-enable react/prop-types */

	var candleData = getCandleData(props, xAccessor, xScale, yScale, plotData);
	var candles = candleData.map(function (d, idx) {
		if (d.width < 0) return _react2.default.createElement("line", { className: d.className, key: idx,
			x1: d.x, y1: d.y, x2: d.x, y2: d.y + d.height,
			stroke: d.fill });else if (d.height === 0) return _react2.default.createElement("line", { key: idx,
			x1: d.x, y1: d.y, x2: d.x + d.width, y2: d.y + d.height,
			stroke: d.fill });
		return _react2.default.createElement("rect", { key: idx, className: d.className,
			fillOpacity: opacity,
			x: d.x, y: d.y, width: d.width, height: d.height,
			fill: d.fill, stroke: d.stroke, strokeWidth: candleStrokeWidth });
	});
	return candles;
}

function _drawOnCanvas(ctx, props, moreProps) {
	var opacity = props.opacity,
	    candleStrokeWidth = props.candleStrokeWidth;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale,
	    plotData = moreProps.plotData,
	    xAccessor = moreProps.xAccessor;


	var wickData = getWickData(props, xAccessor, xScale, yScale, plotData);

	var wickNest = (0, _d3Collection.nest)().key(function (d) {
		return d.stroke;
	}).entries(wickData);

	wickNest.forEach(function (outer) {
		var key = outer.key,
		    values = outer.values;

		ctx.strokeStyle = key;
		values.forEach(function (d) {
			ctx.beginPath();
			ctx.moveTo(d.x, d.y1);
			ctx.lineTo(d.x, d.y2);

			ctx.moveTo(d.x, d.y3);
			ctx.lineTo(d.x, d.y4);
			ctx.stroke();
		});
	});

	var candleData = getCandleData(props, xAccessor, xScale, yScale, plotData);

	var candleNest = (0, _d3Collection.nest)().key(function (d) {
		return d.stroke;
	}).key(function (d) {
		return d.fill;
	}).entries(candleData);

	candleNest.forEach(function (outer) {
		var strokeKey = outer.key,
		    strokeValues = outer.values;

		if (strokeKey !== "none") {
			ctx.strokeStyle = strokeKey;
			ctx.lineWidth = candleStrokeWidth;
		}
		strokeValues.forEach(function (inner) {
			var key = inner.key,
			    values = inner.values;

			ctx.fillStyle = (0, _utils.hexToRGBA)(key, opacity);

			values.forEach(function (d) {
				if (d.width < 0) {
					// <line className={d.className} key={idx} x1={d.x} y1={d.y} x2={d.x} y2={d.y + d.height}/>
					ctx.beginPath();
					ctx.moveTo(d.x, d.y);
					ctx.lineTo(d.x, d.y + d.height);
					ctx.stroke();
				} else if (d.height === 0) {
					// <line key={idx} x1={d.x} y1={d.y} x2={d.x + d.width} y2={d.y + d.height} />
					ctx.beginPath();
					ctx.moveTo(d.x, d.y);
					ctx.lineTo(d.x + d.width, d.y + d.height);
					ctx.stroke();
				} else {
					ctx.beginPath();
					ctx.rect(d.x, d.y, d.width, d.height);
					ctx.closePath();
					ctx.fill();
					if (strokeKey !== "none") ctx.stroke();
				}
			});
		});
	});
}

function getWickData(props, xAccessor, xScale, yScale, plotData) {
	var classNameProp = props.classNames,
	    wickStrokeProp = props.wickStroke,
	    yAccessor = props.yAccessor;

	var wickStroke = (0, _utils.functor)(wickStrokeProp);
	var className = (0, _utils.functor)(classNameProp);
	var wickData = plotData.filter(function (d) {
		return (0, _utils.isDefined)(yAccessor(d).close);
	}).map(function (d) {
		// console.log(yAccessor);
		var ohlc = yAccessor(d);

		var x = Math.round(xScale(xAccessor(d))),
		    y1 = yScale(ohlc.high),
		    y2 = yScale(Math.max(ohlc.open, ohlc.close)),
		    y3 = yScale(Math.min(ohlc.open, ohlc.close)),
		    y4 = yScale(ohlc.low);

		return {
			x: x,
			y1: y1,
			y2: y2,
			y3: y3,
			y4: y4,
			className: className(ohlc),
			direction: ohlc.close - ohlc.open,
			stroke: wickStroke(ohlc)
		};
	});
	return wickData;
}

function getCandleData(props, xAccessor, xScale, yScale, plotData) {
	var classNames = props.classNames,
	    fillProp = props.fill,
	    strokeProp = props.stroke,
	    widthRatio = props.widthRatio,
	    yAccessor = props.yAccessor;

	var fill = (0, _utils.functor)(fillProp);
	var stroke = (0, _utils.functor)(strokeProp);
	// console.log(plotData);
	var width = xScale(xAccessor((0, _utils.last)(plotData))) - xScale(xAccessor((0, _utils.first)(plotData)));
	var cw = width / (plotData.length - 1) * widthRatio;
	var candleWidth = Math.round(cw); // Math.floor(cw) % 2 === 0 ? Math.floor(cw) : Math.round(cw);

	var offset = candleWidth === 1 ? 0 : 0.5 * cw;
	var candles = plotData.filter(function (d) {
		return (0, _utils.isDefined)(yAccessor(d).close);
	}).map(function (d) {
		var ohlc = yAccessor(d);
		var x = Math.round(xScale(xAccessor(d)) - offset),
		    y = yScale(Math.max(ohlc.open, ohlc.close)),
		    height = Math.abs(yScale(ohlc.open) - yScale(ohlc.close)),
		    className = ohlc.open <= ohlc.close ? classNames.up : classNames.down;
		return {
			// type: "line"
			x: x,
			y: y,
			height: height,
			width: candleWidth,
			className: className,
			fill: fill(ohlc),
			stroke: stroke(ohlc),
			direction: ohlc.close - ohlc.open
		};
	});
	return candles;
}

exports.default = CandlestickSeries;