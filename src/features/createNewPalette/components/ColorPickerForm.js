import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewColor } from '../slices/colorsSlice';
import { MAX_COLORS_IN_PALETTE } from '../../../utils/constants';
import useInputState from '../../../hooks/useInputState';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { Box } from '@mui/system';
import { AddColorButton } from '../styles/createNewPaletteStyles';

export default function ColorPickerForm() {
	const dispatch = useDispatch();
	const { list } = useSelector((state) => state.colors);
	const isPaletteFull = MAX_COLORS_IN_PALETTE === list.length;

	const [currentColor, setCurrentColor] = useState('teal');
	const [newColorName, handleColorNameChange, resetColorName] =
		useInputState('');

	const handleColorChange = (newColor) => {
		const { r, g, b, a } = newColor.rgb;
		setCurrentColor(`rgba(${r},${g},${b},${a})`);
	};

	const handleColorSubmit = (e) => {
		dispatch(addNewColor({ color: currentColor, name: newColorName }));
		resetColorName();
	};

	useEffect(() => {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
			return list.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			);
		});
		ValidatorForm.addValidationRule('isColorUnique', (value) => {
			return list.every(({ color }) => color !== currentColor);
		});
	});

	return (
		<Box sx={{ width: '100%' }}>
			<ChromePicker
				width='100%'
				color={currentColor}
				onChange={handleColorChange}
				disableAlpha={false}
				style={{ marginTop: '2rem' }}
			/>
			<ValidatorForm onSubmit={handleColorSubmit} instantValidate={false}>
				<TextValidator
					name='newColorName'
					placeholder='Color Name'
					variant='filled'
					margin='normal'
					value={newColorName}
					onChange={handleColorNameChange}
					validators={[
						'required',
						'isColorNameUnique',
						'isColorUnique',
					]}
					fullWidth
					errorMessages={[
						'Enter a color name',
						'Color name must be unique',
						'Color already used',
					]}
				/>
				<AddColorButton
					variant='contained'
					type='submit'
					disabled={isPaletteFull}
					currentcolor={isPaletteFull ? 'gray' : currentColor}>
					{isPaletteFull ? 'Palette Full' : 'Add Color'}
				</AddColorButton>
			</ValidatorForm>
		</Box>
	);
}
