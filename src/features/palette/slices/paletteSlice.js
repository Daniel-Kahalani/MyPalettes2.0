import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { FORMAT } from '../../../utils/constants';
import { generatePaletteWithShades } from '../../../utils/colorHelper';

const initialState = {
	format: FORMAT.hex,
	level: 500,
	palette: null,
	shades: null,
	loading: null,
	error: null,
};

export const getPalette = createAsyncThunk(
	'palette/getPalette',
	async (paletteId, { rejectWithValue }) => {
		try {
			const db = getFirestore();
			const paletteSnap = await getDoc(doc(db, 'palettes', paletteId));
			if (paletteSnap.exists()) {
				const { name, colors, emoji } = generatePaletteWithShades(
					paletteSnap.data()
				);
				return { id: paletteSnap.id, name, colors, emoji };
			} else {
				throw rejectWithValue({
					message: 'Unable to find the desired palette',
					code: 200,
				});
			}
		} catch (e) {
			throw rejectWithValue(e);
		}
	}
);

export const getColorShades = createAsyncThunk(
	'palette/getColorShades',
	async (colorId, { rejectWithValue, getState }) => {
		try {
			const { palette } = getState();
			let shades = [];
			for (let key in palette.palette.colors) {
				shades.push(
					palette.palette.colors[key].find(
						(color) => color.id === colorId
					)
				);
			}
			return shades.slice(1);
		} catch (e) {
			throw rejectWithValue(e);
		}
	}
);

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
		clearPalette(state, action) {
			state.palette = initialState.palette;
		},
		resetPalette(state, action) {
			state.format = initialState.format;
			state.level = initialState.level;
			state.palette = initialState.palette;
			state.shades = initialState.shades;
			state.loading = initialState.loading;
			state.error = initialState.error;
		},
	},
	extraReducers: {
		[getPalette.pending]: (state, action) => {
			state.error = null;
			state.loading = true;
		},
		[getPalette.fulfilled]: (state, action) => {
			state.loading = false;
			state.palette = action.payload;
		},
		[getPalette.rejected]: (state, action) => {
			state.loading = false;
			state.error = {
				message: action.payload.message,
				code: action.payload.code,
			};
		},
		[getColorShades.fulfilled]: (state, action) => {
			state.shades = action.payload;
		},
		[getColorShades.rejected]: (state, action) => {
			state.error = {
				message: action.payload.message,
				code: action.payload.code,
			};
		},
	},
});

export const { setFormat, setLevel, clearPalette, resetPalette } =
	paletteSlice.actions;

export default paletteSlice.reducer;
