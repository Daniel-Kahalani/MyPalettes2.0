import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { register, clearError } from '../slices/userSlice';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const inputStyle = { WebkitBoxShadow: '0 0 0 1000px white inset' };

export default function RegisterDialog({
	openDialog,
	toogleDialog,
	switchToLogin,
	redirect,
}) {
	const { error, loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, handleEmailChange, resetEmail] = useInputState('');
	const [password, handlePasswordChange, resetPassword] = useInputState('');
	const [fullName, handleFullNameChange, resetFullName] = useInputState('');

	const resetInputs = () => {
		resetPassword();
		resetEmail();
		resetFullName();
	};

	const handleClose = () => {
		resetInputs();
		dispatch(clearError());
		toogleDialog();
	};

	const handleSubmit = async () => {
		const resultAction = await dispatch(
			register({ email, password, fullName })
		);
		if (register.fulfilled.match(resultAction)) {
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
		switchToLogin();
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
						Sign up to find new palettes.
					</Typography>
					<TextValidator
						name='fullName'
						label='Full Name'
						onChange={handleFullNameChange}
						value={fullName}
						fullWidth
						margin='normal'
						validators={['required']}
						errorMessages={['Enter full name']}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<AccountCircleIcon />
								</InputAdornment>
							),
						}}
					/>

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
						Already have an account
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
								SIGN UP
							</Button>
						</>
					)}
				</DialogActions>
			</ValidatorForm>
		</Dialog>
	);
}
