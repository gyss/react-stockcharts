"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Triangle(props) {
	var className = props.className,
	    stroke = props.stroke,
	    strokeWidth = props.strokeWidth,
	    opacity = props.opacity,
	    fill = props.fill,
	    point = props.point,
	    width = props.width;

	var w = (0, _utils.functor)(width)(point.datum);
	var x = point.x,
	    y = point.y;

	var _getTrianglePoints = getTrianglePoints(w),
	    innerOpposite = _getTrianglePoints.innerOpposite,
	    innerHypotenuse = _getTrianglePoints.innerHypotenuse;

	var points = "\n\t\t" + x + " " + (y - innerHypotenuse) + ",\n\t\t" + (x + w / 2) + " " + (y + innerOpposite) + ",\n\t\t" + (x - w / 2) + " " + (y + innerOpposite) + "\n\t";
	return _react2.default.createElement("polygon", {
		className: className,
		points: points,
		stroke: stroke,
		strokeWidth: strokeWidth,
		fillOpacity: opacity,
		fill: fill
	});
}
Triangle.propTypes = {
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
Triangle.defaultProps = {
	stroke: "#4682B4",
	strokeWidth: 1,
	opacity: 0.5,
	fill: "#4682B4",
	className: "react-stockcharts-marker-triangle"
};
Triangle.drawOnCanvas = function (props, point, ctx) {
	var stroke = props.stroke,
	    fill = props.fill,
	    opacity = props.opacity,
	    strokeWidth = props.strokeWidth;

	ctx.strokeStyle = stroke;
	ctx.lineWidth = strokeWidth;
	if (fill !== "none") {
		ctx.fillStyle = (0, _utils.hexToRGBA)(fill, opacity);
	}
	Triangle.drawOnCanvasWithNoStateChange(props, point, ctx);
};
Triangle.drawOnCanvasWithNoStateChange = function (props, point, ctx) {
	var width = props.width;

	var w = (0, _utils.functor)(width)(point.datum);
	var x = point.x,
	    y = point.y;

	var _getTrianglePoints2 = getTrianglePoints(w),
	    innerOpposite = _getTrianglePoints2.innerOpposite,
	    innerHypotenuse = _getTrianglePoints2.innerHypotenuse;

	ctx.beginPath();
	ctx.moveTo(x, y - innerHypotenuse);
	ctx.lineTo(x + w / 2, y + innerOpposite);
	ctx.lineTo(x - w / 2, y + innerOpposite);
	ctx.stroke();
	ctx.fill();
};
exports.default = Triangle;


function getTrianglePoints(width) {
	var innerHypotenuse = width / 2 * (1 / Math.cos(30 * Math.PI / 180));
	var innerOpposite = width / 2 * (1 / Math.tan(60 * Math.PI / 180));
	return {
		innerOpposite: innerOpposite,
		innerHypotenuse: innerHypotenuse
	};
}