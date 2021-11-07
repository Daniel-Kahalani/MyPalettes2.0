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
				<DraggableColorBox
					key={color.name}
					index={index}
					color={color.color}
					name={color.name}
				/>
			))}
		</Grid>
	);
});

export default DraggableColorList;
