"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require("d3-selection");

var _d3Array = require("d3-array");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function sign(x) {
	return (x > 0) - (x < 0);
}

var AxisZoomCapture = function (_Component) {
	_inherits(AxisZoomCapture, _Component);

	function AxisZoomCapture(props) {
		_classCallCheck(this, AxisZoomCapture);

		var _this = _possibleConstructorReturn(this, (AxisZoomCapture.__proto__ || Object.getPrototypeOf(AxisZoomCapture)).call(this, props));

		_this.handleDragStart = _this.handleDragStart.bind(_this);
		_this.handleDrag = _this.handleDrag.bind(_this);
		_this.handleDragEnd = _this.handleDragEnd.bind(_this);
		_this.handleRightClick = _this.handleRightClick.bind(_this);
		_this.saveNode = _this.saveNode.bind(_this);
		_this.state = {
			startPosition: null
		};
		return _this;
	}

	_createClass(AxisZoomCapture, [{
		key: "saveNode",
		value: function saveNode(node) {
			this.node = node;
		}
	}, {
		key: "handleRightClick",
		value: function handleRightClick(e) {
			e.stopPropagation();
			e.preventDefault();

			var onContextMenu = this.props.onContextMenu;


			var mouseXY = (0, _utils.mousePosition)(e, this.node.getBoundingClientRect());

			(0, _d3Selection.select)((0, _utils.d3Window)(this.node)).on(_utils.MOUSEMOVE, null).on(_utils.MOUSEUP, null);
			this.setState({
				startPosition: null
			});

			onContextMenu(mouseXY, e);

			this.contextMenuClicked = true;
		}
	}, {
		key: "handleDragStart",
		value: function handleDragStart(e) {
			var _props = this.props,
			    getScale = _props.getScale,
			    getMoreProps = _props.getMoreProps;

			var startScale = getScale(getMoreProps());
			this.dragHappened = false;

			if (startScale.invert) {
				(0, _d3Selection.select)((0, _utils.d3Window)(this.node)).on(_utils.MOUSEMOVE, this.handleDrag).on(_utils.MOUSEUP, this.handleDragEnd);

				var startXY = (0, _utils.mousePosition)(e);
				var leftX = e.pageX - startXY[0],
				    topY = e.pageY - startXY[1];

				this.setState({
					startPosition: {
						startXY: startXY,
						leftX: leftX,
						topY: topY,
						startScale: startScale
					}
				});
			}
			e.preventDefault();
		}
	}, {
		key: "handleDrag",
		value: function handleDrag() {
			var e = _d3Selection.event;
			e.preventDefault();

			var startPosition = this.state.startPosition;
			var _props2 = this.props,
			    getMouseDelta = _props2.getMouseDelta,
			    inverted = _props2.inverted;


			this.dragHappened = true;
			if ((0, _utils.isDefined)(startPosition)) {
				var startScale = startPosition.startScale;
				var startXY = startPosition.startXY,
				    leftX = startPosition.leftX,
				    topY = startPosition.topY;


				var mouseXY = [e.pageX - leftX, e.pageY - topY];

				var diff = getMouseDelta(startXY, mouseXY);

				var center = (0, _d3Array.mean)(startScale.range());

				var tempRange = startScale.range().map(function (d) {
					return inverted ? d - sign(d - center) * diff : d + sign(d - center) * diff;
				});

				var newDomain = tempRange.map(startScale.invert);

				if (sign((0, _utils.last)(startScale.range()) - (0, _utils.first)(startScale.range())) === sign((0, _utils.last)(tempRange) - (0, _utils.first)(tempRange))) {
					var axisZoomCallback = this.props.axisZoomCallback;
					// console.log(startXScale.domain(), newXDomain)

					axisZoomCallback(newDomain);
				}
			}
		}
	}, {
		key: "handleDragEnd",
		value: function handleDragEnd() {
			var _this2 = this;

			if (!this.dragHappened) {
				if (this.clicked) {
					var e = _d3Selection.event;
					var mouseXY = (0, _utils.mousePosition)(e, this.node.getBoundingClientRect());
					var onDoubleClick = this.props.onDoubleClick;


					onDoubleClick(mouseXY, e);
				} else {
					this.clicked = true;
					setTimeout(function () {
						_this2.clicked = false;
					}, 300);
				}
			}

			(0, _d3Selection.select)((0, _utils.d3Window)(this.node)).on(_utils.MOUSEMOVE, null).on(_utils.MOUSEUP, null);
			this.setState({
				startPosition: null
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _props3 = this.props,
			    bg = _props3.bg,
			    zoomCursorClassName = _props3.zoomCursorClassName;


			var cursor = (0, _utils.isDefined)(this.state.startPosition) ? zoomCursorClassName : "react-stockcharts-default-cursor";

			return _react2.default.createElement("rect", {
				className: "react-stockcharts-enable-interaction " + cursor,
				ref: this.saveNode,
				x: bg.x, y: bg.y, opacity: 0, height: bg.h, width: bg.w,
				onContextMenu: this.handleRightClick,
				onMouseDown: this.handleDragStart
			});
		}
	}]);

	return AxisZoomCapture;
}(_react.Component);

AxisZoomCapture.propTypes = {
	innerTickSize: _react.PropTypes.number,
	outerTickSize: _react.PropTypes.number,
	tickFormat: _react.PropTypes.func,
	tickPadding: _react.PropTypes.number,
	tickSize: _react.PropTypes.number,
	ticks: _react.PropTypes.number,
	tickValues: _react.PropTypes.array,
	showDomain: _react.PropTypes.bool,
	showTicks: _react.PropTypes.bool,
	className: _react.PropTypes.string,
	axisZoomCallback: _react.PropTypes.func,
	inverted: _react.PropTypes.bool,
	bg: _react.PropTypes.object.isRequired,
	zoomCursorClassName: _react.PropTypes.string.isRequired,
	getMoreProps: _react.PropTypes.func.isRequired,
	getScale: _react.PropTypes.func.isRequired,
	getMouseDelta: _react.PropTypes.func.isRequired,
	onDoubleClick: _react.PropTypes.func.isRequired,
	onContextMenu: _react.PropTypes.func.isRequired
};

AxisZoomCapture.defaultProps = {
	onDoubleClick: _utils.noop,
	onContextMenu: _utils.noop,
	inverted: true
};

AxisZoomCapture.contextTypes = {
	height: _react.PropTypes.number.isRequired,
	width: _react.PropTypes.number.isRequired
};

exports.default = AxisZoomCapture;