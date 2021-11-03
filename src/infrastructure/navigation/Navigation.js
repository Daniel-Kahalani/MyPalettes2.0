import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import PaletteListPage from '../../features/paletteList/pages/PaletteListPage';
import LibraryPage from '../../features/library/pages/LibraryPage';
import PalettePage from '../../features/palette/pages/PalettePage';
import ColorShadesPage from '../../features/palette/pages/ColorShadesPage';
import CreateNewPalettePage from '../../features/createNewPalette/pages/CreateNewPalettePage';
import { Box, Fade } from '@mui/material';

const routes = [
	{ path: '/', Component: PaletteListPage },
	{ path: '/library', Component: LibraryPage },
	{ path: '/palettes/new', Component: CreateNewPalettePage },
	{ path: '/palettes/:id', Component: PalettePage },
	{ path: '/palettes/:paletteId/:colorId', Component: ColorShadesPage },
];

export default function Navigation() {
	const location = useLocation();
	const { isAuthenticated } = useSelector((state) => state.user);

	return (
		<>
			{isAuthenticated !== null ? (
				<Switch location={location}>
					{routes.map(({ path, Component }) => (
						<Route key={path} exact path={path}>
							{({ match }) => (
								<Fade in={true} timeout={700}>
									<Box>
										<Component />
									</Box>
								</Fade>
							)}
						</Route>
					))}
					<Route path='*'>
						<Redirect to='/' />
					</Route>
				</Switch>
			) : null}
		</>
	);
}
