"use strict";

/*
https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/macd.js

The MIT License (MIT)

Copyright (c) 2014-2015 Scott Logic Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var fast = _defaultOptionsForComputation.MACD.fast,
	    slow = _defaultOptionsForComputation.MACD.slow,
	    signal = _defaultOptionsForComputation.MACD.signal,
	    sourcePath = _defaultOptionsForComputation.MACD.sourcePath;


	function calculator(data) {

		var fastEMA = (0, _ema2.default)().windowSize(fast).sourcePath(sourcePath);
		var slowEMA = (0, _ema2.default)().windowSize(slow).sourcePath(sourcePath);
		var signalEMA = (0, _ema2.default)().windowSize(signal).sourcePath(undefined);

		var macdCalculator = (0, _utils.zipper)().combine(function (fastEMA, slowEMA) {
			return (0, _utils.isDefined)(fastEMA) && (0, _utils.isDefined)(slowEMA) ? fastEMA - slowEMA : undefined;
		});

		var macdArray = macdCalculator(fastEMA(data), slowEMA(data));

		var undefinedArray = new Array(slow);
		var signalArray = undefinedArray.concat(signalEMA(macdArray.slice(slow)));

		var zip = (0, _utils.zipper)().combine(function (macd, signal) {
			return {
				macd: macd,
				signal: signal,
				divergence: (0, _utils.isDefined)(macd) && (0, _utils.isDefined)(signal) ? macd - signal : undefined
			};
		});

		var macd = zip(macdArray, signalArray);

		return macd;
	}

	calculator.undefinedLength = function () {
		return slow + signal;
	};
	calculator.fast = function (x) {
		if (!arguments.length) {
			return fast;
		}
		fast = x;
		return calculator;
	};

	calculator.slow = function (x) {
		if (!arguments.length) {
			return slow;
		}
		slow = x;
		return calculator;
	};

	calculator.signal = function (x) {
		if (!arguments.length) {
			return signal;
		}
		signal = x;
		return calculator;
	};

	calculator.sourcePath = function (x) {
		if (!arguments.length) {
			return sourcePath;
		}
		sourcePath = x;
		return calculator;
	};

	/* calculator.options = function(options) {
 	if (options) {
 		var { fast, slow, signal, source } = options;
 		underlyingAlgorithm
 			.fast(fast)
 			.slow(slow)
 			.signal(signal)
 			.source()
 	}
 	return {
 		}
 }; */

	return calculator;
};

var _ema = require("./ema");

var _ema2 = _interopRequireDefault(_ema);

var _utils = require("../../utils");

var _defaultOptionsForComputation = require("../defaultOptionsForComputation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }