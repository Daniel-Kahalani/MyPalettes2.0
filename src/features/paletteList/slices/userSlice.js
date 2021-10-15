import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	getFirestore,
	collection,
	query,
	getDocs,
	addDoc,
	where,
	limit,
} from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

const initialState = {
	info: {},
	isAuthenticated: null,
	error: null,
	loading: null,
};

export const register = createAsyncThunk(
	'user/register',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const auth = getAuth();
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const db = getFirestore();
			const userData = {
				uid: userCredential.user.uid,
				email: userCredential.user.email,
				firstName: '',
				lastName: '',
			};
			const newUserDoc = await addDoc(collection(db, 'users'), {
				...userData,
				library: [],
			});
			return { id: newUserDoc.id, ...userData };
		} catch (e) {
			throw rejectWithValue(e);
		}
	}
);

export const login = createAsyncThunk(
	'user/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const auth = getAuth();
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const db = getFirestore();
			const userDoc = (
				await getDocs(
					query(
						collection(db, 'users'),
						where('uid', '==', userCredential.user.uid),
						limit(1)
					)
				)
			).docs[0];
			const { library, ...userData } = userDoc.data();
			return { id: userDoc.id, ...userData };
		} catch (e) {
			throw rejectWithValue(e);
		}
	}
);

export const isLoggedIn = createAsyncThunk(
	'user/isLoggedIn',
	async (_, { rejectWithValue }) => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (!user) {
			throw rejectWithValue();
		}
		return {
			uid: user.uid,
			email: user.email,
		};
	}
);

export const logout = createAsyncThunk('user/logout', async () => {
	const auth = getAuth();
	await signOut(auth);
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearError(state, action) {
			state.error = null;
		},
	},
	extraReducers: {
		[register.pending]: (state, action) => {
			state.error = null;
			state.loading = true;
		},
		[register.fulfilled]: (state, action) => {
			state.loading = false;
			state.info = action.payload;
			state.isAuthenticated = true;
		},
		[register.rejected]: (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.error = {
				message: action.payload.message,
				code: action.payload.code,
			};
		},
		[login.pending]: (state, action) => {
			state.error = null;
			state.loading = true;
		},
		[login.fulfilled]: (state, action) => {
			state.loading = false;
			state.info = action.payload;
			state.isAuthenticated = true;
		},
		[login.rejected]: (state, action) => {
			state.loading = false;
			state.error = {
				message: action.payload.message,
				code: action.payload.code,
			};
			state.isAuthenticated = false;
		},
		[isLoggedIn.fulfilled]: (state, action) => {
			if (action.payload) {
				state.info = action.payload;
				state.isAuthenticated = true;
			} else {
				state.isAuthenticated = false;
			}
		},
		[isLoggedIn.rejected]: (state, action) => {
			state.isAuthenticated = false;
		},
		[logout.fulfilled]: (state, action) => {
			state.info = initialState.info;
			state.photo = initialState.photo;
			state.isAuthenticated = false;
			state.error = initialState.error;
			state.loading = initialState.loading;
		},
	},
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
