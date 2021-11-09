import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './slices/userSlice';
import { resetColors } from '../../features/createNewPalette/slices/colorsSlice';
import { resetLibrary } from '../../features/library/slices/librarySlice';
import { resetPalette } from '../../features/palette/slices/paletteSlice';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import useToggleState from '../../hooks/useToggleState';
import MobileMenu from './components/MobileMenu';
import Menu from './components/Menu';
import RegisterDialog from './components/RegisterDialog';
import LoginDialog from './components/LoginDialog';
import { AppBar, Toolbar, Typography, Link, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import MoreIcon from '@mui/icons-material/MoreVert';

export default function Navbar() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state) => state.user);
	const [redirect, setRedirect] = useState(null);
	const [loginDialog, toggleLoginDialog] = useToggleState([false, true]);
	const [registerDialog, toggleRegisterDialog] = useToggleState([
		false,
		true,
	]);
	const [mobileMenu, toggleMobileMenu] = useToggleState([false, true]);
	const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

	const handleUserFeature = (e, redirectToPage) => {
		if (!isAuthenticated) {
			setRedirect(redirectToPage);
			toggleLoginDialog();
			e.preventDefault();
		}
	};

	const handleSignOut = async () => {
		await dispatch(logout());
		history.push('/');
		dispatch(resetColors());
		dispatch(resetLibrary());
		dispatch(resetPalette());
	};

	const handleSignIn = async () => {
		setRedirect(null);
		toggleLoginDialog();
	};

	const handleSignUp = async () => {
		setRedirect(null);
		toggleRegisterDialog();
	};

	const switchDialog = () => {
		toggleLoginDialog();
		toggleRegisterDialog();
	};

	const handleMobileMenuOpen = (event) => {
		toggleMobileMenu();
		setMobileAnchorEl(event.currentTarget);
	};

	return (
		<Box
			sx={{
				marginBottom: '2rem',
			}}>
			<AppBar position='static' color='transparent'>
				<Toolbar>
					<Typography variant='h6' sx={{ fontSize: '2rem' }}>
						<Link
							component={RouterLink}
							to='/'
							underline='none'
							color='common.white'>
							My Palettes
						</Link>
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Menu
						handleUserFeature={handleUserFeature}
						handleSignUp={handleSignUp}
						handleSignIn={handleSignIn}
						handleSignOut={handleSignOut}
					/>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							sx={{ color: 'common.white' }}>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<MobileMenu
				open={mobileMenu}
				toggleOpen={toggleMobileMenu}
				anchorEl={mobileAnchorEl}
				handleUserFeature={handleUserFeature}
				handleSignUp={handleSignUp}
				handleSignIn={handleSignIn}
				handleSignOut={handleSignOut}
			/>
			<RegisterDialog
				openDialog={registerDialog}
				toogleDialog={toggleRegisterDialog}
				switchToLogin={switchDialog}
				redirect={redirect}
			/>
			<LoginDialog
				openDialog={loginDialog}
				toogleDialog={toggleLoginDialog}
				switchToRegister={switchDialog}
				redirect={redirect}
			/>
		</Box>
	);
}
