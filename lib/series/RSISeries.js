"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _LineSeries = require("./LineSeries");

var _LineSeries2 = _interopRequireDefault(_LineSeries);

var _StraightLine = require("./StraightLine");

var _StraightLine2 = _interopRequireDefault(_StraightLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RSISeries = function (_Component) {
	_inherits(RSISeries, _Component);

	function RSISeries() {
		_classCallCheck(this, RSISeries);

		return _possibleConstructorReturn(this, (RSISeries.__proto__ || Object.getPrototypeOf(RSISeries)).apply(this, arguments));
	}

	_createClass(RSISeries, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    calculator = _props.calculator,
			    stroke = _props.stroke,
			    type = _props.type;

			var yAccessor = calculator.accessor();
			var overSold = calculator.overSold();
			var middle = calculator.middle();
			var overBought = calculator.overBought();

			return _react2.default.createElement(
				"g",
				{ className: className },
				_react2.default.createElement(_LineSeries2.default, {
					className: className,
					yAccessor: yAccessor,
					stroke: stroke.line, fill: "none",
					type: type }),
				getHorizontalLine(this.props, overSold, stroke.top),
				getHorizontalLine(this.props, middle, stroke.middle),
				getHorizontalLine(this.props, overBought, stroke.bottom)
			);
		}
	}]);

	return RSISeries;
}(_react.Component);

function getHorizontalLine(props, yValue, stroke) {

	return _react2.default.createElement(_StraightLine2.default, {
		stroke: stroke, opacity: 0.3,
		yValue: yValue });
}

RSISeries.propTypes = {
	className: _react.PropTypes.string,

	calculator: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]).isRequired,
	xScale: _react.PropTypes.func,
	yScale: _react.PropTypes.func,
	xAccessor: _react.PropTypes.func,
	plotData: _react.PropTypes.array,
	stroke: _react.PropTypes.object,
	type: _react.PropTypes.string
};

RSISeries.defaultProps = {
	className: "react-stockcharts-rsi-series",
	stroke: {
		line: "#000000",
		top: "#964B00",
		middle: "#000000",
		bottom: "#964B00"
	}
};

exports.default = RSISeries;