import { createSlice } from '@reduxjs/toolkit';
import { generatePaletteWithShades } from '../../../utils/colorHelper';
const initialState = {
	format: 'hex',
	level: 500,
	extendedPalette: null,
};

const paletteSlice = createSlice({
	name: 'palette',
	initialState,
	reducers: {
		setFormat(state, action) {
			state.format = action.payload;
		},
		setLevel(state, action) {
			state.level = action.payload;
		},
		genarateExtendedPalette(state, action) {
			state.extendedPalette = generatePaletteWithShades(action.payload);
		},
		resetPalette(state, action) {
			state.format = initialState.format;
			state.level = initialState.level;
			state.extendedPalette = initialState.extendedPalette;
		},
	},
});

export const { setFormat, setLevel, genarateExtendedPalette, resetPalette } =
	paletteSlice.actions;

export default paletteSlice.reducer;
