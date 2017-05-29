import { calculateResizeCubic, calculateResizeMaxSpace, getDistanceBetween2Colors, getNearestColor } from '../../src/utils/converter';
import { beadList } from '../../src/utils/beadColors';

it('calculateResizeCubic: check calculatedResult is same size for 1,1 ', () => {
	const calculatedResult = calculateResizeCubic(1, 1);
	expect(calculatedResult.width).toBe(1);
	expect(calculatedResult.height).toBe(1);
});

it('calculateResizeCubic: check calculatedResult is same size for 29,29 ', () => {
	const calculatedResult = calculateResizeCubic(29, 29);
	expect(calculatedResult.width).toBe(29);
	expect(calculatedResult.height).toBe(29);
});

it('calculateResizeCubic: check calculatedResult is null for invalid value 0 ', () => {
	const calculatedResult = calculateResizeCubic(0, 0);
	expect(calculatedResult).toBe(null);
});

it('calculateResizeCubic: check calculatedResult is null for invalid value string ', () => {
	const calculatedResult = calculateResizeCubic('foo', 1);
	expect(calculatedResult).toBe(null);
});

it('calculateResizeCubic: check calculatedResult is (20,10) for value (40, 20) ', () => {
	const calculatedResult = calculateResizeCubic(40, 20);
	expect(calculatedResult.width).toBe(20);
	expect(calculatedResult.height).toBe(10);
});

it('calculateResizeCubic: check calculatedResult is right Value with maxLimit ', () => {
	const calculatedResult = calculateResizeCubic(80, 300, 29, 145);
	expect(calculatedResult.width).toBe(20);
	expect(calculatedResult.height).toBe(75);
});


it('calculateResizeMaxSpace: check calculatedResult is null for invalid value 0 ', () => {
	const calculatedResult = calculateResizeMaxSpace(0, 0);
	expect(calculatedResult).toBe(null);
});

it('calculateResizeMaxSpace: check calculatedResult is null for invalid value string ', () => {
	const calculatedResult = calculateResizeMaxSpace('foo', 1);
	expect(calculatedResult).toBe(null);
});

it('calculateResizeMaxSpace: check calculatedResult is same size for 29,29 ', () => {
	const calculatedResult = calculateResizeMaxSpace(29, 29);
	expect(calculatedResult.width).toBe(29);
	expect(calculatedResult.height).toBe(29);
});

it('calculateResizeMaxSpace: check calculatedResult is (29,23) for value (50, 40) ', () => {
	const calculatedResult = calculateResizeMaxSpace(50, 40);
	expect(calculatedResult.width).toBe(29);
	expect(calculatedResult.height).toBe(23);
});

it('calculateResizeMaxSpace: check calculatedResult is (23,29) for value (40, 50) ', () => {
	const calculatedResult = calculateResizeMaxSpace(40, 50);
	expect(calculatedResult.width).toBe(23);
	expect(calculatedResult.height).toBe(29);
});


it('calculateResizeMaxSpace: check calculatedResult is right Value with maxLimit ', () => {
	const calculatedResult = calculateResizeMaxSpace(200, 152, 58, 145);
	expect(calculatedResult.width).toBe(58);
	expect(calculatedResult.height).toBe(44);
});

it('calculateResizeMaxSpace: check calculatedResult stretch to max ', () => {
	const calculatedResult = calculateResizeMaxSpace(20, 10, 58, 58);
	expect(calculatedResult.width).toBe(58);
	expect(calculatedResult.height).toBe(29);
});


it('testGetDistanceBetween2ColorsReturns0IfColorsIdentical', () => {
	const black = { red: 0, green: 0, blue: 0 };
	expect(getDistanceBetween2Colors(black, black)).toBe(0);
});

it('testGetDistanceBetween2ColorsReturnsRightValueForBlackAndWhiteColor', () => {
	const black = { red: 0, green: 0, blue: 0 };
	const white = { red: 255, green: 255, blue: 255 };
	const distance = 825.9091959773787;

	expect(getDistanceBetween2Colors(black, white)).toBe(distance);
});

it('testGetDistanceBetween2ColorsReturnsRightValueForYellowAndOrangeColor', () => {
	const yellow = { red: 255, green: 255, blue: 0 };
	const orange = { red: 255, green: 165, blue: 0 };
	const distance = 180;

	expect(getDistanceBetween2Colors(yellow, orange)).toBe(distance);
});



it('testGetNearestColorReturnsBlackForBlackColor', () => {
	const black = { red: 0, green: 0, blue: 0, alpha: 255 };

	expect(getNearestColor(black, beadList)).toBe(beadList.H18);
});

it('testGetNearestColorReturnsBlackForBlackColorWithSomeRed', () => {
	const blackWithSomeRed = { red: 5, green: 0, blue: 0, alpha: 255 };

	expect(getNearestColor(blackWithSomeRed, beadList)).toBe(beadList.H18);
});

it('testGetNearestColorReturnsRedForRedColor', () => {
	const red = { red: 255, green: 0, blue: 0, alpha: 255 };

	expect(getNearestColor(red, beadList)).toBe(beadList.H05);
});

it('testGetNearestColorReturnsYellowForYellowDColor', () => {
	const yellow = { red: 255, green: 255, blue: 0, alpha: 255 };

	expect(getNearestColor(yellow, beadList)).toBe(beadList.H03);
});

