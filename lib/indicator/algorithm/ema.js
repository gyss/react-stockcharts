"use strict";

/*
https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/exponentialMovingAverage.js

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
	var windowSize = _defaultOptionsForComputation.EMA.windowSize,
	    sourcePath = _defaultOptionsForComputation.EMA.sourcePath;


	function calculator(data) {

		var source = (0, _utils.path)(sourcePath);
		var alpha = 2 / (windowSize + 1);
		var previous;
		var initialAccumulator = 0;
		var skip = 0;

		return data.map(function (d, i) {
			var v = source(d, i);
			if ((0, _utils.isNotDefined)(previous) && (0, _utils.isNotDefined)(v)) {
				skip++;
				return undefined;
			} else if (i < windowSize + skip - 1) {
				initialAccumulator += v;
				return undefined;
			} else if (i === windowSize + skip - 1) {
				initialAccumulator += v;
				var initialValue = initialAccumulator / windowSize;
				previous = initialValue;
				return initialValue;
			} else {
				var nextValue = v * alpha + (1 - alpha) * previous;
				previous = nextValue;
				return nextValue;
			}
		});
	}
	calculator.undefinedLength = function () {
		return windowSize;
	};
	calculator.windowSize = function (x) {
		if (!arguments.length) {
			return windowSize;
		}
		windowSize = x;
		return calculator;
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

var _defaultOptionsForComputation = require("../defaultOptionsForComputation");