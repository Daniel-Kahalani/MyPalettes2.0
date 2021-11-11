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
	async ({ email, password, fullName }, { rejectWithValue }) => {
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
				fullName,
			};
			const newUserDoc = await addDoc(collection(db, 'users'), {
				...userData,
				library: [],
			});
			return { id: newUserDoc.id, ...userData };
		} catch (e) {
			if (e.code === 'auth/email-already-in-use') {
				throw rejectWithValue({
					message: 'Account with this email already exists',
					code: 100,
				});
			} else {
				throw rejectWithValue({
					message: 'Unable to sign up, please try again',
					code: 101,
				});
			}
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
			return await createUserData(userCredential.user.uid);
		} catch (e) {
			console.log(e);
			if (
				e.code === 'auth/user-not-found' ||
				e.code === 'auth/wrong-password'
			) {
				throw rejectWithValue({
					message: 'Invalid email/password',
					code: 102,
				});
			} else {
				throw rejectWithValue({
					message: 'Unable to sign in, please try again',
					code: 103,
				});
			}
		}
	}
);

async function createUserData(userUid) {
	const db = getFirestore();
	const userDoc = (
		await getDocs(
			query(
				collection(db, 'users'),
				where('uid', '==', userUid),
				limit(1)
			)
		)
	).docs[0];
	const { library, ...userData } = userDoc.data();
	return { id: userDoc.id, ...userData };
}

export const getUserData = createAsyncThunk(
	'user/getUserData',
	async ({ userUid }, { rejectWithValue }) => {
		try {
			return await createUserData(userUid);
		} catch (e) {
			throw rejectWithValue(e);
		}
	}
);

export const logout = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue }) => {
		try {
			const auth = getAuth();
			await signOut(auth);
		} catch (e) {
			throw rejectWithValue(e);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsAuthenticated(state, action) {
			state.isAuthenticated = action.payload;
		},
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
		[getUserData.pending]: (state, action) => {
			state.loading = true;
		},
		[getUserData.fulfilled]: (state, action) => {
			state.info = action.payload;
			state.isAuthenticated = true;
			state.loading = false;
		},
		[getUserData.rejected]: (state, action) => {
			state.isAuthenticated = false;
			state.loading = false;
		},
		[logout.fulfilled]: (state, action) => {
			state.info = initialState.info;
			state.isAuthenticated = false;
			state.error = initialState.error;
			state.loading = initialState.loading;
		},
		[logout.rejected]: (state, action) => {
			state.error = {
				message: action.payload.message,
				code: action.payload.code,
			};
		},
	},
});

export const { clearError, setIsAuthenticated } = userSlice.actions;

export default userSlice.reducer;
