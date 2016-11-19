"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../utils");

var _InteractiveLine = require("./InteractiveLine");

var _InteractiveLine2 = _interopRequireDefault(_InteractiveLine);

var _MouseLocationIndicator = require("./MouseLocationIndicator");

var _MouseLocationIndicator2 = _interopRequireDefault(_MouseLocationIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FibonacciRetracement = function (_Component) {
	_inherits(FibonacciRetracement, _Component);

	function FibonacciRetracement(props) {
		_classCallCheck(this, FibonacciRetracement);

		var _this = _possibleConstructorReturn(this, (FibonacciRetracement.__proto__ || Object.getPrototypeOf(FibonacciRetracement)).call(this, props));

		_this.handleStartAndEnd = _this.handleStartAndEnd.bind(_this);
		_this.handleDrawRetracement = _this.handleDrawRetracement.bind(_this);

		_this.handleEdge1Drag = _this.handleEdge1Drag.bind(_this);
		_this.handleEdge2Drag = _this.handleEdge2Drag.bind(_this);

		_this.handleDrag = _this.handleDrag.bind(_this);
		_this.handleDragComplete = _this.handleDragComplete.bind(_this);

		_this.state = _this.props.init;
		return _this;
	}

	_createClass(FibonacciRetracement, [{
		key: "removeLast",
		value: function removeLast() {
			var retracements = this.state.retracements;

			if ((0, _utils.isDefined)(retracements) && retracements.length > 0) {
				this.setState({
					retracements: retracements.slice(0, retracements.length - 1)
				});
			}
		}
	}, {
		key: "terminate",
		value: function terminate() {
			this.setState({
				current: null,
				override: null
			});
		}
	}, {
		key: "handleStartAndEnd",
		value: function handleStartAndEnd(xyValue) {
			var _this2 = this;

			var _state = this.state,
			    current = _state.current,
			    retracements = _state.retracements;


			if ((0, _utils.isNotDefined)(current) || (0, _utils.isNotDefined)(current.x1)) {
				this.setState({
					current: {
						x1: xyValue[0],
						y1: xyValue[1],
						x2: null,
						y2: null
					}
				}, function () {
					_this2.props.onStart();
				});
			} else {
				this.setState({
					retracements: retracements.concat(_extends({}, current, { x2: xyValue[0], y2: xyValue[1] })),
					current: null
				}, function () {
					_this2.props.onComplete();
				});
			}
		}
	}, {
		key: "handleDrawRetracement",
		value: function handleDrawRetracement(xyValue) {
			var current = this.state.current;


			if ((0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.x1)) {
				this.setState({
					current: _extends({}, current, {
						x2: xyValue[0],
						y2: xyValue[1]
					})
				});
			}
		}
	}, {
		key: "handleDrag",
		value: function handleDrag(echo, newXYValue, origXYValue) {
			var retracements = this.state.retracements;
			var index = echo.index;

			var dy = origXYValue.y1Value - newXYValue.y1Value;

			this.setState({
				override: {
					index: index,
					x1: newXYValue.x1Value,
					y1: retracements[index].y1 - dy,
					x2: newXYValue.x2Value,
					y2: retracements[index].y2 - dy
				}
			});
		}
	}, {
		key: "handleEdge1Drag",
		value: function handleEdge1Drag(echo, newXYValue, origXYValue) {
			var retracements = this.state.retracements;
			var index = echo.index;


			var dx = origXYValue.x1Value - newXYValue.x1Value;

			this.setState({
				override: {
					index: index,
					x1: retracements[index].x1 - dx,
					y1: retracements[index].y1,
					x2: retracements[index].x2,
					y2: retracements[index].y2
				}
			});
		}
	}, {
		key: "handleEdge2Drag",
		value: function handleEdge2Drag(echo, newXYValue, origXYValue) {
			var retracements = this.state.retracements;
			var index = echo.index;


			var dx = origXYValue.x2Value - newXYValue.x2Value;

			this.setState({
				override: {
					index: index,
					x1: retracements[index].x1,
					y1: retracements[index].y1,
					x2: retracements[index].x2 - dx,
					y2: retracements[index].y2
				}
			});
		}
	}, {
		key: "handleDragComplete",
		value: function handleDragComplete() {
			var _state2 = this.state,
			    retracements = _state2.retracements,
			    override = _state2.override;


			if ((0, _utils.isDefined)(override)) {
				var index = override.index,
				    rest = _objectWithoutProperties(override, ["index"]);

				var newRetracements = retracements.map(function (each, idx) {
					return idx === index ? rest : each;
				});

				this.setState({
					override: null,
					retracements: newRetracements
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var _state3 = this.state,
			    retracements = _state3.retracements,
			    current = _state3.current,
			    override = _state3.override;
			var _props = this.props,
			    stroke = _props.stroke,
			    strokeWidth = _props.strokeWidth,
			    opacity = _props.opacity,
			    fontFamily = _props.fontFamily,
			    fontSize = _props.fontSize,
			    fontStroke = _props.fontStroke,
			    type = _props.type;


			var lineType = type === "EXTEND" ? "XLINE" : "LINE";

			var enabled = this.props.enabled;


			var currentRetracement = null;
			if ((0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.x2)) {
				var lines = helper(current);
				var dir = (0, _utils.head)(lines).y1 > (0, _utils.last)(lines).y1 ? 3 : -1.3;

				currentRetracement = lines.map(function (line, idx) {
					var text = line.y.toFixed(2) + " (" + line.percent.toFixed(2) + "%)";

					return _react2.default.createElement(
						_InteractiveLine2.default,
						{ key: idx,
							type: lineType,
							x1Value: line.x1,
							y1Value: line.y,
							x2Value: line.x2,
							y2Value: line.y,

							childProps: { dir: dir, text: text, fontFamily: fontFamily, fontSize: fontSize, fontStroke: fontStroke },

							stroke: stroke, strokeWidth: strokeWidth, opacity: opacity },
						retracementText
					);
				});
			}

			return _react2.default.createElement(
				"g",
				null,
				retracements.map(function (each, idx) {
					var lines = helper((0, _utils.isDefined)(override) && override.index === idx ? override : each);

					var dir = (0, _utils.head)(lines).y1 > (0, _utils.last)(lines).y1 ? 3 : -1.3;
					return lines.map(function (line, j) {
						var text = line.y.toFixed(2) + " (" + line.percent.toFixed(2) + "%)";

						return _react2.default.createElement(
							_InteractiveLine2.default,
							{ key: idx + "-" + j, withEdge: true,
								echo: { index: idx, idx: j }, type: lineType,
								defaultClassName: "react-stockcharts-enable-interaction react-stockcharts-move-cursor",
								x1Value: line.x1,
								y1Value: line.y,
								x2Value: line.x2,
								y2Value: line.y,

								childProps: { dir: dir, text: text, fontFamily: fontFamily, fontSize: fontSize, fontStroke: fontStroke },

								stroke: stroke, strokeWidth: strokeWidth, opacity: opacity,
								onEdge1Drag: _this3.handleEdge1Drag,
								onEdge2Drag: _this3.handleEdge2Drag,
								onDrag: _this3.handleDrag,
								onDragComplete: _this3.handleDragComplete },
							retracementText
						);
					});
				}),
				currentRetracement,
				_react2.default.createElement(_MouseLocationIndicator2.default, {
					enabled: enabled,
					snap: false,
					r: 0,
					onMouseDown: this.handleStartAndEnd,
					onMouseMove: this.handleDrawRetracement })
			);
		}
	}]);

	return FibonacciRetracement;
}(_react.Component);

/* eslint-disable react/prop-types */

function retracementText(_ref, props, modLine) {
	var xScale = _ref.xScale,
	    chartConfig = _ref.chartConfig;
	var _props$childProps = props.childProps,
	    text = _props$childProps.text,
	    dir = _props$childProps.dir,
	    fontStroke = _props$childProps.fontStroke,
	    fontFamily = _props$childProps.fontFamily,
	    fontSize = _props$childProps.fontSize;
	var x1 = modLine.x1,
	    y1 = modLine.y1,
	    x2 = modLine.x2;

	return _react2.default.createElement(
		"text",
		{
			x: xScale(Math.min(x1, x2)) + 10,
			y: chartConfig.yScale(y1) + dir * 4,
			fontFamily: fontFamily,
			fontSize: fontSize,
			fill: fontStroke },
		text
	);
}
/* eslint-enable react/prop-types */

function helper(_ref2) {
	var x1 = _ref2.x1,
	    y1 = _ref2.y1,
	    x2 = _ref2.x2,
	    y2 = _ref2.y2;

	var dy = y2 - y1;
	var retracements = [100, 61.8, 50, 38.2, 23.6, 0].map(function (each) {
		return {
			percent: each,
			x1: x1,
			x2: x2,
			y: y2 - each / 100 * dy
		};
	});

	return retracements;
}

FibonacciRetracement.propTypes = {
	enabled: _react.PropTypes.bool.isRequired,
	fontFamily: _react.PropTypes.string.isRequired,
	fontSize: _react.PropTypes.number.isRequired,
	chartCanvasType: _react.PropTypes.string,
	chartConfig: _react.PropTypes.object,
	plotData: _react.PropTypes.array,
	xAccessor: _react.PropTypes.func,
	xScale: _react.PropTypes.func,
	interactive: _react.PropTypes.object,
	width: _react.PropTypes.number,
	strokeWidth: _react.PropTypes.number,
	stroke: _react.PropTypes.string,
	opacity: _react.PropTypes.number,
	fontStroke: _react.PropTypes.string,
	onStart: _react.PropTypes.func,
	onComplete: _react.PropTypes.func,
	type: _react.PropTypes.oneOf(["EXTEND", // extends from -Infinity to +Infinity
	"BOUND"]).isRequired,
	mouseXY: _react.PropTypes.array,
	currentItem: _react.PropTypes.object,
	interactiveState: _react.PropTypes.object,
	overrideInteractive: _react.PropTypes.func,
	childProps: _react.PropTypes.any,
	init: _react.PropTypes.object.isRequired
};

FibonacciRetracement.defaultProps = {
	enabled: true,
	stroke: "#000000",
	strokeWidth: 1,
	opacity: 0.4,
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
	fontSize: 10,
	fontStroke: "#000000",
	type: "EXTEND",
	init: { retracements: [] },
	onStart: _utils.noop,
	onComplete: _utils.noop
};

exports.default = FibonacciRetracement;