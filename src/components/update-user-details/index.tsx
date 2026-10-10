import React, { useEffect, useState } from 'react'
import { Box, Button, Link, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { useAuthService } from '@src/store/hooks'

// import UploadButton from '@src/pages/games/game-details/upload-button'
import { useUsersService } from '@src/pages/users/hooks'

import { UpdateUserPasswordAPIParams, UserDetailsUpdatePasswordFormType, UserFormType } from '@src/lib/types/users';

import { Dialog } from '../dialog'
import { FormInput } from '../form-input'
import { ACCOUNT_TYPE } from '@src/utils/mockdata/menu-options'
import { ErrorMessage } from '../error-message'

type Props = {
  open: boolean;
  handleClose: () => void;
}

const UpdateUserDetails = ({ open, handleClose }: Props) => {
  const { control, handleSubmit: handleSubmitDetails, reset, clearErrors } = useForm<Partial<UserFormType>>();
  const {
    control: passwordControl,
    handleSubmit: handleSubmitPassword,
    formState: { isSubmitted },
    clearErrors: clearPasswordFormErrors,
    reset: resetPasswordFormFields,
    watch
  } = useForm<UserDetailsUpdatePasswordFormType>();

  const { currentUser } = useAuthService();
  const { onUpdateUserPassword, onUpdateUserDetails } = useUsersService();

  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    specialChar: false,
  });

  const confirmPassword = watch("newPassword");

  const getUserTypeValue = (userTypeID: number | string = 5) => {
    return ACCOUNT_TYPE.find((acct) => Number(acct.value) === Number(userTypeID))?.label;
  }

  useEffect(() => {
    resetPasswordFormFields();
    reset({
      displayName: currentUser?.displayName || '',
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      jobTitle: currentUser?.userDetail?.jobTitle || '',
      emailAddress: currentUser?.emailAddress || '',
      acctType: currentUser?.userTypeID ? getUserTypeValue(currentUser?.userTypeID) : '',
    });

    return () => {
      if (!open) {
        clearErrors();
      }
    }
  }, [currentUser, reset, open, clearErrors, resetPasswordFormFields]);

  const validatePassword = (password: string) => {
    setPasswordValidity({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    });
  };

  const onSubmitDetails = (data: Partial<UserFormType>) => {
    const { partnerID, id, dateOfBirth, userDetail, phoneNumber, userTypeID } = currentUser || {};

    onUpdateUserDetails.mutate({
      partnerId: partnerID?.id,
      userId: id,
      address: userDetail?.street,
      birthday: dateOfBirth,
      countryId: userDetail?.country?.id,
      genderId: userDetail?.gender?.id,
      phoneNumber,
      status: true,
      acctType: userTypeID,
      displayName: data.displayName,
      firstName: data.firstName,
      lastName: data.lastName,
      jobTitle: data.jobTitle,
      emailAddress: data.emailAddress,
    });
  };

  const onSubmitPassword = (data: UpdateUserPasswordAPIParams) => {
    onUpdateUserPassword.mutate({
      ...data,
    }, {
      onSuccess: () => {
        resetPasswordFormFields();
        clearPasswordFormErrors();
        handleClose();
      }
    });
  };

  return (
    <Dialog
      isOpen={open}
      maxWidth="sm"
      onClose={handleClose}
      dialogTitle="Update User Details"
      dialogContent={(
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: '100%'
          }}
        >
          {/* <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 5
            }}
          >
            <Avatar
              alt={displayName}
              src={avatarBig as string}
              sx={{ width: 100, height: 100 }}
            />
            <UploadButton />
          </Box> */}

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              width: '100%',
            }}
          >
            <form
              onSubmit={handleSubmitDetails(onSubmitDetails)}
              style={{ flex: 1 }}
            >
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Typography variant='h6'>User Details</Typography>
                <FormInput
                  name="displayName"
                  label="Username"
                  control={control}
                  rules={{ required: "Username is required" }}
                />
                <FormInput
                  name="firstName"
                  label="First Name"
                  control={control}
                  rules={{ required: "First name is required" }}
                />
                <FormInput
                  name="lastName"
                  label="Last Name"
                  control={control}
                  rules={{ required: "Last name is required" }}
                />
                <FormInput
                  name="jobTitle"
                  label="Job Title"
                  control={control}
                />
                <FormInput
                  name="emailAddress"
                  label="Email Address"
                  control={control}
                  rules={{ required: "Email address is required" }}
                  disabled
                />
                <FormInput
                  name="acctType"
                  label="Account Type"
                  control={control}
                  disabled
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: 30 }}
                  disabled={onUpdateUserDetails.isPending}
                >
                  Save
                </Button>
              </Box>
            </form>

            <form
              onSubmit={handleSubmitPassword(onSubmitPassword)}
              style={{ flex: 1 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <Typography variant='h6'>Password</Typography>
                <Box
                  sx={{
                    gap: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  {isChangingPassword ? (
                    <>
                      <FormInput
                        name="currentPassword"
                        label="Current Password"
                        control={passwordControl}
                        type="password"
                        rules={{
                          required: 'Password is required',
                        }}
                      />
                      <FormInput
                        name="newPassword"
                        label="New Password"
                        type="password"
                        control={passwordControl}
                        rules={{
                          required: 'New password is required',
                          onChange: (e: any) => validatePassword(e.target.value),
                          minLength: {
                            value: 8,
                            message: 'New Password must be at least 8 characters long',
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: 'Please choose a stronger password.',
                          },
                        }}
                      />
                      <FormInput
                        name="confirmNewPassword"
                        label="Confirm New Password"
                        type="password"
                        control={passwordControl}
                        rules={{
                          required: 'Please confirm your password',
                          validate: (value: string) => value === confirmPassword || 'Passwords do not match',
                        }}
                      />
                      {(isSubmitted) && (
                        <>
                          <ErrorMessage
                            error={passwordValidity.length}
                            message="At least 8 characters long."
                          />
                          <ErrorMessage
                            error={passwordValidity.lowercase}
                            message="Contains at least one lowercase letter."
                          />
                          <ErrorMessage
                            error={passwordValidity.uppercase}
                            message="Contains at least one uppercase letter."
                          />
                          <ErrorMessage
                            error={passwordValidity.digit}
                            message="Contains at least one digit."
                          />
                          <ErrorMessage
                            error={passwordValidity.specialChar}
                            message="Contains at least one special character."
                          />
                        </>
                      )}
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={onUpdateUserPassword.isPending}
                      >
                        Update Password
                      </Button>
                      <Link align='center' onClick={() => setIsChangingPassword(false)}>Cancel</Link>
                    </>
                  ) : (
                    <Link onClick={() => setIsChangingPassword(true)}>Change Password</Link>
                  )}
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      )}
      dialogActions={<Button autoFocus onClick={handleClose}>Close</Button>}
    />
  )
}

export default UpdateUserDetails