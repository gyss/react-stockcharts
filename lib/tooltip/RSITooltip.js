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

var _utils = require("../utils");

var _ToolTipText = require("./ToolTipText");

var _ToolTipText2 = _interopRequireDefault(_ToolTipText);

var _ToolTipTSpanLabel = require("./ToolTipTSpanLabel");

var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RSITooltip = function (_Component) {
	_inherits(RSITooltip, _Component);

	function RSITooltip(props) {
		_classCallCheck(this, RSITooltip);

		var _this = _possibleConstructorReturn(this, (RSITooltip.__proto__ || Object.getPrototypeOf(RSITooltip)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		return _this;
	}

	_createClass(RSITooltip, [{
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

			var rsi = (0, _utils.isDefined)(currentItem) && yAccessor(currentItem);
			var value = rsi && displayFormat(rsi) || "n/a";

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
						calculator.tooltipLabel()
					),
					_react2.default.createElement(
						"tspan",
						null,
						value
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

	return RSITooltip;
}(_react.Component);

RSITooltip.propTypes = {
	origin: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.func]).isRequired,
	className: _react.PropTypes.string,
	fontFamily: _react.PropTypes.string,
	fontSize: _react.PropTypes.number,
	onClick: _react.PropTypes.func,
	calculator: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]).isRequired,
	displayFormat: _react.PropTypes.func.isRequired
};

RSITooltip.defaultProps = {
	displayFormat: (0, _d3Format.format)(".2f"),
	origin: [0, 0],
	className: "react-stockcharts-toottip"
};

exports.default = RSITooltip;