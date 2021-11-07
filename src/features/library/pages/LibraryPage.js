import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	removePaletteToLibrary,
	getLibraryPalettesList,
} from '../slices/librarySlice';
import useToggleState from '../../../hooks/useToggleState';
import { SNACKBAR_TYPE } from '../../../utils/constants';
import RemovePaletteDialog from '../components/RemovePaletteDialog';
import EmptyAnimation from '../components/EmptyAnimation';
import Navbar from '../../navbar';
import ErrorAnimation from '../../../components/errorAnimation/ErrorAnimation';
import MiniPalette from '../../../components/miniPalette/MiniPalette';
import Snackbar from '../../../components/snackbar/Snackbar';
import { Fade, Grid } from '@mui/material';
import { LibraryContainer, PalettesContainer } from '../styles/libraryStyles';

export default function LibraryPage() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state) => state.user);
	const { loading, error, list } = useSelector((state) => state.library);
	const [removePaletteDialogOpen, toggleRemovePaletteDialogOpen] =
		useToggleState([false, true]);
	const [paletteToRemove, setPaletteToRemove] = useState({
		id: null,
		name: null,
	});
	const [snackbarOpen, toggleSnackbarOpen] = useToggleState([false, true]);
	const [snackbarMsg, setSnackbarMsg] = useState('');
	const [snackbarType, setSnackbarType] = useState(SNACKBAR_TYPE.success);

	const handleIconClick = async (paletteId, paletteName) => {
		setPaletteToRemove({ id: paletteId, name: paletteName });
		toggleRemovePaletteDialogOpen();
	};

	const handleRemoveFeedback = (resultAction) => {
		if (removePaletteToLibrary.fulfilled.match(resultAction)) {
			setSnackbarType(SNACKBAR_TYPE.success);
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
		if (isAuthenticated) dispatch(getLibraryPalettesList());
		else history.replace('/');
	}, [dispatch, history, isAuthenticated]);

	return (
		<LibraryContainer>
			<Navbar />
			{isAuthenticated && (
				<>
					<PalettesContainer
						sx={{ width: { xs: '50%', sm: '40%', md: '50%' } }}>
						{!loading &&
							list !== null &&
							(error ? (
								<ErrorAnimation />
							) : list.length > 0 ? (
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
													handleIconClick={
														handleIconClick
													}
													isDeleteable={true}
												/>
											</Grid>
										))}
									</Grid>
								</Fade>
							) : (
								<EmptyAnimation />
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
				</>
			)}
		</LibraryContainer>
	);
}
