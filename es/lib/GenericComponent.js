"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from "react";
import { isNotDefined, isDefined, noop, functor, identity } from "./utils";

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
			if (isDefined(moreProps)) {
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
			// if (this.props.debug) console.log(this.props.debug, type);

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
			if (this.props.debug) console.log(this.props.debug, type, this.drawOnNextTick);

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


			if (isNotDefined(canvasDraw) || chartCanvasType === "svg") {
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


			if (this.props.debug) console.log(this.props.debug, "updated");

			if (isDefined(canvasDraw) && chartCanvasType !== "svg") {
				this.drawOnCanvas();
			}
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps, nextContext) {
			var xScale = nextContext.xScale,
			    plotData = nextContext.plotData,
			    chartConfig = nextContext.chartConfig;

			if (this.props.debug) console.log(nextContext);
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

			return (morePropsDecorator || identity)(moreProps);
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


			if (isDefined(canvasDraw) && chartCanvasType !== "svg") return null;

			var suffix = isDefined(chartId) ? "-" + chartId : "";

			var style = clip ? { "clipPath": "url(#chart-area-5clip" + suffix + ")" } : null;

			return React.createElement(
				"g",
				{ style: style },
				svgDraw(this.getMoreProps())
			);
		}
	}]);

	return GenericComponent;
}(Component);

GenericComponent.propTypes = {
	svgDraw: PropTypes.func.isRequired,
	canvasDraw: PropTypes.func,
	drawOnMouseMove: PropTypes.bool.isRequired,
	drawOnPan: PropTypes.bool.isRequired,
	clip: PropTypes.bool.isRequired,
	edgeClip: PropTypes.bool.isRequired,
	drawOnMouseExitOfCanvas: PropTypes.bool.isRequired,
	canvasToDraw: PropTypes.func.isRequired,
	hoverCanvasToDraw: PropTypes.func.isRequired,
	isHover: PropTypes.func.isRequired,

	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onContextMenu: PropTypes.func,
	onMouseMove: PropTypes.func,
	onMouseDown: PropTypes.func,

	debug: PropTypes.string
};

GenericComponent.defaultProps = {
	svgDraw: functor(null),
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
	isHover: functor(false),
	onMouseMove: noop,
	onMouseDown: noop
};

GenericComponent.childContextTypes = {
	morePropsDecorator: PropTypes.func
};

GenericComponent.contextTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	margin: PropTypes.object.isRequired,
	chartId: PropTypes.number,
	getCanvasContexts: PropTypes.func,

	chartCanvasType: PropTypes.string,
	xScale: PropTypes.func.isRequired,
	xAccessor: PropTypes.func.isRequired,
	displayXAccessor: PropTypes.func.isRequired,
	plotData: PropTypes.array.isRequired,

	chartConfig: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,

	morePropsDecorator: PropTypes.func,

	subscribe: PropTypes.func.isRequired,
	unsubscribe: PropTypes.func.isRequired
};

export default GenericComponent;