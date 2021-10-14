import { styled } from '@mui/system';
import bg from '../../../assets/bg.svg';
// import sizes from '../../../utils/sizes';

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
	// width: '50%',
	display: 'flex',
	alignSelf: 'center',
	alighItems: 'flex-start',
	flexDirection: 'column',
	flexWarp: 'wrap',
	// width: { xs: '60%', sm: '80%', xl: '60%' },
});
