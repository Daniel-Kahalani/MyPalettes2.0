import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PaletteNavbar from '../../../components/paletteNavbar/PaletteNavbar';
import PaletteFooter from '../../../components/paletteFooter/PaletteFooter';

// import { PalettesContext } from '../../contexts/palette.context';
// import { FormatContext } from '../../contexts/format.context';
// import { LevelContext } from '../../contexts/level.context';
// import { generatePaletteWithShades } from '../../utils/colorHelper';
// import { fetchPalette } from '../../api/palettes.js';
// import ColorBox from './ColorBox';
// import PaletteNavbar from './PaletteNavbar';
// import PaletteFooter from './PaletteFooter';
// import useStyles from '../../styles/palette/PaletteStyles';

export default function PalettePage() {
	// const classes = useStyles();
	const {
		state: { palette },
	} = useLocation();
	console.log(palette);
	// const [palette, changePalette] = useState('');
	const { id } = useParams();
	// const { level } = useContext(LevelContext);
	// const { format } = useContext(FormatContext);
	// const palettes = useContext(PalettesContext);
	let colorBoxes;

	// if (palette) {
	// 	const { _id, colors } = palette;
	// 	colorBoxes = colors[level].map((color) => (
	// 		<ColorBox
	// 			background={color[format]}
	// 			name={color.name}
	// 			key={color.id}
	// 			moreURL={`/palettes/${_id}/${color.id}`}
	// 			showFullPalette={true}
	// 		/>
	// 	));
	// }

	// useEffect(() => {
	// 	const setPalette = async () => {
	// 		let rawPalette;
	// 		if (palettes.length === 0) {
	// 			let { data } = await fetchPalette(id);
	// 			rawPalette = data;
	// 		} else rawPalette = palettes.find((palette) => palette._id === id);
	// 		changePalette(generatePaletteWithShades(rawPalette));
	// 	};
	// 	setPalette();
	// }, [id, palettes]);

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				overflow: 'scroll',
			}}>
			<PaletteNavbar withSlider={false} />
			<Box sx={{ flexGrow: 1 }}></Box>
			{/* {/* <div className={classes.colors}>{palette && colorBoxes}</div> */}
			<PaletteFooter name={palette.name} emoji={palette.emoji} />
		</Box>
	);
}
