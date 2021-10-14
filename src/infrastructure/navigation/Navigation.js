import React from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import PaletteListPage from '../../features/paletteList/pages/PaletteListPage';

export default function Navigation() {
	const location = useLocation();

	return (
		<Switch location={location}>
			<Route exact path='/' component={PaletteListPage} />
			{/* <Route path='/palettes/new' component={NewPaletteForm} />
			<Route
				exact
				path='/library'
				component={<PaletteList type='LIBRARY' />}
			/>
			<Route exact path='/palettes/:id' component={Palette} />
			<Route
				exact
				path='/palettes/:paletteId/:colorId'
				component={SingleColorPalette}
			/> */}
			<Route path='*'>
				<Redirect to='/' />
			</Route>
		</Switch>
	);
}
