"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _StackedBarSeries = require("./StackedBarSeries");

var _StackedBarSeries2 = _interopRequireDefault(_StackedBarSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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


			(0, _StackedBarSeries.drawOnCanvasHelper)(ctx, this.props, moreProps, xAccessor, _StackedBarSeries.identityStack);
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var xAccessor = moreProps.xAccessor;


			return _react2.default.createElement(
				"g",
				null,
				(0, _StackedBarSeries.svgHelper)(this.props, moreProps, xAccessor, _StackedBarSeries.identityStack)
			);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericChartComponent2.default, {
				canvasToDraw: _GenericChartComponent.getAxisCanvas,
				svgDraw: this.renderSVG,
				canvasDraw: this.drawOnCanvas,
				drawOnPan: true
			});
		}
	}]);

	return BarSeries;
}(_react.Component);

BarSeries.propTypes = {
	baseAt: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,
	stroke: _react.PropTypes.bool.isRequired,
	widthRatio: _react.PropTypes.number.isRequired,
	yAccessor: _react.PropTypes.func.isRequired,
	opacity: _react.PropTypes.number.isRequired,
	fill: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	className: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired
};

BarSeries.defaultProps = _StackedBarSeries2.default.defaultProps;

exports.default = BarSeries;