"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from "react";

import LineSeries from "./LineSeries";
import StraightLine from "./StraightLine";

var StochasticSeries = function (_Component) {
	_inherits(StochasticSeries, _Component);

	function StochasticSeries(props) {
		_classCallCheck(this, StochasticSeries);

		var _this = _possibleConstructorReturn(this, (StochasticSeries.__proto__ || Object.getPrototypeOf(StochasticSeries)).call(this, props));

		_this.yAccessorForD = _this.yAccessorForD.bind(_this);
		_this.yAccessorForK = _this.yAccessorForK.bind(_this);
		return _this;
	}

	_createClass(StochasticSeries, [{
		key: "yAccessorForD",
		value: function yAccessorForD(d) {
			var calculator = this.props.calculator;

			var yAccessor = calculator.accessor();
			return yAccessor(d) && yAccessor(d).D;
		}
	}, {
		key: "yAccessorForK",
		value: function yAccessorForK(d) {
			var calculator = this.props.calculator;

			var yAccessor = calculator.accessor();
			return yAccessor(d) && yAccessor(d).K;
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    calculator = _props.calculator,
			    stroke = _props.stroke,
			    type = _props.type;

			var seriesStroke = calculator.stroke();
			return React.createElement(
				"g",
				{ className: className },
				React.createElement(LineSeries, { yAccessor: this.yAccessorForD,
					stroke: seriesStroke.D, fill: "none",
					type: type }),
				React.createElement(LineSeries, { yAccessor: this.yAccessorForK,
					stroke: seriesStroke.K, fill: "none",
					type: type }),
				getHorizontalLine(this.props, calculator.overSold(), stroke.top),
				getHorizontalLine(this.props, calculator.middle(), stroke.middle),
				getHorizontalLine(this.props, calculator.overBought(), stroke.bottom)
			);
		}
	}]);

	return StochasticSeries;
}(Component);

function getHorizontalLine(props, yValue, stroke) {

	/* eslint-disable react/prop-types */
	var yAccessor = props.yAccessor;
	/* eslint-enable react/prop-types */

	return React.createElement(StraightLine, {
		stroke: stroke, opacity: 0.3,
		yAccessor: yAccessor,
		yValue: yValue });
}

StochasticSeries.propTypes = {
	className: PropTypes.string,
	calculator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
	xScale: PropTypes.func,
	yScale: PropTypes.func,
	xAccessor: PropTypes.func,
	plotData: PropTypes.array,
	stroke: PropTypes.object,
	type: PropTypes.string
};

StochasticSeries.defaultProps = {
	className: "react-stockcharts-stochastic-series",
	stroke: {
		top: "#964B00",
		middle: "#000000",
		bottom: "#964B00"
	}
};

export default StochasticSeries;