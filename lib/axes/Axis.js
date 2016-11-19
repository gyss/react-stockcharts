"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _d3Force = require("d3-force");

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _AxisZoomCapture = require("./AxisZoomCapture");

var _AxisZoomCapture2 = _interopRequireDefault(_AxisZoomCapture);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Axis = function (_Component) {
	_inherits(Axis, _Component);

	function Axis(props) {
		_classCallCheck(this, Axis);

		var _this = _possibleConstructorReturn(this, (Axis.__proto__ || Object.getPrototypeOf(Axis)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.getMoreProps = _this.getMoreProps.bind(_this);

		return _this;
	}

	_createClass(Axis, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props = this.props,
			    showDomain = _props.showDomain,
			    showTicks = _props.showTicks,
			    transform = _props.transform,
			    range = _props.range,
			    getScale = _props.getScale;


			ctx.save();
			ctx.translate(transform[0], transform[1]);

			if (showDomain) drawAxisLine(ctx, this.props, range);
			if (showTicks) {
				var tickProps = tickHelper(this.props, getScale(moreProps));
				drawTicks(ctx, tickProps);
			}

			ctx.restore();
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var className = this.props.className;
			var _props2 = this.props,
			    showDomain = _props2.showDomain,
			    showTicks = _props2.showTicks,
			    range = _props2.range,
			    getScale = _props2.getScale;


			var ticks = showTicks ? axisTicksSVG(this.props, getScale(moreProps)) : null;
			var domain = showDomain ? axisLineSVG(this.props, range) : null;

			return _react2.default.createElement(
				"g",
				{ className: className },
				ticks,
				domain
			);
		}
	}, {
		key: "getMoreProps",
		value: function getMoreProps() {
			return this.refs.propProvider.getMoreProps();
		}
	}, {
		key: "render",
		value: function render() {
			var _props3 = this.props,
			    bg = _props3.bg,
			    axisZoomCallback = _props3.axisZoomCallback,
			    zoomCursorClassName = _props3.zoomCursorClassName,
			    zoomEnabled = _props3.zoomEnabled,
			    getScale = _props3.getScale,
			    inverted = _props3.inverted;
			var _props4 = this.props,
			    transform = _props4.transform,
			    getMouseDelta = _props4.getMouseDelta,
			    edgeClip = _props4.edgeClip;
			var _props5 = this.props,
			    onContextMenu = _props5.onContextMenu,
			    onDoubleClick = _props5.onDoubleClick;


			var zoomCapture = zoomEnabled ? _react2.default.createElement(_AxisZoomCapture2.default, {
				bg: bg,
				getScale: getScale,
				getMoreProps: this.getMoreProps,
				getMouseDelta: getMouseDelta,
				axisZoomCallback: axisZoomCallback,
				zoomCursorClassName: zoomCursorClassName,
				onContextMenu: onContextMenu,
				inverted: inverted,
				onDoubleClick: onDoubleClick
			}) : null;

			return _react2.default.createElement(
				"g",
				{ transform: "translate(" + transform[0] + ", " + transform[1] + ")" },
				zoomCapture,
				_react2.default.createElement(_GenericChartComponent2.default, { ref: "propProvider",
					canvasToDraw: _GenericChartComponent.getAxisCanvas,
					clip: false,
					edgeClip: edgeClip,
					svgDraw: this.renderSVG,
					canvasDraw: this.drawOnCanvas,
					drawOnPan: true
				})
			);
		}
	}]);

	return Axis;
}(_react.Component);

Axis.propTypes = {
	innerTickSize: _react.PropTypes.number,
	outerTickSize: _react.PropTypes.number,
	tickFormat: _react.PropTypes.func,
	tickPadding: _react.PropTypes.number,
	tickSize: _react.PropTypes.number,
	ticks: _react.PropTypes.number,
	tickValues: _react.PropTypes.array,
	showDomain: _react.PropTypes.bool,
	showTicks: _react.PropTypes.bool,
	className: _react.PropTypes.string,
	axisZoomCallback: _react.PropTypes.func,
	zoomEnabled: _react.PropTypes.bool,
	inverted: _react.PropTypes.bool,
	zoomCursorClassName: _react.PropTypes.string,
	transform: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired,
	range: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired,
	getMouseDelta: _react.PropTypes.func.isRequired,
	getScale: _react.PropTypes.func.isRequired,
	bg: _react.PropTypes.object.isRequired,
	edgeClip: _react.PropTypes.bool.isRequired,
	onContextMenu: _react.PropTypes.func,
	onDoubleClick: _react.PropTypes.func
};

Axis.defaultProps = {
	zoomEnabled: false,
	zoomCursorClassName: "",
	edgeClip: false
};

