import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFormat } from '../slices/paletteSlice';
import useToggleState from '../../../hooks/useToggleState';
import { Link as RouterLink } from 'react-router-dom';
import LevelSlider from './LevelSlider';
import Snackbar from '../../../components/snackbar/Snackbar';
import { AppBar, Toolbar, Link, Select, MenuItem } from '@mui/material';
import { Box } from '@mui/system';

export default function PaletteNavbar({ withSlider }) {
	const { format } = useSelector((state) => state.palette);
	const dispatch = useDispatch();
	const [snackbarOpen, toggleSnackbarOpen] = useToggleState([false, true]);

	const handleChangeFormat = (evt) => {
		toggleSnackbarOpen();
		dispatch(setFormat(evt.target.value));
	};

	return (
		<AppBar
			position='static'
			sx={{
				backgroundColor: 'common.white',
				display: 'flex',
				minHeight: '40px',
				padding: 0,
			}}>
			<Toolbar
				sx={{
					backgroundColor: '#eceff1',
				}}>
				<Link
					component={RouterLink}
					to='/'
					variant='h5'
					underline='none'
					color='common.black'
					sx={{ display: { xs: 'none', sm: 'block' } }}>
					colors
				</Link>
				{!withSlider && <LevelSlider />}
				<Box sx={{ marginLeft: 'auto', marginRight: '1rem' }}>
					<Select value={format} onChange={handleChangeFormat}>
						<MenuItem value='hex'>HEX - #ffffff</MenuItem>
						<MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value='rgba'>
							RGBA - rgba(255,255,255,1.0)
						</MenuItem>
					</Select>
				</Box>
				<Snackbar
					message={`Format Change! To ${format.toUpperCase()}`}
					open={snackbarOpen}
					toggleOpen={toggleSnackbarOpen}
					type={'success'}
				/>
			</Toolbar>
		</AppBar>
	);
}
