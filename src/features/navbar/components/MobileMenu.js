import { Menu, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react';

export default function MobileMenu({ open, toggleOpen, anchorEl }) {
	const { isAuthenticated } = useSelector((state) => state.user);
	return (
		<Menu
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
			{isAuthenticated ? null : (
				<>
					<MenuItem>Create Palette</MenuItem>
					<MenuItem>Library</MenuItem>
					<MenuItem>Sign Up</MenuItem>
					<MenuItem>Sign In</MenuItem>
				</>
			)}
		</Menu>
	);
}
