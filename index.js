"use strict";

// common components

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getAxisCanvas = exports.utils = exports.version = exports.interactive = exports.helper = exports.annotation = exports.tooltip = exports.scale = exports.axes = exports.algorithm = exports.indicator = exports.coordinates = exports.series = exports.BackgroundText = exports.GenericComponent = exports.GenericChartComponent = exports.Chart = exports.ChartCanvas = undefined;

var _ChartCanvas = require("./lib/ChartCanvas");

var _ChartCanvas2 = _interopRequireDefault(_ChartCanvas);

var _Chart = require("./lib/Chart");

var _Chart2 = _interopRequireDefault(_Chart);

var _GenericChartComponent = require("./lib/GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("./lib/GenericComponent");

var _GenericComponent2 = _interopRequireDefault(_GenericComponent);

var _BackgroundText = require("./lib/BackgroundText");

var _BackgroundText2 = _interopRequireDefault(_BackgroundText);

var _series = require("./lib/series");

var series = _interopRequireWildcard(_series);

var _scale = require("./lib/scale");

var scale = _interopRequireWildcard(_scale);

var _coordinates = require("./lib/coordinates");

var coordinates = _interopRequireWildcard(_coordinates);

var _indicator = require("./lib/indicator");

var indicator = _interopRequireWildcard(_indicator);

var _algorithm = require("./lib/algorithm");

var algorithm = _interopRequireWildcard(_algorithm);

var _annotation = require("./lib/annotation");

var annotation = _interopRequireWildcard(_annotation);

var _axes = require("./lib/axes");

var axes = _interopRequireWildcard(_axes);

var _tooltip = require("./lib/tooltip");

var tooltip = _interopRequireWildcard(_tooltip);

var _helper = require("./lib/helper");

var helper = _interopRequireWildcard(_helper);

var _interactive = require("./lib/interactive");

var interactive = _interopRequireWildcard(_interactive);

var _utils = require("./lib/utils");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = "0.6.0-beta.7";

// chart types & Series
exports.ChartCanvas = _ChartCanvas2.default;
exports.Chart = _Chart2.default;
exports.GenericChartComponent = _GenericChartComponent2.default;
exports.GenericComponent = _GenericComponent2.default;
exports.BackgroundText = _BackgroundText2.default;
exports.series = series;
exports.coordinates = coordinates;
exports.indicator = indicator;
exports.algorithm = algorithm;
exports.axes = axes;
exports.scale = scale;
exports.tooltip = tooltip;
exports.annotation = annotation;
exports.helper = helper;
exports.interactive = interactive;
exports.version = version;
exports.utils = utils;
exports.getAxisCanvas = _GenericChartComponent.getAxisCanvas;