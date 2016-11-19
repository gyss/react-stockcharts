"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../utils");

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StraightLine = function (_Component) {
	_inherits(StraightLine, _Component);

	function StraightLine(props) {
		_classCallCheck(this, StraightLine);

		var _this = _possibleConstructorReturn(this, (StraightLine.__proto__ || Object.getPrototypeOf(StraightLine)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(StraightLine, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props = this.props,
			    stroke = _props.stroke,
			    opacity = _props.opacity,
			    yValue = _props.yValue;
			var xAccessor = moreProps.xAccessor;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData;


			var first = xAccessor(plotData[0]);
			var last = xAccessor(plotData[plotData.length - 1]);

			ctx.beginPath();

			ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, opacity);

			ctx.moveTo(xScale(first), yScale(yValue));
			ctx.lineTo(xScale(last), yScale(yValue));
			ctx.stroke();
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
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var xAccessor = moreProps.xAccessor;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData;
			var _props2 = this.props,
			    stroke = _props2.stroke,
			    className = _props2.className,
			    opacity = _props2.opacity,
			    yValue = _props2.yValue;


			var first = xAccessor(plotData[0]);
			var last = xAccessor(plotData[plotData.length - 1]);

			return _react2.default.createElement("line", { className: className,
				stroke: stroke, opacity: opacity,
				x1: xScale(first), y1: yScale(yValue),
				x2: xScale(last), y2: yScale(yValue) });
		}
	}]);

	return StraightLine;
}(_react.Component);

StraightLine.propTypes = {
	className: _react.PropTypes.string,
	stroke: _react.PropTypes.string,
	opacity: _react.PropTypes.number.isRequired,
	yValue: _react.PropTypes.number.isRequired
};

StraightLine.defaultProps = {
	className: "line ",
	stroke: "#000000",
	opacity: 0.5
};

exports.default = StraightLine;