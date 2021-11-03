import React from 'react';
import { useLocation } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
import './infrastructure/firebase';
import store from './infrastructure/store';
import { Provider } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Navigation from './infrastructure/navigation/Navigation';

export default function App() {
	const location = useLocation();

	return (
		<Provider store={store}>
			<TransitionGroup>
				<CSSTransition key={location.key} timeout={500}>
					<Navigation />
				</CSSTransition>
			</TransitionGroup>
		</Provider>
	);
}
