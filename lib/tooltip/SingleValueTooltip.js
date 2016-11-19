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

var _ToolTipText = require("./ToolTipText");

var _ToolTipText2 = _interopRequireDefault(_ToolTipText);

var _ToolTipTSpanLabel = require("./ToolTipTSpanLabel");

var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleValueTooltip = function (_Component) {
	_inherits(SingleValueTooltip, _Component);

	function SingleValueTooltip(props) {
		_classCallCheck(this, SingleValueTooltip);

		var _this = _possibleConstructorReturn(this, (SingleValueTooltip.__proto__ || Object.getPrototypeOf(SingleValueTooltip)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		return _this;
	}

	_createClass(SingleValueTooltip, [{
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props = this.props,
			    onClick = _props.onClick,
			    fontFamily = _props.fontFamily,
			    fontSize = _props.fontSize,
			    labelStroke = _props.labelStroke,
			    valueStroke = _props.valueStroke,
			    className = _props.className;
			var _props2 = this.props,
			    xDisplayFormat = _props2.xDisplayFormat,
			    yDisplayFormat = _props2.yDisplayFormat,
			    xLabel = _props2.xLabel,
			    yLabel = _props2.yLabel,
			    xAccessor = _props2.xAccessor,
			    yAccessor = _props2.yAccessor;
			var width = moreProps.width,
			    height = moreProps.height;
			var currentItem = moreProps.currentItem;


			var xDisplayValue = (0, _utils.isDefined)(currentItem) && (0, _utils.isDefined)(xAccessor(currentItem)) ? xDisplayFormat(xAccessor(currentItem)) : "n/a";
			var yDisplayValue = (0, _utils.isDefined)(currentItem) && (0, _utils.isDefined)(yAccessor(currentItem)) ? yDisplayFormat(yAccessor(currentItem)) : "n/a";

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
					xLabel ? _react2.default.createElement(
						_ToolTipTSpanLabel2.default,
						{ x: 0, dy: "5", fill: labelStroke },
						xLabel + ": "
					) : null,
					xLabel ? _react2.default.createElement(
						"tspan",
						{ fill: valueStroke },
						xDisplayValue + " "
					) : null,
					_react2.default.createElement(
						_ToolTipTSpanLabel2.default,
						{ fill: labelStroke },
						yLabel + ": "
					),
					_react2.default.createElement(
						"tspan",
						{ fill: valueStroke },
						yDisplayValue
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

	return SingleValueTooltip;
}(_react.Component);

SingleValueTooltip.propTypes = {
	xDisplayFormat: _react.PropTypes.func,
	yDisplayFormat: _react.PropTypes.func.isRequired,
	xLabel: _react.PropTypes.string,
	yLabel: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]).isRequired,
	labelStroke: _react.PropTypes.string.isRequired,
	valueStroke: _react.PropTypes.string,
	origin: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.func]).isRequired,
	className: _react.PropTypes.string,
	fontFamily: _react.PropTypes.string,
	fontSize: _react.PropTypes.number,
	onClick: _react.PropTypes.func,
	xAccessor: _react.PropTypes.func,
	yAccessor: _react.PropTypes.func
};

SingleValueTooltip.defaultProps = {
	origin: [0, 0],
	labelStroke: "#4682B4",
	valueStroke: "#000000",
	yDisplayFormat: (0, _d3Format.format)(".2f"),
	xAccessor: _utils.noop,
	yAccessor: _utils.identity,
	className: "react-stockcharts-toottip"
};

exports.default = SingleValueTooltip;