Axis.contextTypes = {
	height: _react.PropTypes.number.isRequired,
	width: _react.PropTypes.number.isRequired
};

function tickHelper(props, scale) {
	var orient = props.orient,
	    innerTickSize = props.innerTickSize,
	    tickFormat = props.tickFormat,
	    tickPadding = props.tickPadding,
	    fontSize = props.fontSize,
	    fontFamily = props.fontFamily,
	    showTicks = props.showTicks,
	    flexTicks = props.flexTicks;
	var tickArguments = props.ticks,
	    tickValuesProp = props.tickValues,
	    tickStroke = props.tickStroke,
	    tickStrokeOpacity = props.tickStrokeOpacity;

	// if (tickArguments) tickArguments = [tickArguments];

	var tickValues = (0, _utils.isNotDefined)(tickValuesProp) ? (0, _utils.isDefined)(scale.ticks) ? scale.ticks(tickArguments, flexTicks) : scale.domain() : tickValuesProp;

	var baseFormat = scale.tickFormat ? scale.tickFormat(tickArguments) : _utils.identity;

	var format = (0, _utils.isNotDefined)(tickFormat) ? baseFormat : function (d) {
		return baseFormat(d) ? tickFormat(d) : "";
	};

	var sign = orient === "top" || orient === "left" ? -1 : 1;
	var tickSpacing = Math.max(innerTickSize, 0) + tickPadding;

	var ticks, dy, canvas_dy, textAnchor;

	if (orient === "bottom" || orient === "top") {
		dy = sign < 0 ? "0em" : ".71em";
		canvas_dy = sign < 0 ? 0 : fontSize * .71;
		textAnchor = "middle";

		ticks = tickValues.map(function (d) {
			var x = scale(d);
			return {
				value: d,
				x1: x,
				y1: 0,
				x2: x,
				y2: sign * innerTickSize,
				labelX: x,
				labelY: sign * tickSpacing
			};
		});

		if (showTicks && flexTicks) {
			// console.log(ticks, showTicks);

			var nodes = ticks.map(function (d) {
				return { id: d.value, value: d.value, fy: d.y2, origX: d.x1 };
			});

			var simulation = (0, _d3Force.forceSimulation)(nodes).force("x", (0, _d3Force.forceX)(function (d) {
				return d.origX;
			}).strength(1)).force("collide", (0, _d3Force.forceCollide)(22))
			// .force("center", forceCenter())
			.stop();

			for (var i = 0; i < 100; ++i) {
				simulation.tick();
			} // console.log(nodes);

			var zip = (0, _utils.zipper)().combine(function (a, b) {
				if (Math.abs(b.x - b.origX) > 0.01) {
					return _extends({}, a, {
						x2: b.x,
						labelX: b.x
					});
				}
				return a;
			});

			ticks = zip(ticks, nodes);
		}
	} else {
		ticks = tickValues.map(function (d) {
			var y = scale(d);
			return {
				value: d,
				x1: 0,
				y1: y,
				x2: sign * innerTickSize,
				y2: y,
				labelX: sign * tickSpacing,
				labelY: y
			};
		});

		dy = ".32em";
		canvas_dy = fontSize * .32;
		textAnchor = sign < 0 ? "end" : "start";
	}

	return { ticks: ticks, scale: scale, tickStroke: tickStroke, tickStrokeOpacity: tickStrokeOpacity, dy: dy, canvas_dy: canvas_dy, textAnchor: textAnchor, fontSize: fontSize, fontFamily: fontFamily, format: format };
}

/* eslint-disable react/prop-types */
function axisLineSVG(props, range) {
	var orient = props.orient,
	    outerTickSize = props.outerTickSize;
	var domainClassName = props.domainClassName,
	    fill = props.fill,
	    stroke = props.stroke,
	    strokeWidth = props.strokeWidth,
	    opacity = props.opacity;


	var sign = orient === "top" || orient === "left" ? -1 : 1;

	var d;

	if (orient === "bottom" || orient === "top") {
		d = "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize;
	} else {
		d = "M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize;
	}

	return _react2.default.createElement("path", {
		className: domainClassName,
		d: d,
		fill: fill,
		opacity: opacity,
		stroke: stroke,
		strokeWidth: strokeWidth });
}
/* eslint-enable react/prop-types */

