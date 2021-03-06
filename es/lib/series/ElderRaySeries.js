"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from "react";

import OverlayBarSeries from "./OverlayBarSeries";
import StraightLine from "./StraightLine";

var ElderRaySeries = function (_Component) {
	_inherits(ElderRaySeries, _Component);

	function ElderRaySeries(props) {
		_classCallCheck(this, ElderRaySeries);

		var _this = _possibleConstructorReturn(this, (ElderRaySeries.__proto__ || Object.getPrototypeOf(ElderRaySeries)).call(this, props));

		_this.fillForEachBar = _this.fillForEachBar.bind(_this);
		_this.yAccessorTop = _this.yAccessorTop.bind(_this);
		_this.yAccessorBullTop = _this.yAccessorBullTop.bind(_this);
		_this.yAccessorBearTop = _this.yAccessorBearTop.bind(_this);
		_this.yAccessorBullBottom = _this.yAccessorBullBottom.bind(_this);
		_this.yAccessorBearBottom = _this.yAccessorBearBottom.bind(_this);
		_this.yAccessorForBarBase = _this.yAccessorForBarBase.bind(_this);
		return _this;
	}

	_createClass(ElderRaySeries, [{
		key: "yAccessorTop",
		value: function yAccessorTop(d) {
			var yAccessor = this.props.yAccessor;

			return yAccessor(d) && Math.max(yAccessor(d).bullPower, 0);
		}
	}, {
		key: "yAccessorBullTop",
		value: function yAccessorBullTop(d) {
			var yAccessor = this.props.yAccessor;

			return yAccessor(d) && (yAccessor(d).bullPower > 0 ? yAccessor(d).bullPower : undefined);
		}
	}, {
		key: "yAccessorBearTop",
		value: function yAccessorBearTop(d) {
			var yAccessor = this.props.yAccessor;

			return yAccessor(d) && (yAccessor(d).bearPower > 0 ? yAccessor(d).bearPower : undefined);
		}
	}, {
		key: "yAccessorBullBottom",
		value: function yAccessorBullBottom(d) {
			var yAccessor = this.props.yAccessor;

			return yAccessor(d) && (yAccessor(d).bullPower < 0 ? 0 : undefined);
		}
	}, {
		key: "yAccessorBearBottom",
		value: function yAccessorBearBottom(d) {
			var yAccessor = this.props.yAccessor;

			return yAccessor(d) && (yAccessor(d).bullPower < 0 || yAccessor(d).bullPower * yAccessor(d).bearPower < 0 // bullPower is +ve and bearPower is -ve
			? Math.min(0, yAccessor(d).bullPower) : undefined);
		}
	}, {
		key: "yAccessorForBarBase",
		value: function yAccessorForBarBase(xScale, yScale, d) {
			var yAccessor = this.props.yAccessor;

			var y = yAccessor(d) && Math.min(yAccessor(d).bearPower, 0);
			return yScale(y);
		}
	}, {
		key: "fillForEachBar",
		value: function fillForEachBar(d, yAccessorNumber) {
			var _props = this.props,
			    bullPowerFill = _props.bullPowerFill,
			    bearPowerFill = _props.bearPowerFill;

			return yAccessorNumber % 2 === 0 ? bullPowerFill : bearPowerFill;
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props,
			    className = _props2.className,
			    opacity = _props2.opacity,
			    stroke = _props2.stroke,
			    straightLineStroke = _props2.straightLineStroke,
			    widthRatio = _props2.widthRatio;


			return React.createElement(
				"g",
				{ className: className },
				React.createElement(OverlayBarSeries, {
					baseAt: this.yAccessorForBarBase,
					className: "react-stockcharts-elderray-bar",
					stroke: stroke,
					fill: this.fillForEachBar,
					opacity: opacity,
					widthRatio: widthRatio,
					yAccessor: [this.yAccessorBullTop, this.yAccessorBearTop, this.yAccessorBullBottom, this.yAccessorBearBottom] }),
				React.createElement(StraightLine, {
					className: "react-stockcharts-elderray-straight-line",
					yValue: 0,
					stroke: straightLineStroke })
			);
		}
	}]);

	return ElderRaySeries;
}(Component);

ElderRaySeries.propTypes = {
	className: PropTypes.string,
	yAccessor: PropTypes.func,
	opacity: PropTypes.number,
	stroke: PropTypes.bool,
	bullPowerFill: PropTypes.string,
	bearPowerFill: PropTypes.string,
	straightLineStroke: PropTypes.string,
	widthRatio: PropTypes.number
};

ElderRaySeries.defaultProps = {
	className: "react-stockcharts-elderray-series",
	zeroLineStroke: "#000000",
	zeroLineOpacity: 0.3,
	opacity: 0.5,
	stroke: true,
	bullPowerFill: "#6BA583",
	bearPowerFill: "#FF0000",
	widthRatio: 0.8
};

export default ElderRaySeries;