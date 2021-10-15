import React from 'react';
import { useDispatch } from 'react-redux';
import { removePaletteToLibrary } from '../slices/librarySlice';
import {
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export default function RemovePaletteDialog({
	open,
	toggleOpen,
	paletteId,
	handleRemoveFeedback,
}) {
	const dispatch = useDispatch();

	const handleRemovePalette = async () => {
		const resultAction = await dispatch(removePaletteToLibrary(paletteId));
		toggleOpen();
		handleRemoveFeedback(resultAction);
	};

	return (
		<Dialog
			open={open}
			onClose={toggleOpen}
			aria-labelledby='delete-dialog-title'>
			<DialogTitle id='delete-dialog-title'>
				Delete This Palette?
				<List>
					<ListItem button onClick={handleRemovePalette}>
						<ListItemAvatar>
							<Avatar
								sx={{
									backgroundColor: 'success.light',
								}}>
								<CheckIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Yes' />
					</ListItem>
					<ListItem button onClick={toggleOpen}>
						<ListItemAvatar>
							<Avatar
								sx={{
									backgroundColor: 'error.light',
								}}>
								<CloseIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='No' />
					</ListItem>
				</List>
			</DialogTitle>
		</Dialog>
	);
}
