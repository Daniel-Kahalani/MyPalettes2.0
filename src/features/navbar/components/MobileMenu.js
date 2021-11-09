import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function MobileMenu({
	open,
	toggleOpen,
	anchorEl,
	handleUserFeature,
	handleSignUp,
	handleSignIn,
	handleSignOut,
}) {
	const { isAuthenticated } = useSelector((state) => state.user);
	return (
		<Menu
			sx={{ display: { xs: 'flex', md: 'none' } }}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={open}
			onClose={toggleOpen}>
			<Link
				to='palettes/new'
				component={RouterLink}
				underline='none'
				color='inherit'
				onClick={(e) => {
					toggleOpen();
					handleUserFeature(e, 'palettes/new');
				}}>
				<MenuItem>Create Palette</MenuItem>
			</Link>

			<Link
				to='library'
				component={RouterLink}
				underline='none'
				color='inherit'
				onClick={(e) => {
					toggleOpen();
					handleUserFeature(e, 'library');
				}}>
				<MenuItem>Library</MenuItem>
			</Link>
			{isAuthenticated ? (
				<MenuItem
					onClick={() => {
						toggleOpen();
						handleSignOut();
					}}>
					Logout
				</MenuItem>
			) : (
				<>
					<MenuItem
						onClick={() => {
							toggleOpen();
							handleSignUp();
						}}>
						Sign Up
					</MenuItem>
					<MenuItem
						onClick={() => {
							toggleOpen();
							handleSignIn();
						}}>
						Sign In
					</MenuItem>
				</>
			)}
		</Menu>
	);
}
