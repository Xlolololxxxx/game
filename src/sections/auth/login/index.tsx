/* eslint-disable react-hooks/exhaustive-deps */
// @mui
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { LoadingButton } from '@mui/lab';
import { Checkbox, FormControlLabel, IconButton, InputAdornment, Link as MUILink, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

// components
import { FormInput } from '@src/components/form-input';
import Iconify from '@src/components/iconify';
import { useAuthService } from '@src/store/hooks';
import _ from "lodash";
import { Link } from "react-router-dom";
import * as TokenHelper from "../../../utils/token-helper";
import styles from "./styles.css";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
}

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { onSignin } = useAuthService();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: TokenHelper.getEmail() || "",
      password: '',
      rememberMe: !_.isEmpty(TokenHelper.getEmail())
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = ({ email, password, rememberMe }: LoginFormValues) => {
    onSignin.mutate({
      username: email,
      password,
      rememberMe
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Stack
          spacing={3}
          sx={styles.login_stack}
        >
          <Stack sx={{ my: 2, gap: "0.2rem" }}>
            <Typography variant="h4" sx={styles.t_signin}>Sign In to your Account</Typography>
            <Typography variant="body1" sx={styles.t_description}>Welcome back! Please enter your details.</Typography>
          </Stack>
          <Stack sx={{ gap: "0.8rem" }}>
            <FormInput
              name="email"
              placeholder="Email"
              control={control}
              rules={{ required: "Email is required" }}
              InputProps={{
                sx: { height: "56px" },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined fontSize="small" fontWeight="200" />
                  </InputAdornment>
                )
              }}
            />
            <FormInput
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              control={control}
              rules={{ required: "Password is required" }}
              InputProps={{
                sx: { height: "56px" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined fontSize="small" sx={{ fontWeight: "300" }} />
                  </InputAdornment>
                )
              }}
            />
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <Controller
                control={control}
                name={"rememberMe"}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    label="Remember me"
                    sx={{ fontFamily: "Inter" }}
                    control={
                      <Checkbox checked={value} onChange={onChange} />
                    }
                  />
                )}
              />
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/forgot-password">
                <MUILink variant="body2" sx={{ fontWeight: "800", color: '#2563EB', fontFamily: "Inter" }}>
                  Forgot Password?
                </MUILink>
              </Link>
            </Stack>
          </Stack>
          <LoadingButton
            loading={onSignin.isPending}
            size="large"
            type="submit"
            variant="contained"
            sx={{ bgcolor: '#6A00AC' }}
          >
            Submit
          </LoadingButton>

          <Stack alignItems="center" justifyContent="center" sx={
            { pt: {
                lg: 4,
                xl: 4,
                md: 0,
                sm: 0,
                xs: 0,
              },
            }}>
            {/* <Typography display="inline" variant="body1" sx={{ fontSize: 14, fontWeight: "700", color: 'black', fontFamily: "Inter" }}>
              Don’t have an account?{" "}
              <ButtonBase onClick={() => openInNewTab("https://fortune8.online/contact-us")}>
                <Typography display="inline"
                  variant="body1" sx={{ fontSize: 14, fontWeight: "700", color: '#2563EB', fontFamily: "Inter" }}>
                  Contact GWz Admin
                </Typography>
              </ButtonBase>
            </Typography> */}
          </Stack>
        </Stack>
      </form>
    </>
  );
}
