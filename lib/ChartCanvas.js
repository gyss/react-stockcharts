"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _d3Array = require("d3-array");

var _utils = require("./utils");

var _ChartDataUtil = require("./utils/ChartDataUtil");

var _EventCapture = require("./EventCapture");

var _EventCapture2 = _interopRequireDefault(_EventCapture);

var _CanvasContainer = require("./CanvasContainer");

var _CanvasContainer2 = _interopRequireDefault(_CanvasContainer);

var _evaluator = require("./scale/evaluator");

var _evaluator2 = _interopRequireDefault(_evaluator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CANDIDATES_FOR_RESET = ["seriesName", /* "data",*/
"xScaleProvider", /* "xAccessor",*/"map", "indexAccessor", "indexMutator"];

var debug = true;

function shouldResetChart(thisProps, nextProps) {
	return !CANDIDATES_FOR_RESET.every(function (key) {
		var result = (0, _utils.shallowEqual)(thisProps[key], nextProps[key]);
		// console.log(key, result);
		return result;
	});
}

function getCursorStyle(useCrossHairStyleCursor) {
	var style = "\n\t.react-stockcharts-grabbing-cursor {\n\t\tpointer-events: all;\n\t\tcursor: -webkit-grabbing;\n\t}\n\t.react-stockcharts-crosshair-cursor {\n\t\tpointer-events: all;\n\t\tcursor: crosshair;\n\t}\n\t.react-stockcharts-toottip-hover {\n\t\tpointer-events: all;\n\t\tcursor: pointer;\n\t}";
	var tooltipStyle = "\n\t.react-stockcharts-avoid-interaction {\n\t\tpointer-events: none;\n\t}\n\t.react-stockcharts-enable-interaction {\n\t\tpointer-events: all;\n\t}\n\t.react-stockcharts-toottip {\n\t\tpointer-events: all;\n\t\tcursor: pointer;\n\t}\n\t.react-stockcharts-default-cursor {\n\t\tcursor: default;\n\t}\n\t.react-stockcharts-move-cursor {\n\t\tcursor: move;\n\t}\n\t.react-stockcharts-ns-resize-cursor {\n\t\tcursor: ns-resize;\n\t}\n\t.react-stockcharts-ew-resize-cursor {\n\t\tcursor: ew-resize;\n\t}";
	return _react2.default.createElement(
		"style",
		{ type: "text/css" },
		useCrossHairStyleCursor ? style + tooltipStyle : tooltipStyle
	);
}

function getDimensions(props) {
	return {
		height: props.height - props.margin.top - props.margin.bottom,
		width: props.width - props.margin.left - props.margin.right
	};
}

function getXScaleDirection(flipXScale) {
	return flipXScale ? -1 : 1;
}

function calculateFullData(props) {
	var inputData = props.data,
	    calculator = props.calculator,
	    plotFull = props.plotFull,
	    xScaleProp = props.xScale;
	var inputXAccesor = props.xAccessor,
	    map = props.map,
	    xScaleProvider = props.xScaleProvider,
	    indexAccessor = props.indexAccessor,
	    indexMutator = props.indexMutator;


	var wholeData = (0, _utils.isDefined)(plotFull) ? plotFull : inputXAccesor === _utils.identity;

	// xScale = discontinuousTimeScaleProvider(data);
	var dimensions = getDimensions(props);
	var evaluate = (0, _evaluator2.default)()
	// .allowedIntervals(allowedIntervals)
	// .intervalCalculator(intervalCalculator)
	.xAccessor(inputXAccesor)
	// .discontinuous(discontinuous)
	.indexAccessor(indexAccessor).indexMutator(indexMutator).map(map).useWholeData(wholeData).width(dimensions.width).scaleProvider(xScaleProvider).xScale(xScaleProp).calculator(calculator);

	var _evaluate = evaluate(inputData),
	    xAccessor = _evaluate.xAccessor,
	    displayXAccessor = _evaluate.displayXAccessor,
	    xScale = _evaluate.xScale,
	    fullData = _evaluate.fullData,
	    filterData = _evaluate.filterData;

	return { xAccessor: xAccessor, displayXAccessor: displayXAccessor, xScale: xScale, fullData: fullData, filterData: filterData };
}
function resetChart(props) {
	var firstCalculation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	if (debug) {
		if (process.env.NODE_ENV !== "production") {
			if (!firstCalculation) console.log("CHART RESET");
		}
	}

	var state = calculateState(props);
	var initialPlotData = state.plotData,
	    xScale = state.xScale;
	var postCalculator = props.postCalculator,
	    children = props.children;


	var plotData = postCalculator(initialPlotData);

	var dimensions = getDimensions(props);
	var chartConfig = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)((0, _ChartDataUtil.getNewChartConfig)(dimensions, children), plotData, xScale.domain());

	return _extends({}, state, {
		xScale: xScale,
		plotData: plotData,
		chartConfig: chartConfig
	});
}

