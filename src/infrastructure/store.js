import { configureStore } from '@reduxjs/toolkit';
import palettesReducer from '../features/paletteList/slices/palettesSlice';
import userReducer from '../features/paletteList/slices/userSlice';

const store = configureStore({
	reducer: {
		palettes: palettesReducer,
		user: userReducer,
	},
});

export default store;
