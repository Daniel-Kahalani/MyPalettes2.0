import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './slices/userSlice';
import { resetColors } from '../../features/createNewPalette/slices/colorsSlice';
import { resetLibrary } from '../../features/library/slices/librarySlice';
import { resetPalette } from '../../features/palette/slices/paletteSlice';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import useToggleState from '../../hooks/useToggleState';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import RegisterDialog from './components/RegisterDialog';
import LoginDialog from './components/LoginDialog';
import { Box } from '@mui/system';
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import MobileMenu from './components/MobileMenu';
export default function Navbar() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state) => state.user);
	const [redirect, serRedirect] = useState(null);
	const [loginDialog, toggleLoginDialog] = useToggleState([false, true]);
	const [registerDialog, toggleRegisterDialog] = useToggleState([
		false,
		true,
	]);
	const [mobileMenu, toggleMobileMenu] = useToggleState([false, true]);
	const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

	const handleUserFeature = (e, redirectToPage) => {
		if (!isAuthenticated) {
			serRedirect(redirectToPage);
			toggleLoginDialog();
			e.preventDefault();
		}
	};

	const handleSignOut = async () => {
		dispatch(resetColors());
		dispatch(resetLibrary());
		dispatch(resetPalette());
		await dispatch(logout());
		history.push('/');
	};

	const handleSignIn = async () => {
		serRedirect(null);
		toggleLoginDialog();
	};

	const handleSignUp = async () => {
		serRedirect(null);
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
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<Link
							to='palettes/new'
							component={RouterLink}
							underline='none'
							color='common.white'
							onClick={(e) =>
								handleUserFeature(e, 'palettes/new')
							}>
							<Button sx={{ color: 'common.white' }}>
								Create Palette
							</Button>
						</Link>

						<Link
							to='library'
							component={RouterLink}
							underline='none'
							color='primary'
							onClick={(e) => handleUserFeature(e, 'library')}>
							<Button sx={{ color: 'common.white' }}>
								Library
							</Button>
						</Link>
						{isAuthenticated ? (
							<Button
								sx={{ color: 'common.white' }}
								onClick={handleSignOut}>
								Logout
							</Button>
						) : (
							<>
								<Button
									sx={{ color: 'common.white' }}
									onClick={handleSignUp}>
									SIGN UP
								</Button>
								<Button
									sx={{ color: 'common.white' }}
									onClick={handleSignIn}>
									SIGN IN
								</Button>
							</>
						)}
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<MobileMenu
				open={mobileMenu}
				toggleOpen={toggleMobileMenu}
				anchorEl={mobileAnchorEl}
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
