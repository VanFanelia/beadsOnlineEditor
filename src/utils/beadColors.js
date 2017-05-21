const blankColor = { color: '#eeeeee00' };

export const defaultBead = 'H01';

/* eslint-disable no-multi-spaces, key-spacing */
const beadList = {
	H01:{ name: 'WHITE',         type: 'HAMA',        red: 255, green: 255, blue: 255, color: '#FFFFFF' },
	H02:{ name: 'CREAM',         type: 'HAMA',        red: 250, green: 240, blue: 195, color: '#FAF0C3' },
	H03:{ name: 'YELLOW',        type: 'HAMA',        red: 255, green: 215, blue:  90, color: '#FFD75A' },
	H04:{ name: 'ORANGE',        type: 'HAMA',        red: 240, green: 105, blue:  95, color: '#F0695F' },
	H05:{ name: 'RED',           type: 'HAMA',        red: 182, green:  49, blue:  54, color: '#B63136' },
	H06:{ name: 'PINK',          type: 'HAMA',        red: 245, green: 155, blue: 175, color: '#F59BAF' },
	H07:{ name: 'PURPLE',        type: 'HAMA',        red: 120, green:  90, blue: 145, color: '#785A91' },
	H08:{ name: 'BLUE',          type: 'HAMA',        red:  35, green:  85, blue: 160, color: '#2355A0' },
	H09:{ name: 'LIGHT BLUE',    type: 'HAMA',        red:  25, green: 105, blue: 180, color: '#1969B4' },
	H10:{ name: 'GREEN',         type: 'HAMA',        red:  35, green: 125, blue:  95, color: '#237D5F' },
	H11:{ name: 'LIGHT GREEN',   type: 'HAMA',        red:  70, green: 195, blue: 165, color: '#46C3A5' },
	H12:{ name: 'BROWN',         type: 'HAMA',        red: 100, green:  75, blue:  80, color: '#644B50' },
	H17:{ name: 'GREY',          type: 'HAMA',        red: 145, green: 150, blue: 155, color: '#91969B' },
	H18:{ name: 'BLACK',         type: 'HAMA',        red:   0, green:   0, blue:   0, color: '#000000' },
	H20:{ name: 'BROWN',         type: 'HAMA',        red: 170, green:  85, blue:  80, color: '#AA5550' },
	H21:{ name: 'LIGHT BROWN',   type: 'HAMA',        red: 190, green: 130, blue: 100, color: '#BE8264' },
	H22:{ name: 'DARK RED',      type: 'HAMA',        red: 175, green:  75, blue:  85, color: '#AF4B55' },
	H26:{ name: 'FLESH',         type: 'HAMA',        red: 240, green: 170, blue: 165, color: '#F0AAA5' },
	H27:{ name: 'BEIGE',         type: 'HAMA',        red: 225, green: 185, blue: 150, color: '#E1B996' },
	H28:{ name: 'DARK GREEN',    type: 'HAMA',        red:  70, green:  85, blue:  90, color: '#46555A' },
	H29:{ name: 'CLARET',        type: 'HAMA',        red: 195, green:  80, blue: 115, color: '#C35073' },
	H30:{ name: 'BURGUNDY',      type: 'HAMA',        red: 115, green:  75, blue:  85, color: '#734B55' },
	H31:{ name: 'TURQUOISE',     type: 'HAMA',        red: 105, green: 160, blue: 175, color: '#69A0AF' },
	H32:{ name: 'FUCHSIA',       type: 'HAMA',        red: 255, green:  95, blue: 200, color: '#FF5FC8' },
	H43:{ name: 'PASTEL YELLOW', type: 'HAMA_PASTEL', red: 245, green: 240, blue: 125, color: '#F5F07D' },
	H44:{ name: 'PASTEL RED',    type: 'HAMA_PASTEL', red: 255, green: 120, blue: 140, color: '#FF788C' },
	H45:{ name: 'PASTEL PURPLE', type: 'HAMA_PASTEL', red: 165, green: 140, blue: 205, color: '#A58CCD' },
	H46:{ name: 'PASTEL BLUE',   type: 'HAMA_PASTEL', red:  80, green: 170, blue: 225, color: '#50AAE1' },
	H47:{ name: 'PASTEL GREEN',  type: 'HAMA_PASTEL', red: 150, green: 230, blue: 160, color: '#96E6A0' },
	H48:{ name: 'PASTEL PINK',   type: 'HAMA_PASTEL', red: 230, green: 135, blue: 200, color: '#E687C8' },
	H49:{ name: 'AZURE',         type: 'HAMA',        red:  73, green: 152, blue: 188, color: '#4998BC' },
	H60:{ name: 'TEDDY BEAR',    type: 'HAMA',        red: 240, green: 175, blue:  95, color: '#F0AF5F' },
	H61:{ name: 'GOLD',          type: 'HAMA_METAL',  red: 170, green: 135, blue:  75, color: '#AA874B' },
	H62:{ name: 'SILVER',        type: 'HAMA_METAL',  red: 175, green: 180, blue: 190, color: '#AFB4BE' },
	H63:{ name: 'BRONZE',        type: 'HAMA_METAL',  red: 170, green: 160, blue: 105, color: '#AAA069' },
};
/* eslint-enable no-multi-spaces, key-spacing */

const getBeadIdData = (beadId) => {
	if (beadId in beadList) {
		return beadList[beadId];
	}

	console.error('BeadId not found in bead list!');
	return blankColor;
};

export default getBeadIdData;
