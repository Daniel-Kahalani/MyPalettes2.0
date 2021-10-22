import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link } from '@mui/material';
import { Box } from '@mui/system';

export default function BackColorBox() {
	return (
		<Grid
			item
			sx={{
				width: {
					xs: '100%',
					sm: '50%',
					md: '25%',
					lg: '20%',
				},
			}}>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'black',
					cursor: 'pointer',
				}}>
				<Link
					to='.'
					component={RouterLink}
					underline='none'
					color='common.white'>
					<Button
						sx={{
							color: 'common.white',
							alignSelf: 'center',
						}}>
						Go back
					</Button>
				</Link>
			</Box>
		</Grid>
	);
}
