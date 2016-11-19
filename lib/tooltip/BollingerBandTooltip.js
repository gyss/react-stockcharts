"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _d3Format = require("d3-format");

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

var BollingerBandTooltip = function (_Component) {
	_inherits(BollingerBandTooltip, _Component);

	function BollingerBandTooltip(props) {
		_classCallCheck(this, BollingerBandTooltip);

		var _this = _possibleConstructorReturn(this, (BollingerBandTooltip.__proto__ || Object.getPrototypeOf(BollingerBandTooltip)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		return _this;
	}

	_createClass(BollingerBandTooltip, [{
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props = this.props,
			    onClick = _props.onClick,
			    displayFormat = _props.displayFormat,
			    calculator = _props.calculator;
			var width = moreProps.width,
			    height = moreProps.height;
			var currentItem = moreProps.currentItem;


			var top, middle, bottom;
			top = middle = bottom = "n/a";
			var accessor = calculator.accessor();

			if ((0, _utils.isDefined)(currentItem) && (0, _utils.isDefined)(accessor(currentItem))) {
				var item = accessor(currentItem);
				top = displayFormat(item.top);
				middle = displayFormat(item.middle);
				bottom = displayFormat(item.bottom);
			}

			var originProp = this.props.origin;

			var origin = (0, _utils.functor)(originProp);

			var _origin = origin(width, height),
			    _origin2 = _slicedToArray(_origin, 2),
			    x = _origin2[0],
			    y = _origin2[1];

			var tooltipLabel = (0, _utils.functor)(calculator.tooltipLabel());

			return _react2.default.createElement(
				"g",
				{ transform: "translate(" + x + ", " + y + ")",
					className: this.props.className, onClick: onClick },
				_react2.default.createElement(
					_ToolTipText2.default,
					{ x: 0, y: 0,
						fontFamily: this.props.fontFamily, fontSize: this.props.fontSize },
					_react2.default.createElement(
						_ToolTipTSpanLabel2.default,
						null,
						tooltipLabel()
					),
					_react2.default.createElement(
						"tspan",
						null,
						top + ", " + middle + ", " + bottom
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

	return BollingerBandTooltip;
}(_react.Component);

BollingerBandTooltip.propTypes = {
	className: _react.PropTypes.string,
	calculator: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]).isRequired,
	displayFormat: _react.PropTypes.func.isRequired,
	origin: _react.PropTypes.array.isRequired,
	onClick: _react.PropTypes.func,
	fontFamily: _react.PropTypes.string,
	fontSize: _react.PropTypes.number,
	forDataSeries: _react.PropTypes.number
};

BollingerBandTooltip.defaultProps = {
	className: "react-stockcharts-toottip react-stockcharts-bollingerband-tooltip",
	displayFormat: (0, _d3Format.format)(".2f"),
	origin: [0, 10]
};

exports.default = BollingerBandTooltip;