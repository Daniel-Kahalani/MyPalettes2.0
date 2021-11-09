import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link } from '@mui/material';
import { Box } from '@mui/system';

export default function Menu({
	handleUserFeature,
	handleSignUp,
	handleSignIn,
	handleSignOut,
}) {
	const { isAuthenticated } = useSelector((state) => state.user);

	return (
		<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
			<Link
				to='palettes/new'
				component={RouterLink}
				underline='none'
				color='common.white'
				onClick={(e) => handleUserFeature(e, 'palettes/new')}>
				<Button sx={{ color: 'common.white' }}>Create Palette</Button>
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
				<Button sx={{ color: 'common.white' }} onClick={handleSignOut}>
					Logout
				</Button>
			) : (
				<>
					<Button
						sx={{ color: 'common.white' }}
						onClick={handleSignUp}>
						Sign Up
					</Button>
					<Button
						sx={{ color: 'common.white' }}
						onClick={handleSignIn}>
						Sign In
					</Button>
				</>
			)}
		</Box>
	);
}
