/* eslint-disable react-hooks/exhaustive-deps */
// @mui
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import { LoadingButton } from '@mui/lab';
import { Box, InputAdornment, Link as MUILink, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

// components
import { FormInput } from '@src/components/form-input';
import { useAuthService } from '@src/store/hooks';
import { Link } from 'react-router-dom';
import styles from "./styles.css";

type ForgotPasswordFormValues = {
  email: string;
}

export default function ForgotPasswordForm() {
  const { onForgotPassword } = useAuthService();

  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    }
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    onForgotPassword.mutate(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Stack spacing={3} sx={styles.forgot_stack} >
          <Stack  sx={{ my: 2, gap: "0.2rem" }}>
            <Typography variant="h4" 
              sx={styles.t_reset_password}>Reset your password</Typography>
            <Typography variant="body1" 
              sx={styles.t_description}>Enter the email address associated with your account and we will send you a link to reset your password.</Typography>
          </Stack>

          <Box>
            <FormInput
              name="email"
              placeholder="Email"
              control={control}
              rules={{ required: "Email is required" }}
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

          <LoadingButton
            loading={onForgotPassword.isPending}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ bgcolor: '#6A00AC' }}
          >
            Continue
          </LoadingButton>

          <Link style={styles.link} to="/login">
            <MUILink variant="body2" fontFamily={"Inter"} sx={{ fontWeight: "900", color: '#2563EB' }}>
              Back to Sign In
            </MUILink>
          </Link>

        </Stack>
      </form>
    </>
  );
}
