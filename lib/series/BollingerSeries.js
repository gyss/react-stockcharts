"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _LineSeries = require("./LineSeries");

var _LineSeries2 = _interopRequireDefault(_LineSeries);

var _AreaOnlySeries = require("./AreaOnlySeries");

var _AreaOnlySeries2 = _interopRequireDefault(_AreaOnlySeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BollingerSeries = function (_Component) {
	_inherits(BollingerSeries, _Component);

	function BollingerSeries(props) {
		_classCallCheck(this, BollingerSeries);

		var _this = _possibleConstructorReturn(this, (BollingerSeries.__proto__ || Object.getPrototypeOf(BollingerSeries)).call(this, props));

		_this.yAccessorForTop = _this.yAccessorForTop.bind(_this);
		_this.yAccessorForMiddle = _this.yAccessorForMiddle.bind(_this);
		_this.yAccessorForBottom = _this.yAccessorForBottom.bind(_this);
		_this.yAccessorForScalledBottom = _this.yAccessorForScalledBottom.bind(_this);
		return _this;
	}

	_createClass(BollingerSeries, [{
		key: "yAccessorForTop",
		value: function yAccessorForTop(d) {
			var calculator = this.props.calculator;

			var yAccessor = calculator.accessor();
			return yAccessor(d) && yAccessor(d).top;
		}
	}, {
		key: "yAccessorForMiddle",
		value: function yAccessorForMiddle(d) {
			var calculator = this.props.calculator;

			var yAccessor = calculator.accessor();
			return yAccessor(d) && yAccessor(d).middle;
		}
	}, {
		key: "yAccessorForBottom",
		value: function yAccessorForBottom(d) {
			var calculator = this.props.calculator;

			var yAccessor = calculator.accessor();
			return yAccessor(d) && yAccessor(d).bottom;
		}
	}, {
		key: "yAccessorForScalledBottom",
		value: function yAccessorForScalledBottom(scale, d) {
			var calculator = this.props.calculator;

			var yAccessor = calculator.accessor();
			return scale(yAccessor(d) && yAccessor(d).bottom);
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    calculator = _props.calculator,
			    areaClassName = _props.areaClassName,
			    className = _props.className,
			    opacity = _props.opacity;


			var stroke = calculator.stroke();
			var fill = calculator.fill();

			return _react2.default.createElement(
				"g",
				{ className: className },
				_react2.default.createElement(_LineSeries2.default, { yAccessor: this.yAccessorForTop,
					stroke: stroke.top, fill: "none" }),
				_react2.default.createElement(_LineSeries2.default, { yAccessor: this.yAccessorForMiddle,
					stroke: stroke.middle, fill: "none" }),
				_react2.default.createElement(_LineSeries2.default, { yAccessor: this.yAccessorForBottom,
					stroke: stroke.bottom, fill: "none" }),
				_react2.default.createElement(_AreaOnlySeries2.default, { className: areaClassName,
					yAccessor: this.yAccessorForTop,
					base: this.yAccessorForScalledBottom,
					stroke: "none", fill: fill,
					opacity: opacity })
			);
		}
	}]);

	return BollingerSeries;
}(_react.Component);

BollingerSeries.propTypes = {
	xAccessor: _react.PropTypes.func,
	calculator: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]).isRequired,
	xScale: _react.PropTypes.func,
	yScale: _react.PropTypes.func,
	plotData: _react.PropTypes.array,
	className: _react.PropTypes.string,
	areaClassName: _react.PropTypes.string,
	opacity: _react.PropTypes.number,
	type: _react.PropTypes.string
};

BollingerSeries.defaultProps = {
	className: "react-stockcharts-bollinger-band-series",
	areaClassName: "react-stockcharts-bollinger-band-series-area",
	opacity: 0.2
};

exports.default = BollingerSeries;