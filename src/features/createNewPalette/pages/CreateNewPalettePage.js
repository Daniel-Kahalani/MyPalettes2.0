import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchColorsIndex } from '../slices/colorsSlice';
import useToggleState from '../../../hooks/useToggleState';
import CreateNewPaletteNavbar from '../components/CreateNewPaletteNavbar';
import DraggableColorList from '../components/DraggableColorList';
import DrawerContent from '../components/DrawerContent';
import { Box, Divider, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Drawer, DrawerHeader, Main } from '../styles/createNewPaletteStyles';

export default function CreateNewPalettePage() {
	const dispatch = useDispatch();
	const { list } = useSelector((state) => state.colors);
	const [open, toggleOpen] = useToggleState([true, false]);

	const onSortEnd = (oldIndex, newIndex) => {
		dispatch(switchColorsIndex({ oldIndex, newIndex, colors: list }));
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<CreateNewPaletteNavbar open={open} toggleOpen={toggleOpen} />
			<Drawer variant='persistent' anchor='left' open={open}>
				<DrawerHeader>
					<IconButton onClick={toggleOpen}>
						<ChevronLeftIcon />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<DrawerContent />
			</Drawer>
			<Main open={open}>
				<DraggableColorList
					axis='xy'
					onSortEnd={onSortEnd}
					distance={20}
				/>
			</Main>
		</Box>
	);
}
