import React from 'react';
import { useHistory } from 'react-router-dom';
import useToggleState from '../../../hooks/useToggleState';
import PaletteMetaDialog from '../components/PaletteMetaDialog';
import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AppBar } from '../styles/createNewPaletteStyles';
import PaletteIcon from '@mui/icons-material/Palette';

export default function CreateNewPaletteNavbar({ toggleOpen, open }) {
	const history = useHistory();
	const [openDialog, toggleOpenDialog] = useToggleState([false, true]);

	const handleBackClick = () => {
		history.goBack();
	};

	const handleSaveClick = () => {
		toggleOpenDialog();
	};

	return (
		<>
			<AppBar
				position='static'
				open={open}
				sx={{
					display: 'flex',
					backgroundColor: 'common.white',
					padding: 0,
				}}>
				<Toolbar
					sx={{
						backgroundColor: '#eceff1',
					}}>
					<IconButton
						size='large'
						edge='start'
						aria-label='palette'
						onClick={toggleOpen}
						sx={{ mr: 2, ...(open && { display: 'none' }) }}>
						<PaletteIcon />
					</IconButton>
					<Typography variant='h6' color='common.black'>
						Create A Palette
					</Typography>
					<Box
						sx={{
							marginLeft: 'auto',
						}}>
						<Button variant='contained' onClick={handleSaveClick}>
							SAVE
						</Button>
						<Button
							variant='contained'
							color='error'
							onClick={handleBackClick}
							sx={{ marginLeft: '1rem' }}>
							BACK
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<PaletteMetaDialog
				open={openDialog}
				toggleOpen={toggleOpenDialog}
			/>
		</>
	);
}
