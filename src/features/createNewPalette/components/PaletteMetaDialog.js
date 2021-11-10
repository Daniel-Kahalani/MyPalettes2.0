import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	addNewPalette,
	paletteNameValid,
	resetColors,
} from '../slices/colorsSlice';
import { addPaletteToLibrary } from '../../library/slices/librarySlice';
import useInputState from '../../../hooks/useInputState';
import useToggleState from '../../../hooks/useToggleState';
import { Picker } from 'emoji-mart';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import 'emoji-mart/css/emoji-mart.css';

export default function PaletteMetaDialog({ open, toggleOpen }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const { list: colors } = useSelector((state) => state.colors);
	const steps = ['Choose a Name', 'Pick an Emoji'];
	const [errorText, setErrorText] = useState('');
	const [activeStep, toggleStep] = useToggleState(steps);
	const [newPaletteName, handlePalleteNameChange] = useInputState('');

	const handleSubmit = async (emoji) => {
		const resultAction = await dispatch(
			addNewPalette({
				name: newPaletteName,
				colors: colors,
				emoji: emoji.colons,
			})
		);
		if (addNewPalette.fulfilled.match(resultAction)) {
			await dispatch(addPaletteToLibrary(resultAction.payload));
			dispatch(resetColors());
			history.push('/library');
		}
	};

	const handleNext = async () => {
		if (newPaletteName === '') {
			setErrorText('Enter a palette name');
		} else {
			const resultAction = await dispatch(
				paletteNameValid(newPaletteName)
			);
			if (!paletteNameValid.fulfilled.match(resultAction)) {
				setErrorText('Palette name must be unique');
			} else {
				toggleStep();
				setErrorText('');
			}
		}
	};

	return (
		<Dialog open={open} onClose={toggleOpen}>
			<DialogTitle id='form-dialog-title'>
				<Typography variant='h4' align='center'>
					NEW PALETTE
				</Typography>
				<Stepper activeStep={steps.indexOf(activeStep)} sx={{ pt: 3 }}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
			</DialogTitle>
			<DialogContent>
				{steps.indexOf(activeStep) === 0 ? (
					<>
						<DialogContentText>
							Please enter a name for your new palette. Make sure
							its unique!
						</DialogContentText>
						<FormControl
							error={errorText ? true : false}
							variant='standard'
							fullWidth
							margin='normal'>
							<InputLabel htmlFor='palette-name'>
								Palette Name
							</InputLabel>
							<Input
								id='palette-name'
								value={newPaletteName}
								onChange={handlePalleteNameChange}
								aria-describedby='palette-name-text'
							/>
							<FormHelperText id='palette-name-text'>
								{errorText ? errorText : ' '}
							</FormHelperText>
						</FormControl>
					</>
				) : (
					<Picker
						onSelect={handleSubmit}
						title='Pick a Palette Emoji'
						set='google'
					/>
				)}
			</DialogContent>
			<DialogActions>
				{steps.indexOf(activeStep) === 0 ? (
					<Button
						variant='contained'
						color='primary'
						onClick={handleNext}>
						Next
					</Button>
				) : (
					<Button onClick={toggleStep} color='primary'>
						Back
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
}
