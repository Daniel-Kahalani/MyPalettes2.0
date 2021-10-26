import { configureStore } from '@reduxjs/toolkit';
import palettesReducer from '../features/paletteList/slices/palettesSlice';
import userReducer from '../features/paletteList/slices/userSlice';
import libraryReducer from '../features/library/slices/librarySlice';
import paletteReducer from '../features/palette/slices/paletteSlice';
import colorsReducer from '../features/createNewPalette/slices/colorsSlice';

const store = configureStore({
	reducer: {
		palettes: palettesReducer,
		user: userReducer,
		library: libraryReducer,
		palette: paletteReducer,
		colors: colorsReducer,
	},
});

export default store;
