import React from 'react';
import { MAX_COLORS_IN_PALETTE } from '../../../utils/constants';

import ColorPickerForm from './ColorPickerForm';
import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function DrawerContent({ colors, setColors }) {
	const isPaletteFull = MAX_COLORS_IN_PALETTE === colors.length;

	const addRandomColor = (e) => {};

	const clearColors = (e) => {};

	return (
		<Container
			sx={{
				paddingTop: '1rem',
				display: 'flex',
				flexDirection: 'column',
			}}>
			<Typography variant='h4' gutterBottom sx={{ alignSelf: 'center' }}>
				Design Your Palette
			</Typography>
			<Box
				sx={{
					display: 'flex',
					marginBottom: '1rem',
				}}>
				<Button
					variant='contained'
					color='secondary'
					size='large'
					fullWidth
					onClick={clearColors}>
					Clear Palette
				</Button>
				<Button
					variant='contained'
					color='primary'
					fullWidth
					size='large'
					onClick={addRandomColor}
					disabled={isPaletteFull}>
					Random Color
				</Button>
			</Box>
			<ColorPickerForm isPaletteFull={isPaletteFull} colors={colors} />
		</Container>
	);
}
