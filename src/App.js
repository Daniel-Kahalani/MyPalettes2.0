import React from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import store from './infrastructure/store';
import { Provider } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Navigation from './infrastructure/navigation/Navigation';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: 'AIzaSyCEdvg71GFw_kvqKcF6miTAgQs60ZFEEdA',
	authDomain: 'my-palettes.firebaseapp.com',
	projectId: 'my-palettes',
	storageBucket: 'my-palettes.appspot.com',
	messagingSenderId: '111447204509',
	appId: '1:111447204509:web:7e8803e248287b7eb52a74',
	measurementId: 'G-93G45GFDHB',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
