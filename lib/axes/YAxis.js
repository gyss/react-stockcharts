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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YAxis = function (_Component) {
	_inherits(YAxis, _Component);

	function YAxis(props, context) {
		_classCallCheck(this, YAxis);

		var _this = _possibleConstructorReturn(this, (YAxis.__proto__ || Object.getPrototypeOf(YAxis)).call(this, props, context));

		_this.axisZoomCallback = _this.axisZoomCallback.bind(_this);
		return _this;
	}

	_createClass(YAxis, [{
		key: "axisZoomCallback",
		value: function axisZoomCallback(newYDomain) {
			var _context = this.context,
			    chartId = _context.chartId,
			    yAxisZoom = _context.yAxisZoom;

			yAxisZoom(chartId, newYDomain);
		}
	}, {
		key: "render",
		value: function render() {
			var _helper = helper(this.props, this.context),
			    zoomEnabled = _helper.zoomEnabled,
			    moreProps = _objectWithoutProperties(_helper, ["zoomEnabled"]);

			return _react2.default.createElement(_Axis2.default, _extends({}, this.props, moreProps, {
				zoomEnabled: this.props.zoomEnabled && zoomEnabled,
				edgeClip: true,
				axisZoomCallback: this.axisZoomCallback,
				zoomCursorClassName: "react-stockcharts-ns-resize-cursor" }));
		}
	}]);

	return YAxis;
}(_react.Component);

YAxis.propTypes = {
	axisAt: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(["left", "right", "middle"]), _react.PropTypes.number]).isRequired,
	orient: _react.PropTypes.oneOf(["left", "right"]).isRequired,
	innerTickSize: _react.PropTypes.number,
	outerTickSize: _react.PropTypes.number,
	tickFormat: _react.PropTypes.func,
	tickPadding: _react.PropTypes.number,
	tickSize: _react.PropTypes.number,
	ticks: _react.PropTypes.number,
	yZoomWidth: _react.PropTypes.number,
	tickValues: _react.PropTypes.array,
	showTicks: _react.PropTypes.bool,
	className: _react.PropTypes.string,
	zoomEnabled: _react.PropTypes.bool.isRequired,
	onContextMenu: _react.PropTypes.func,
	onDoubleClick: _react.PropTypes.func
};

YAxis.defaultProps = {
	showGrid: false,
	showTicks: true,
	showDomain: true,
	className: "react-stockcharts-y-axis",
	ticks: 10,
	outerTickSize: 0,
	domainClassName: "react-stockcharts-axis-domain",
	fill: "none",
	stroke: "#FFFFFF",
	strokeWidth: 1,
	opacity: 1,
	innerTickSize: 5,
	tickPadding: 6,
	tickStroke: "#000000",
	tickStrokeOpacity: 1,
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
	fontSize: 12,
	yZoomWidth: 40,
	zoomEnabled: true,
	getMouseDelta: function getMouseDelta(startXY, mouseXY) {
		return startXY[1] - mouseXY[1];
	}
};

YAxis.contextTypes = {
	height: _react.PropTypes.number.isRequired,
	width: _react.PropTypes.number.isRequired,
	yAxisZoom: _react.PropTypes.func.isRequired,
	chartId: _react.PropTypes.number.isRequired,
	chartConfig: _react.PropTypes.object.isRequired
};

function helper(props, context) {
	var axisAt = props.axisAt,
	    yZoomWidth = props.yZoomWidth,
	    orient = props.orient;
	var width = context.width,
	    height = context.height;


	var axisLocation,
	    y = 0,
	    w = yZoomWidth,
	    h = height;

	if (axisAt === "left") {
		axisLocation = 0;
	} else if (axisAt === "right") {
		axisLocation = width;
	} else if (axisAt === "middle") {
		axisLocation = width / 2;
	} else {
		axisLocation = axisAt;
	}

	var x = orient === "left" ? -yZoomWidth : 0;

	return {
		transform: [axisLocation, 0],
		range: [0, height],
		getScale: function getScale(moreProps) {
			return moreProps.chartConfig.yScale;
		},
		bg: { x: x, y: y, h: h, w: w },
		zoomEnabled: context.chartConfig.yPan
	};
}
exports.default = YAxis;