const blankColor = { color: '#eeeeee00' };

export const defaultBead = 'H01';
export const transparentBead = 'H19';
export const NO_BEAD = 'NO_BEAD';

/* eslint-disable no-multi-spaces, key-spacing */
export const beadList = {
	H01:{ id: 'H01', name: 'WHITE',         type: 'HAMA_BASIC',  category: 'monochrome', red: 255, green: 255, blue: 255, alpha: 255, color: '#FFFFFF' },
	H02:{ id: 'H02', name: 'CREAM',         type: 'HAMA_BASIC',  category: 'monochrome', red: 250, green: 240, blue: 195, alpha: 255, color: '#FAF0C3' },
	H03:{ id: 'H03', name: 'YELLOW',        type: 'HAMA_BASIC',  category: 'yellow',     red: 255, green: 215, blue:  90, alpha: 255, color: '#FFD75A' },
	H04:{ id: 'H04', name: 'ORANGE',        type: 'HAMA_BASIC',  category: 'yellow',     red: 240, green: 105, blue:  95, alpha: 255, color: '#F0695F' },
	H05:{ id: 'H05', name: 'RED',           type: 'HAMA_BASIC',  category: 'red',        red: 182, green:  49, blue:  54, alpha: 255, color: '#B63136' },
	H06:{ id: 'H06', name: 'PINK',          type: 'HAMA_BASIC',  category: 'red',        red: 245, green: 155, blue: 175, alpha: 255, color: '#F59BAF' },
	H07:{ id: 'H07', name: 'PURPLE',        type: 'HAMA_BASIC',  category: 'blue',       red: 120, green:  90, blue: 145, alpha: 255, color: '#785A91' },
	H08:{ id: 'H08', name: 'BLUE',          type: 'HAMA_BASIC',  category: 'blue',       red:  35, green:  85, blue: 160, alpha: 255, color: '#2355A0' },
	H09:{ id: 'H09', name: 'LIGHT BLUE',    type: 'HAMA_BASIC',  category: 'blue',       red:  25, green: 105, blue: 180, alpha: 255, color: '#1969B4' },
	H10:{ id: 'H10', name: 'GREEN',         type: 'HAMA_BASIC',  category: 'green',      red:  35, green: 125, blue:  95, alpha: 255, color: '#237D5F' },
	H11:{ id: 'H11', name: 'LIGHT GREEN',   type: 'HAMA_BASIC',  category: 'green',      red:  70, green: 195, blue: 165, alpha: 255, color: '#46C3A5' },
	H12:{ id: 'H12', name: 'BROWN',         type: 'HAMA_BASIC',  category: 'red',        red: 100, green:  75, blue:  80, alpha: 255, color: '#644B50' },
	H17:{ id: 'H17', name: 'GREY',          type: 'HAMA_BASIC',  category: 'monochrome', red: 145, green: 150, blue: 155, alpha: 255, color: '#91969B' },
	H18:{ id: 'H18', name: 'BLACK',         type: 'HAMA_BASIC',  category: 'monochrome', red:   0, green:   0, blue:   0, alpha: 255, color: '#000000' },
	H19:{ id: 'H19', name: 'TRANSPARENT',   type: 'HAMA_BASIC',  category: 'monochrome', red: 255, green: 255, blue: 255, alpha:   0, color: '#FFFFFF' },
	H20:{ id: 'H20', name: 'RED BROWN',     type: 'HAMA_BASIC',  category: 'red',        red: 170, green:  85, blue:  80, alpha: 255, color: '#AA5550' },
	H21:{ id: 'H21', name: 'LIGHT BROWN',   type: 'HAMA_BASIC',  category: 'red',        red: 190, green: 130, blue: 100, alpha: 255, color: '#BE8264' },
	H22:{ id: 'H22', name: 'DARK RED',      type: 'HAMA_BASIC',  category: 'red',        red: 175, green:  75, blue:  85, alpha: 255, color: '#AF4B55' },
	H26:{ id: 'H26', name: 'FLESH',         type: 'HAMA_BASIC',  category: 'red',        red: 240, green: 170, blue: 165, alpha: 255, color: '#F0AAA5' },
	H27:{ id: 'H27', name: 'BEIGE',         type: 'HAMA_BASIC',  category: 'yellow',     red: 225, green: 185, blue: 150, alpha: 255, color: '#E1B996' },
	H28:{ id: 'H28', name: 'DARK GREEN',    type: 'HAMA_BASIC',  category: 'green',      red:  70, green:  85, blue:  90, alpha: 255, color: '#46555A' },
	H29:{ id: 'H29', name: 'CLARET',        type: 'HAMA_BASIC',  category: 'red',        red: 195, green:  80, blue: 115, alpha: 255, color: '#C35073' },
	H30:{ id: 'H30', name: 'BURGUNDY',      type: 'HAMA_BASIC',  category: 'red',        red: 115, green:  75, blue:  85, alpha: 255, color: '#734B55' },
	H31:{ id: 'H31', name: 'TURQUOISE',     type: 'HAMA_BASIC',  category: 'blue',       red: 105, green: 160, blue: 175, alpha: 255, color: '#69A0AF' },
	H32:{ id: 'H32', name: 'FUCHSIA',       type: 'HAMA_BASIC',  category: 'red',        red: 255, green:  95, blue: 200, alpha: 255, color: '#FF5FC8' },
	H43:{ id: 'H43', name: 'PASTEL YELLOW', type: 'HAMA_PASTEL', category: 'yellow',     red: 245, green: 240, blue: 125, alpha: 255, color: '#F5F07D' },
	H44:{ id: 'H44', name: 'PASTEL RED',    type: 'HAMA_PASTEL', category: 'red',        red: 255, green: 120, blue: 140, alpha: 255, color: '#FF788C' },
	H45:{ id: 'H45', name: 'PASTEL PURPLE', type: 'HAMA_PASTEL', category: 'blue',       red: 165, green: 140, blue: 205, alpha: 255, color: '#A58CCD' },
	H46:{ id: 'H46', name: 'PASTEL BLUE',   type: 'HAMA_PASTEL', category: 'blue',       red:  80, green: 170, blue: 225, alpha: 255, color: '#50AAE1' },
	H47:{ id: 'H47', name: 'PASTEL GREEN',  type: 'HAMA_PASTEL', category: 'green',      red: 150, green: 230, blue: 160, alpha: 255, color: '#96E6A0' },
	H48:{ id: 'H48', name: 'PASTEL PINK',   type: 'HAMA_PASTEL', category: 'red',        red: 230, green: 135, blue: 200, alpha: 255, color: '#E687C8' },
	H49:{ id: 'H49', name: 'AZURE',         type: 'HAMA_BASIC',  category: 'blue',       red:  73, green: 152, blue: 188, alpha: 255, color: '#4998BC' },
	H60:{ id: 'H60', name: 'TEDDY BEAR',    type: 'HAMA_BASIC',  category: 'yellow',     red: 240, green: 175, blue:  95, alpha: 255, color: '#F0AF5F' },
	H61:{ id: 'H61', name: 'GOLD',          type: 'HAMA_METAL',  category: 'yellow',     red: 170, green: 135, blue:  75, alpha: 255, color: '#AA874B' },
	H62:{ id: 'H62', name: 'SILVER',        type: 'HAMA_METAL',  category: 'monochrome', red: 175, green: 180, blue: 190, alpha: 255, color: '#AFB4BE' },
	H63:{ id: 'H63', name: 'BRONZE',        type: 'HAMA_METAL',  category: 'green',      red: 170, green: 160, blue: 105, alpha: 255, color: '#AAA069' },
};
/* eslint-enable no-multi-spaces, key-spacing */

export const getBeadIdData = (beadId) => {
	if (beadId in beadList) {
		return beadList[beadId];
	}

	// eslint-disable-next-line no-console
	console.error(`BeadId '${beadId}' not found in bead list!`);
	return blankColor;
};

export const colorToHexCode = (red, green, blue, alpha) => (
	parseInt(`${red.toString(16)}${green.toString(16)}${blue.toString(16)}${alpha.toString(16)}`, 16)
);

export const getBeadByColor = (red, green, blue, alpha) => (
	Object.values(beadList).find(
		bead => (
			bead.red === red && bead.green === green && bead.blue === blue && bead.alpha === alpha
		))
	);
