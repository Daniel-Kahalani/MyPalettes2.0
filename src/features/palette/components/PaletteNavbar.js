import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFormat, clearPalette } from '../slices/paletteSlice';
import useToggleState from '../../../hooks/useToggleState';
import { FORMAT, SNACKBAR_TYPE } from '../../../utils/constants';
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
					onClick={() => dispatch(clearPalette())}
					component={RouterLink}
					to='/'
					variant='h5'
					underline='none'
					color='common.black'
					sx={{ display: { xs: 'none', sm: 'block' } }}>
					colors
				</Link>
				{withSlider && <LevelSlider />}
				<Box
					sx={{
						margin: '0.2rem 0.5rem 0.2rem auto',
					}}>
					<Select value={format} onChange={handleChangeFormat}>
						<MenuItem value={FORMAT.hex}>HEX - #ffffff</MenuItem>
						<MenuItem value={FORMAT.rgb}>
							RGB - rgb(255,255,255)
						</MenuItem>
						<MenuItem value={FORMAT.rgba}>
							RGBA - rgba(255,255,255,1.0)
						</MenuItem>
					</Select>
				</Box>
				<Snackbar
					message={`Format Change! To ${format.toUpperCase()}`}
					open={snackbarOpen}
					toggleOpen={toggleSnackbarOpen}
					type={SNACKBAR_TYPE.success}
				/>
			</Toolbar>
		</AppBar>
	);
}
