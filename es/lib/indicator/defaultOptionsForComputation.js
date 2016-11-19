"use strict";

export var BollingerBand = {
	windowSize: 20,
	// source: d => d.close, // "high", "low", "open", "close"
	sourcePath: "close",
	multiplier: 2,
	movingAverageType: "sma"
};

export var ATR = {
	windowSize: 14
};

export var ForceIndex = {
	sourcePath: "close" };

export var ElderRay = {
	windowSize: 13,
	// source: d => d.close, // "high", "low", "open", "close"
	sourcePath: "close", // "high", "low", "open", "close"
	movingAverageType: "sma"
};

export var ElderImpulse = {
	sourcePath: "close" };

export var MACD = {
	fast: 12,
	slow: 26,
	signal: 9,
	// source: d => d.close, // "high", "low", "open", "close"
	sourcePath: "close"
};

export var FullStochasticOscillator = {
	windowSize: 12,
	kWindowSize: 3,
	dWindowSize: 3
};

export var RSI = {
	windowSize: 14,
	// source: d => d.close, // "high", "low", "open", "close"
	sourcePath: "close" };

export var EMA = {
	// source: d => d.close, // "high", "low", "open", "close"
	sourcePath: "close",
	windowSize: 10
};

export var SMA = {
	// source: d => d.close, // "high", "low", "open", "close"
	sourcePath: "close",
	windowSize: 10
};

export var Kagi = {
	reversalType: "ATR", // "ATR", "FIXED"
	windowSize: 14,
	reversal: 2,
	sourcePath: "close" };

export var Renko = {
	reversalType: "ATR", // "ATR", "FIXED"
	windowSize: 14,
	fixedBrickSize: 2,
	sourcePath: "high/low" };

export var PointAndFigure = {
	boxSize: 0.5,
	reversal: 3,
	sourcePath: "high/low" };