function updateChart(newState, initialXScale, props, lastItemWasVisible) {
	var fullData = newState.fullData,
	    xScale = newState.xScale,
	    xAccessor = newState.xAccessor,
	    filterData = newState.filterData;


	var lastItem = (0, _utils.last)(fullData);

	var _initialXScale$domain = initialXScale.domain(),
	    _initialXScale$domain2 = _slicedToArray(_initialXScale$domain, 2),
	    start = _initialXScale$domain2[0],
	    end = _initialXScale$domain2[1];

	if (debug) {
		if (process.env.NODE_ENV !== "production") {
			console.log("TRIVIAL CHANGE");
		}
	}

	var postCalculator = props.postCalculator,
	    children = props.children,
	    padding = props.padding,
	    flipXScale = props.flipXScale;

	var direction = getXScaleDirection(flipXScale);
	var dimensions = getDimensions(props);

	var updatedXScale = setXRange(xScale, dimensions, padding, direction);

	var initialPlotData;
	if (!lastItemWasVisible || end >= xAccessor(lastItem)) {
		// get plotData between [start, end] and do not change the domain
		initialPlotData = filterData(fullData, [start, end], xAccessor, updatedXScale).plotData;
		updatedXScale.domain([start, end]);
		// console.log("HERE!!!!!", start, end);
	} else if (lastItemWasVisible && end < xAccessor(lastItem)) {

		// get plotData between [xAccessor(l) - (end - start), xAccessor(l)] and DO change the domain
		var dx = initialXScale(xAccessor(lastItem)) - initialXScale.range()[1];

		var _initialXScale$range$ = initialXScale.range().map(function (x) {
			return x + dx;
		}).map(initialXScale.invert),
		    _initialXScale$range$2 = _slicedToArray(_initialXScale$range$, 2),
		    newStart = _initialXScale$range$2[0],
		    newEnd = _initialXScale$range$2[1];

		initialPlotData = filterData(fullData, [newStart, newEnd], xAccessor, updatedXScale).plotData;
		updatedXScale.domain([newStart, newEnd]);
		// if last item was visible, then shift
	}
	// plotData = getDataOfLength(fullData, showingInterval, plotData.length)
	var plotData = postCalculator(initialPlotData);
	var chartConfig = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)((0, _ChartDataUtil.getNewChartConfig)(dimensions, children), plotData, updatedXScale.domain());

	return {
		xScale: updatedXScale,
		xAccessor: xAccessor,
		chartConfig: chartConfig,
		plotData: plotData,
		fullData: fullData,
		filterData: filterData
	};
}

function calculateState(props) {
	var inputXAccesor = props.xAccessor,
	    xExtentsProp = props.xExtents,
	    data = props.data,
	    padding = props.padding,
	    flipXScale = props.flipXScale;


	var direction = getXScaleDirection(flipXScale);
	var dimensions = getDimensions(props);

	var extent = typeof xExtentsProp === "function" ? xExtentsProp(data) : (0, _d3Array.extent)(xExtentsProp.map(function (d) {
		return (0, _utils.functor)(d);
	}).map(function (each) {
		return each(data, inputXAccesor);
	}));

	var _calculateFullData = calculateFullData(props),
	    xAccessor = _calculateFullData.xAccessor,
	    displayXAccessor = _calculateFullData.displayXAccessor,
	    xScale = _calculateFullData.xScale,
	    fullData = _calculateFullData.fullData,
	    filterData = _calculateFullData.filterData;

	var updatedXScale = setXRange(xScale, dimensions, padding, direction);

	var _filterData = filterData(fullData, extent, inputXAccesor, updatedXScale),
	    plotData = _filterData.plotData,
	    domain = _filterData.domain;

	return {
		plotData: plotData,
		xScale: updatedXScale.domain(domain),
		xAccessor: xAccessor,
		displayXAccessor: displayXAccessor,
		fullData: fullData,
		filterData: filterData
	};
}

function setXRange(xScale, dimensions, padding) {
	var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

	if (xScale.rangeRoundPoints) {
		if (isNaN(padding)) throw new Error("padding has to be a number for ordinal scale");
		xScale.rangeRoundPoints([0, dimensions.width], padding);
	} else if (xScale.padding) {
		if (isNaN(padding)) throw new Error("padding has to be a number for ordinal scale");
		xScale.range([0, dimensions.width]);
		xScale.padding(padding / 2);
	} else {
		var _ref = isNaN(padding) ? padding : { left: padding, right: padding },
		    left = _ref.left,
		    right = _ref.right;

		if (direction > 0) {
			xScale.range([left, dimensions.width - right]);
		} else {
			xScale.range([dimensions.width - right, left]);
		}
	}
	return xScale;
}

