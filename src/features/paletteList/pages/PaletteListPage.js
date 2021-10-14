import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useToogleState from '../../../hooks/useToogleState';
import { getPalettesList } from '../slices/palettesSlice';
import Navbar from '../../../components/navbar/Navbar';
import {
	PaletteListContainer,
	PalettesContainer,
} from '../styles/paletteListStyles';
// import { SIGN_UP, SIGN_IN } from '../../utils/constants';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import MiniPalette from './MiniPalette';
// import SignForm from './SignForm';
// import PaletteListNavbar from './PaletteListNavbar';
// import DeletePaletteDialog from './DeletePaletteDialog';
// import useStyles from '../../styles/paletteList/PaletteListStyles';

export default function PaletteListPage() {
	const { loading, error, list } = useSelector((state) => state.palettes);
	const dispatch = useDispatch();
	const location = useLocation();
	const [paletteToDelete, setPaletteToDelete] = useState(null);
	const [openDelete, toogleOpenDelete] = useToogleState([false, true]);
	const [signUp, toogleSignUp] = useToogleState([false, true]);
	const [signIn, toogleSignIn] = useToogleState([false, true]);

	const openDeleteDialog = (paletteID) => {
		setPaletteToDelete(paletteID);
		toogleOpenDelete();
	};

	useEffect(() => {
		dispatch(getPalettesList());
	}, [dispatch]);

	return (
		<PaletteListContainer>
			<Navbar />
			<PalettesContainer>
				{/* <TransitionGroup className={classes.palettes}>
					{list.length > 0
						? list.map((palette) => (
								<CSSTransition
									key={palette._id}
									classNames='fade'
									timeout={500}>
									<MiniPalette
										{...palette}
										key={palette._id}
										openDeleteDialog={openDeleteDialog}
									/>
								</CSSTransition>
						  ))
						: null}
				</TransitionGroup> */}
			</PalettesContainer>
			{/* <SignForm
				open={signUp || signIn}
				toogleOpen={signUp ? toogleSignUp : toogleSignIn}
				type={signUp ? SIGN_UP : SIGN_IN}
			/>
			<DeletePaletteDialog
				open={openDelete}
				paletteToDelete={paletteToDelete}
				toogleOpen={toogleOpenDelete}
			/> */}
		</PaletteListContainer>
	);
}
