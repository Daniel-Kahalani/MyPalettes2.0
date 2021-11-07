import { styled } from '@mui/system';
import { Typography, Box, Paper } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Star from '@mui/icons-material/Star';

export const MiniPaletteContainer = styled(Paper)({
	backgroundColor: 'white',
	border: '1px solid black',
	borderRadius: '5px',
	padding: '0.5rem',
	position: 'relative',
	cursor: 'pointer',
	':hover svg': {
		opacity: 1,
	},
});

export const FavoriteIcon = styled(Star)({
	width: '20px',
	height: '20px',
	position: 'absolute',
	right: '-1px',
	top: '-1px',
	padding: '10px',
	zIndex: 10,
	opacity: 0,
	transition: 'all 0.3s ease-in-out',
	color: 'white',
	borderTopRightRadius: '5px',
	backgroundColor: 'rgba(255, 213, 0,0.8)',
});

export const DeleteIcon = styled(Delete)({
	width: '20px',
	height: '20px',
	position: 'absolute',
	right: '-1px',
	top: '-1px',
	padding: '10px',
	zIndex: 10,
	opacity: 0,
	transition: 'all 0.3s ease-in-out',
	color: 'white',
	borderTopRightRadius: '5px',
	backgroundColor: '#eb3d30',
});

export const MiniColor = styled('div')({
	height: '25%',
	width: '20%',
	display: 'inline-block',
	margin: '0 auto',
	position: 'relative',
	marginBottom: '-4.5px',
});

export const PaletteTitle = styled(Typography)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	margin: '0px',
	paddingTop: '0.2rem',
	fontWeight: '500',
});
