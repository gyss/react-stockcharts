"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.financeDiscontinuousScale = exports.discontinuousTimeScaleProvider = exports.discontinuousTimeScaleProviderBuilder = undefined;
exports.defaultScaleProvider = defaultScaleProvider;

var _discontinuousTimeScaleProvider = require("./discontinuousTimeScaleProvider");

var _discontinuousTimeScaleProvider2 = _interopRequireDefault(_discontinuousTimeScaleProvider);

var _financeDiscontinuousScale = require("./financeDiscontinuousScale");

var _financeDiscontinuousScale2 = _interopRequireDefault(_financeDiscontinuousScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.discontinuousTimeScaleProviderBuilder = _discontinuousTimeScaleProvider.discontinuousTimeScaleProviderBuilder;
exports.discontinuousTimeScaleProvider = _discontinuousTimeScaleProvider2.default;
exports.financeDiscontinuousScale = _financeDiscontinuousScale2.default;
function defaultScaleProvider(xScale) {
	return function (data, xAccessor) {
		return { data: data, xScale: xScale, xAccessor: xAccessor, displayXAccessor: xAccessor };
	};
}