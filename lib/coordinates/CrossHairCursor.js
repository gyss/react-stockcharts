"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _GenericComponent = require("../GenericComponent");

var _GenericComponent2 = _interopRequireDefault(_GenericComponent);

var _PureComponent2 = require("../utils/PureComponent");

var _PureComponent3 = _interopRequireDefault(_PureComponent2);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CrossHairCursor = function (_PureComponent) {
	_inherits(CrossHairCursor, _PureComponent);

	function CrossHairCursor(props) {
		_classCallCheck(this, CrossHairCursor);

		var _this = _possibleConstructorReturn(this, (CrossHairCursor.__proto__ || Object.getPrototypeOf(CrossHairCursor)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(CrossHairCursor, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var lines = helper(this.props, moreProps);

			if ((0, _utils.isDefined)(lines)) {
				var _context = this.context,
				    margin = _context.margin,
				    ratio = _context.ratio;

				var originX = 0.5 * ratio + margin.left;
				var originY = 0.5 * ratio + margin.top;

				ctx.save();
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.scale(ratio, ratio);

				ctx.translate(originX, originY);

				lines.forEach(function (line) {

					ctx.strokeStyle = (0, _utils.hexToRGBA)(line.stroke, line.opacity);
					var dashArray = line.strokeDasharray.split(",").map(function (d) {
						return +d;
					});
					ctx.setLineDash(dashArray);
					ctx.beginPath();
					ctx.moveTo(line.x1, line.y1);
					ctx.lineTo(line.x2, line.y2);
					ctx.stroke();
				});

				ctx.restore();
			}
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var className = this.props.className;

			var lines = helper(this.props, moreProps);

			if ((0, _utils.isNotDefined)(lines)) return null;

			return _react2.default.createElement(
				"g",
				{ className: "react-stockcharts-crosshair " + className },
				lines.map(function (each, idx) {
					return _react2.default.createElement("line", _extends({ key: idx }, each));
				})
			);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericComponent2.default, {
				svgDraw: this.renderSVG,
				clip: false,
				canvasDraw: this.drawOnCanvas,
				drawOnMouseMove: true,
				drawOnPan: true,
				drawOnMouseExitOfCanvas: true
			});
		}
	}]);

	return CrossHairCursor;
}(_PureComponent3.default);

CrossHairCursor.propTypes = {
	className: _react.PropTypes.string
};

CrossHairCursor.contextTypes = {
	margin: _react.PropTypes.object.isRequired,
	ratio: _react.PropTypes.number.isRequired,

	// xScale for getting update event upon pan end, this is needed to get past the PureComponent shouldComponentUpdate
	xScale: _react.PropTypes.func.isRequired
};

CrossHairCursor.defaultProps = {
	stroke: "#000000",
	opacity: 0.3,
	strokeDasharray: "4, 2",
	snapX: true
};

function helper(props, _ref) {
	var mouseXY = _ref.mouseXY,
	    xScale = _ref.xScale,
	    currentItem = _ref.currentItem,
	    show = _ref.show,
	    height = _ref.height,
	    width = _ref.width,
	    xAccessor = _ref.xAccessor;
	var snapX = props.snapX,
	    stroke = props.stroke,
	    opacity = props.opacity,
	    strokeDasharray = props.strokeDasharray;


	if (!show || (0, _utils.isNotDefined)(currentItem)) return null;

	var line1 = {
		x1: 0,
		x2: width,
		y1: mouseXY[1],
		y2: mouseXY[1],
		stroke: stroke, strokeDasharray: strokeDasharray, opacity: opacity
	};
	var x = snapX ? Math.round(xScale(xAccessor(currentItem))) : mouseXY[0];

	var line2 = {
		x1: x,
		x2: x,
		y1: 0,
		y2: height,
		stroke: stroke, strokeDasharray: strokeDasharray, opacity: opacity
	};
	return [line1, line2];
}

exports.default = CrossHairCursor;