import { LoadingButton } from '@mui/lab';
import { Box, Button, IconButton, InputAdornment, Stack, Typography, useTheme } from '@mui/material';
import { FormInput02 } from '@src/components/form-input';
import Iconify from '@src/components/iconify';
import { UpdateUserPasswordAPIParams, UserDetailsUpdatePasswordFormType } from '@src/lib/types/users';
import { useUsersService } from '@src/pages/users/hooks';
import PasswordRules from '@src/sections/auth/password/set-new-password/password-rules';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles, { Icon } from "./styles.css";

function Security() {
  const theme: any = useTheme();
  const navigate = useNavigate();
  const { onUpdateUserPassword } = useUsersService();
  const [showSuccess, setShoSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { control, handleSubmit, watch, getValues, setError } = useForm<UserDetailsUpdatePasswordFormType>();

  const onSubmitPassword = (data: UpdateUserPasswordAPIParams) => {
    onUpdateUserPassword.mutate(data, {
      onSuccess: () => {
        setShoSuccess(true);
      },
      onError: (error: any) => {
        setError("currentPassword", {
          type: "manual",
          message: error?.response?.data?.error?.message,
        });
      }
    });
  };

  if(showSuccess){
    return <PasswordResetSuccess />
  }

  return (
    <>
    <form
      onSubmit={handleSubmit(onSubmitPassword)}
      style={{ flex: 1 }}
    >
      <Box display={"flex"} flexDirection={"column"} gap="1.7rem" 
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "80%",
            lg: "45%",
            xl: "45%",
          }
        }}>
        <Typography variant='h6' mt={1}>
          Change Password
        </Typography>
        <FormInput02
          type={showCurrentPassword ? 'text' : 'password'}
          name="currentPassword"
          label="Current Password"
          control={control}
          rules={{ required: "Current Password is required" }}
          InputProps={{
            sx: { height: "45px"},
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} edge="end">
                  <Iconify icon={showCurrentPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormInput02
          type={showPassword ? 'text' : 'password'}
          name="newPassword"
          label="New Password"
          control={control}
          rules={{
            required: "New Password is required",
            pattern: /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$@!%&*?]).*)$/
          }}
          InputProps={{
            sx: { height: "45px"},
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <PasswordRules password={watch("newPassword", "")} />
        <FormInput02
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmNewPassword"
          label="Confirm Password"
          control={control}
          rules={{
            required: "Confirm Password is required",
            validate: () => {
              if(getValues("confirmNewPassword") !== getValues("newPassword")){
                return "Passwords do not match"
              }
            }
          }}
          InputProps={{
            sx: { height: "45px"},
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack width={"100%"}
          direction={{
            xl: "row",
            lg: "row",
            md: "column-reverse",
            sm: "column-reverse",
            xs: "column-reverse",
          }} 
          gap={{
            xl: "2rem",
            lg: "2rem",
            md: "1rem",
            sm: "1rem",
            xs: "1rem",
          }} alignSelf={"center"} mt={2}>
          <Button
            variant="outlined"
            sx={{ 
              width: {
                xl: 160,
                lg: 160,
                md: "100%",
                sm: "100%",
                xs: "100%",
              }, height: "45px",
              color: theme.palette.grey[700],
              borderColor: theme.palette.grey[600],
              "&:hover": {
                bgcolor: theme.palette.grey[200],
              }
            }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ 
              width: {
                xl: 160,
                lg: 200,
                md: "100%",
                sm: "100%",
                xs: "100%",
              }, height: "45px", 
              bgcolor: theme.palette.purple.dark,
              "&:hover": {
                bgcolor: theme.palette.purple.main,
              }
            }}>
            Update Password
          </Button>
        </Stack>
      </Box>
    </form>
    </>
  );
}


function PasswordResetSuccess() {
  const theme: any = useTheme();
  const navigate = useNavigate();

  return (
    <Stack spacing={3} sx={styles.prs_stack} >
      <Stack  sx={{ my: 2, gap: "1.4rem" }}>
        <Icon
          alt="GWz check circle"
          src="/assets/icons/check-green-circle.svg"
          style={{ pointerEvents: 'none' }}
        />
        <Typography variant="h6" 
          sx={styles.t_email_sent}>Successful password reset!</Typography>
        <Typography variant="body1" 
          sx={styles.fss_t_description}>You can now use your new password to login
          to your account.</Typography>
      </Stack>

      <Link to="/login">
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{ bgcolor: theme.palette.purple.dark,
            "&:hover": {
              bgcolor: theme.palette.purple.main,
            }
           }}
           onClick={() => navigate('/dashboard/purchase')}
        >
          Back to Dashboard
        </LoadingButton>
      </Link>
    </Stack>
  );
}

export default Security;