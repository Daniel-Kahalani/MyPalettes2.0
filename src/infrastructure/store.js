import { configureStore } from '@reduxjs/toolkit';
import palettesReducer from '../features/paletteList/slices/palettesSlice';
import userReducer from '../features/paletteList/slices/userSlice';
import libraryReducer from '../features/library/slices/librarySlice';
import paletteReducer from '../features/palette/slices/paletteSlice';

const store = configureStore({
	reducer: {
		palettes: palettesReducer,
		user: userReducer,
		library: libraryReducer,
		palette: paletteReducer,
	},
});

export default store;
