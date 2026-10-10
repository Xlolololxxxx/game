import { Helmet } from 'react-helmet-async';
// @mui
// components
// sections
import ForgotPasswordForm from '@src/sections/auth/password/forgot';

export default function ForgotPasswordPage() {
    return (
        <>
            <Helmet>
                <title> Forgot Password </title>
            </Helmet>

            <ForgotPasswordForm />
        </>
    );
}
