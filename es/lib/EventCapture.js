"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from "react";
import { select, event as d3Event } from "d3-selection";

import { isDefined, mousePosition, touchPosition, d3Window, MOUSEMOVE, MOUSEUP } from "./utils";
import { getCurrentCharts } from "./utils/ChartDataUtil";

function getTouchProps(touch) {
	if (!touch) return {};
	return {
		pageX: touch.pageX,
		pageY: touch.pageY,
		clientX: touch.clientX,
		clientY: touch.clientY
	};
}

var EventCapture = function (_Component) {
	_inherits(EventCapture, _Component);

	function EventCapture(props) {
		_classCallCheck(this, EventCapture);

		var _this = _possibleConstructorReturn(this, (EventCapture.__proto__ || Object.getPrototypeOf(EventCapture)).call(this, props));

		_this.handleEnter = _this.handleEnter.bind(_this);
		_this.handleLeave = _this.handleLeave.bind(_this);
		_this.handleWheel = _this.handleWheel.bind(_this);
		_this.handleMouseMove = _this.handleMouseMove.bind(_this);
		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.handlePanEnd = _this.handlePanEnd.bind(_this);
		_this.handlePan = _this.handlePan.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
		_this.handleRightClick = _this.handleRightClick.bind(_this);
		_this.saveNode = _this.saveNode.bind(_this);
		_this.lastTouch = {};
		_this.initialPinch = {};
		_this.mouseInteraction = true;
		_this.state = {
			panInProgress: false
		};
		return _this;
	}

	_createClass(EventCapture, [{
		key: "saveNode",
		value: function saveNode(node) {
			this.node = node;
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			this.focus = this.props.focus;
		}
	}, {
		key: "handleEnter",
		value: function handleEnter(e) {
			var onMouseEnter = this.props.onMouseEnter;

			onMouseEnter(e);
		}
	}, {
		key: "handleLeave",
		value: function handleLeave(e) {
			var onMouseLeave = this.props.onMouseLeave;

			onMouseLeave(e);
		}
	}, {
		key: "handleWheel",
		value: function handleWheel(e) {
			var _props = this.props,
			    zoom = _props.zoom,
			    onZoom = _props.onZoom;


			if (zoom && this.focus && e.deltaY !== 0) {
				e.preventDefault();

				var newPos = mousePosition(e);
				var zoomDir = e.deltaY > 0 ? 1 : -1;

				onZoom(zoomDir, newPos, e);
			}
		}
	}, {
		key: "handleMouseMove",
		value: function handleMouseMove(e) {
			var _props2 = this.props,
			    onMouseMove = _props2.onMouseMove,
			    mouseMove = _props2.mouseMove;


			if (this.mouseInteraction && mouseMove && !this.state.panInProgress) {

				var newPos = mousePosition(e);

				onMouseMove(newPos, "mouse", e);
			}
		}
	}, {
		key: "handleRightClick",
		value: function handleRightClick(e) {
			e.stopPropagation();
			e.preventDefault();

			var _props3 = this.props,
			    onContextMenu = _props3.onContextMenu,
			    onPanEnd = _props3.onPanEnd;


			var mouseXY = mousePosition(e, this.node.getBoundingClientRect());

			if (isDefined(this.state.panStart)) {
				var _state$panStart = this.state.panStart,
				    panStartXScale = _state$panStart.panStartXScale,
				    panOrigin = _state$panStart.panOrigin,
				    chartsToPan = _state$panStart.chartsToPan;

				if (this.panHappened) {
					onPanEnd(mouseXY, panStartXScale, panOrigin, chartsToPan, e);
				}
				var win = d3Window(this.node);
				select(win).on(MOUSEMOVE, null).on(MOUSEUP, null);

				this.setState({
					panInProgress: false,
					panStart: null
				});
			}

			onContextMenu(mouseXY, e);

			this.contextMenuClicked = true;
		}
	}, {
		key: "handleMouseDown",
		value: function handleMouseDown(e) {
			var _this2 = this;

			var _props4 = this.props,
			    pan = _props4.pan,
			    xScale = _props4.xScale,
			    chartConfig = _props4.chartConfig,
			    onMouseDown = _props4.onMouseDown;

			this.panHappened = false;
			this.focus = true;

			if (!this.state.panInProgress && this.mouseInteraction) {

				var mouseXY = mousePosition(e);

				var currentCharts = getCurrentCharts(chartConfig, mouseXY);

				this.setState({
					panInProgress: pan,
					panStart: {
						panStartXScale: xScale,
						panOrigin: mouseXY,
						chartsToPan: currentCharts
					}
				});

				if (pan) {
					var win = d3Window(this.node);
					select(win).on(MOUSEMOVE, this.handlePan).on(MOUSEUP, this.handlePanEnd);
				}

				if (!pan) {
					// This block of code gets executed when
					// drawMode is enabled,
					// pan is disabled in draw mode
					e.persist();
					setTimeout(function () {
						if (!_this2.contextMenuClicked) {
							// console.log("NO RIGHT")
							onMouseDown(mouseXY, currentCharts, e);
						}
						_this2.contextMenuClicked = false;
					}, 100);
				}
			}
			e.preventDefault();
		}
	}, {
		key: "handlePan",
		value: function handlePan() {
			var e = d3Event;
			var _props5 = this.props,
			    panEnabled = _props5.pan,
			    onPan = _props5.onPan;

			// console.log("moved from- ", startXY, " to ", newPos);

			if (this.mouseInteraction && panEnabled && onPan && isDefined(this.state.panStart)) {

				this.panHappened = true;

				var _state$panStart2 = this.state.panStart,
				    panStartXScale = _state$panStart2.panStartXScale,
				    panOrigin = _state$panStart2.panOrigin,
				    chartsToPan = _state$panStart2.chartsToPan;


				var rect = this.node.getBoundingClientRect();
				var newPos = [Math.round(e.pageX - rect.left), Math.round(e.pageY - rect.top)];

				onPan(newPos, panStartXScale, panOrigin, chartsToPan, e);
			}
		}
	}, {
		key: "handlePanEnd",
		value: function handlePanEnd() {
			var _this3 = this;

			var e = d3Event;

			var _props6 = this.props,
			    panEnabled = _props6.pan,
			    onPanEnd = _props6.onPanEnd,
			    onClick = _props6.onClick,
			    onDoubleClick = _props6.onDoubleClick;


			if (isDefined(this.state.panStart)) {
				var _state$panStart3 = this.state.panStart,
				    panStartXScale = _state$panStart3.panStartXScale,
				    panOrigin = _state$panStart3.panOrigin,
				    chartsToPan = _state$panStart3.chartsToPan;


				var rect = this.node.getBoundingClientRect();
				var newPos = [Math.round(e.pageX - rect.left), Math.round(e.pageY - rect.top)];

				if (!this.panHappened) {
					if (this.clicked) {
						onDoubleClick(newPos, e);
					} else {
						this.clicked = true;
						setTimeout(function () {
							_this3.clicked = false;
						}, 300);
						onClick(newPos, e);
					}
				}

				if (this.mouseInteraction && this.panHappened
				// && !this.contextMenuClicked
				&& panEnabled && onPanEnd) {
					var win = d3Window(this.node);
					select(win).on(MOUSEMOVE, null).on(MOUSEUP, null);
					onPanEnd(newPos, panStartXScale, panOrigin, chartsToPan, e);
				}

				this.setState({
					panInProgress: false,
					panStart: null
				});
			}
		}
	}, {
		key: "handleTouchStart",
		value: function handleTouchStart(e) {
			this.mouseInteraction = false;

			var panEnabled = this.props.pan;
			var _props7 = this.props,
			    xScale = _props7.xScale,
			    onPanEnd = _props7.onPanEnd;


			if (e.touches.length === 1) {
				var touch = getTouchProps(e.touches[0]);
				var touchXY = touchPosition(touch, e);
				this.lastTouch = touch;
				// onMouseMove(touchXY, "touch", e);
				if (panEnabled) {
					var dx = touch.pageX - touchXY[0],
					    dy = touch.pageY - touchXY[1];

					this.setState({
						panInProgress: true,
						panStart: {
							panStartXScale: xScale,
							panOrigin: touchXY,
							dx: dx, dy: dy
						}
					});
				}
			} else if (e.touches.length === 2) {
				// pinch zoom begin
				// do nothing pinch zoom is handled in handleTouchMove
				var touch1 = getTouchProps(e.touches[0]);
				var _state = this.state,
				    panInProgress = _state.panInProgress,
				    panStart = _state.panStart;


				if (panInProgress && panEnabled && onPanEnd) {
					var _dx = panStart.dx,
					    _dy = panStart.dy,
					    panStartXScale = panStart.panStartXScale,
					    panOrigin = panStart.panOrigin;

					// end pan first

					var newPos = [touch1.pageX - _dx, touch1.pageY - _dy];
					this.lastTouch = null;

					this.setState({
						panInProgress: false,
						panStart: null
					});
					onPanEnd(newPos, panStartXScale, panOrigin, e);
				}
			}

			if (e.touches.length !== 2) this.initialPinch = null;

			// console.log("handleTouchStart", e);
			e.preventDefault();
		}
	}, {
		key: "handleTouchMove",
		value: function handleTouchMove(e) {
			var _props8 = this.props,
			    panEnabled = _props8.pan,
			    zoomEnabled = _props8.zoom;
			var _props9 = this.props,
			    xScale = _props9.xScale,
			    onPan = _props9.onPan,
			    onPinchZoom = _props9.onPinchZoom;
			var _state2 = this.state,
			    panInProgress = _state2.panInProgress,
			    panStart = _state2.panStart;


			if (e.touches.length === 1) {
				// pan
				var touch = this.lastTouch = getTouchProps(e.touches[0]);

				if (panInProgress && panEnabled && onPan) {
					var dx = panStart.dx,
					    dy = panStart.dy,
					    panStartXScale = panStart.panStartXScale,
					    panOrigin = panStart.panOrigin,
					    chartsToPan = panStart.chartsToPan;


					var newPos = [touch.pageX - dx, touch.pageY - dy];
					onPan(newPos, panStartXScale, panOrigin, chartsToPan, e);
				}
			} else if (e.touches.length === 2) {
				// pinch zoom
				if (zoomEnabled && onPinchZoom && focus) {
					var touch1 = getTouchProps(e.touches[0]);
					var touch2 = getTouchProps(e.touches[1]);

					var touch1Pos = touchPosition(touch1, e);
					var touch2Pos = touchPosition(touch2, e);

					if (this.initialPinch === null) {
						this.initialPinch = {
							touch1Pos: touch1Pos,
							touch2Pos: touch2Pos,
							xScale: xScale,
							range: xScale.range()
						};
					} else if (this.initialPinch && !panInProgress) {
						onPinchZoom(this.initialPinch, {
							touch1Pos: touch1Pos,
							touch2Pos: touch2Pos,
							xScale: xScale
						});
					}
				}
			}
			e.preventDefault();

			// console.log("handleTouchMove", e);
		}
	}, {
		key: "handleTouchEnd",
		value: function handleTouchEnd(e) {
			// TODO enableMouseInteraction
			var _props10 = this.props,
			    panEnabled = _props10.pan,
			    onPanEnd = _props10.onPanEnd;
			var _state3 = this.state,
			    panInProgress = _state3.panInProgress,
			    panStart = _state3.panStart;


			if (this.lastTouch && isDefined(panStart)) {
				var dx = panStart.dx,
				    dy = panStart.dy,
				    panStartXScale = panStart.panStartXScale,
				    panOrigin = panStart.panOrigin,
				    chartsToPan = panStart.chartsToPan;

				var newPos = [this.lastTouch.pageX - dx, this.lastTouch.pageY - dy];

				this.initialPinch = null;

				if (panInProgress && panEnabled && onPanEnd) {

					onPanEnd(newPos, panStartXScale, panOrigin, chartsToPan, e);
				}
			}
			// console.log("handleTouchEnd", dxdy, newPos, e);
			this.mouseInteraction = true;
			e.preventDefault();
		}
	}, {
		key: "render",
		value: function render() {
			var _props11 = this.props,
			    height = _props11.height,
			    width = _props11.width;

			var className = this.state.panInProgress ? "react-stockcharts-grabbing-cursor" : "react-stockcharts-crosshair-cursor";
			return React.createElement("rect", { ref: this.saveNode,
				className: className,
				width: width, height: height, style: { opacity: 0 },
				onMouseEnter: this.handleEnter,
				onMouseLeave: this.handleLeave,
				onMouseMove: this.handleMouseMove,
				onWheel: this.handleWheel,
				onMouseDown: this.handleMouseDown,
				onContextMenu: this.handleRightClick,
				onTouchStart: this.handleTouchStart,
				onTouchEnd: this.handleTouchEnd,
				onTouchMove: this.handleTouchMove });
		}
	}]);

	return EventCapture;
}(Component);

EventCapture.propTypes = {
	mouseMove: PropTypes.bool.isRequired,
	zoom: PropTypes.bool.isRequired,
	pan: PropTypes.bool.isRequired,
	panSpeedMultiplier: PropTypes.number.isRequired,
	focus: PropTypes.bool.isRequired,

	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	chartConfig: PropTypes.array,
	xScale: PropTypes.func.isRequired,
	xAccessor: PropTypes.func.isRequired,

	onMouseMove: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onZoom: PropTypes.func,
	onPinchZoom: PropTypes.func,
	onPan: PropTypes.func,
	onPanEnd: PropTypes.func,

	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onContextMenu: PropTypes.func,
	onMouseDown: PropTypes.func,
	children: PropTypes.node
};

EventCapture.defaultProps = {
	mouseMove: false,
	zoom: false,
	pan: false,
	panSpeedMultiplier: 1,
	focus: false
};

export default EventCapture;