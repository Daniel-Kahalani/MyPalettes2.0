import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
	const history = useHistory();
	const { list } = useSelector((state) => state.colors);
	const { isAuthenticated } = useSelector((state) => state.user);
	const [open, toggleOpen] = useToggleState([true, false]);

	const onSortEnd = ({ oldIndex, newIndex }) => {
		dispatch(switchColorsIndex({ oldIndex, newIndex, colors: list }));
	};

	useEffect(() => {
		if (!isAuthenticated) history.replace('/');
	}, [dispatch, history, isAuthenticated]);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			{isAuthenticated && (
				<>
					<CreateNewPaletteNavbar
						open={open}
						toggleOpen={toggleOpen}
					/>
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
				</>
			)}
		</Box>
	);
}