var ChartCanvas = function (_Component) {
	_inherits(ChartCanvas, _Component);

	function ChartCanvas() {
		_classCallCheck(this, ChartCanvas);

		var _this = _possibleConstructorReturn(this, (ChartCanvas.__proto__ || Object.getPrototypeOf(ChartCanvas)).call(this));

		_this.getDataInfo = _this.getDataInfo.bind(_this);
		_this.getCanvasContexts = _this.getCanvasContexts.bind(_this);

		_this.handleMouseMove = _this.handleMouseMove.bind(_this);
		_this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
		_this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
		_this.handleZoom = _this.handleZoom.bind(_this);
		_this.handlePinchZoom = _this.handlePinchZoom.bind(_this);
		_this.handlePan = _this.handlePan.bind(_this);
		_this.handlePanEnd = _this.handlePanEnd.bind(_this);
		_this.handleClick = _this.handleClick.bind(_this);
		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.handleDoubleClick = _this.handleDoubleClick.bind(_this);
		// this.handleFocus = this.handleFocus.bind(this);
		_this.handleContextMenu = _this.handleContextMenu.bind(_this);
		_this.xAxisZoom = _this.xAxisZoom.bind(_this);
		_this.yAxisZoom = _this.yAxisZoom.bind(_this);
		_this.resetYDomain = _this.resetYDomain.bind(_this);
		_this.calculateStateForDomain = _this.calculateStateForDomain.bind(_this);

		_this.pinchCoordinates = _this.pinchCoordinates.bind(_this);

		// this.setInteractiveState = this.setInteractiveState.bind(this);
		// this.getInteractiveState = this.getInteractiveState.bind(this);

		_this.subscriptions = [];
		_this.subscribe = _this.subscribe.bind(_this);
		_this.unsubscribe = _this.unsubscribe.bind(_this);
		_this.draw = _this.draw.bind(_this);
		// this.canvasDrawCallbackList = [];
		_this.interactiveState = [];
		_this.panInProgress = false;

		_this.state = {};
		return _this;
	}

	_createClass(ChartCanvas, [{
		key: "getDataInfo",
		value: function getDataInfo() {
			return this.state;
		}
	}, {
		key: "getCanvasContexts",
		value: function getCanvasContexts() {
			if (this.refs && this.refs.canvases) {
				return this.refs.canvases.getCanvasContexts();
			}
		}
	}, {
		key: "clearBothCanvas",
		value: function clearBothCanvas() {
			var canvases = this.getCanvasContexts();
			if (canvases && canvases.axes) {
				// console.log("CLEAR");
				(0, _utils.clearCanvas)([canvases.axes, canvases.mouseCoord], this.props.ratio);
			}
		}
	}, {
		key: "clearMouseCanvas",
		value: function clearMouseCanvas() {
			var canvases = this.getCanvasContexts();
			if (canvases && canvases.mouseCoord) {
				(0, _utils.clearCanvas)([canvases.mouseCoord], this.props.ratio);
			}
		}
	}, {
		key: "clearThreeCanvas",
		value: function clearThreeCanvas() {
			var canvases = this.getCanvasContexts();
			if (canvases && canvases.axes) {
				(0, _utils.clearCanvas)([canvases.axes, canvases.mouseCoord, canvases.bg], this.props.ratio);
			}
		}
	}, {
		key: "subscribe",
		value: function subscribe(id, callback) {
			this.subscriptions = this.subscriptions.concat({
				id: id, callback: callback
			});
		}
	}, {
		key: "unsubscribe",
		value: function unsubscribe(id) {
			this.subscriptions = this.subscriptions.filter(function (each) {
				return each.id !== id;
			});
		}
	}, {
		key: "handleMouseEnter",
		value: function handleMouseEnter(e) {
			this.triggerEvent("mouseenter", {
				show: true
			}, e);
		}
	}, {
		key: "handleMouseMove",
		value: function handleMouseMove(mouseXY, inputType, e) {
			var _this2 = this;

			var _state = this.state,
			    chartConfig = _state.chartConfig,
			    plotData = _state.plotData,
			    xScale = _state.xScale,
			    xAccessor = _state.xAccessor;


			var currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfig, mouseXY);

			var currentItem = (0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData);

			this.triggerEvent("mousemove", {
				show: true,
				mouseXY: mouseXY,
				currentItem: currentItem,
				currentCharts: currentCharts
			}, e);

			requestAnimationFrame(function () {
				_this2.clearMouseCanvas();
				_this2.draw();
			});
		}
	}, {
		key: "handleContextMenu",
		value: function handleContextMenu(mouseXY, e) {
			var _state2 = this.state,
			    xAccessor = _state2.xAccessor,
			    chartConfig = _state2.chartConfig,
			    plotData = _state2.plotData,
			    xScale = _state2.xScale;


			var currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfig, mouseXY);
			var currentItem = (0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData);

			this.triggerEvent("contextmenu", {
				mouseXY: mouseXY,
				currentItem: currentItem,
				currentCharts: currentCharts
			}, e);
			this.draw();
		}
	}, {
		key: "handleMouseLeave",
		value: function handleMouseLeave(e) {
			var contexts = this.getCanvasContexts();

			// this.clearInteractiveCanvas();

			if (contexts && contexts.mouseCoord) {
				(0, _utils.clearCanvas)([contexts.mouseCoord], this.props.ratio);
			}
			this.triggerEvent("mouseleave", { show: false }, e);
			this.draw();
			/* this.setState({
   	show: false
   }); */
		}
	}, {
		key: "pinchCoordinates",
		value: function pinchCoordinates(pinch) {
			var touch1Pos = pinch.touch1Pos,
			    touch2Pos = pinch.touch2Pos;


			return {
				topLeft: [Math.min(touch1Pos[0], touch2Pos[0]), Math.min(touch1Pos[1], touch2Pos[1])],
				bottomRight: [Math.max(touch1Pos[0], touch2Pos[0]), Math.max(touch1Pos[1], touch2Pos[1])]
			};
		}
	}, {
		key: "handlePinchZoom",
		value: function handlePinchZoom(initialPinch, finalPinch) {
			var _this3 = this;

			var initialPinchXScale = initialPinch.xScale;
			var _state3 = this.state,
			    initialXScale = _state3.xScale,
			    initialChartConfig = _state3.chartConfig,
			    initialPlotData = _state3.plotData,
			    xAccessor = _state3.xAccessor;
			var filterData = this.state.filterData;
			var fullData = this.fullData;
			var postCalculator = this.props.postCalculator;

			var _pinchCoordinates = this.pinchCoordinates(initialPinch),
			    iTL = _pinchCoordinates.topLeft,
			    iBR = _pinchCoordinates.bottomRight;

			var _pinchCoordinates2 = this.pinchCoordinates(finalPinch),
			    fTL = _pinchCoordinates2.topLeft,
			    fBR = _pinchCoordinates2.bottomRight;

			var e = initialPinchXScale.range()[1];

			// var fR1 = e - fTL[0];
			// var fR2 = e - fBR[0];
			// var iR1 = e - iTL[0];
			// var iR2 = e - iBR[0];

			var xDash = Math.round(-(iBR[0] * fTL[0] - iTL[0] * fBR[0]) / (iTL[0] - iBR[0]));
			var yDash = Math.round(e + ((e - iBR[0]) * (e - fTL[0]) - (e - iTL[0]) * (e - fBR[0])) / (e - iTL[0] - (e - iBR[0])));

			var x = Math.round(-xDash * iTL[0] / (-xDash + fTL[0]));
			var y = Math.round(e - (yDash - e) * (e - iTL[0]) / (yDash + (e - fTL[0])));

			// document.getElementById("debug_here").innerHTML = `**${[s, e]} to ${[xDash, yDash]} to ${[x, y]}`;
			// var left = ((final.leftxy[0] - range[0]) / (final.rightxy[0] - final.leftxy[0])) * (initial.right - initial.left);
			// var right = ((range[1] - final.rightxy[0]) / (final.rightxy[0] - final.leftxy[0])) * (initial.right - initial.left);

			var newDomain = [x, y].map(initialPinchXScale.invert);
			// var domainR = initial.right + right;

			var _filterData2 = filterData(fullData, newDomain, xAccessor, initialPinchXScale, initialPlotData, initialXScale.domain()),
			    plotData = _filterData2.plotData,
			    domain = _filterData2.domain;

			plotData = postCalculator(plotData);
			var updatedScale = initialXScale.copy().domain(domain);

			var chartConfig = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)(initialChartConfig, plotData, updatedScale.domain());

			requestAnimationFrame(function () {
				_this3.clearThreeCanvas();
				// this.clearInteractiveCanvas();

				// this.clearCanvasDrawCallbackList();
				_this3.setState({
					chartConfig: chartConfig,
					xScale: updatedScale,
					plotData: plotData
				});
			});

			// document.getElementById("debug_here").innerHTML = `${panInProgress}`;

			// document.getElementById("debug_here").innerHTML = `${initial.left} - ${initial.right} to ${final.left} - ${final.right}`;
			// document.getElementById("debug_here").innerHTML = `${id[1] - id[0]} = ${initial.left - id[0]} + ${initial.right - initial.left} + ${id[1] - initial.right}`;
			// document.getElementById("debug_here").innerHTML = `${range[1] - range[0]}, ${i1[0]}, ${i2[0]}`;
		}
	}, {
		key: "handleZoom",
		value: function handleZoom(zoomDirection, mouseXY, e) {
			// console.log("zoomDirection ", zoomDirection, " mouseXY ", mouseXY);
			var _state4 = this.state,
			    xAccessor = _state4.xAccessor,
			    initialXScale = _state4.xScale,
			    initialPlotData = _state4.plotData;
			var zoomMultiplier = this.props.zoomMultiplier;


			var item = (0, _ChartDataUtil.getCurrentItem)(initialXScale, xAccessor, mouseXY, initialPlotData),
			    cx = initialXScale(xAccessor(item)),
			    c = zoomDirection > 0 ? 1 * zoomMultiplier : 1 / zoomMultiplier,
			    newDomain = initialXScale.range().map(function (x) {
				return cx + (x - cx) * c;
			}).map(initialXScale.invert);

			var _calculateStateForDom = this.calculateStateForDomain(newDomain),
			    xScale = _calculateStateForDom.xScale,
			    plotData = _calculateStateForDom.plotData,
			    chartConfig = _calculateStateForDom.chartConfig;

			var currentItem = (0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData);
			var currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfig, mouseXY);
			this.clearBothCanvas();
			// this.clearInteractiveCanvas();

			this.triggerEvent("zoom", {
				mouseXY: mouseXY,
				currentCharts: currentCharts,
				currentItem: currentItem
			}, e);

			var fullData = this.fullData;

			var firstItem = (0, _utils.first)(fullData);

			var start = (0, _utils.first)(xScale.domain());
			var end = xAccessor(firstItem);
			var onLoadMore = this.props.onLoadMore;


			this.setState({
				xScale: xScale,
				plotData: plotData,
				chartConfig: chartConfig
			}, function () {
				if (start < end) {
					onLoadMore(start, end);
				}
			});
		}
	}, {
		key: "calculateStateForDomain",
		value: function calculateStateForDomain(newDomain) {
			var _state5 = this.state,
			    xAccessor = _state5.xAccessor,
			    initialXScale = _state5.xScale,
			    initialChartConfig = _state5.chartConfig,
			    initialPlotData = _state5.plotData;
			var filterData = this.state.filterData;
			var fullData = this.fullData;
			var postCalculator = this.props.postCalculator;

			var _filterData3 = filterData(fullData, newDomain, xAccessor, initialXScale, initialPlotData, initialXScale.domain()),
			    plotData = _filterData3.plotData,
			    domain = _filterData3.domain;

			plotData = postCalculator(plotData);
			var updatedScale = initialXScale.copy().domain(domain);
			var chartConfig = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)(initialChartConfig, plotData, updatedScale.domain());

			return {
				xScale: updatedScale,
				plotData: plotData,
				chartConfig: chartConfig
			};
		}
	}, {
		key: "xAxisZoom",
		value: function xAxisZoom(newDomain) {
			var _calculateStateForDom2 = this.calculateStateForDomain(newDomain),
			    xScale = _calculateStateForDom2.xScale,
			    plotData = _calculateStateForDom2.plotData,
			    chartConfig = _calculateStateForDom2.chartConfig;

			this.clearBothCanvas();

			var xAccessor = this.state.xAccessor;
			var fullData = this.fullData;

			var firstItem = (0, _utils.first)(fullData);
			var start = (0, _utils.first)(xScale.domain());
			var end = xAccessor(firstItem);
			var onLoadMore = this.props.onLoadMore;


			this.setState({
				xScale: xScale,
				plotData: plotData,
				chartConfig: chartConfig
			}, function () {
				if (start < end) onLoadMore(start, end);
			});
		}
	}, {
		key: "yAxisZoom",
		value: function yAxisZoom(chartId, newDomain) {
			this.clearThreeCanvas();
			var initialChartConfig = this.state.chartConfig;

			var chartConfig = initialChartConfig.map(function (each) {
				if (each.id === chartId) {
					var yScale = each.yScale;

					return _extends({}, each, {
						yScale: yScale.copy().domain(newDomain),
						yPanEnabled: true
					});
				} else {
					return each;
				}
			});

			this.setState({
				chartConfig: chartConfig
			});
		}
	}, {
		key: "panHelper",
		value: function panHelper(mouseXY, initialXScale, panOrigin, chartsToPan) {
			var _state6 = this.state,
			    xAccessor = _state6.xAccessor,
			    initialChartConfig = _state6.chartConfig;
			var filterData = this.state.filterData;
			var fullData = this.fullData;
			var postCalculator = this.props.postCalculator;


			var dx = mouseXY[0] - panOrigin[0];
			var dy = mouseXY[1] - panOrigin[1];

			if ((0, _utils.isNotDefined)(initialXScale.invert)) throw new Error("xScale provided does not have an invert() method." + "You are likely using an ordinal scale. This scale does not support zoom, pan");

			var newDomain = initialXScale.range().map(function (x) {
				return x - dx;
			}).map(initialXScale.invert);

			var _filterData4 = filterData(fullData, newDomain, xAccessor, initialXScale, this.hackyWayToStopPanBeyondBounds__plotData, this.hackyWayToStopPanBeyondBounds__domain),
			    plotData = _filterData4.plotData,
			    domain = _filterData4.domain;

			var updatedScale = initialXScale.copy().domain(domain);
			plotData = postCalculator(plotData);
			// console.log(last(plotData));
			var currentItem = (0, _ChartDataUtil.getCurrentItem)(updatedScale, xAccessor, mouseXY, plotData);

			var chartConfig = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)(initialChartConfig, plotData, updatedScale.domain(), dy, chartsToPan);

			var currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfig, mouseXY);

			// console.log(initialXScale.domain(), newDomain, updatedScale.domain());
			return {
				xScale: updatedScale,
				plotData: plotData,
				mouseXY: mouseXY,
				currentCharts: currentCharts,
				chartConfig: chartConfig,
				currentItem: currentItem
			};
		}
	}, {
		key: "draw",
		value: function draw() {
			/*
   var { chartCanvasType } = this.props;
   if (chartCanvasType === "svg") {
   this.setState({
   random: Math.random()
   });
   } else {*/
			this.subscriptions.forEach(function (each) {
				// console.log(each)
				each.callback("draw");
			});
			// }
		}
	}, {
		key: "triggerEvent",
		value: function triggerEvent(type, props, e) {
			this.subscriptions.forEach(function (each) {
				// console.log(each)
				each.callback(type, props, e);
			});
		}
	}, {
		key: "handlePan",
		value: function handlePan(mousePosition, panStartXScale, panOrigin, chartsToPan, e) {
			var _this4 = this;

			this.hackyWayToStopPanBeyondBounds__plotData = this.hackyWayToStopPanBeyondBounds__plotData || this.state.plotData;
			this.hackyWayToStopPanBeyondBounds__domain = this.hackyWayToStopPanBeyondBounds__domain || this.state.xScale.domain();

			var state = this.panHelper(mousePosition, panStartXScale, panOrigin, chartsToPan);

			this.hackyWayToStopPanBeyondBounds__plotData = state.plotData;
			this.hackyWayToStopPanBeyondBounds__domain = state.xScale.domain();

			this.panInProgress = true;
			this.triggerEvent("pan", state, e);
			requestAnimationFrame(function () {
				_this4.clearBothCanvas();
				_this4.draw();
			});
		}
	}, {
		key: "handleMouseDown",
		value: function handleMouseDown(mousePosition, currentCharts, e) {
			this.triggerEvent("mousedown", null, e);
		}
	}, {
		key: "handleClick",
		value: function handleClick(mousePosition, e) {
			// console.log("clicked", e.shiftKey);
			this.triggerEvent("click", {}, e);
		}
	}, {
		key: "handleDoubleClick",
		value: function handleDoubleClick(mousePosition, e) {
			if (debug) console.log("double clicked");
			this.triggerEvent("dblclick", {}, e);
		}
	}, {
		key: "handlePanEnd",
		value: function handlePanEnd(mousePosition, panStartXScale, panOrigin, chartsToPan, e) {
			var _this5 = this;

			var state = this.panHelper(mousePosition, panStartXScale, panOrigin, chartsToPan);
			// console.log(this.canvasDrawCallbackList.map(d => d.type));
			this.hackyWayToStopPanBeyondBounds__plotData = null;
			this.hackyWayToStopPanBeyondBounds__domain = null;

			this.panInProgress = false;

			this.triggerEvent("panend", state, e);
			// console.log("PANEND", panEnd++);
			var xScale = state.xScale,
			    plotData = state.plotData,
			    chartConfig = state.chartConfig;


			requestAnimationFrame(function () {
				var xAccessor = _this5.state.xAccessor;
				var fullData = _this5.fullData;


				var firstItem = (0, _utils.first)(fullData);
				var start = (0, _utils.first)(xScale.domain());
				var end = xAccessor(firstItem);
				// console.log(start, end, start < end ? "Load more" : "I have it");

				var onLoadMore = _this5.props.onLoadMore;

				_this5.clearThreeCanvas();
				_this5.setState({
					xScale: xScale,
					plotData: plotData,
					chartConfig: chartConfig
				}, function () {
					if (start < end) onLoadMore(start, end);
				});
			});
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var dimensions = getDimensions(this.props);

			return {
				fullData: this.fullData,
				plotData: this.state.plotData,
				width: dimensions.width,
				height: dimensions.height,
				chartConfig: this.state.chartConfig,
				xScale: this.state.xScale,
				xAccessor: this.state.xAccessor,
				displayXAccessor: this.props.displayXAccessor || this.state.displayXAccessor,
				chartCanvasType: this.props.type,
				margin: this.props.margin,
				ratio: this.props.ratio,
				xAxisZoom: this.xAxisZoom,
				yAxisZoom: this.yAxisZoom,
				// getInteractiveState: this.getInteractiveState,
				// setInteractiveState: this.setInteractiveState,
				getCanvasContexts: this.getCanvasContexts,
				subscribe: this.subscribe,
				unsubscribe: this.unsubscribe
			};
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			var _resetChart = resetChart(this.props, true),
			    fullData = _resetChart.fullData,
			    state = _objectWithoutProperties(_resetChart, ["fullData"]);

			this.setState(state);
			this.fullData = fullData;
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			var reset = shouldResetChart(this.props, nextProps);

			var interaction = isInteractionEnabled(this.state.xScale, this.state.xAccessor, this.state.plotData);

			var newState;
			if (!interaction || reset || !(0, _utils.shallowEqual)(this.props.xExtents, nextProps.xExtents)) {
				if (debug) {
					if (process.env.NODE_ENV !== "production") {
						if (!interaction) console.log("RESET CHART, changes to a non interactive chart");else if (reset) console.log("RESET CHART, one or more of these props changed", CANDIDATES_FOR_RESET);else console.log("xExtents changed");
					}
				}
				// do reset
				newState = resetChart(nextProps);
			} else {
				var _state$xScale$domain = this.state.xScale.domain(),
				    _state$xScale$domain2 = _slicedToArray(_state$xScale$domain, 2),
				    start = _state$xScale$domain2[0],
				    end = _state$xScale$domain2[1];

				var prevLastItem = (0, _utils.last)(this.fullData);

				var calculatedState = calculateFullData(nextProps);
				var xAccessor = calculatedState.xAccessor;

				var lastItemWasVisible = xAccessor(prevLastItem) <= end && xAccessor(prevLastItem) >= start;

				if (debug) {
					if (process.env.NODE_ENV !== "production") {
						if (this.props.data !== nextProps.data) console.log("data is changed but seriesName did not, change the seriesName if you wish to reset the chart and lastItemWasVisible = ", lastItemWasVisible);else if (!(0, _utils.shallowEqual)(this.props.calculator, nextProps.calculator)) console.log("calculator changed");else console.log("Trivial change, may be width/height or type changed, but that does not matter");
					}
				}
				newState = updateChart(calculatedState, this.state.xScale, nextProps, lastItemWasVisible);
			}

			var _newState = newState,
			    fullData = _newState.fullData,
			    state = _objectWithoutProperties(_newState, ["fullData"]);

			var initialChartConfig = this.state.chartConfig;


			if (this.panInProgress) {
				if (debug) {
					if (process.env.NODE_ENV !== "production") {
						console.log("Pan is in progress");
					}
				}
			} else {
				if (!reset) {
					state.chartConfig.forEach(function (each) {
						var sourceChartConfig = initialChartConfig.filter(function (d) {
							return d.id === each.id;
						});
						if (sourceChartConfig.length > 0 && sourceChartConfig[0].yPanEnabled) {
							each.yScale.domain(sourceChartConfig[0].yScale.domain());
							each.yPanEnabled = sourceChartConfig[0].yPanEnabled;
						}
					});
				}
				this.clearThreeCanvas();

				this.setState(state);
			}
			this.fullData = fullData;
		}
	}, {
		key: "resetYDomain",
		value: function resetYDomain(chartId) {
			var chartConfig = this.state.chartConfig;

			var changed = false;
			var newChartConfig = chartConfig.map(function (each) {
				if (((0, _utils.isNotDefined)(chartId) || each.id === chartId) && !(0, _utils.shallowEqual)(each.yScale.domain(), each.realYDomain)) {
					changed = true;
					return _extends({}, each, {
						yScale: each.yScale.domain(each.realYDomain),
						yPanEnabled: false
					});
				}
				return each;
			});

			if (changed) {
				this.clearThreeCanvas();
				this.setState({
					chartConfig: newChartConfig
				});
			}
		}
	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate() {
			return !this.panInProgress;
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    type = _props.type,
			    height = _props.height,
			    width = _props.width,
			    margin = _props.margin,
			    className = _props.className,
			    zIndex = _props.zIndex,
			    defaultFocus = _props.defaultFocus,
			    ratio = _props.ratio,
			    disableMouseMoveEvent = _props.disableMouseMoveEvent,
			    disablePanEvent = _props.disablePanEvent,
			    disableZoomEvent = _props.disableZoomEvent;
			var _props2 = this.props,
			    useCrossHairStyleCursor = _props2.useCrossHairStyleCursor,
			    drawMode = _props2.drawMode,
			    onSelect = _props2.onSelect;
			var _state7 = this.state,
			    plotData = _state7.plotData,
			    xScale = _state7.xScale,
			    xAccessor = _state7.xAccessor,
			    chartConfig = _state7.chartConfig;

			var dimensions = getDimensions(this.props);

			var interaction = isInteractionEnabled(xScale, xAccessor, plotData);

			var cursor = getCursorStyle(useCrossHairStyleCursor && interaction);
			return _react2.default.createElement(
				"div",
				{ style: { position: "relative", width: width, height: height }, className: className, onClick: onSelect },
				_react2.default.createElement(_CanvasContainer2.default, { ref: "canvases", width: width, height: height, ratio: ratio, type: type, zIndex: zIndex }),
				_react2.default.createElement(
					"svg",
					{ className: className, width: width, height: height, style: { position: "absolute", zIndex: zIndex + 5 } },
					cursor,
					_react2.default.createElement(
						"defs",
						null,
						_react2.default.createElement(
							"clipPath",
							{ id: "chart-area-clip" },
							_react2.default.createElement("rect", { x: "0", y: "0", width: dimensions.width, height: dimensions.height })
						),
						_react2.default.createElement(
							"linearGradient",
							{ id: "Gradient2", x1: "0", x2: "0", y1: "0", y2: "1" },
							_react2.default.createElement("stop", { offset: "0%", stopColor: "#94B6FF", stopOpacity: "0.5" }),
							_react2.default.createElement("stop", { offset: "100%", stopColor: "black", stopOpacity: "0" })
						),
						chartConfig.map(function (each, idx) {
							return _react2.default.createElement(
								"clipPath",
								{ key: idx, id: "chart-area-clip-" + each.id },
								_react2.default.createElement("rect", { x: "0", y: "0", width: each.width, height: each.height })
							);
						})
					),
					_react2.default.createElement(
						"g",
						{ transform: "translate(" + (margin.left + 0.5) + ", " + (margin.top + 0.5) + ")" },
						_react2.default.createElement(_EventCapture2.default, {
							mouseMove: !disableMouseMoveEvent && interaction,
							zoom: !disableZoomEvent && interaction,
							pan: !disablePanEvent && interaction && !drawMode,

							width: dimensions.width,
							height: dimensions.height,
							chartConfig: chartConfig,
							xScale: xScale,
							xAccessor: xAccessor,
							focus: defaultFocus,

							onContextMenu: this.handleContextMenu,
							onClick: this.handleClick,
							onDoubleClick: this.handleDoubleClick,
							onMouseDown: this.handleMouseDown,
							onMouseMove: this.handleMouseMove,
							onMouseEnter: this.handleMouseEnter,
							onMouseLeave: this.handleMouseLeave,
							onZoom: this.handleZoom,
							onPinchZoom: this.handlePinchZoom,
							onPan: this.handlePan,
							onPanEnd: this.handlePanEnd
						}),
						_react2.default.createElement(
							"g",
							{ className: "react-stockcharts-avoid-interaction" },
							this.props.children
						)
					)
				)
			);
		}
	}]);

	return ChartCanvas;
}(_react.Component);

