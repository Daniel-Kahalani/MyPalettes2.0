import React from 'react';
import { useDispatch } from 'react-redux';
import { removeColor } from '../slices/colorsSlice';
import { SortableElement } from 'react-sortable-hoc';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { Typography, Grid } from '@mui/material';
import chroma from 'chroma-js';

const DraggableColorBox = SortableElement(({ color, name }) => {
	const dispatch = useDispatch();
	const textColor =
		chroma.contrast(color, 'white') < 4.5 ? 'grey.700' : 'grey.300';

	return (
		<Grid
			item
			sx={{
				width: {
					xs: '100%',
					sm: '50%',
					md: '25%',
					lg: '20%',
				},
				height: {
					xs: 'auto',
					sm: '10%',
					md: '20%',
					lg: '25%',
				},
			}}
			key={color.name}>
			<Box
				sx={{
					display: 'flex',
					height: '100%',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					backgroundColor: color,
					cursor: 'pointer',
					'&:hover svg': {
						transform: 'scale(1.5)',
					},
				}}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: '0 0.2rem',
					}}>
					<Typography variant='overline' sx={{ color: textColor }}>
						{name}
					</Typography>
					<DeleteIcon
						sx={{
							transition: 'all 0.3s ease-in-out',
							color: textColor,
						}}
						onClick={(e) => dispatch(removeColor({ name }))}
					/>
				</Box>
			</Box>
		</Grid>
	);
});

export default DraggableColorBox;
