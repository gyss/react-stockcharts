var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from "react";

import GenericChartComponent from "../GenericChartComponent";

import { isDefined, getClosestValue, noop, shallowEqual, functor } from "../utils";
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
			if (isDefined(pos)) {
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
			if (isDefined(pos)) {
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


			if (enabled && isDefined(currentItem) && isDefined(e)) {

				var xValue = xAccessor(currentItem);
				var yValue = snap && !shouldDisableSnap(e) ? getClosestValue(snapTo(currentItem), yScale.invert(mouseXY[1])) : yScale.invert(mouseXY[1]);

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

			if (!shallowEqual(moreProps.mousXY, prevMoreProps.mouseXY)) {
				var pos = this.xy(moreProps, e);
				// console.log("HERE11", pos)
				if (isDefined(pos)) {
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

			return enabled && show && isDefined(x) ? React.createElement("circle", { ref: "capture",
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
			return React.createElement(GenericChartComponent, { ref: "component",
				svgDraw: this.renderSVG,
				onMouseMove: this.handleMousePosChange,
				isHover: functor(true),
				onMouseDown: this.handleMouseDown,
				onClick: this.handleClick,
				onContextMenu: this.handleContextMenu,
				drawOnMouseExitOfCanvas: true
			});
		}
	}]);

	return MouseLocationIndicator;
}(Component);

MouseLocationIndicator.propTypes = {
	enabled: PropTypes.bool.isRequired,
	snap: PropTypes.bool.isRequired,
	shouldDisableSnap: PropTypes.func.isRequired,
	snapTo: PropTypes.func,

	onMouseMove: PropTypes.func.isRequired,
	onMouseDown: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	r: PropTypes.number.isRequired,
	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	opacity: PropTypes.number.isRequired
};

MouseLocationIndicator.defaultProps = {
	onMouseMove: noop,
	onMouseDown: noop,
	onClick: noop,
	shouldDisableSnap: functor(false),
	stroke: "#000000",
	strokeWidth: 1,
	opacity: 1
};

export default MouseLocationIndicator;