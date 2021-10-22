import { Typography, Zoom } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function CopiedAnimation({ backgroundColor, isCopied }) {
	return (
		<Zoom in={isCopied}>
			<Box
				sx={{
					position: 'fixed',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					top: 0,
					left: 0,
					zIndex: 10,
					width: '100%',
					height: '100%',
					backgroundColor: backgroundColor,
				}}>
				<Typography
					variant='h1'
					align='center'
					sx={{
						width: '100%',
						fontWeight: '400',
						margin: '1rem',
						padding: '1rem',
						textShadow: '1px 2px black',
						background: 'rgba(255, 255, 255, 0.2)',
					}}>
					COPIED
				</Typography>
				<Typography variant='h4'>{backgroundColor}</Typography>
			</Box>
		</Zoom>
	);
}
