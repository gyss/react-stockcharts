"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var log = (0, _utils.getLogger)("CanvasContainer");

var CanvasContainer = function (_Component) {
	_inherits(CanvasContainer, _Component);

	function CanvasContainer(props) {
		_classCallCheck(this, CanvasContainer);

		var _this = _possibleConstructorReturn(this, (CanvasContainer.__proto__ || Object.getPrototypeOf(CanvasContainer)).call(this, props));

		_this.setDrawCanvas = _this.setDrawCanvas.bind(_this);
		_this.drawCanvas = {};
		return _this;
	}

	_createClass(CanvasContainer, [{
		key: "setDrawCanvas",
		value: function setDrawCanvas(node) {
			if ((0, _utils.isDefined)(node)) this.drawCanvas[node.id] = node.getContext("2d");else this.drawCanvas = {};
		}
	}, {
		key: "getCanvasContexts",
		value: function getCanvasContexts() {
			if ((0, _utils.isDefined)(this.drawCanvas.axes)) {
				return this.drawCanvas;
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    height = _props.height,
			    width = _props.width,
			    type = _props.type,
			    zIndex = _props.zIndex,
			    ratio = _props.ratio;

			if (type === "svg") return null;

			log("using ratio ", ratio);

			return _react2.default.createElement(
				"div",
				{ style: { position: "absolute", zIndex: zIndex } },
				_react2.default.createElement("canvas", { id: "bg", ref: this.setDrawCanvas, width: width * ratio, height: height * ratio,
					style: { position: "absolute", width: width, height: height } }),
				_react2.default.createElement("canvas", { id: "axes", ref: this.setDrawCanvas, width: width * ratio, height: height * ratio,
					style: { position: "absolute", width: width, height: height } }),
				_react2.default.createElement("canvas", { id: "mouseCoord", ref: this.setDrawCanvas, width: width * ratio, height: height * ratio,
					style: { position: "absolute", width: width, height: height } })
			);
		}
	}]);

	return CanvasContainer;
}(_react.Component);

CanvasContainer.propTypes = {
	width: _react.PropTypes.number.isRequired,
	height: _react.PropTypes.number.isRequired,
	type: _react.PropTypes.string.isRequired,
	zIndex: _react.PropTypes.number,
	ratio: _react.PropTypes.number.isRequired
};

exports.default = CanvasContainer;