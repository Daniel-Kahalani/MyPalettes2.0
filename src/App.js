import React from 'react';
// import { ThemeProvider } from '@mui/material/styles';
import './infrastructure/firebase';
import store from './infrastructure/store';
import { Provider } from 'react-redux';
import Navigation from './infrastructure/navigation/Navigation';

export default function App() {
	return (
		<Provider store={store}>
			<Navigation />
		</Provider>
	);
}
