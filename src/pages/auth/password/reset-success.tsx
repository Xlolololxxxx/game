import PasswordResetSuccess from '@src/sections/auth/password/password-reset-success';
import { Helmet } from 'react-helmet-async';

export default function ResetPasswordSuccessPage() {

	return (
		<>
			<Helmet>
				<title> Reset Password Success </title>
			</Helmet>

			<PasswordResetSuccess />
		</>
	);
}
