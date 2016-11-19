"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { format } from "d3-format";
import React, { PropTypes, Component } from "react";
import GenericChartComponent from "../GenericChartComponent";

import { functor } from "../utils";

import ToolTipText from "./ToolTipText";
import ToolTipTSpanLabel from "./ToolTipTSpanLabel";

var StochasticTooltip = function (_Component) {
	_inherits(StochasticTooltip, _Component);

	function StochasticTooltip(props) {
		_classCallCheck(this, StochasticTooltip);

		var _this = _possibleConstructorReturn(this, (StochasticTooltip.__proto__ || Object.getPrototypeOf(StochasticTooltip)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		return _this;
	}

	_createClass(StochasticTooltip, [{
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props = this.props,
			    onClick = _props.onClick,
			    fontFamily = _props.fontFamily,
			    fontSize = _props.fontSize,
			    calculator = _props.calculator,
			    displayFormat = _props.displayFormat,
			    children = _props.children;
			var className = this.props.className;
			var width = moreProps.width,
			    height = moreProps.height;
			var currentItem = moreProps.currentItem;


			var yAccessor = calculator.accessor();
			var stroke = calculator.stroke();
			var stochastic = currentItem && yAccessor(currentItem);

			var K = stochastic && stochastic.K && displayFormat(stochastic.K) || "n/a";
			var D = stochastic && stochastic.D && displayFormat(stochastic.D) || "n/a";
			var label = children || "Stochastic";

			var originProp = this.props.origin;

			var origin = functor(originProp);

			var _origin = origin(width, height),
			    _origin2 = _slicedToArray(_origin, 2),
			    x = _origin2[0],
			    y = _origin2[1];

			return React.createElement(
				"g",
				{ className: className, transform: "translate(" + x + ", " + y + ")", onClick: onClick },
				React.createElement(
					ToolTipText,
					{ x: 0, y: 0, fontFamily: fontFamily, fontSize: fontSize },
					React.createElement(
						ToolTipTSpanLabel,
						null,
						label + " %K("
					),
					React.createElement(
						"tspan",
						{ fill: stroke.K },
						calculator.windowSize() + ", " + calculator.kWindowSize()
					),
					React.createElement(
						ToolTipTSpanLabel,
						null,
						"): "
					),
					React.createElement(
						"tspan",
						{ fill: stroke.K },
						K
					),
					React.createElement(
						ToolTipTSpanLabel,
						null,
						" %D ("
					),
					React.createElement(
						"tspan",
						{ fill: stroke.D },
						calculator.dWindowSize()
					),
					React.createElement(
						ToolTipTSpanLabel,
						null,
						"): "
					),
					React.createElement(
						"tspan",
						{ fill: stroke.D },
						D
					)
				)
			);
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(GenericChartComponent, {
				clip: false,
				svgDraw: this.renderSVG,
				drawOnMouseMove: true
			});
		}
	}]);

	return StochasticTooltip;
}(Component);

StochasticTooltip.propTypes = {
	origin: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	className: PropTypes.string,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.number,
	onClick: PropTypes.func,
	calculator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
	displayFormat: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};

StochasticTooltip.defaultProps = {
	displayFormat: format(".2f"),
	origin: [0, 0],
	className: "react-stockcharts-toottip"
};

export default StochasticTooltip;