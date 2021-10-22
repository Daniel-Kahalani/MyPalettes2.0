import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPalette, getColorShades } from '../slices/paletteSlice';
import ColorBox from '../components/ColorBox';
import PaletteNavbar from '../components/PaletteNavbar';
import PaletteFooter from '../components/PaletteFooter';
import BackColorBox from '../components/BackColorBox';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

export default function ColorShadesPage() {
	const dispatch = useDispatch();
	const { format, palette, shades } = useSelector((state) => state.palette);
	const { paletteId, colorId } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			if (!palette) {
				const resultAction = await dispatch(getPalette(paletteId));
				if (getPalette.fulfilled.match(resultAction)) {
					dispatch(getColorShades(colorId));
				}
			} else if (!shades) {
				dispatch(getColorShades(colorId));
			}
		};
		fetchData();
	}, [dispatch, colorId, paletteId, palette, shades]);

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
				{shades && (
					<Grid container>
						{shades.map((shade) => (
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
								key={shade.name}>
								<ColorBox
									name={shade.name}
									background={shade[format]}
									withMoreButton={false}
								/>
							</Grid>
						))}
						<BackColorBox />
					</Grid>
				)}
			</Box>
			{palette && (
				<PaletteFooter name={palette.name} emoji={palette.emoji} />
			)}
		</Box>
	);
}
