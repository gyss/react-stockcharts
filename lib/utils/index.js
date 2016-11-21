"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isArray = exports.first = exports.overlayColors = exports.MOUSEUP = exports.MOUSEMOVE = exports.PureComponent = exports.zipper = exports.slidingWindow = exports.shallowEqual = exports.noop = exports.identity = exports.merge = exports.mappedSlidingWindow = exports.accumulatingWindow = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getLogger = getLogger;
exports.path = path;
exports.functor = functor;
exports.getClosestItemIndexes2 = getClosestItemIndexes2;
exports.getClosestValue = getClosestValue;
exports.d3Window = d3Window;
exports.getClosestItemIndexes = getClosestItemIndexes;
exports.getClosestItem = getClosestItem;
exports.head = head;
exports.tail = tail;
exports.last = last;
exports.isDefined = isDefined;
exports.isNotDefined = isNotDefined;
exports.isObject = isObject;
exports.touchPosition = touchPosition;
exports.mousePosition = mousePosition;
exports.clearCanvas = clearCanvas;
exports.capitalizeFirst = capitalizeFirst;
exports.hexToRGBA = hexToRGBA;

var _d3Scale = require("d3-scale");

var _d3Array = require("d3-array");

var _zipper = require("./zipper");

var _zipper2 = _interopRequireDefault(_zipper);

var _merge = require("./merge");

var _merge2 = _interopRequireDefault(_merge);

var _slidingWindow = require("./slidingWindow");

var _slidingWindow2 = _interopRequireDefault(_slidingWindow);

var _identity = require("./identity");

var _identity2 = _interopRequireDefault(_identity);

var _noop = require("./noop");

var _noop2 = _interopRequireDefault(_noop);

var _shallowEqual = require("./shallowEqual");

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _mappedSlidingWindow = require("./mappedSlidingWindow");

var _mappedSlidingWindow2 = _interopRequireDefault(_mappedSlidingWindow);

var _accumulatingWindow = require("./accumulatingWindow");

var _accumulatingWindow2 = _interopRequireDefault(_accumulatingWindow);

var _PureComponent = require("./PureComponent");

