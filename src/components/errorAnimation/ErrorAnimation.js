import React from 'react';
import Lottie from 'react-lottie';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import animationData from '../../assets/sad-face.json';

export default function ErrorAnimation() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(57, 75, 173,0.7)',
			}}>
			<Lottie
				options={{
					loop: false,
					autoplay: true,
					animationData: animationData,
					rendererSettings: {
						preserveAspectRatio: 'xMidYMid slice',
					},
				}}
				height={400}
				width={400}
			/>
			<Typography color='grey.300' variant='h3'>
				Something went wrong,
			</Typography>
			<Typography color='grey.300' variant='h3'>
				please try to refresh
			</Typography>
		</Box>
	);
}
