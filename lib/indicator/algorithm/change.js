"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function () {

	var sourcePath = "close";
	function calculator(data) {

		var algo = (0, _utils.slidingWindow)().windowSize(2).sourcePath(sourcePath).accumulator(function (_ref) {
			var _ref2 = _slicedToArray(_ref, 2),
			    prev = _ref2[0],
			    curr = _ref2[1];

			var absoluteChange = curr - prev;
			var percentChange = absoluteChange * 100 / prev;
			return { absoluteChange: absoluteChange, percentChange: percentChange };
		});

		var newData = algo(data);

		return newData;
	}
	calculator.undefinedLength = function () {
		return 1;
	};

	calculator.sourcePath = function (x) {
		if (!arguments.length) {
			return sourcePath;
		}
		sourcePath = x;
		return calculator;
	};

	return calculator;
};

var _utils = require("../../utils");