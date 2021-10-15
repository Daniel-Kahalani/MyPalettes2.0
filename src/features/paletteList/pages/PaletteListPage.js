import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPalettesList } from '../slices/palettesSlice';
import { addPaletteToLibrary } from '../slices/userSlice';
import useToggleState from '../../../hooks/useToggleState';
import Navbar from '../../../components/navbar/Navbar';
import MiniPalette from '../../../components/miniPalette/MiniPalette';
import Snackbar from '../../../components/snackbar/Snackbar';
import { Fade, Grid } from '@mui/material';
import {
	PaletteListContainer,
	PalettesContainer,
} from '../styles/paletteListStyles';

export default function PaletteListPage() {
	const dispatch = useDispatch();
	const { loading, error, list } = useSelector((state) => state.palettes);
	const [snackbarOpen, toggleSnackbarOpen] = useToggleState([false, true]);
	const [snackbarMsg, setSnackbarMsg] = useState('');
	const [snackbarType, setSnackbarType] = useState('');

	const handleIconClick = async (paletteId, paletteName) => {
		const resultAction = await dispatch(addPaletteToLibrary(paletteId));
		if (!addPaletteToLibrary.fulfilled.match(resultAction)) {
			setSnackbarMsg(
				`"${paletteName}" palette was added to your library!`
			);
			setSnackbarType('success');
		} else {
			setSnackbarMsg(
				`Unable to add "${paletteName}" palette to your library, please try again`
			);
			setSnackbarType('error');
		}

		toggleSnackbarOpen();
	};

	useEffect(() => {
		dispatch(getPalettesList());
	}, [dispatch]);

	return (
		<PaletteListContainer>
			<Navbar />
			<PalettesContainer
				sx={{ width: { xs: '50%', sm: '40%', md: '50%' } }}>
				{!loading &&
					(error ? (
						<h1>error</h1>
					) : (
						<Fade in={true} timeout={1500}>
							<Grid
								container
								spacing={5}
								justifyContent='space-between'>
								{list.map((palette) => (
									<Grid
										item
										xs={12}
										md={6}
										lg={4}
										key={palette.id}>
										<MiniPalette
											{...palette}
											handleIconClick={handleIconClick}
										/>
									</Grid>
								))}
							</Grid>
						</Fade>
					))}
			</PalettesContainer>
			<Snackbar
				message={snackbarMsg}
				open={snackbarOpen}
				toggleOpen={toggleSnackbarOpen}
				type={snackbarType}
			/>
		</PaletteListContainer>
	);
}
