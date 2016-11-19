"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Square(props) {
	var className = props.className,
	    stroke = props.stroke,
	    strokeWidth = props.strokeWidth,
	    opacity = props.opacity,
	    fill = props.fill,
	    point = props.point,
	    width = props.width;

	var w = (0, _utils.functor)(width)(point.datum);
	var x = point.x - w / 2;
	var y = point.y - w / 2;
	return _react2.default.createElement("rect", {
		className: className,
		x: x,
		y: y,
		stroke: stroke,
		strokeWidth: strokeWidth,
		fillOpacity: opacity,
		fill: fill,
		width: w,
		height: w
	});
}
Square.propTypes = {
	stroke: _react.PropTypes.string,
	fill: _react.PropTypes.string.isRequired,
	opacity: _react.PropTypes.number.isRequired,
	point: _react.PropTypes.shape({
		x: _react.PropTypes.number.isRequired,
		y: _react.PropTypes.number.isRequired,
		datum: _react.PropTypes.object.isRequired
	}).isRequired,
	className: _react.PropTypes.string,
	strokeWidth: _react.PropTypes.number,
	width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired
};
Square.defaultProps = {
	stroke: "#4682B4",
	strokeWidth: 1,
	opacity: 0.5,
	fill: "#4682B4",
	className: "react-stockcharts-marker-rect"
};
Square.drawOnCanvas = function (props, point, ctx) {
	var stroke = props.stroke,
	    fill = props.fill,
	    opacity = props.opacity,
	    strokeWidth = props.strokeWidth;

	ctx.strokeStyle = stroke;
	ctx.lineWidth = strokeWidth;
	if (fill !== "none") {
		ctx.fillStyle = (0, _utils.hexToRGBA)(fill, opacity);
	}
	Square.drawOnCanvasWithNoStateChange(props, point, ctx);
};
Square.drawOnCanvasWithNoStateChange = function (props, point, ctx) {
	var width = props.width;

	var w = (0, _utils.functor)(width)(point.datum);
	var x = point.x - w / 2;
	var y = point.y - w / 2;
	ctx.beginPath();
	ctx.rect(x, y, w, w);
	ctx.stroke();
	ctx.fill();
};
exports.default = Square;