import React from 'react';
import { Snackbar as SnackbarNative, Alert } from '@mui/material';

export default function Snackbar({ message, open, toggleOpen, type }) {
	return (
		<SnackbarNative
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			open={open}
			autoHideDuration={3000}
			onClose={toggleOpen}
			message={message}>
			<Alert
				elevation={6}
				variant='filled'
				severity={type}
				onClose={toggleOpen}
				sx={{ width: '100%' }}>
				{message}
			</Alert>
		</SnackbarNative>
	);
}
