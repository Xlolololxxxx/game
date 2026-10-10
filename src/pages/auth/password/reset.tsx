import { Helmet } from 'react-helmet-async';
// @mui
// components
// sections
import ResetPasswordForm from '@src/sections/auth/password/set-new-password';

export default function ResetPasswordPage() {
    return (
        <>
            <Helmet>
                <title> Reset Password </title>
            </Helmet>

            <ResetPasswordForm />
        </>
    );
}
