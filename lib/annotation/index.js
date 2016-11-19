"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Label = exports.SvgPathAnnotation = exports.LabelAnnotation = exports.Annotate = undefined;
exports.buyPath = buyPath;
exports.sellPath = sellPath;

var _Annotate = require("./Annotate");

var _Annotate2 = _interopRequireDefault(_Annotate);

var _LabelAnnotation = require("./LabelAnnotation");

var _LabelAnnotation2 = _interopRequireDefault(_LabelAnnotation);

var _SvgPathAnnotation = require("./SvgPathAnnotation");

var _SvgPathAnnotation2 = _interopRequireDefault(_SvgPathAnnotation);

var _Label = require("./Label");

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Annotate = _Annotate2.default;
exports.LabelAnnotation = _LabelAnnotation2.default;
exports.SvgPathAnnotation = _SvgPathAnnotation2.default;
exports.Label = _Label2.default;


var halfWidth = 10;
var bottomWidth = 3;
var height = 20;

function buyPath(_ref) {
	var x = _ref.x,
	    y = _ref.y;

	return "M" + x + " " + y + " " + ("L" + (x + halfWidth) + " " + (y + halfWidth) + " ") + ("L" + (x + bottomWidth) + " " + (y + halfWidth) + " ") + ("L" + (x + bottomWidth) + " " + (y + height) + " ") + ("L" + (x - bottomWidth) + " " + (y + height) + " ") + ("L" + (x - bottomWidth) + " " + (y + halfWidth) + " ") + ("L" + (x - halfWidth) + " " + (y + halfWidth) + " ") + "Z";
}

function sellPath(_ref2) {
	var x = _ref2.x,
	    y = _ref2.y;

	return "M" + x + " " + y + " " + ("L" + (x + halfWidth) + " " + (y - halfWidth) + " ") + ("L" + (x + bottomWidth) + " " + (y - halfWidth) + " ") + ("L" + (x + bottomWidth) + " " + (y - height) + " ") + ("L" + (x - bottomWidth) + " " + (y - height) + " ") + ("L" + (x - bottomWidth) + " " + (y - halfWidth) + " ") + ("L" + (x - halfWidth) + " " + (y - halfWidth) + " ") + "Z";
}