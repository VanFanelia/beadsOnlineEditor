import { calculateResize, getDistanceBetween2Colors, getNearestColor } from '../../src/utils/converter';
import { beadList } from '../../src/utils/beadColors';

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


/*

@Test
public void testGetColorsOfColorTypesOnlyReturnsAllowedColorTypes() throws Exception {
	List<ColorType> allowed = new ArrayList<ColorType>(Arrays.asList(ColorType.HAMA_BASIC));
	List<Color> filtered = BeadsColorUtils.getColorsOfColorTypes(allowed);

	assertThat(filtered.contains(HAMA_COLOR_BLACK), Matchers.is(true));
	assertThat(filtered.contains(HAMA_COLOR_GOLD), Matchers.is(false));
}

	*/