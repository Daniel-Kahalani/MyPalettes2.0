import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	getFirestore,
	collection,
	query,
	getDocs,
	orderBy,
} from 'firebase/firestore';

const initialState = {
	list: [],
	error: null,
	loading: null,
};

export const getPalettesList = createAsyncThunk(
	'palettes/getPalettesList',
	async (_, { getState, rejectWithValue }) => {
		try {
			const db = getFirestore();
			const palettesSnapshot = await getDocs(
				query(collection(db, 'palettes'), orderBy('timestamp'))
			);
			return palettesSnapshot.docs.map((doc) => {
				const { timestamp, ...data } = doc.data();
				return { id: doc.id, ...data };
			});
		} catch (e) {
			throw rejectWithValue(e);
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
		resetPalettes(state, action) {
			state.list = initialState.list;
			state.error = initialState.error;
			state.loading = initialState.loading;
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

export const { clearError, resetPalettes } = palettesSlice.actions;

export default palettesSlice.reducer;
