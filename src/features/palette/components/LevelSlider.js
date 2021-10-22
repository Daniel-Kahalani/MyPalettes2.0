import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLevel } from '../slices/paletteSlice';
import { Slider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function LevelSlider() {
	const { level } = useSelector((state) => state.palette);
	const dispatch = useDispatch();

	return (
		<Box
			sx={{
				width: 400,
				marginLeft: '2rem',
				marginRight: '2rem',
				marginBottom: 0,
			}}>
			<Stack spacing={2} direction='row' alignItems='center'>
				<Typography color='common.black' sx={{ width: '100px' }}>
					Level: {level}
				</Typography>
				<Slider
					aria-label='Format'
					defaultValue={level}
					valueLabelDisplay='off'
					step={100}
					marks
					min={100}
					max={900}
					onChange={(evt, val) => dispatch(setLevel(val))}
				/>
			</Stack>
		</Box>
	);
}
