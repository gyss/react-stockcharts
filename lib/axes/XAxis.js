"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Axis = require("./Axis");

var _Axis2 = _interopRequireDefault(_Axis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XAxis = function (_Component) {
	_inherits(XAxis, _Component);

	function XAxis(props, context) {
		_classCallCheck(this, XAxis);

		var _this = _possibleConstructorReturn(this, (XAxis.__proto__ || Object.getPrototypeOf(XAxis)).call(this, props, context));

		_this.axisZoomCallback = _this.axisZoomCallback.bind(_this);
		return _this;
	}

	_createClass(XAxis, [{
		key: "axisZoomCallback",
		value: function axisZoomCallback(newXDomain) {
			var xAxisZoom = this.context.xAxisZoom;

			xAxisZoom(newXDomain);
		}
	}, {
		key: "render",
		value: function render() {
			var showTicks = this.props.showTicks;

			var moreProps = helper(this.props, this.context);

			return _react2.default.createElement(_Axis2.default, _extends({}, this.props, moreProps, { x: true,
				zoomEnabled: this.props.zoomEnabled && showTicks,
				axisZoomCallback: this.axisZoomCallback,
				zoomCursorClassName: "react-stockcharts-ew-resize-cursor" }));
		}
	}]);

	return XAxis;
}(_react.Component);

XAxis.propTypes = {
	axisAt: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(["top", "bottom", "middle"]), _react.PropTypes.number]).isRequired,
	orient: _react.PropTypes.oneOf(["top", "bottom"]).isRequired,
	innerTickSize: _react.PropTypes.number,
	outerTickSize: _react.PropTypes.number,
	tickFormat: _react.PropTypes.func,
	tickPadding: _react.PropTypes.number,
	tickSize: _react.PropTypes.number,
	ticks: _react.PropTypes.number,
	tickValues: _react.PropTypes.array,
	showTicks: _react.PropTypes.bool,
	className: _react.PropTypes.string,
	zoomEnabled: _react.PropTypes.bool.isRequired,
	onContextMenu: _react.PropTypes.func,
	onDoubleClick: _react.PropTypes.func
};

XAxis.defaultProps = {
	showGrid: false,
	showTicks: true,
	showDomain: true,
	className: "react-stockcharts-x-axis",
	ticks: 10,
	outerTickSize: 0,
	fill: "none",
	stroke: "#000000",
	strokeWidth: 1,
	opacity: 1,
	domainClassName: "react-stockcharts-axis-domain",
	innerTickSize: 5,
	tickPadding: 6,
	tickStroke: "#000000",
	tickStrokeOpacity: 1,
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
	fontSize: 12,
	xZoomHeight: 25,
	zoomEnabled: true,
	getMouseDelta: function getMouseDelta(startXY, mouseXY) {
		return startXY[0] - mouseXY[0];
	}
};

XAxis.contextTypes = {
	height: _react.PropTypes.number.isRequired,
	width: _react.PropTypes.number.isRequired,
	xAxisZoom: _react.PropTypes.func.isRequired
};

function helper(props, context) {
	var axisAt = props.axisAt,
	    xZoomHeight = props.xZoomHeight,
	    orient = props.orient;
	var width = context.width,
	    height = context.height;


	var axisLocation,
	    x = 0,
	    w = width,
	    h = xZoomHeight;

	if (axisAt === "top") axisLocation = 0;else if (axisAt === "bottom") axisLocation = height;else if (axisAt === "middle") axisLocation = height / 2;else axisLocation = axisAt;

	var y = orient === "top" ? -xZoomHeight : 0;

	return {
		transform: [0, axisLocation],
		range: [0, width],
		getScale: function getScale(moreProps) {
			return moreProps.xScale;
		},
		bg: { x: x, y: y, h: h, w: w }
	};
}
exports.default = XAxis;