"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require("d3-selection");

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _utils = require("../utils");

var _ChartDataUtil = require("../utils/ChartDataUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InteractiveLine = function (_Component) {
	_inherits(InteractiveLine, _Component);

	function InteractiveLine(props) {
		_classCallCheck(this, InteractiveLine);

		var _this = _possibleConstructorReturn(this, (InteractiveLine.__proto__ || Object.getPrototypeOf(InteractiveLine)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.handleDrag = _this.handleDrag.bind(_this);
		_this.handleDragEnd = _this.handleDragEnd.bind(_this);

		_this.handleEdgeDrag1 = _this.handleEdgeDrag1.bind(_this);
		_this.handleEdgeDrag2 = _this.handleEdgeDrag2.bind(_this);
		_this.handleEdgeDragEnd = _this.handleEdgeDragEnd.bind(_this);
		return _this;
	}

	_createClass(InteractiveLine, [{
		key: "handleMouseDown",
		value: function handleMouseDown(e) {
			e.preventDefault();

			var win = (0, _utils.d3Window)(this.refs.component.getRef("capture"));
			(0, _d3Selection.select)(win).on(_utils.MOUSEMOVE, this.handleDrag).on(_utils.MOUSEUP, this.handleDragEnd);

			var mouseXY = [e.pageX, e.pageY];

			var _props = this.props,
			    x1Value = _props.x1Value,
			    x2Value = _props.x2Value,
			    y1Value = _props.y1Value,
			    y2Value = _props.y2Value;


			this.moveStartPosition = {
				mouseXY: mouseXY,
				x1Value: x1Value, x2Value: x2Value, y1Value: y1Value, y2Value: y2Value
			};
		}
	}, {
		key: "handleDrag",
		value: function handleDrag() {
			var e = _d3Selection.event;
			var moreProps = this.refs.component.getMoreProps();
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData;
			var xAccessor = moreProps.xAccessor;
			var _moveStartPosition = this.moveStartPosition,
			    mouseXY = _moveStartPosition.mouseXY,
			    x1Value = _moveStartPosition.x1Value,
			    x2Value = _moveStartPosition.x2Value,
			    y1Value = _moveStartPosition.y1Value,
			    y2Value = _moveStartPosition.y2Value;

			var x1 = xScale(x1Value);
			var y1 = yScale(y1Value);
			var x2 = xScale(x2Value);
			var y2 = yScale(y2Value);

			var newPos = [e.pageX, e.pageY];

			var dx = mouseXY[0] - newPos[0];
			var dy = mouseXY[1] - newPos[1];

			var newX1Value = xAccessor((0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, [x1 - dx, y1 - dy], plotData));
			var newY1Value = yScale.invert(y1 - dy);
			var newX2Value = xAccessor((0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, [x2 - dx, y2 - dy], plotData));
			var newY2Value = yScale.invert(y2 - dy);

			this.props.onDrag(this.props.echo, {
				x1Value: newX1Value,
				y1Value: newY1Value,
				x2Value: newX2Value,
				y2Value: newY2Value,
				dx: dx, dy: dy
			}, {
				x1Value: x1Value,
				y1Value: y1Value,
				x2Value: x2Value,
				y2Value: y2Value
			}, e);
		}
	}, {
		key: "handleDragEnd",
		value: function handleDragEnd() {
			var e = _d3Selection.event;
			this.moveStartPosition = null;

			var win = (0, _utils.d3Window)(this.refs.component.getRef("capture"));

			(0, _d3Selection.select)(win).on(_utils.MOUSEMOVE, null).on(_utils.MOUSEUP, null);

			this.props.onDragComplete(this.props.echo, e);
		}
	}, {
		key: "handleEdgeDrag1",
		value: function handleEdgeDrag1(edge, origEdge, e) {
			var _edge = _slicedToArray(edge, 2),
			    newCX = _edge[0],
			    newCY = _edge[1];

			var _origEdge = _slicedToArray(origEdge, 2),
			    cx = _origEdge[0],
			    cy = _origEdge[1];

			var moreProps = this.refs.component.getMoreProps();
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData;
			var xAccessor = moreProps.xAccessor;
			var _props2 = this.props,
			    x2Value = _props2.x2Value,
			    y2Value = _props2.y2Value;


			var newXValue = xAccessor((0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, [newCX, newCY], plotData));
			var newYValue = yScale.invert(newCY);
			var oldXValue = xAccessor((0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, [cx, cy], plotData));
			var oldYValue = yScale.invert(cy);

			this.props.onEdge1Drag(this.props.echo, {
				x1Value: newXValue,
				y1Value: newYValue,
				x2Value: x2Value,
				y2Value: y2Value
			}, {
				x1Value: oldXValue,
				y1Value: oldYValue,
				x2Value: x2Value,
				y2Value: y2Value
			}, e);
		}
	}, {
		key: "handleEdgeDrag2",
		value: function handleEdgeDrag2(edge, origEdge, e) {
			var _edge2 = _slicedToArray(edge, 2),
			    newCX = _edge2[0],
			    newCY = _edge2[1];

			var _origEdge2 = _slicedToArray(origEdge, 2),
			    cx = _origEdge2[0],
			    cy = _origEdge2[1];

			var moreProps = this.refs.component.getMoreProps();
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData;
			var xAccessor = moreProps.xAccessor;
			var _props3 = this.props,
			    x1Value = _props3.x1Value,
			    y1Value = _props3.y1Value;


			var newXValue = xAccessor((0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, [newCX, newCY], plotData));
			var newYValue = yScale.invert(newCY);
			var oldXValue = xAccessor((0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, [cx, cy], plotData));
			var oldYValue = yScale.invert(cy);

			this.props.onEdge2Drag(this.props.echo, {
				x1Value: x1Value,
				y1Value: y1Value,
				x2Value: newXValue,
				y2Value: newYValue
			}, {
				x1Value: x1Value,
				y1Value: y1Value,
				x2Value: oldXValue,
				y2Value: oldYValue
			}, e);
		}
	}, {
		key: "handleEdgeDragEnd",
		value: function handleEdgeDragEnd(e) {
			this.props.onDragComplete(this.props.echo, e);
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props4 = this.props,
			    x1Value = _props4.x1Value,
			    x2Value = _props4.x2Value,
			    y1Value = _props4.y1Value,
			    y2Value = _props4.y2Value,
			    withEdge = _props4.withEdge,
			    type = _props4.type;
			var _props5 = this.props,
			    defaultClassName = _props5.defaultClassName,
			    stroke = _props5.stroke,
			    strokeWidth = _props5.strokeWidth,
			    opacity = _props5.opacity;
			var _props6 = this.props,
			    r = _props6.r,
			    edgeFill = _props6.edgeFill,
			    edgeStroke = _props6.edgeStroke,
			    edgeStrokeWidth = _props6.edgeStrokeWidth,
			    children = _props6.children;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData;
			var xAccessor = moreProps.xAccessor;


			var modLine = generateLine(type, [x1Value, y1Value], [x2Value, y2Value], xAccessor, plotData);

			var x1 = xScale(modLine.x1);
			var y1 = yScale(modLine.y1);
			var x2 = xScale(modLine.x2);
			var y2 = yScale(modLine.y2);
			var childrenToRender = children(moreProps, this.props, modLine);

			return _react2.default.createElement(
				"g",
				{ ref: "capture" },
				_react2.default.createElement("line", {
					x1: x1, y1: y1, x2: x2, y2: y2,
					stroke: stroke, strokeWidth: strokeWidth,
					opacity: opacity }),
				_react2.default.createElement("line", { className: defaultClassName,
					onMouseDown: this.handleMouseDown,
					x1: x1, y1: y1, x2: x2, y2: y2,
					stroke: stroke, strokeWidth: 8, opacity: 0 }),
				withEdge ? _react2.default.createElement(ClickableCircle, { className: defaultClassName,
					onDrag: this.handleEdgeDrag1,
					onDragComplete: this.handleEdgeDragEnd,
					cx: x1, cy: y1, r: r,
					fill: edgeFill, stroke: edgeStroke,
					strokeWidth: edgeStrokeWidth,
					hoverOpacity: 1 }) : null,
				withEdge ? _react2.default.createElement(ClickableCircle, { className: defaultClassName,
					onDrag: this.handleEdgeDrag2,
					onDragComplete: this.handleEdgeDragEnd,
					cx: x2, cy: y2, r: r,
					fill: edgeFill, stroke: edgeStroke,
					strokeWidth: edgeStrokeWidth,
					hoverOpacity: 1 }) : null,
				childrenToRender
			);
		}
	}, {
		key: "render",
		value: function render() {
			// console.log("FOO")
			return _react2.default.createElement(_GenericChartComponent2.default, { ref: "component",
				svgDraw: this.renderSVG,
				drawOnPan: true
			});
		}
	}]);

	return InteractiveLine;
}(_react.Component);

function generateLine(type, start, end, xAccessor, plotData) {
	/* if (end[0] - start[0] === 0) {
 	// vertical line
 	throw new Error("Trendline cannot be a vertical line")
 } */
	var m /* slope */ = end[0] === start[0] ? 0 : (end[1] - start[1]) / (end[0] - start[0]);
	// console.log(end[0] - start[0], m)
	var b /* y intercept */ = -1 * m * end[0] + end[1];
	// y = m * x + b
	var x1 = type === "XLINE" ? xAccessor((0, _utils.head)(plotData)) : start[0]; // RAY or LINE start is the same

	var y1 = m * x1 + b;

	var x2 = type === "XLINE" ? xAccessor((0, _utils.last)(plotData)) : type === "RAY" ? end[0] > start[0] ? xAccessor((0, _utils.last)(plotData)) : xAccessor((0, _utils.head)(plotData)) : end[0];
	var y2 = m * x2 + b;
	return { x1: x1, y1: y1, x2: x2, y2: y2 };
}

InteractiveLine.propTypes = {
	x1Value: _react.PropTypes.any.isRequired,
	x2Value: _react.PropTypes.any.isRequired,
	y1Value: _react.PropTypes.any.isRequired,
	y2Value: _react.PropTypes.any.isRequired,

	stroke: _react.PropTypes.string.isRequired,
	strokeWidth: _react.PropTypes.number.isRequired,
	type: _react.PropTypes.oneOf(["XLINE", // extends from -Infinity to +Infinity
	"RAY", // extends to +/-Infinity in one direction
	"LINE"]).isRequired,
	onDrag: _react.PropTypes.func.isRequired,
	onEdge1Drag: _react.PropTypes.func.isRequired,
	onEdge2Drag: _react.PropTypes.func.isRequired,
	onDragComplete: _react.PropTypes.func.isRequired,
	r: _react.PropTypes.number.isRequired,
	opacity: _react.PropTypes.number.isRequired,
	edgeFill: _react.PropTypes.string.isRequired,
	defaultClassName: _react.PropTypes.string,
	echo: _react.PropTypes.any,
	edgeStroke: _react.PropTypes.string.isRequired,
	edgeStrokeWidth: _react.PropTypes.number.isRequired,
	withEdge: _react.PropTypes.bool.isRequired,
	children: _react.PropTypes.func.isRequired
};

InteractiveLine.defaultProps = {
	onDrag: _utils.noop,
	onEdge1Drag: _utils.noop,
	onEdge2Drag: _utils.noop,
	onDragComplete: _utils.noop,
	edgeStrokeWidth: 3,
	edgeStroke: "#000000",
	edgeFill: "#FFFFFF",
	r: 10,
	withEdge: false,
	strokeWidth: 1,
	children: _utils.noop
};

var ClickableCircle = function (_Component2) {
	_inherits(ClickableCircle, _Component2);

	function ClickableCircle(props) {
		_classCallCheck(this, ClickableCircle);

		var _this2 = _possibleConstructorReturn(this, (ClickableCircle.__proto__ || Object.getPrototypeOf(ClickableCircle)).call(this, props));

		_this2.handleMouseEnter = _this2.handleMouseEnter.bind(_this2);
		_this2.handleMouseLeave = _this2.handleMouseLeave.bind(_this2);
		_this2.handleMouseDown = _this2.handleMouseDown.bind(_this2);
		_this2.handleDrag = _this2.handleDrag.bind(_this2);
		_this2.handleDragEnd = _this2.handleDragEnd.bind(_this2);
		_this2.state = {
			hover: false
		};
		return _this2;
	}

	_createClass(ClickableCircle, [{
		key: "handleMouseEnter",
		value: function handleMouseEnter() {
			this.setState({
				hover: true
			});
		}
	}, {
		key: "handleMouseLeave",
		value: function handleMouseLeave() {
			this.setState({
				hover: false
			});
		}
	}, {
		key: "handleMouseDown",
		value: function handleMouseDown(e) {
			e.preventDefault();

			var win = (0, _utils.d3Window)(this.refs.edge);
			(0, _d3Selection.select)(win).on(_utils.MOUSEMOVE, this.handleDrag).on(_utils.MOUSEUP, this.handleDragEnd);

			var mouseXY = [e.pageX, e.pageY];

			var _props7 = this.props,
			    cx = _props7.cx,
			    cy = _props7.cy;


			this.moveStartPosition = {
				mouseXY: mouseXY,
				cx: cx, cy: cy
			};
		}
	}, {
		key: "handleDrag",
		value: function handleDrag() {
			var e = _d3Selection.event;
			var newPos = [e.pageX, e.pageY];

			var _moveStartPosition2 = this.moveStartPosition,
			    mouseXY = _moveStartPosition2.mouseXY,
			    cx = _moveStartPosition2.cx,
			    cy = _moveStartPosition2.cy;


			var dx = mouseXY[0] - newPos[0];
			var dy = mouseXY[1] - newPos[1];

			var newCX = cx - dx;
			var newCY = cy - dy;

			this.props.onDrag([newCX, newCY], [cx, cy], e);
		}
	}, {
		key: "handleDragEnd",
		value: function handleDragEnd() {
			var e = _d3Selection.event;
			this.moveStartPosition = null;

			var win = (0, _utils.d3Window)(this.refs.edge);

			(0, _d3Selection.select)(win).on(_utils.MOUSEMOVE, null).on(_utils.MOUSEUP, null);

			this.props.onDragComplete(e);
		}
	}, {
		key: "render",
		value: function render() {
			var _props8 = this.props,
			    className = _props8.className,
			    cx = _props8.cx,
			    cy = _props8.cy,
			    r = _props8.r,
			    fill = _props8.fill,
			    stroke = _props8.stroke,
			    strokeWidth = _props8.strokeWidth,
			    hoverOpacity = _props8.hoverOpacity;

			var opacity = this.state.hover ? hoverOpacity : 0;
			return _react2.default.createElement("circle", { ref: "edge", className: className,
				onMouseEnter: this.handleMouseEnter,
				onMouseLeave: this.handleMouseLeave,
				onMouseDown: this.handleMouseDown,
				cx: cx, cy: cy, r: r,
				fill: fill, stroke: stroke,
				strokeWidth: strokeWidth,
				opacity: opacity });
		}
	}]);

	return ClickableCircle;
}(_react.Component);

ClickableCircle.propTypes = {
	onDrag: _react.PropTypes.func.isRequired,
	onDragComplete: _react.PropTypes.func.isRequired,
	hoverOpacity: _react.PropTypes.number.isRequired,
	strokeWidth: _react.PropTypes.number.isRequired,
	stroke: _react.PropTypes.string.isRequired,
	fill: _react.PropTypes.string.isRequired,
	r: _react.PropTypes.number.isRequired,
	cx: _react.PropTypes.number.isRequired,
	cy: _react.PropTypes.number.isRequired,
	className: _react.PropTypes.string.isRequired
};

ClickableCircle.defaultProps = {
	onDrag: _utils.noop,
	onDragComplete: _utils.noop
};

exports.default = InteractiveLine;