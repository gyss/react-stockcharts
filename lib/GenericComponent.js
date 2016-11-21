"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var suscriberId = 0;

var GenericComponent = function (_Component) {
	_inherits(GenericComponent, _Component);

	function GenericComponent(props, context) {
		_classCallCheck(this, GenericComponent);

		var _this = _possibleConstructorReturn(this, (GenericComponent.__proto__ || Object.getPrototypeOf(GenericComponent)).call(this, props, context));

		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.getMoreProps = _this.getMoreProps.bind(_this);
		_this.listener = _this.listener.bind(_this);
		_this.draw = _this.draw.bind(_this);
		_this.updateMoreProps = _this.updateMoreProps.bind(_this);
		_this.evaluateType = _this.evaluateType.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		_this.executeMouseMove = _this.executeMouseMove.bind(_this);
		_this.preCanvasDraw = _this.preCanvasDraw.bind(_this);
		_this.postCanvasDraw = _this.postCanvasDraw.bind(_this);
		_this.getRef = _this.getRef.bind(_this);

		_this.suscriberId = suscriberId++;

		_this.drawOnNextTick = false;

		_this.moreProps = {};
		_this.state = {
			updateCount: 0
		};
		return _this;
	}

	_createClass(GenericComponent, [{
		key: "getRef",
		value: function getRef(ref) {
			return this.refs[ref];
		}
	}, {
		key: "updateMoreProps",
		value: function updateMoreProps(moreProps) {
			this.prevMoreProps = this.moreProps;
			this.moreProps = Object.assign(this.moreProps, moreProps);
		}
	}, {
		key: "listener",
		value: function listener(type, moreProps, e) {
			// console.log(e.shiftKey)
			if ((0, _utils.isDefined)(moreProps)) {
				this.updateMoreProps(moreProps);
			}

			this.evaluateType(type, e);
		}
	}, {
		key: "executeMouseMove",
		value: function executeMouseMove(e) {
			this.moreProps.hovering = this.isHover(e);

			if (this.moreProps.hovering || this.props.drawOnMouseMove) {
				if (this.props.onMouseMove) this.props.onMouseMove(e);
				this.drawOnNextTick = true;
			} else {
				this.drawOnNextTick = false;
			}
		}
	}, {
		key: "evaluateType",
		value: function evaluateType(type, e) {
			this.props.debug(type);

			switch (type) {
				case "zoom":
				case "mouseenter":
					// DO NOT DRAW FOR THESE EVENTS
					break;
				case "contextmenu":
					{
						if (this.moreProps.hovering && this.props.onContextMenu) {
							this.props.onContextMenu(e);
						}
						break;
					}
				case "mousedown":
					{
						if (this.moreProps.hovering && this.props.onMouseDown) {
							this.props.onMouseDown(e);
						}
						break;
					}
				case "click":
					{
						if (this.moreProps.hovering && this.props.onClick) {
							this.props.onClick(e);
						}
						break;
					}
				case "mousemove":
					{
						this.executeMouseMove(e);
						break;
					}
				case "dblclick":
					{
						if (this.moreProps.hovering && this.props.onDoubleClick) {
							this.props.onDoubleClick(e);
						}
						break;
					}
				case "mouseleave":
					{
						this.drawOnNextTick = this.props.drawOnMouseExitOfCanvas;
						break;
					}
				case "pan":
					{
						this.moreProps.hovering = false;
						this.drawOnNextTick = this.props.drawOnPan;
						break;
					}
				case "draw":
					{
						if (this.drawOnNextTick) {
							this.draw();
						}
					}
			}
			this.props.debug(type, this.drawOnNextTick);

			// if (type !== "mousemove" && type !== "ff") this.moreProps.prevHovering = false;
		}
	}, {
		key: "isHover",
		value: function isHover(e) {
			return this.props.isHover(this.getMoreProps(), e);
		}
	}, {
		key: "draw",
		value: function draw() {
			var chartCanvasType = this.context.chartCanvasType;
			var canvasDraw = this.props.canvasDraw;


			if ((0, _utils.isNotDefined)(canvasDraw) || chartCanvasType === "svg") {
				var updateCount = this.state.updateCount;

				this.setState({
					updateCount: updateCount + 1
				});
			} else {
				this.drawOnCanvas();
			}
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			var subscribe = this.context.subscribe;

			subscribe(this.suscriberId, this.listener);
			this.componentWillReceiveProps(this.props, this.context);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			var unsubscribe = this.context.unsubscribe;

			unsubscribe(this.suscriberId);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.componentDidUpdate();
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			var chartCanvasType = this.context.chartCanvasType;
			var canvasDraw = this.props.canvasDraw;


			this.props.debug("updated");

			if ((0, _utils.isDefined)(canvasDraw) && chartCanvasType !== "svg") {
				this.drawOnCanvas();
			}
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps, nextContext) {
			var xScale = nextContext.xScale,
			    plotData = nextContext.plotData,
			    chartConfig = nextContext.chartConfig;

			this.props.debug(nextContext);
			this.moreProps = _extends({}, this.moreProps, {
				xScale: xScale, plotData: plotData, chartConfig: chartConfig
			});
		}
	}, {
		key: "getMoreProps",
		value: function getMoreProps() {
			var _context = this.context,
			    xScale = _context.xScale,
			    plotData = _context.plotData,
			    chartConfig = _context.chartConfig,
			    morePropsDecorator = _context.morePropsDecorator,
			    xAccessor = _context.xAccessor,
			    displayXAccessor = _context.displayXAccessor,
			    width = _context.width,
			    height = _context.height;
			var chartId = this.context.chartId;


			var moreProps = _extends({
				xScale: xScale, plotData: plotData, chartConfig: chartConfig,
				xAccessor: xAccessor, displayXAccessor: displayXAccessor,
				width: width, height: height,
				chartId: chartId
			}, this.moreProps);

			return (morePropsDecorator || _utils.identity)(moreProps);
		}
	}, {
		key: "getPrevMoreProps",
		value: function getPrevMoreProps() {
			return this.prevMoreProps;
		}
	}, {
		key: "preCanvasDraw",
		value: function preCanvasDraw() {
			// do nothing
		}
	}, {
		key: "postCanvasDraw",
		value: function postCanvasDraw() {
			// do nothing
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas() {
			var _props = this.props,
			    canvasDraw = _props.canvasDraw,
			    canvasToDraw = _props.canvasToDraw,
			    hoverCanvasToDraw = _props.hoverCanvasToDraw;
			var getCanvasContexts = this.context.getCanvasContexts;


			var moreProps = this.getMoreProps();

			var hovering = moreProps.hovering;


			var ctx = hovering ? hoverCanvasToDraw(getCanvasContexts()) : canvasToDraw(getCanvasContexts());

			this.preCanvasDraw(ctx);
			canvasDraw(ctx, moreProps);
			this.postCanvasDraw(ctx);
		}
	}, {
		key: "render",
		value: function render() {
			var _context2 = this.context,
			    chartCanvasType = _context2.chartCanvasType,
			    chartId = _context2.chartId;
			var _props2 = this.props,
			    canvasDraw = _props2.canvasDraw,
			    clip = _props2.clip,
			    svgDraw = _props2.svgDraw;


			if ((0, _utils.isDefined)(canvasDraw) && chartCanvasType !== "svg") return null;

			var suffix = (0, _utils.isDefined)(chartId) ? "-" + chartId : "";

			var style = clip ? { "clipPath": "url(#chart-area-clip" + suffix + ")" } : null;

			return _react2.default.createElement(
				"g",
				{ style: style },
				svgDraw(this.getMoreProps())
			);
		}
	}]);

	return GenericComponent;
}(_react.Component);

GenericComponent.propTypes = {
	svgDraw: _react.PropTypes.func.isRequired,
	canvasDraw: _react.PropTypes.func,
	drawOnMouseMove: _react.PropTypes.bool.isRequired,
	drawOnPan: _react.PropTypes.bool.isRequired,
	clip: _react.PropTypes.bool.isRequired,
	edgeClip: _react.PropTypes.bool.isRequired,
	drawOnMouseExitOfCanvas: _react.PropTypes.bool.isRequired,
	canvasToDraw: _react.PropTypes.func.isRequired,
	hoverCanvasToDraw: _react.PropTypes.func.isRequired,
	isHover: _react.PropTypes.func.isRequired,

	onClick: _react.PropTypes.func,
	onDoubleClick: _react.PropTypes.func,
	onContextMenu: _react.PropTypes.func,
	onMouseMove: _react.PropTypes.func,
	onMouseDown: _react.PropTypes.func,

	debug: _react.PropTypes.func
};

GenericComponent.defaultProps = {
	svgDraw: (0, _utils.functor)(null),
	drawOnMouseMove: false,
	drawOnPan: false,
	drawOnHover: false,
	drawOnMouseExitOfCanvas: false,
	canvasToDraw: function canvasToDraw(contexts) {
		return contexts.mouseCoord;
	},
	hoverCanvasToDraw: function hoverCanvasToDraw(contexts) {
		return contexts.mouseCoord;
	},
	clip: true,
	edgeClip: false,
	isHover: (0, _utils.functor)(false),
	onMouseMove: _utils.noop,
	onMouseDown: _utils.noop,
	debug: _utils.noop
};

GenericComponent.childContextTypes = {
	morePropsDecorator: _react.PropTypes.func
};

GenericComponent.contextTypes = {
	width: _react.PropTypes.number.isRequired,
	height: _react.PropTypes.number.isRequired,
	margin: _react.PropTypes.object.isRequired,
	chartId: _react.PropTypes.number,
	getCanvasContexts: _react.PropTypes.func,

	chartCanvasType: _react.PropTypes.string,
	xScale: _react.PropTypes.func.isRequired,
	xAccessor: _react.PropTypes.func.isRequired,
	displayXAccessor: _react.PropTypes.func.isRequired,
	plotData: _react.PropTypes.array.isRequired,

	chartConfig: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]).isRequired,

	morePropsDecorator: _react.PropTypes.func,

	subscribe: _react.PropTypes.func.isRequired,
	unsubscribe: _react.PropTypes.func.isRequired
};

exports.default = GenericComponent;