import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/paletteList/slices/userSlice';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import useToggleState from '../../hooks/useToggleState';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import RegisterDialog from '../registerDialog/RegisterDialog';
import LoginDialog from '../loginDialog/LoginDialog';
import { Box } from '@mui/system';

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

	const handleUserFeature = (e, redirectToPage) => {
		if (!isAuthenticated) {
			serRedirect(redirectToPage);
			toggleLoginDialog();
			e.preventDefault();
		}
	};

	const handleSignOut = async () => {
		await dispatch(logout());
		history.push('/');
	};

	const switchDialog = () => {
		toggleLoginDialog();
		toggleRegisterDialog();
	};

	return (
		<Box
			sx={{
				marginBottom: '2rem',
			}}>
			<AppBar position='static' color='transparent'>
				<Toolbar sx={{ flexWrap: 'wrap' }}>
					<Typography
						variant='h6'
						sx={{ flexGrow: 1, fontSize: '2rem' }}>
						<Link
							component={RouterLink}
							to='/'
							underline='none'
							color='common.white'>
							My Palettes
						</Link>
					</Typography>
					<Link
						to='palettes/new'
						component={RouterLink}
						underline='none'
						color='common.white'
						onClick={(e) => handleUserFeature(e, 'palettes/new')}>
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
						<Button sx={{ color: 'common.white' }}>Library</Button>
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
								onClick={toggleRegisterDialog}>
								SIGN UP
							</Button>
							<Button
								sx={{ color: 'common.white' }}
								onClick={toggleLoginDialog}>
								SIGN IN
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
			{registerDialog && (
				<RegisterDialog
					toogleDialog={toggleRegisterDialog}
					switchToLogin={switchDialog}
					redirect={redirect}
				/>
			)}
			{loginDialog && (
				<LoginDialog
					toogleDialog={toggleLoginDialog}
					switchToLogin={switchDialog}
					redirect={redirect}
				/>
			)}
		</Box>
	);
}
