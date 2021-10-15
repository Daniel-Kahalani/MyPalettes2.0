import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPalettesList } from '../slices/palettesSlice';
import { addPaletteToLibrary } from '../../library/slices/librarySlice';
import useToggleState from '../../../hooks/useToggleState';
import animationData from '../../../assets/sad-face.json';
import Lottie from 'react-lottie';
import Navbar from '../../../components/navbar/Navbar';
import MiniPalette from '../../../components/miniPalette/MiniPalette';
import Snackbar from '../../../components/snackbar/Snackbar';
import { Fade, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
	PaletteListContainer,
	PalettesContainer,
} from '../styles/paletteListStyles';

export default function PaletteListPage() {
	const dispatch = useDispatch();
	const { loading, error, list } = useSelector((state) => state.palettes);
	const [snackbarOpen, toggleSnackbarOpen] = useToggleState([false, true]);
	const [snackbarMsg, setSnackbarMsg] = useState('');
	const [snackbarType, setSnackbarType] = useState('success');

	const handleIconClick = async (paletteId, paletteName) => {
		const resultAction = await dispatch(addPaletteToLibrary(paletteId));
		if (addPaletteToLibrary.fulfilled.match(resultAction)) {
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
											isDeleteable={false}
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
