
import discontinuousTimeScaleProvider, { discontinuousTimeScaleProviderBuilder } from "./discontinuousTimeScaleProvider";
import financeDiscontinuousScale from "./financeDiscontinuousScale";

export { discontinuousTimeScaleProviderBuilder, discontinuousTimeScaleProvider, financeDiscontinuousScale };

export function defaultScaleProvider(xScale) {
	return function (data, xAccessor) {
		return { data: data, xScale: xScale, xAccessor: xAccessor, displayXAccessor: xAccessor };
	};
}