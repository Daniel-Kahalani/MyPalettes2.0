import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPalettesList } from '../slices/palettesSlice';
import { addPaletteToLibrary } from '../slices/userSlice';
import useToggleState from '../../../hooks/useToggleState';
import Navbar from '../../../components/navbar/Navbar';
import MiniPalette from '../../../components/miniPalette/MiniPalette';
import {
	PaletteListContainer,
	PalettesContainer,
} from '../styles/paletteListStyles';
import { Fade, Grid } from '@mui/material';

export default function PaletteListPage() {
	const dispatch = useDispatch();
	const { loading, error, list } = useSelector((state) => state.palettes);
	const [snackbarOpen, toggleSnackbarOpen] = useToggleState([false, true]);

	const handleIconClick = async (paletteId) => {
		const resultAction = await dispatch(addPaletteToLibrary(paletteId));
		if (addPaletteToLibrary.fulfilled.match(resultAction)) {
		}
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
			{/* <Snackbar
                msg={`"${name}" palette was added to your library!`}
                open={snackbarOpen}
                toogleOpen={toogleSnackbarOpen} /> */}
		</PaletteListContainer>
	);
}
