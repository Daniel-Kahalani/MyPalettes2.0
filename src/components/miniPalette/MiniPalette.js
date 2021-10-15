import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/material';
import { Emoji } from 'emoji-mart';
import {
	MiniPaletteContainer,
	DeleteIcon,
	FavoriteIcon,
	MiniColor,
	PaletteTitle,
} from './miniPaletteStyles';

export default function MiniPalette({
	id,
	colors,
	name,
	emoji,
	handleIconClick,
	openDeleteDialog,
}) {
	const { isAuthenticated } = useSelector((state) => state.user);
	const history = useHistory();
	const isDeleteable = openDeleteDialog ? true : false;

	const onIconClick = (e) => {
		e.stopPropagation();
		handleIconClick(id);
	};

	const goToPalette = () => {
		history.push(`palettes/${id}`);
	};

	return (
		<MiniPaletteContainer onClick={goToPalette}>
			{isDeleteable ? (
				<DeleteIcon onClick={onIconClick} />
			) : (
				isAuthenticated && <FavoriteIcon onClick={onIconClick} />
			)}
			<Box
				sx={{
					backgroundColor: '#dae1e4',
					height: '150px',
					width: '100%',
					borderRadius: '5px',
					overflow: 'hidden',
				}}>
				{colors.map((color) => (
					<MiniColor
						sx={{ backgroundColor: color.color }}
						key={color.name}
					/>
				))}
			</Box>
			<PaletteTitle variant='body1'>
				{name}
				<Emoji emoji={emoji} size={20} set='google' />
			</PaletteTitle>
		</MiniPaletteContainer>
	);
}
