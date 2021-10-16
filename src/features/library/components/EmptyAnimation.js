import React from 'react';
import Lottie from 'react-lottie';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import animationData from '../../../assets/empty_box.json';

export default function EmptyAnimation() {
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
				Your library is empty,
			</Typography>
			<Typography color='grey.300' variant='h3'>
				add some palettes
			</Typography>
		</Box>
	);
}
