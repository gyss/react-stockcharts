"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d3Format = require("d3-format");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _ToolTipText = require("./ToolTipText");

var _ToolTipText2 = _interopRequireDefault(_ToolTipText);

var _ToolTipTSpanLabel = require("./ToolTipTSpanLabel");

var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MACDTooltip = function (_Component) {
	_inherits(MACDTooltip, _Component);

	function MACDTooltip(props) {
		_classCallCheck(this, MACDTooltip);

		var _this = _possibleConstructorReturn(this, (MACDTooltip.__proto__ || Object.getPrototypeOf(MACDTooltip)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		return _this;
	}

	_createClass(MACDTooltip, [{
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props = this.props,
			    onClick = _props.onClick,
			    fontFamily = _props.fontFamily,
			    fontSize = _props.fontSize,
			    calculator = _props.calculator,
			    displayFormat = _props.displayFormat,
			    className = _props.className;
			var width = moreProps.width,
			    height = moreProps.height;
			var currentItem = moreProps.currentItem;


			var yAccessor = calculator.accessor();

			var macdValue = currentItem && yAccessor(currentItem);

			var macd = macdValue && macdValue.macd && displayFormat(macdValue.macd) || "n/a";
			var signal = macdValue && macdValue.signal && displayFormat(macdValue.signal) || "n/a";
			var divergence = macdValue && macdValue.divergence && displayFormat(macdValue.divergence) || "n/a";

			var originProp = this.props.origin;

			var origin = (0, _utils.functor)(originProp);

			var _origin = origin(width, height),
			    _origin2 = _slicedToArray(_origin, 2),
			    x = _origin2[0],
			    y = _origin2[1];

			return _react2.default.createElement(
				"g",
				{ className: className, transform: "translate(" + x + ", " + y + ")", onClick: onClick },
				_react2.default.createElement(
					_ToolTipText2.default,
					{ x: 0, y: 0,
						fontFamily: fontFamily, fontSize: fontSize },
					_react2.default.createElement(
						_ToolTipTSpanLabel2.default,
						null,
						"MACD ("
					),
					_react2.default.createElement(
						"tspan",
						{ fill: calculator.stroke().macd },
						calculator.slow()
					),
					_react2.default.createElement(
						_ToolTipTSpanLabel2.default,
						null,
						", "
					),
					_react2.default.createElement(
						"tspan",
						{ fill: calculator.stroke().macd },
						calculator.fast()
					),
					_react2.default.createElement(
						_ToolTipTSpanLabel2.default,
						null,
						"): "
					),
					_react2.default.createElement(
						"tspan",
						{ fill: calculator.stroke().macd },
						macd
					),
					_react2.default.createElement(
						_ToolTipTSpanLabel2.default,
						null,
						" Signal ("
					),
					_react2.default.createElement(
						"tspan",
						{ fill: calculator.stroke().signal },
						calculator.signal()
					),
					_react2.default.createElement(
						_ToolTipTSpanLabel2.default,
						null,
						"): "
					),
					_react2.default.createElement(
						"tspan",
						{ fill: calculator.stroke().signal },
						signal
					),
					_react2.default.createElement(
						_ToolTipTSpanLabel2.default,
						null,
						" Divergence: "
					),
					_react2.default.createElement(
						"tspan",
						{ fill: calculator.fill().divergence },
						divergence
					)
				)
			);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericChartComponent2.default, {
				clip: false,
				svgDraw: this.renderSVG,
				drawOnMouseMove: true
			});
		}
	}]);

	return MACDTooltip;
}(_react.Component);

MACDTooltip.propTypes = {
	origin: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.func]).isRequired,
	className: _react.PropTypes.string,
	fontFamily: _react.PropTypes.string,
	fontSize: _react.PropTypes.number,
	calculator: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]).isRequired,
	displayFormat: _react.PropTypes.func.isRequired,
	onClick: _react.PropTypes.func
};

MACDTooltip.defaultProps = {
	origin: [0, 0],
	displayFormat: (0, _d3Format.format)(".2f"),
	className: "react-stockcharts-toottip"
};

exports.default = MACDTooltip;
// export default MACDTooltip;