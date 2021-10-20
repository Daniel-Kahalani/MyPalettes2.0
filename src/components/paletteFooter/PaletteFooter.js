import React from 'react';
import { Emoji } from 'emoji-mart';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export default function PaletteFooter({ name, emoji }) {
	return (
		<Box
			component='footer'
			sx={{
				bgcolor: 'background.paper',
				display: 'flex',
				justifyContent: 'flex-end',
				alignItems: 'center',
				paddingRight: '1rem',
				paddingBottom: '1rem',
			}}>
			<Typography
				variant='subtitle1'
				align='center'
				color='text.secondary'
				component='p'
				sx={{ marginRight: '1rem', fontWeight: 'bold' }}>
				{name}
			</Typography>
			<Emoji emoji={emoji} size={20} set='google' />
		</Box>
	);
}
