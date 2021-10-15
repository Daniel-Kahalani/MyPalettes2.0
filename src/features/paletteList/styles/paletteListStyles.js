import { styled } from '@mui/system';
import bg from '../../../assets/bg.svg';

/* background by SVGBackgrounds.com */
export const PaletteListContainer = styled('div')({
	height: '100vh',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-start',
	/* background by SVGBackgrounds.com */
	// backgroundColor: '#394bad',
	backgroundImage: `url(${bg})`,
	overflow: 'auto',
});

export const PalettesContainer = styled('div')({
	paddingBottom: '1rem',
	display: 'flex',
	alignSelf: 'center',
	alighItems: 'flex-start',
	flexDirection: 'column',
	flexWarp: 'wrap',
});
