import React from 'react';
import { useSelector } from 'react-redux';
import useToggleState from '../../../hooks/useToggleState';
import { Link as RouterLink } from 'react-router-dom';
import CopiedAnimation from '../components/CopiedAnimation';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Box } from '@mui/system';
import { Button, Link, Typography } from '@mui/material';
import chroma from 'chroma-js';

export default function ColorBox({ id, name, background, withMoreButton }) {
	const { palette } = useSelector((state) => state.palette);
	const [copied, toogleCopied, reset] = useToggleState([false, true]);
	const textColor =
		chroma.contrast(background, 'white') < 4.5 ? 'grey.700' : 'grey.300';

	const handleCopy = async () => {
		toogleCopied();
		setTimeout(() => reset(), 1500);
	};

	return (
		<CopyToClipboard text={background} onCopy={handleCopy}>
			<Box
				sx={{
					backgroundColor: background,
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItem: 'center',
					position: 'relative',
					cursor: 'pointer',
					':hover button': {
						opacity: 1,
					},
				}}>
				<CopiedAnimation
					backgroundColor={background}
					isCopied={copied}
				/>
				<Typography
					sx={{
						position: 'absolute',
						left: 0,
						alignSelf: 'flex-end',
						padding: '0.2rem',
					}}
					variant='overline'
					color={textColor}>
					{name}
				</Typography>
				<Button
					sx={{
						backgroundColor: 'rgba(255, 255, 255, 0.3)',
						alignSelf: 'center',
						color: textColor,
						opacity: 0,
					}}>
					Copy
				</Button>

				{withMoreButton && (
					<Link
						sx={{
							position: 'absolute',
							right: 0,
							backgroundColor: 'rgba(255, 255, 255, 0.3)',
							alignSelf: {
								xs: 'center',
								sm: 'flex-end',
							},
							padding: {
								xs: '0.3rem',
								sm: '0.5rem',
							},
						}}
						onClick={(e) => e.stopPropagation()}
						component={RouterLink}
						to={`/palettes/${palette.id}/${id}`}
						underline='none'
						color={textColor}>
						MORE
					</Link>
				)}
			</Box>
		</CopyToClipboard>
	);
}
