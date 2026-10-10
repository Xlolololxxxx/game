/* eslint-disable react-hooks/exhaustive-deps */
// @mui
import LockOutlined from "@mui/icons-material/LockOutlined";
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// components
import { FormInput } from '@src/components/form-input';
import Iconify from '@src/components/iconify';
import { useAuthService } from '@src/store/hooks';
import { useSearchParams } from 'react-router-dom';
import PasswordRules from "./password-rules";
import styles from './styles.css';

type ResetPasswordFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
}

// ----------------------------------------------------------------------

export default function SetNewPassword() {
  const { onResetPassword } = useAuthService();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId') || '';
  const code = searchParams.get('code') || '';

  const {
    control,
    handleSubmit,
    watch,
    getValues,
  } = useForm<ResetPasswordFormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: ResetPasswordFormValues) => {
    onResetPassword.mutate({
      newPassword: data.password,
      userId,
      code,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Stack spacing={3} sx={styles.reset_stack} >
          <Stack sx={{ my: 2, gap: "0.2rem" }}>
            <Typography variant="h3" sx={styles.t_reset_password}>
              Set a new password
            </Typography>
            <Typography variant="body1" sx={styles.t_description}>
              Please enter your new password
            </Typography>
          </Stack>

          <Box>
            <FormInput
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter new password"
              control={control}
              rules={{
                required: "New Password is required",
                pattern: /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$@!%&*?]).*)$/
              }}
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
                    <LockOutlined fontSize="small"/>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <PasswordRules password={watch("password", "")} />
          <Box>
            <FormInput
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Re-enter new password"
              control={control}
              rules={{
                required: 'Please confirm your password',
                validate: () => {
                  if(getValues("confirmPassword") !== getValues("password")){
                    return "Passwords do not match"
                  }
                }
              }}
              InputProps={{
                sx: { height: "56px"},
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
          </Box>

          <LoadingButton
            loading={onResetPassword.isPending}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ backgroundColor: '#6A00AC', height: "56px" }}
          >
            Submit
          </LoadingButton>

          {/* <Stack alignItems="center" justifyContent="center" sx={{ pt: 1 }}>
            <Typography display="inline" variant="body1" sx={{ fontSize: 14, fontWeight: "700", color: 'black' }}>
              Having problem resetting password?{" "}
              <ButtonBase onClick={() => openInNewTab("https://fortune8.online/contact-us")}>
                <Typography display="inline" 
                  variant="body1" sx={{ fontSize: 14, fontWeight: "700", color: '#2563EB', fontFamily: "Inter" }}>
                  Contact GWz Admin
                </Typography>
              </ButtonBase>
            </Typography>
          </Stack> */}

        </Stack>
      </form>
    </>
  );
}
