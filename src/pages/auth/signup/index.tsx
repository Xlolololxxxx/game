import { Helmet } from 'react-helmet-async';
import SignupForm from './form';
// @mui
// components
// sections

export default function SignupPage() {
  return (
    <>
      <Helmet>
        <title> Signup </title>
      </Helmet>

      <SignupForm />
    </>
  );
}
