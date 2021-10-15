import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	removePaletteToLibrary,
	getLibraryPalettesList,
} from '../slices/librarySlice';
import useToggleState from '../../../hooks/useToggleState';
import animationData from '../../../assets/sad-face.json';
import Lottie from 'react-lottie';
import RemovePaletteDialog from '../components/RemovePaletteDialog';
import Navbar from '../../../components/navbar/Navbar';
import MiniPalette from '../../../components/miniPalette/MiniPalette';
import Snackbar from '../../../components/snackbar/Snackbar';
import { Fade, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { LibraryContainer, PalettesContainer } from '../styles/libraryStyles';

export default function LibraryPage() {
	const dispatch = useDispatch();
	const { loading, error, list } = useSelector((state) => state.library);
	const [removePaletteDialogOpen, toggleRemovePaletteDialogOpen] =
		useToggleState([false, true]);
	const [paletteToRemove, setPaletteToRemove] = useState({
		id: null,
		name: null,
	});
	const [snackbarOpen, toggleSnackbarOpen] = useToggleState([false, true]);
	const [snackbarMsg, setSnackbarMsg] = useState('');
	const [snackbarType, setSnackbarType] = useState('success');

	const handleIconClick = async (paletteId, paletteName) => {
		setPaletteToRemove({ id: paletteId, name: paletteName });
		toggleRemovePaletteDialogOpen();
	};

	const handleRemoveFeedback = (resultAction) => {
		if (removePaletteToLibrary.fulfilled.match(resultAction)) {
			setSnackbarType('success');
			setSnackbarMsg(
				`"${paletteToRemove.name}" palette was remove from your library!`
			);
		} else {
			setSnackbarMsg(
				`Unable to remove "${paletteToRemove.name}" palette from your library, please try again`
			);
			setSnackbarType('error');
		}
		toggleSnackbarOpen();
	};

	useEffect(() => {
		dispatch(getLibraryPalettesList());
	}, [dispatch]);

	return (
		<LibraryContainer>
			<Navbar />
			<PalettesContainer
				sx={{ width: { xs: '50%', sm: '40%', md: '50%' } }}>
				{!loading &&
					(error ? (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Lottie
								options={{
									loop: false,
									autoplay: true,
									animationData: animationData,
									rendererSettings: {
										preserveAspectRatio: 'xMidYMid slice',
									},
								}}
								height={400}
								width={400}
							/>
							<Typography variant='h3'>
								Something went wrong,
							</Typography>
							<Typography variant='h3'>
								please try to refresh
							</Typography>
						</Box>
					) : (
						<Fade in={true} timeout={1500}>
							<Grid
								container
								spacing={5}
								justifyContent='flex-start'>
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
											isDeleteable={true}
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
			<RemovePaletteDialog
				open={removePaletteDialogOpen}
				toggleOpen={toggleRemovePaletteDialogOpen}
				paletteId={paletteToRemove.id}
				handleRemoveFeedback={handleRemoveFeedback}
			/>
		</LibraryContainer>
	);
}
