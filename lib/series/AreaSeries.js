"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _LineSeries = require("./LineSeries");

var _LineSeries2 = _interopRequireDefault(_LineSeries);

var _AreaOnlySeries = require("./AreaOnlySeries");

var _AreaOnlySeries2 = _interopRequireDefault(_AreaOnlySeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AreaSeries(props) {
	var yAccessor = props.yAccessor,
	    baseAt = props.baseAt;
	var className = props.className,
	    opacity = props.opacity,
	    stroke = props.stroke,
	    strokeWidth = props.strokeWidth,
	    fill = props.fill;


	return _react2.default.createElement(
		"g",
		{ className: className },
		_react2.default.createElement(_LineSeries2.default, {
			yAccessor: yAccessor,
			stroke: stroke, fill: "none",
			strokeWidth: strokeWidth,
			hoverHighlight: false }),
		_react2.default.createElement(_AreaOnlySeries2.default, {
			yAccessor: yAccessor,
			base: baseAt,
			stroke: "none", fill: fill,
			opacity: opacity })
	);
}

AreaSeries.propTypes = {
	stroke: _react.PropTypes.string,
	strokeWidth: _react.PropTypes.number,
	fill: _react.PropTypes.string.isRequired,
	opacity: _react.PropTypes.number.isRequired,
	className: _react.PropTypes.string,
	yAccessor: _react.PropTypes.func.isRequired,
	baseAt: _react.PropTypes.func
};

AreaSeries.defaultProps = {
	stroke: "#4682B4",
	strokeWidth: 1,
	opacity: 0.5,
	fill: "#4682B4",
	className: "react-stockcharts-area"
};

exports.default = AreaSeries;