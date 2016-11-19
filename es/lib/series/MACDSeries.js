"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from "react";

import BarSeries from "./BarSeries";
import LineSeries from "./LineSeries";
import StraightLine from "./StraightLine";

var MACDSeries = function (_Component) {
	_inherits(MACDSeries, _Component);

	function MACDSeries(props) {
		_classCallCheck(this, MACDSeries);

		var _this = _possibleConstructorReturn(this, (MACDSeries.__proto__ || Object.getPrototypeOf(MACDSeries)).call(this, props));

		_this.yAccessorForMACD = _this.yAccessorForMACD.bind(_this);
		_this.yAccessorForSignal = _this.yAccessorForSignal.bind(_this);
		_this.yAccessorForDivergence = _this.yAccessorForDivergence.bind(_this);
		_this.yAccessorForDivergenceBase = _this.yAccessorForDivergenceBase.bind(_this);
		return _this;
	}

	_createClass(MACDSeries, [{
		key: "yAccessorForMACD",
		value: function yAccessorForMACD(d) {
			var calculator = this.props.calculator;

			var yAccessor = calculator.accessor();
			return yAccessor(d) && yAccessor(d).macd;
		}
	}, {
		key: "yAccessorForSignal",
		value: function yAccessorForSignal(d) {
			var calculator = this.props.calculator;

			var yAccessor = calculator.accessor();
			return yAccessor(d) && yAccessor(d).signal;
		}
	}, {
		key: "yAccessorForDivergence",
		value: function yAccessorForDivergence(d) {
			var calculator = this.props.calculator;

			var yAccessor = calculator.accessor();
			return yAccessor(d) && yAccessor(d).divergence;
		}
	}, {
		key: "yAccessorForDivergenceBase",
		value: function yAccessorForDivergenceBase(xScale, yScale /* , d */) {
			return yScale(0);
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    type = _props.type,
			    opacity = _props.opacity,
			    divergenceStroke = _props.divergenceStroke,
			    calculator = _props.calculator;

			var stroke = calculator.stroke();
			var fill = calculator.fill();
			return React.createElement(
				"g",
				{ className: className },
				React.createElement(BarSeries, {
					baseAt: this.yAccessorForDivergenceBase,
					className: "macd-divergence",
					widthRatio: 0.5,
					stroke: divergenceStroke, fill: fill.divergence, opacity: opacity,
					yAccessor: this.yAccessorForDivergence }),
				React.createElement(LineSeries, {
					yAccessor: this.yAccessorForMACD,
					stroke: stroke.macd, fill: "none",
					type: type }),
				React.createElement(LineSeries, {
					yAccessor: this.yAccessorForSignal,
					stroke: stroke.signal, fill: "none",
					type: type }),
				getHorizontalLine(this.props)
			);
		}
	}]);

	return MACDSeries;
}(Component);

function getHorizontalLine(props) {

	/* eslint-disable react/prop-types */
	var zeroLineStroke = props.zeroLineStroke,
	    zeroLineOpacity = props.zeroLineOpacity;
	/* eslint-enable react/prop-types */

	return React.createElement(StraightLine, {
		stroke: zeroLineStroke, opacity: zeroLineOpacity,
		yValue: 0 });
}

MACDSeries.propTypes = {
	className: PropTypes.string,
	xScale: PropTypes.func,
	yScale: PropTypes.func,
	xAccessor: PropTypes.func,
	calculator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
	plotData: PropTypes.array,
	type: PropTypes.string,
	opacity: PropTypes.number,
	divergenceStroke: PropTypes.bool
};

MACDSeries.defaultProps = {
	className: "react-stockcharts-macd-series",
	zeroLineStroke: "#000000",
	zeroLineOpacity: 0.3,
	opacity: 0.6,
	divergenceStroke: false
};

export default MACDSeries;