import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { genarateExtendedPalette } from '../slices/paletteSlice';
import PaletteNavbar from '../../../components/paletteNavbar/PaletteNavbar';
import PaletteFooter from '../../../components/paletteFooter/PaletteFooter';
import ColorBox from '../../../components/colorBox/ColorBox';
// import ColorBox from './ColorBox';
import { Fade, Grid, Paper, Zoom } from '@mui/material';

export default function PalettePage() {
	const dispatch = useDispatch();
	const { extendedPalette, level, format } = useSelector(
		(state) => state.palette
	);
	const { id } = useParams();
	const {
		state: { palette },
	} = useLocation();

	useEffect(() => {
		dispatch(genarateExtendedPalette(palette));
	}, [dispatch, palette]);

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
			}}>
			<PaletteNavbar withSlider={false} />
			<Box
				sx={{
					display: 'flex',
					flexGrow: '1',
				}}>
				{extendedPalette && (
					<Grid container>
						{extendedPalette.colors[level].map((color) => (
							<Grid
								item
								sx={{
									width: {
										xs: '100%',
										sm: '50%',
										md: '25%',
										lg: '20%',
									},
								}}
								key={color.id}>
								<ColorBox
									background={color[format]}
									name={color.name}
									moreURL={`/palettes/${id}/${color.id}`}
									withMoreButton={true}
								/>
							</Grid>
						))}
					</Grid>
				)}
			</Box>
			<PaletteFooter name={palette.name} emoji={palette.emoji} />
		</Box>
	);
}
