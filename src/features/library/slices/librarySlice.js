import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	getFirestore,
	collection,
	query,
	doc,
	getDoc,
	getDocs,
	updateDoc,
	where,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore';

const initialState = {
	list: null,
	error: null,
	loading: null,
	success: null,
};

export const getLibraryPalettesList = createAsyncThunk(
	'library/getLibraryPalettesList',
	async (_, { getState, rejectWithValue }) => {
		try {
			const {
				user: { info },
			} = getState();

			const db = getFirestore();
			const { library } = (
				await getDoc(doc(db, 'users', info.id))
			).data();
			const palettesSnapshot = await getDocs(
				query(
					collection(db, 'palettes'),
					where('__name__', 'in', library)
				)
			);
			return !palettesSnapshot.empty
				? palettesSnapshot.docs.map((doc) => {
						return { id: doc.id, ...doc.data() };
				  })
				: [];
		} catch (e) {
			throw rejectWithValue(e);
		}
	}
);

export const addPaletteToLibrary = createAsyncThunk(
	'library/addPaletteToLibrary',
	async (paletteId, { getState, rejectWithValue }) => {
		try {
			const {
				user: { info },
			} = getState();
			const db = getFirestore();
			await updateDoc(doc(db, 'users', info.id), {
				library: arrayUnion(paletteId),
			});
		} catch (e) {
			throw rejectWithValue(e);
		}
	}
);

export const removePaletteToLibrary = createAsyncThunk(
	'library/removePaletteToLibrary',
	async (paletteId, { getState, rejectWithValue }) => {
		try {
			const {
				user: { info },
				library: { list },
			} = getState();
			const db = getFirestore();
			await updateDoc(doc(db, 'users', info.id), {
				library: arrayRemove(paletteId),
			});
			return list.filter((palette) => palette.id !== paletteId);
		} catch (e) {
			throw rejectWithValue(e);
		}
	}
);

const librarySlice = createSlice({
	name: 'library',
	initialState,
	reducers: {
		clearError(state, action) {
			state.error = null;
		},
		clearLibrary(state, action) {
			state.list = initialState.list;
			state.error = initialState.error;
			state.loading = initialState.loading;
			state.success = initialState.success;
		},
	},
	extraReducers: {
		[getLibraryPalettesList.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.list = [];
		},
		[getLibraryPalettesList.fulfilled]: (state, action) => {
			state.list = action.payload;
			state.loading = false;
		},
		[getLibraryPalettesList.rejected]: (state, action) => {
			state.error = {
				message: action.payload.message,
				code: action.payload.code,
			};
			state.loading = false;
		},
		[addPaletteToLibrary.pending]: (state, action) => {
			state.error = null;
			state.loading = true;
			state.success = null;
		},
		[addPaletteToLibrary.fulfilled]: (state, action) => {
			state.loading = false;
			state.success = true;
		},
		[addPaletteToLibrary.rejected]: (state, action) => {
			state.loading = false;
			state.success = false;
			state.error = {
				message: action.payload.message,
				code: action.payload.code,
			};
		},
		[removePaletteToLibrary.pending]: (state, action) => {
			state.error = null;
			state.loading = true;
			state.success = null;
		},
		[removePaletteToLibrary.fulfilled]: (state, action) => {
			state.loading = false;
			state.success = true;
			state.list = action.payload;
		},
		[removePaletteToLibrary.rejected]: (state, action) => {
			state.loading = false;
			state.success = false;
			state.error = {
				message: action.payload.message,
				code: action.payload.code,
			};
		},
	},
});

export const { clearError, clearLibrary } = librarySlice.actions;

export default librarySlice.reducer;
