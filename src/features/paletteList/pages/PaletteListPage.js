import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPalettesList } from '../slices/palettesSlice';
import { addPaletteToLibrary } from '../../library/slices/librarySlice';
import useToggleState from '../../../hooks/useToggleState';
import { SNACKBAR_TYPE } from '../../../utils/constants';
import Navbar from '../../navbar';
import ErrorAnimation from '../../../components/errorAnimation/ErrorAnimation';
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
	const [snackbarType, setSnackbarType] = useState(SNACKBAR_TYPE.success);
	const handleIconClick = async (paletteId, paletteName) => {
		const resultAction = await dispatch(addPaletteToLibrary(paletteId));
		if (addPaletteToLibrary.fulfilled.match(resultAction)) {
			setSnackbarMsg(
				`"${paletteName}" palette was added to your library!`
			);
			setSnackbarType(SNACKBAR_TYPE.success);
		} else {
			setSnackbarMsg(
				`Unable to add "${paletteName}" palette to your library, please try again`
			);
			setSnackbarType(SNACKBAR_TYPE.error);
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
						<ErrorAnimation />
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
											palette={palette}
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
