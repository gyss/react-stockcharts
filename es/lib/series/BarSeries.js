"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from "react";

import GenericChartComponent, { getAxisCanvas } from "../GenericChartComponent";

import StackedBarSeries, { drawOnCanvasHelper, svgHelper, identityStack } from "./StackedBarSeries";

var BarSeries = function (_Component) {
	_inherits(BarSeries, _Component);

	function BarSeries(props) {
		_classCallCheck(this, BarSeries);

		var _this = _possibleConstructorReturn(this, (BarSeries.__proto__ || Object.getPrototypeOf(BarSeries)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(BarSeries, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var xAccessor = moreProps.xAccessor;


			drawOnCanvasHelper(ctx, this.props, moreProps, xAccessor, identityStack);
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var xAccessor = moreProps.xAccessor;


			return React.createElement(
				"g",
				null,
				svgHelper(this.props, moreProps, xAccessor, identityStack)
			);
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(GenericChartComponent, {
				canvasToDraw: getAxisCanvas,
				svgDraw: this.renderSVG,
				canvasDraw: this.drawOnCanvas,
				drawOnPan: true
			});
		}
	}]);

	return BarSeries;
}(Component);

BarSeries.propTypes = {
	baseAt: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
	stroke: PropTypes.bool.isRequired,
	widthRatio: PropTypes.number.isRequired,
	yAccessor: PropTypes.func.isRequired,
	opacity: PropTypes.number.isRequired,
	fill: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
	className: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired
};

BarSeries.defaultProps = StackedBarSeries.defaultProps;

export default BarSeries;