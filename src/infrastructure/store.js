import { configureStore } from '@reduxjs/toolkit';
import palettesReducer from '../features/paletteList/slices/palettesSlice';
import userReducer from '../features/paletteList/slices/userSlice';
import libraryReducer from '../features/library/slices/librarySlice';
import paletteReducer from '../features/palette/slices/paletteSlice';
import colorsReducer from '../features/createNewPalette/slices/colorsSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
	getUserData,
	setIsAuthenticated,
} from '../features/paletteList/slices/userSlice';

const store = configureStore({
	reducer: {
		palettes: palettesReducer,
		user: userReducer,
		library: libraryReducer,
		palette: paletteReducer,
		colors: colorsReducer,
	},
});

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
	user
		? store.dispatch(getUserData({ userUid: user.uid }))
		: store.dispatch(setIsAuthenticated(false));
});

export default store;
