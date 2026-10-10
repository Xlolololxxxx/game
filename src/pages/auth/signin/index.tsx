import LoginForm from '@src/sections/auth/login';
import { Helmet } from 'react-helmet-async';

export default function LoginPage() {
    return (
        <>
            <Helmet>
                <title> Login </title>
            </Helmet>

            <LoginForm />
        </>
    );
}
