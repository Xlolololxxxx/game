import { Helmet } from 'react-helmet-async';
import ForgotSentSuccess from '@src/sections/auth/password/forgot-sent-success';

export default function ForgotPasswordSuccessPage() {
	return (
		<>
			<Helmet>
				<title> Forgot Password Success </title>
			</Helmet>

			<ForgotSentSuccess />
		</>
	);
}
