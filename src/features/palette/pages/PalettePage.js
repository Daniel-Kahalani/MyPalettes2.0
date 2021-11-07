import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPalette } from '../slices/paletteSlice';
import PaletteNavbar from '../components/PaletteNavbar';
import PaletteFooter from '../components/PaletteFooter';
import ColorBox from '../components/ColorBox';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

export default function PalettePage() {
	const dispatch = useDispatch();
	const { palette, level, format } = useSelector((state) => state.palette);
	const { id } = useParams();

	useEffect(() => {
		dispatch(getPalette(id));
	}, [dispatch, id]);

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
			}}>
			<PaletteNavbar withSlider={true} />
			<Box
				sx={{
					display: 'flex',
					flexGrow: '1',
				}}>
				{palette && (
					<Grid container sx={{ alignContent: 'start' }}>
						{palette.colors[level].map((color) => (
							<Grid
								item
								sx={{
									width: {
										xs: '100%',
										sm: '50%',
										md: '25%',
										lg: '20%',
									},
									height: {
										xs: 'auto',
										sm: '10%',
										md: '20%',
										lg: '25%',
									},
								}}
								key={color.id}>
								<ColorBox
									id={color.id}
									name={color.name}
									background={color[format]}
									withMoreButton={true}
								/>
							</Grid>
						))}
					</Grid>
				)}
			</Box>
			{palette && (
				<PaletteFooter name={palette.name} emoji={palette.emoji} />
			)}
		</Box>
	);
}
