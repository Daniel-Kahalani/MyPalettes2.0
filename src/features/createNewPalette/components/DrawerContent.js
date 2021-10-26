import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearList, addRandomColor } from '../slices/colorsSlice';
import { MAX_COLORS_IN_PALETTE } from '../../../utils/constants';
import ColorPickerForm from './ColorPickerForm';
import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function DrawerContent() {
	const dispatch = useDispatch();
	const { list } = useSelector((state) => state.colors);
	const isPaletteFull = MAX_COLORS_IN_PALETTE === list.length;

	const handleRandomColor = (e) => {
		dispatch(addRandomColor());
	};

	const clearColors = (e) => {
		dispatch(clearList());
	};

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
					onClick={handleRandomColor}
					disabled={isPaletteFull}>
					Random Color
				</Button>
			</Box>
			<ColorPickerForm isPaletteFull={isPaletteFull} />
		</Container>
	);
}