function isInteractionEnabled(xScale, xAccessor, data) {
	var interaction = !isNaN(xScale(xAccessor((0, _utils.first)(data)))) && (0, _utils.isDefined)(xScale.invert);
	return interaction;
}

ChartCanvas.propTypes = {
	width: _react.PropTypes.number.isRequired,
	height: _react.PropTypes.number.isRequired,
	margin: _react.PropTypes.object,
	ratio: _react.PropTypes.number.isRequired,
	// interval: PropTypes.oneOf(["D", "W", "M"]), // ,"m1", "m5", "m15", "W", "M"
	type: _react.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
	data: _react.PropTypes.array.isRequired,
	// initialDisplay: PropTypes.number,
	calculator: _react.PropTypes.arrayOf(_react.PropTypes.func).isRequired,
	xAccessor: _react.PropTypes.func,
	xExtents: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.func]).isRequired,
	// xScale: PropTypes.func.isRequired,
	className: _react.PropTypes.string,
	seriesName: _react.PropTypes.string.isRequired,
	zIndex: _react.PropTypes.number,
	children: _react.PropTypes.node.isRequired,
	xScaleProvider: function xScaleProvider(props, propName /* , componentName */) {
		if ((0, _utils.isDefined)(props[propName]) && typeof props[propName] === "function" && (0, _utils.isDefined)(props.xScale)) {
			return new Error("Do not define both xScaleProvider and xScale choose only one");
		}
	},
	xScale: function xScale(props, propName /* , componentName */) {
		if ((0, _utils.isDefined)(props[propName]) && typeof props[propName] === "function" && (0, _utils.isDefined)(props.xScaleProvider)) {
			return new Error("Do not define both xScaleProvider and xScale choose only one");
		}
	},
	postCalculator: _react.PropTypes.func.isRequired,
	flipXScale: _react.PropTypes.bool.isRequired,
	useCrossHairStyleCursor: _react.PropTypes.bool.isRequired,
	drawMode: _react.PropTypes.bool.isRequired,
	padding: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.shape({
		left: _react.PropTypes.number,
		right: _react.PropTypes.number
	})]).isRequired,
	defaultFocus: _react.PropTypes.bool,
	zoomMultiplier: _react.PropTypes.number.isRequired,
	onLoadMore: _react.PropTypes.func,
	displayXAccessor: _react.PropTypes.func,
	disableMouseMoveEvent: _react.PropTypes.bool.isRequired,
	disablePanEvent: _react.PropTypes.bool.isRequired,
	disableZoomEvent: _react.PropTypes.bool.isRequired,
	onSelect: _react.PropTypes.func
};

