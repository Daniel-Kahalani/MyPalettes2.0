import React from 'react';
import useToggleState from '../../hooks/useToggleState';
import { Link as RouterLink } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Box } from '@mui/system';
import { Button, Link, Typography, Zoom } from '@mui/material';
import chroma from 'chroma-js';

export default function ColorBox({
	name,
	background,
	withMoreButton,
	moreURL,
}) {
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
				<Zoom in={copied}>
					<Box
						sx={{
							position: 'fixed',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							top: 0,
							left: 0,
							zIndex: 10,
							width: '100%',
							height: '100%',
							backgroundColor: background,
						}}>
						<Typography
							variant='h1'
							sx={{
								width: '100%',
								textAlign: 'center',
								fontWeight: '400',
								margin: '1rem',
								padding: '1rem',
								textShadow: '1px 2px black',
								background: 'rgba(255, 255, 255, 0.2)',
							}}>
							COPIED
						</Typography>
						<Typography variant='h4'>{background}</Typography>
					</Box>
				</Zoom>
				<Typography
					sx={{
						position: 'absolute',
						left: 0,
						alignSelf: 'flex-end',
						padding: '0.5rem',
					}}
					vareint='body2'
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
							alignSelf: 'flex-end',
							position: 'absolute',
							right: 0,
							backgroundColor: 'rgba(255, 255, 255, 0.3)',
							padding: '0.5rem',
						}}
						onClick={(e) => e.stopPropagation()}
						component={RouterLink}
						to={moreURL}
						underline='none'
						color={textColor}>
						MORE
					</Link>
				)}
			</Box>
		</CopyToClipboard>
	);
}
