import { calculateResize } from '../../src/utils/converter';

it('check calculatedResult returns same size for 1,1 ', () => {
	const calculatedResult = calculateResize(1, 1);
	expect(calculatedResult.width).toBe(1);
	expect(calculatedResult.height).toBe(1);
});

it('check calculatedResult returns same size for 29,29 ', () => {
	const calculatedResult = calculateResize(29, 29);
	expect(calculatedResult.width).toBe(29);
	expect(calculatedResult.height).toBe(29);
});

it('check calculatedResult returns null for invalid value 0 ', () => {
	const calculatedResult = calculateResize(0, 0);
	expect(calculatedResult).toBe(null);
});

it('check calculatedResult returns null for invalid value string ', () => {
	const calculatedResult = calculateResize('foo', 1);
	expect(calculatedResult).toBe(null);
});

it('check calculatedResult returns (20,10) for value (40, 20) ', () => {
	const calculatedResult = calculateResize(40, 20);
	expect(calculatedResult.width).toBe(20);
	expect(calculatedResult.height).toBe(10);
});

it('check calculatedResult returns right Value with maxLimit ', () => {
	const calculatedResult = calculateResize(80, 300, 29, 145);
	expect(calculatedResult.width).toBe(20);
	expect(calculatedResult.height).toBe(75);
});