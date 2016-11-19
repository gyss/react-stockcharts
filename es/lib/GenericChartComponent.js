"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { PropTypes } from "react";

import GenericComponent from "./GenericComponent";

var GenericChartComponent = function (_GenericComponent) {
	_inherits(GenericChartComponent, _GenericComponent);

	function GenericChartComponent(props, context) {
		_classCallCheck(this, GenericChartComponent);

		var _this = _possibleConstructorReturn(this, (GenericChartComponent.__proto__ || Object.getPrototypeOf(GenericChartComponent)).call(this, props, context));

		_this.listener = _this.listener.bind(_this);
		_this.preCanvasDraw = _this.preCanvasDraw.bind(_this);
		_this.postCanvasDraw = _this.postCanvasDraw.bind(_this);
		return _this;
	}

	_createClass(GenericChartComponent, [{
		key: "preCanvasDraw",
		value: function preCanvasDraw(ctx) {
			ctx.save();
			var _context = this.context,
			    canvasOriginX = _context.canvasOriginX,
			    canvasOriginY = _context.canvasOriginY,
			    width = _context.width,
			    height = _context.height,
			    margin = _context.margin,
			    ratio = _context.ratio;
			var _props = this.props,
			    clip = _props.clip,
			    edgeClip = _props.edgeClip;


			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(ratio, ratio);
			if (edgeClip) {
				ctx.beginPath();
				ctx.rect(-1, canvasOriginY - 10, width + margin.left + margin.right + 1, height + 20);
				ctx.clip();
			}

			ctx.translate(canvasOriginX, canvasOriginY);

			if (clip) {
				ctx.beginPath();
				ctx.rect(-1, -1, width + 1, height + 1);
				ctx.clip();
			}
		}
	}, {
		key: "postCanvasDraw",
		value: function postCanvasDraw(ctx) {
			ctx.restore();
		}
	}, {
		key: "updateMoreProps",
		value: function updateMoreProps(moreProps) {
			// console.log(type, moreProps, e)
			_get(GenericChartComponent.prototype.__proto__ || Object.getPrototypeOf(GenericChartComponent.prototype), "updateMoreProps", this).call(this, moreProps);
			var chartConfigList = moreProps.chartConfig;


			if (chartConfigList) {
				var chartId = this.context.chartId;

				var chartConfig = chartConfigList.filter(function (each) {
					return each.id === chartId;
				})[0];
				this.moreProps.chartConfig = chartConfig;
			}
		}
	}]);

	return GenericChartComponent;
}(GenericComponent);

GenericChartComponent.propTypes = GenericComponent.propTypes;

GenericChartComponent.defaultProps = GenericComponent.defaultProps;

GenericChartComponent.contextTypes = _extends({}, GenericComponent.contextTypes, {
	canvasOriginX: PropTypes.number,
	canvasOriginY: PropTypes.number,
	chartId: PropTypes.number.isRequired,
	chartConfig: PropTypes.object.isRequired,
	ratio: PropTypes.number.isRequired
});

export default GenericChartComponent;

export function getAxisCanvas(contexts) {
	return contexts.axes;
}