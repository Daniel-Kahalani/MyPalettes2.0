import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	list: [],
	error: null,
	loading: null,
	success: null,
};

export const getPalettesList = createAsyncThunk(
	'palettes/getPalettesList',
	async (_, { getState, rejectWithValue }) => {
		try {
			return [];
		} catch (e) {
			throw rejectWithValue(
				new Error(
					'Unable to load the palettes,\n please try to refresh'
				)
			);
		}
	}
);

const palettesSlice = createSlice({
	name: 'palettes',
	initialState,
	reducers: {
		clearError(state, action) {
			state.error = null;
		},
		clearPalettes(state, action) {
			state.list = initialState.list;
			state.error = initialState.error;
			state.loading = initialState.loading;
			state.success = initialState.success;
		},
	},
	extraReducers: {
		[getPalettesList.pending]: (state, action) => {
			state.error = null;
			state.loading = true;
			state.list = [];
		},
		[getPalettesList.fulfilled]: (state, action) => {
			state.loading = false;
			state.list = action.payload;
		},
		[getPalettesList.rejected]: (state, action) => {
			state.loading = false;
			state.error = {
				message: action.payload.message,
				code: action.payload.code,
			};
		},
	},
});

export const { clearError, clearPalettes } = palettesSlice.actions;

export default palettesSlice.reducer;
