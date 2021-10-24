import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { Button } from '@mui/material';
import chroma from 'chroma-js';
import { DRAWER_WIDTH } from '../../../utils/constants';

export const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${DRAWER_WIDTH}px)`,
		marginLeft: `${DRAWER_WIDTH}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export const Drawer = styled(MuiDrawer, {
	variant: 'persistent',
	anchor: 'left',
})(({ theme }) => ({
	width: DRAWER_WIDTH,
	flexShrink: 0,
	'& .MuiDrawer-paper': {
		width: DRAWER_WIDTH,
		boxSizing: 'border-box',
	},
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export const AddColorButton = styled(Button, {
	variant: 'contained',
	type: 'submit',
})(({ theme, isPaletteFull, currentColor }) => ({
	width: '100%',
	padding: '1rem',
	marginTop: '1rem',
	fontSize: '2rem',
	backgroundColor: isPaletteFull ? 'gray' : currentColor,
	color:
		chroma.contrast(currentColor, 'white') < 4.5
			? theme.palette.grey[700]
			: theme.palette.grey[300],
	':hover ': {
		backgroundColor: isPaletteFull ? 'gray' : currentColor,
	},
}));