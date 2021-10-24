import React, { useState } from 'react';
import useToggleState from '../../../hooks/useToggleState';
import CreateNewPaletteNavbar from '../components/CreateNewPaletteNavbar';
import { Box, Divider, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Drawer, DrawerHeader } from '../styles/createNewPaletteStyles';
import DrawerContent from '../components/DrawerContent';
// import DraggableColorList from './DraggableColorList';
export default function CreateNewPalettePage() {
	const [open, toggleOpen] = useToggleState([true, false]);
	const [colors, setColors] = useState([]);

	const onSortEnd = ({ oldIndex, newIndex }) => {
		// colorsDispatch({
		// 	type: 'MOVE',
		// 	oldIndex: oldIndex,
		// 	newIndex: newIndex,
		// });
	};

	return (
		<Box sx={{ dispaly: 'flex' }}>
			<CreateNewPaletteNavbar open={open} toggleOpen={toggleOpen} />
			<Drawer open={open}>
				<DrawerHeader>
					<IconButton onClick={toggleOpen}>
						<ChevronLeftIcon />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<DrawerContent colors={colors} setColors={setColors} />
			</Drawer>
			{/* <main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}>
				<div className={classes.drawerHeader} />
				<DraggableColorList
					axis='xy'
					onSortEnd={onSortEnd}
					distance={20}
				/>
			</main>  */}
		</Box>
	);
}
