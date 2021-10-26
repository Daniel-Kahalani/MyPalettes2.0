import React from 'react';
import { useSelector } from 'react-redux';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from '../components/DraggableColorBox';
import { Grid } from '@mui/material';

const DraggableColorList = SortableContainer(() => {
	const { list } = useSelector((state) => state.colors);

	return (
		<Grid
			container
			spacing={0}
			sx={{
				display: 'flex',
				flexGrow: 1,
				height: '100%',
				alignContent: 'start',
			}}>
			{list.map((color, index) => (
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
							xs: '5%',
							sm: '10%',
							md: '20%',
							lg: '25%',
						},
					}}
					key={color.name}>
					<DraggableColorBox
						index={index}
						color={color.color}
						name={color.name}
					/>
				</Grid>
			))}
		</Grid>
	);
});

export default DraggableColorList;
