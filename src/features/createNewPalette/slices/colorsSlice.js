import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	getFirestore,
	getDocs,
	addDoc,
	query,
	collection,
	where,
	limit,
} from 'firebase/firestore';
import { arrayMoveImmutable } from 'array-move';
import { getRandomColor } from '../../../utils/colorHelper';

const initialState = {
	list: [],
	loading: null,
	error: null,
};

export const addNewPalette = createAsyncThunk(
	'colors/addNewPalette',
	async (palette, { rejectWithValue, getState }) => {
		try {
			const db = getFirestore();
			const newPaletteDoc = await addDoc(
				collection(db, 'palettes'),
				palette
			);
			return newPaletteDoc.id;
		} catch (e) {
			throw rejectWithValue(e);
		}
	}
);

export const paletteNameValid = createAsyncThunk(
	'colors/paletteNameValid',
	async (name, { rejectWithValue, getState }) => {
		try {
			const db = getFirestore();
			const paletteSnap = await getDocs(
				query(
					collection(db, 'palettes'),
					where('name', '==', name),
					limit(1)
				)
			);
			if (paletteSnap.empty) {
				return;
			} else {
				throw rejectWithValue({
					message: 'Palette with this name already exists',
					code: 300,
				});
			}
		} catch (e) {
			throw rejectWithValue(e);
		}
	}
);

const colorsSlice = createSlice({
	name: 'colors',
	initialState,
	reducers: {
		switchColorsIndex(state, action) {
			state.list = arrayMoveImmutable(
				action.payload.colors,
				action.payload.oldIndex,
				action.payload.newIndex
			);
		},
		clearList(state, action) {
			state.list = initialState.list;
		},
		addRandomColor(state, action) {
			state.list = [...state.list, getRandomColor()];
		},
		addNewColor(state, action) {
			state.list = [...state.list, action.payload];
		},
		removeColor(state, action) {
			state.list = state.list.filter(
				(color) => color.name !== action.payload.name
			);
		},
		clearError(state, action) {
			state.error = initialState.error;
		},
		resetColors(state, action) {
			state.list = initialState.list;
			state.loading = initialState.loading;
			state.error = initialState.error;
		},
	},
	extraReducers: {
		[addNewPalette.pending]: (state, action) => {
			state.error = null;
			state.loading = true;
		},
		[addNewPalette.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[addNewPalette.rejected]: (state, action) => {
			state.loading = false;
			state.error = {
				message: action.payload.message,
				code: action.payload.code,
			};
		},
		[paletteNameValid.pending]: (state, action) => {
			state.error = null;
			state.loading = true;
		},
		[paletteNameValid.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[paletteNameValid.rejected]: (state, action) => {
			state.loading = false;
			state.error = {
				message: action.payload.message,
				code: action.payload.code,
			};
		},
	},
});

export const {
	switchColorsIndex,
	clearList,
	addRandomColor,
	addNewColor,
	removeColor,
	clearError,
	resetColors,
} = colorsSlice.actions;

export default colorsSlice.reducer;