function drawAxisLine(ctx, props, range) {
	// props = { ...AxisLine.defaultProps, ...props };

	var orient = props.orient,
	    outerTickSize = props.outerTickSize,
	    stroke = props.stroke,
	    strokeWidth = props.strokeWidth,
	    opacity = props.opacity;


	var sign = orient === "top" || orient === "left" ? -1 : 1;
	var xAxis = orient === "bottom" || orient === "top";

	// var range = d3_scaleRange(xAxis ? xScale : yScale);

	ctx.lineWidth = strokeWidth;
	ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, opacity);

	ctx.beginPath();

	if (xAxis) {
		ctx.moveTo((0, _utils.first)(range), sign * outerTickSize);
		ctx.lineTo((0, _utils.first)(range), 0);
		ctx.lineTo((0, _utils.last)(range), 0);
		ctx.lineTo((0, _utils.last)(range), sign * outerTickSize);
	} else {
		ctx.moveTo(sign * outerTickSize, (0, _utils.first)(range));
		ctx.lineTo(0, (0, _utils.first)(range));
		ctx.lineTo(0, (0, _utils.last)(range));
		ctx.lineTo(sign * outerTickSize, (0, _utils.last)(range));
	}
	ctx.stroke();
}

function Tick(props) {
	var tickStroke = props.tickStroke,
	    tickStrokeOpacity = props.tickStrokeOpacity,
	    textAnchor = props.textAnchor,
	    fontSize = props.fontSize,
	    fontFamily = props.fontFamily;
	var x1 = props.x1,
	    y1 = props.y1,
	    x2 = props.x2,
	    y2 = props.y2,
	    labelX = props.labelX,
	    labelY = props.labelY,
	    dy = props.dy;

	return _react2.default.createElement(
		"g",
		{ className: "tick" },
		_react2.default.createElement("line", { shapeRendering: "crispEdges", opacity: tickStrokeOpacity, stroke: tickStroke,
			x1: x1, y1: y1,
			x2: x2, y2: y2 }),
		_react2.default.createElement(
			"text",
			{
				dy: dy, x: labelX, y: labelY,
				fill: tickStroke,
				fontSize: fontSize,
				fontFamily: fontFamily,
				textAnchor: textAnchor },
			props.children
		)
	);
}

Tick.propTypes = {
	children: _react.PropTypes.string.isRequired,
	x1: _react.PropTypes.number.isRequired,
	y1: _react.PropTypes.number.isRequired,
	x2: _react.PropTypes.number.isRequired,
	y2: _react.PropTypes.number.isRequired,
	labelX: _react.PropTypes.number.isRequired,
	labelY: _react.PropTypes.number.isRequired,
	dy: _react.PropTypes.string.isRequired,
	tickStroke: _react.PropTypes.string,
	tickStrokeOpacity: _react.PropTypes.number,
	textAnchor: _react.PropTypes.string,
	fontSize: _react.PropTypes.number,
	fontFamily: _react.PropTypes.string
};

function axisTicksSVG(props, scale) {
	var result = tickHelper(props, scale);

	var tickStroke = result.tickStroke,
	    tickStrokeOpacity = result.tickStrokeOpacity,
	    textAnchor = result.textAnchor;
	var fontSize = result.fontSize,
	    fontFamily = result.fontFamily,
	    ticks = result.ticks,
	    format = result.format;
	var dy = result.dy;


	return _react2.default.createElement(
		"g",
		null,
		ticks.map(function (tick, idx) {
			return _react2.default.createElement(
				Tick,
				{ key: idx,
					tickStroke: tickStroke, tickStrokeOpacity: tickStrokeOpacity,
					dy: dy,
					x1: tick.x1, y1: tick.y1,
					x2: tick.x2, y2: tick.y2,
					labelX: tick.labelX, labelY: tick.labelY,
					textAnchor: textAnchor,
					fontSize: fontSize, fontFamily: fontFamily },
				format(tick.value)
			);
		})
	);
}

function drawTicks(ctx, result) {
	var tickStroke = result.tickStroke,
	    tickStrokeOpacity = result.tickStrokeOpacity,
	    textAnchor = result.textAnchor,
	    fontSize = result.fontSize,
	    fontFamily = result.fontFamily,
	    ticks = result.ticks;


	ctx.strokeStyle = (0, _utils.hexToRGBA)(tickStroke, tickStrokeOpacity);

	ctx.font = fontSize + "px " + fontFamily;
	ctx.fillStyle = tickStroke;
	ctx.textAlign = textAnchor === "middle" ? "center" : textAnchor;
	// ctx.textBaseline = 'middle';

	ticks.forEach(function (tick) {
		drawEachTick(ctx, tick, result);
	});
}

function drawEachTick(ctx, tick, result) {
	var canvas_dy = result.canvas_dy,
	    format = result.format;


	ctx.beginPath();

	ctx.moveTo(tick.x1, tick.y1);
	ctx.lineTo(tick.x2, tick.y2);
	ctx.stroke();

	ctx.fillText(format(tick.value), tick.labelX, tick.labelY + canvas_dy);
}

exports.default = Axis;