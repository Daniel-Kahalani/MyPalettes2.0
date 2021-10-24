import React from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import PaletteListPage from '../../features/paletteList/pages/PaletteListPage';
import LibraryPage from '../../features/library/pages/LibraryPage';
import PalettePage from '../../features/palette/pages/PalettePage';
import ColorShadesPage from '../../features/palette/pages/ColorShadesPage';
import CreateNewPalettePage from '../../features/createNewPalette/pages/CreateNewPalettePage';

export default function Navigation() {
	const location = useLocation();

	return (
		<Switch location={location}>
			<Route exact path='/' component={PaletteListPage} />
			<Route exact path='/library' component={LibraryPage} />
			<Route path='/palettes/new' component={CreateNewPalettePage} />
			<Route exact path='/palettes/:id' component={PalettePage} />
			<Route
				exact
				path='/palettes/:paletteId/:colorId'
				component={ColorShadesPage}
			/>
			<Route path='*'>
				<Redirect to='/' />
			</Route>
		</Switch>
	);
}
