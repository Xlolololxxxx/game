/* eslint-disable react-hooks/exhaustive-deps */
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// components
import { FormInput } from '@src/components/form-input';
import Iconify from '@src/components/iconify';
import { SignupFormValues } from '@src/lib/types/auth';
import { useAuthService } from '@src/store/hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import styles from "./styles.css";

// ----------------------------------------------------------------------

export default function SignupForm() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const nameValue = searchParams.get('name');
	const emailValue = searchParams.get('email');
	const companyNameValue = searchParams.get('company-name');
	
	const { onSignup } = useAuthService();

	console.log("emailValueemailValue", emailValue?.toString())

	const { control, handleSubmit, reset } = useForm<SignupFormValues>({
		defaultValues: {
			companyName: '',
			firstName: '',
			lastName: '',
			emailAddress: '',
			password: '',
		}
	});

	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (nameValue && emailValue && companyNameValue) {
		const email = emailValue?.replace(/ /g, '+'); // Fix for `+` being turned into spaces

			reset({
				companyName: companyNameValue || '',
				firstName: nameValue || '',
				emailAddress: email || '',
			})
		}
	}, [nameValue, emailValue, companyNameValue]);

	const onSubmit = (formData: SignupFormValues) => {
		onSignup.mutate(formData, {
			onSuccess: () => {
				navigate('/signup/success');
			}
		});
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
			<Stack
				spacing={2.5}
				sx={styles.signup_stack}
			>
				<Stack sx={{ my: 2, gap: "0.2rem" }}>
					<Typography variant="h4" sx={styles.t_signup}>
						Sign Up
					</Typography>
				</Stack>

				<Box>
					<FormInput
						internalLabel={false}
						name="companyName"
						label="Company Name"
						placeholder="Company Name"
						control={control}
						rules={{ required: "Company name is required" }}
						disabled
						InputProps={{
							sx: { height: "56px"},
						}}
					/>
				</Box>

				<Box>
					<FormInput
						internalLabel={false}
						name="firstName"
						label="Your first name"
						placeholder="Your first name"
						control={control}
						rules={{ required: "First name is required" }}
						InputProps={{
							sx: { height: "56px"},
						}}
					/>
				</Box>

				<Box>
					<FormInput
						internalLabel={false}
						name="lastName"
						label="Your last name"
						placeholder="Your last name"
						control={control}
						rules={{ required: "Last name is required" }}
						InputProps={{
							sx: { height: "56px"},
						}}
					/>
				</Box>

				<Box>
					<FormInput
						internalLabel={false}
						name="emailAddress"
						label="Email"
						placeholder="me@email.com"
						control={control}
						rules={{ required: "Email is required" }}
						disabled
						InputProps={{
							sx: { height: "56px"},
							startAdornment: (
								<InputAdornment position="start">
									<EmailOutlined fontSize="small" fontWeight="200"/>
								</InputAdornment>
							)
						}}
					/>
				</Box>

				<Box>
					<FormInput
						type={showPassword ? 'text' : 'password'}
						name="password"
						label="Password"
						placeholder="Your password"
						control={control}
						rules={{ required: "Password is required" }}
						InputProps={{
							sx: { height: "56px"},
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
										<Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
									</IconButton>
								</InputAdornment>
							),
							startAdornment: (
								<InputAdornment position="start">
									<LockOutlined fontSize="small"  sx={{ fontWeight: "300" }}/>
								</InputAdornment>
							)
						}}
					/>
				</Box>
				<LoadingButton
					loading={onSignup.isPending}
					fullWidth
					size="large"
					type="submit"
					variant="contained"
					sx={{ 
						bgcolor: 'purple.dark',
						'&:hover': {
							bgcolor: 'purple.main',
						}
					 }}
					>
					Submit
				</LoadingButton>
			</Stack>
		</form>
	);
}
