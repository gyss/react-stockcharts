"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { getCurrentCharts } from "../utils/ChartDataUtil";

var MouseLocationIndicator = function (_Component) {
	_inherits(MouseLocationIndicator, _Component);

	function MouseLocationIndicator(props) {
		_classCallCheck(this, MouseLocationIndicator);

		var _this = _possibleConstructorReturn(this, (MouseLocationIndicator.__proto__ || Object.getPrototypeOf(MouseLocationIndicator)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);

		_this.handleMousePosChange = _this.handleMousePosChange.bind(_this);
		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.handleClick = _this.handleClick.bind(_this);
		_this.xy = _this.xy.bind(_this);

		_this.mutableState = {};
		return _this;
	}

	_createClass(MouseLocationIndicator, [{
		key: "handleMouseDown",
		value: function handleMouseDown(e) {
			var moreProps = this.refs.component.getMoreProps();
			var pos = this.xy(moreProps, e);
			if ((0, _utils.isDefined)(pos)) {
				var xValue = pos.xValue,
				    yValue = pos.yValue,
				    x = pos.x,
				    y = pos.y;

				this.mutableState = { x: x, y: y };
				this.props.onMouseDown([xValue, yValue], e);
			}
		}
	}, {
		key: "handleClick",
		value: function handleClick(e) {
			var moreProps = this.refs.component.getMoreProps();
			var pos = this.xy(moreProps, e);
			if ((0, _utils.isDefined)(pos)) {
				var xValue = pos.xValue,
				    yValue = pos.yValue,
				    x = pos.x,
				    y = pos.y;

				this.mutableState = { x: x, y: y };
				this.props.onClick([xValue, yValue], e);
			}
		}
	}, {
		key: "xy",
		value: function xy(moreProps, e) {
			var xAccessor = moreProps.xAccessor;
			var mouseXY = moreProps.mouseXY,
			    currentItem = moreProps.currentItem,
			    xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale;
			var _props = this.props,
			    enabled = _props.enabled,
			    snap = _props.snap,
			    shouldDisableSnap = _props.shouldDisableSnap,
			    snapTo = _props.snapTo;


			if (enabled && (0, _utils.isDefined)(currentItem) && (0, _utils.isDefined)(e)) {

				var xValue = xAccessor(currentItem);
				var yValue = snap && !shouldDisableSnap(e) ? (0, _utils.getClosestValue)(snapTo(currentItem), yScale.invert(mouseXY[1])) : yScale.invert(mouseXY[1]);

				var x = xScale(xValue);
				var y = yScale(yValue);

				return { xValue: xValue, yValue: yValue, x: x, y: y };
			}
		}
	}, {
		key: "handleMousePosChange",
		value: function handleMousePosChange(e) {
			// var { idx, onMouseEnter } = this.props;
			var moreProps = this.refs.component.getMoreProps();
			var prevMoreProps = this.refs.component.getPrevMoreProps();

			if (!(0, _utils.shallowEqual)(moreProps.mousXY, prevMoreProps.mouseXY)) {
				var pos = this.xy(moreProps, e);
				// console.log("HERE11", pos)
				if ((0, _utils.isDefined)(pos)) {
					var xValue = pos.xValue,
					    yValue = pos.yValue,
					    x = pos.x,
					    y = pos.y;

					this.mutableState = { x: x, y: y };
					this.props.onMouseMove([xValue, yValue], e);
				}
			}
			// console.log(this.refs.component.getRef("capture"))
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props2 = this.props,
			    enabled = _props2.enabled,
			    r = _props2.r,
			    stroke = _props2.stroke,
			    strokeWidth = _props2.strokeWidth,
			    opacity = _props2.opacity;
			var _mutableState = this.mutableState,
			    x = _mutableState.x,
			    y = _mutableState.y;
			var show = moreProps.show;
			// console.log("HERE")

			// console.log(stroke, strokeWidth, opacity)

			return enabled && show && (0, _utils.isDefined)(x) ? _react2.default.createElement("circle", { ref: "capture",
				className: "react-stockcharts-avoid-interaction",
				cx: x,
				cy: y,
				r: r,
				stroke: stroke,
				opacity: opacity,
				fill: "none",
				strokeWidth: strokeWidth }) : null;
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericChartComponent2.default, { ref: "component",
				svgDraw: this.renderSVG,
				onMouseMove: this.handleMousePosChange,
				isHover: (0, _utils.functor)(true),
				onMouseDown: this.handleMouseDown,
				onClick: this.handleClick,
				onContextMenu: this.handleContextMenu,
				drawOnMouseExitOfCanvas: true
			});
		}
	}]);

	return MouseLocationIndicator;
}(_react.Component);

MouseLocationIndicator.propTypes = {
	enabled: _react.PropTypes.bool.isRequired,
	snap: _react.PropTypes.bool.isRequired,
	shouldDisableSnap: _react.PropTypes.func.isRequired,
	snapTo: _react.PropTypes.func,

	onMouseMove: _react.PropTypes.func.isRequired,
	onMouseDown: _react.PropTypes.func.isRequired,
	onClick: _react.PropTypes.func.isRequired,
	r: _react.PropTypes.number.isRequired,
	stroke: _react.PropTypes.string.isRequired,
	strokeWidth: _react.PropTypes.number.isRequired,
	opacity: _react.PropTypes.number.isRequired
};

MouseLocationIndicator.defaultProps = {
	onMouseMove: _utils.noop,
	onMouseDown: _utils.noop,
	onClick: _utils.noop,
	shouldDisableSnap: (0, _utils.functor)(false),
	stroke: "#000000",
	strokeWidth: 1,
	opacity: 1
};

exports.default = MouseLocationIndicator;