var _PureComponent2 = _interopRequireDefault(_PureComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.accumulatingWindow = _accumulatingWindow2.default;
exports.mappedSlidingWindow = _mappedSlidingWindow2.default;
exports.merge = _merge2.default;
exports.identity = _identity2.default;
exports.noop = _noop2.default;
exports.shallowEqual = _shallowEqual2.default;
exports.slidingWindow = _slidingWindow2.default;
exports.zipper = _zipper2.default;
exports.PureComponent = _PureComponent2.default;
function getLogger(prefix) {
	return process.env.NODE_ENV !== "production" ? require("debug")("react-stockcharts:" + prefix) : _noop2.default;
}

function path() {
	var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	var key = Array.isArray(path) ? path : [path];
	var length = key.length;

	return function (obj, defaultValue) {
		if (length === 0) return isDefined(obj) ? obj : defaultValue;

		var index = 0;
		while (obj != null && index < length) {
			obj = obj[key[index++]];
		}
		return index === length ? obj : defaultValue;
	};
}

function functor(v) {
	return typeof v === "function" ? v : function () {
		return v;
	};
}

function getClosestItemIndexes2(array, value, accessor) {
	var left = (0, _d3Array.bisector)(accessor).left(array, value);
	left = Math.max(left - 1, 0);
	var right = Math.min(left + 1, array.length - 1);

	var item = accessor(array[left]);
	if (item >= value && item <= value) right = left;

	return { left: left, right: right };
}

function getClosestValue(values, currentValue) {
	var diff = values.map(function (each) {
		return each - currentValue;
	}).reduce(function (diff1, diff2) {
		return Math.abs(diff1) < Math.abs(diff2) ? diff1 : diff2;
	});
	return currentValue + diff;
}

function d3Window(node) {
	var d3win = node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
	return d3win;
}

var MOUSEMOVE = exports.MOUSEMOVE = "mousemove.pan";
var MOUSEUP = exports.MOUSEUP = "mouseup.pan";

function getClosestItemIndexes(array, value, accessor, log) {
	var lo = 0,
	    hi = array.length - 1;
	while (hi - lo > 1) {
		var mid = Math.round((lo + hi) / 2);
		if (accessor(array[mid]) <= value) {
			lo = mid;
		} else {
			hi = mid;
		}
	}
	// for Date object === does not work, so using the <= in combination with >=
	// the same code works for both dates and numbers
	if (accessor(array[lo]) >= value && accessor(array[lo]) <= value) hi = lo;
	if (accessor(array[hi]) >= value && accessor(array[hi]) <= value) lo = hi;

	if (accessor(array[lo]) < value && accessor(array[hi]) < value) lo = hi;
	if (accessor(array[lo]) > value && accessor(array[hi]) > value) hi = lo;

	if (log) {}
	// console.log(lo, accessor(array[lo]), value, accessor(array[hi]), hi);
	// console.log(accessor(array[lo]), lo, value, accessor(array[lo]) >= value);
	// console.log(value, hi, accessor(array[hi]), accessor(array[lo]) <= value);

	// var left = value > accessor(array[lo]) ? lo : lo;
	// var right = gte(value, accessor(array[hi])) ? Math.min(hi + 1, array.length - 1) : hi;

	// console.log(value, accessor(array[left]), accessor(array[right]));
	return { left: lo, right: hi };
}

function getClosestItem(array, value, accessor, log) {
	var _getClosestItemIndexe = getClosestItemIndexes(array, value, accessor, log),
	    left = _getClosestItemIndexe.left,
	    right = _getClosestItemIndexe.right;

	if (left === right) {
		return array[left];
	}

	var closest = Math.abs(accessor(array[left]) - value) < Math.abs(accessor(array[right]) - value) ? array[left] : array[right];
	if (log) {
		console.log(array[left], array[right], closest, left, right);
	}
	return closest;
}

var overlayColors = exports.overlayColors = (0, _d3Scale.scaleOrdinal)(_d3Scale.schemeCategory10);

function head(array, accessor) {
	if (accessor && array) {
		var value;
		for (var i = 0; i < array.length; i++) {
			value = array[i];
			if (isDefined(accessor(value))) return value;
		}
		return undefined;
	}
	return array ? array[0] : undefined;
}

function tail(array, accessor) {
	if (accessor && array) {
		return array.map(accessor).slice(1);
	}
	return array ? array.slice(1) : undefined;
}

var first = exports.first = head;

function last(array, accessor) {
	if (accessor && array) {
		var value;
		for (var i = array.length - 1; i >= 0; i--) {
			value = array[i];
			if (isDefined(accessor(value))) return value;
		}
		return undefined;
	}
	var length = array ? array.length : 0;
	return length ? array[length - 1] : undefined;
}

function isDefined(d) {
	return d !== null && typeof d != "undefined";
}

function isNotDefined(d) {
	return !isDefined(d);
}

function isObject(d) {
	return isDefined(d) && (typeof d === "undefined" ? "undefined" : _typeof(d)) === "object" && !Array.isArray(d);
}

var isArray = exports.isArray = Array.isArray;

function touchPosition(touch, e) {
	var container = e.target,
	    rect = container.getBoundingClientRect(),
	    x = touch.clientX - rect.left - container.clientLeft,
	    y = touch.clientY - rect.top - container.clientTop,
	    xy = [Math.round(x), Math.round(y)];
	return xy;
}

function mousePosition(e, defaultRect) {
	var container = e.currentTarget;
	var rect = defaultRect || container.getBoundingClientRect(),
	    x = e.clientX - rect.left - container.clientLeft,
	    y = e.clientY - rect.top - container.clientTop,
	    xy = [Math.round(x), Math.round(y)];
	return xy;
}

function clearCanvas(canvasList, ratio) {
	canvasList.forEach(function (each) {
		each.setTransform(1, 0, 0, 1, 0, 0);
		each.clearRect(-1, -1, each.canvas.width + 2, each.canvas.height + 2);
		each.scale(ratio, ratio);
	});
}

function capitalizeFirst(str) {
	return str.charAt(0).toUpperCase() + str.substring(1);
}

function hexToRGBA(inputHex, opacity) {
	var hex = inputHex.replace("#", "");
	if (inputHex.indexOf("#") > -1 && (hex.length === 3 || hex.length === 6)) {

		var multiplier = hex.length === 3 ? 1 : 2;

		var r = parseInt(hex.substring(0, 1 * multiplier), 16);
		var g = parseInt(hex.substring(1 * multiplier, 2 * multiplier), 16);
		var b = parseInt(hex.substring(2 * multiplier, 3 * multiplier), 16);

		var result = "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";

		return result;
	}
	return inputHex;
}