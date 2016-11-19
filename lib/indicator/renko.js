"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {

	var base = (0, _baseIndicator2.default)().type(ALGORITHM_TYPE);

	var underlyingAlgorithm = (0, _algorithm.renko)();

	var indicator = function indicator(data) {
		return underlyingAlgorithm(data);
	};

	(0, _d3fcRebind.rebind)(indicator, base, "id", "stroke", "fill", "echo", "type", "tooltipLabel");
	(0, _d3fcRebind.rebind)(indicator, underlyingAlgorithm, "dateAccessor", "dateMutator");
	(0, _d3fcRebind.rebind)(indicator, underlyingAlgorithm, "reversalType", "fixedBrickSize", "sourcePath", "windowSize");

	return indicator;
};

var _d3fcRebind = require("d3fc-rebind");

var _algorithm = require("./algorithm");

var _baseIndicator = require("./baseIndicator");

var _baseIndicator2 = _interopRequireDefault(_baseIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALGORITHM_TYPE = "Renko";