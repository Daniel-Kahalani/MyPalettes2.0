import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, clearError } from '../slices/userSlice';
import useInputState from '../../../hooks/useInputState';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
	Link,
	Typography,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	CircularProgress,
	InputAdornment,
} from '@mui/material';

import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function LoginDialog({
	openDialog,
	toogleDialog,
	switchToRegister,
	redirect,
}) {
	const { error, loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, handleEmailChange, resetEmail] =
		useInputState('john@example.com');
	const [password, handlePasswordChange, resetPassword] =
		useInputState('john147');
	const inputStyle = { WebkitBoxShadow: '0 0 0 1000px white inset' };

	const resetInputs = () => {
		resetPassword();
		resetEmail();
	};

	const handleClose = () => {
		resetInputs();
		dispatch(clearError());
		toogleDialog();
	};

	const handleSubmit = async () => {
		const resultAction = await dispatch(login({ email, password }));
		if (login.fulfilled.match(resultAction)) {
			resetInputs();
			toogleDialog();
			if (redirect) {
				history.push(redirect);
			}
		}
	};

	const handleSwitchDialog = () => {
		resetInputs();
		dispatch(clearError());
		switchToRegister();
	};

	return (
		<Dialog
			open={openDialog}
			onClose={handleClose}
			fullWidth={true}
			maxWidth={'xs'}
			aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>My Palettes</DialogTitle>
			<ValidatorForm onSubmit={handleSubmit}>
				<DialogContent>
					<Typography variant='body1' sx={{ marginBottom: '1rem' }}>
						Sign in to find new palettes.
					</Typography>
					<TextValidator
						autoComplete='username'
						name='email'
						label='Email'
						onChange={handleEmailChange}
						value={email}
						fullWidth
						margin='normal'
						validators={['required']}
						errorMessages={['Enter email']}
						inputProps={{ style: inputStyle }}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<MailOutlineIcon />
								</InputAdornment>
							),
						}}
					/>
					<TextValidator
						autoComplete='current-password'
						name='password'
						label='Password'
						type='password'
						onChange={handlePasswordChange}
						value={password}
						fullWidth
						margin='normal'
						validators={['required']}
						errorMessages={['Enter password']}
						inputProps={{ style: inputStyle }}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<LockIcon />
								</InputAdornment>
							),
						}}
					/>
					<Link
						component='button'
						variant='caption'
						onClick={handleSwitchDialog}>
						Dont have an account
					</Link>
				</DialogContent>
				<DialogActions
					sx={{
						flex: 1,
						alignItems: 'center',
						flexDirection: 'column',
					}}>
					{loading ? (
						<CircularProgress />
					) : (
						<>
							{error && (
								<Typography
									color='error'
									variant='body2'
									mb={1}>
									{error.message}
								</Typography>
							)}
							<Button
								variant='contained'
								color='primary'
								type='submit'
								fullWidth
								size='large'>
								SIGN IN
							</Button>
						</>
					)}
				</DialogActions>
			</ValidatorForm>
		</Dialog>
	);
}