ChartCanvas.defaultProps = {
	margin: { top: 20, right: 30, bottom: 30, left: 80 },
	indexAccessor: function indexAccessor(d) {
		return d.idx;
	},
	indexMutator: function indexMutator(d, idx) {
		return _extends({}, d, { idx: idx });
	},
	map: _utils.identity,
	type: "hybrid",
	calculator: [],
	className: "react-stockchart",
	zIndex: 1,
	xExtents: [_d3Array.min, _d3Array.max],
	// dataEvaluator: evaluator,
	postCalculator: _utils.identity,
	padding: 0,
	xAccessor: _utils.identity,
	flipXScale: false,
	useCrossHairStyleCursor: true,
	drawMode: false,
	defaultFocus: true,
	onLoadMore: _utils.noop,
	onSelect: _utils.noop,
	disableMouseMoveEvent: false,
	disablePanEvent: false,
	disableZoomEvent: false,
	zoomMultiplier: 1.1
};

ChartCanvas.childContextTypes = {
	plotData: _react.PropTypes.array,
	fullData: _react.PropTypes.array,
	chartConfig: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		id: _react.PropTypes.number.isRequired,
		origin: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired,
		padding: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.shape({
			top: _react.PropTypes.number,
			bottom: _react.PropTypes.number
		})]),
		yExtents: _react.PropTypes.arrayOf(_react.PropTypes.func),
		yExtentsProvider: _react.PropTypes.func,
		yScale: _react.PropTypes.func.isRequired,
		mouseCoordinates: _react.PropTypes.shape({
			at: _react.PropTypes.string,
			format: _react.PropTypes.func
		}),
		width: _react.PropTypes.number.isRequired,
		height: _react.PropTypes.number.isRequired
	})).isRequired,
	xScale: _react.PropTypes.func.isRequired,
	xAccessor: _react.PropTypes.func.isRequired,
	displayXAccessor: _react.PropTypes.func.isRequired,
	width: _react.PropTypes.number.isRequired,
	height: _react.PropTypes.number.isRequired,
	chartCanvasType: _react.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
	margin: _react.PropTypes.object.isRequired,
	ratio: _react.PropTypes.number.isRequired,
	getCanvasContexts: _react.PropTypes.func,
	xAxisZoom: _react.PropTypes.func,
	yAxisZoom: _react.PropTypes.func,
	subscribe: _react.PropTypes.func,
	unsubscribe: _react.PropTypes.func
};

ChartCanvas.ohlcv = function (d) {
	return { date: d.date, open: d.open, high: d.high, low: d.low, close: d.close, volume: d.volume };
};

exports.default = ChartCanvas;