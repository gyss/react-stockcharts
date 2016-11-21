"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from "react";
import { scaleLinear } from "d3-scale";

import PureComponent from "./utils/PureComponent";
import { isNotDefined, noop } from "./utils";

var Chart = function (_PureComponent) {
	_inherits(Chart, _PureComponent);

	function Chart(props, context) {
		_classCallCheck(this, Chart);

		var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this, props, context));

		_this.yScale = _this.yScale.bind(_this);
		_this.listener = _this.listener.bind(_this);
		return _this;
	}

	_createClass(Chart, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			var id = this.props.id;
			var subscribe = this.context.subscribe;

			subscribe("chart_" + id, this.listener);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			var id = this.props.id;
			var unsubscribe = this.context.unsubscribe;

			unsubscribe("chart_" + id);
		}
	}, {
		key: "listener",
		value: function listener(type, moreProps, e) {
			var _props = this.props,
			    id = _props.id,
			    onContextMenu = _props.onContextMenu;


			if (type === "contextmenu") {
				var currentCharts = moreProps.currentCharts;

				if (currentCharts.indexOf(id) > -1) {
					onContextMenu(moreProps, e);
				}
			}
		}
	}, {
		key: "yScale",
		value: function yScale() {
			var _this2 = this;

			var chartConfig = this.context.chartConfig.filter(function (each) {
				return each.id === _this2.props.id;
			})[0];
			return chartConfig.yScale.copy();
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var chartId = this.props.id;
			var _context = this.context,
			    ratio = _context.ratio,
			    margin = _context.margin;

			var chartConfig = this.context.chartConfig.filter(function (each) {
				return each.id === chartId;
			})[0];

			var width = chartConfig.width,
			    height = chartConfig.height;

			var canvasOriginX = 0.5 * ratio + chartConfig.origin[0] + margin.left;
			var canvasOriginY = 0.5 * ratio + chartConfig.origin[1] + margin.top;

			return { chartId: chartId, chartConfig: chartConfig, canvasOriginX: canvasOriginX, canvasOriginY: canvasOriginY, width: width, height: height };
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var origin = this.context.chartConfig.filter(function (each) {
				return each.id === _this3.props.id;
			})[0].origin;

			var _origin = _slicedToArray(origin, 2),
			    x = _origin[0],
			    y = _origin[1];

			return React.createElement(
				"g",
				{ transform: "translate(" + x + ", " + y + ")" },
				this.props.children
			);
		}
	}]);

	return Chart;
}(PureComponent);

Chart.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	origin: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	id: PropTypes.number.isRequired,
	yExtents: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	yExtentsCalculator: function yExtentsCalculator(props, propName, componentName) {
		if (isNotDefined(props.yExtents) && typeof props.yExtentsCalculator !== "function") return new Error("yExtents or yExtentsCalculator must" + (" be present on " + componentName + ". Validation failed."));
	},
	onContextMenu: PropTypes.func.isRequired,
	yScale: PropTypes.func.isRequired,
	yMousePointerDisplayLocation: PropTypes.oneOf(["left", "right"]),
	yMousePointerDisplayFormat: PropTypes.func,
	flipYScale: PropTypes.bool.isRequired,
	padding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
		top: PropTypes.number,
		bottom: PropTypes.number
	})]).isRequired,
	children: PropTypes.node
};

Chart.defaultProps = {
	id: 0,
	origin: [0, 0],
	padding: 0,
	yScale: scaleLinear(),
	flipYScale: false,
	yPan: true,
	onContextMenu: noop
};

Chart.contextTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	chartConfig: PropTypes.array,
	margin: PropTypes.object.isRequired,
	ratio: PropTypes.number.isRequired,

	subscribe: PropTypes.func.isRequired,
	unsubscribe: PropTypes.func.isRequired
};

Chart.childContextTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	chartConfig: PropTypes.object.isRequired,
	canvasOriginX: PropTypes.number,
	canvasOriginY: PropTypes.number,
	chartId: PropTypes.number.isRequired
};

export default Chart;