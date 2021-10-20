import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	format: 'hex',
	level: 500,
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
		resetPalette(state, action) {
			state.format = initialState.format;
			state.level = initialState.level;
		},
	},
});

export const { setFormat, setLevel, resetPalette } = paletteSlice.actions;

export default paletteSlice.reducer;
