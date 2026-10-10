import { Box, Button, Stack, useTheme } from '@mui/material';
import { FormInput02 } from '@src/components/form-input';
import { UserFormType } from '@src/lib/types/users';
import { useUsersService } from '@src/pages/users/hooks';
import { useAuthService } from '@src/store/hooks';
import { getUserTypeValue } from '@src/utils/filter-helper';
import React from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const theme: any = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuthService();
  const { onUpdateUserDetails } = useUsersService();
  const { control, handleSubmit: handleSubmitDetails, reset } = useForm<Partial<UserFormType>>();

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

  React.useEffect(() => {
    reset({
      displayName: currentUser?.displayName || '',
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      jobTitle: currentUser?.userDetail?.jobTitle || '',
      emailAddress: currentUser?.emailAddress || '',
      acctType: currentUser?.userTypeID ? getUserTypeValue(currentUser?.userTypeID) : '',
    });
  }, [currentUser, reset]);

  return (
    <>
    <form
      onSubmit={handleSubmitDetails(onSubmitDetails)}
      style={{ flex: 1 }}
    >
      <Box display={"flex"} flexDirection={"column"} gap="1.7rem" 
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "70%",
            xl: "70%",
          }
        }}>
        <Stack 
          direction={{
            xl: "row",
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          }} 
          gap={{
            xl: "2rem",
            lg: "2rem",
            md: "1rem",
            sm: "1rem",
            xs: "1rem",
          }} mt={2}>
          <FormInput02
            name="firstName"
            label="First Name"
            control={control}
            rules={{ required: "First name is required" }}
          />
          <FormInput02
            name="lastName"
            label="Last Name"
            control={control}
            rules={{ required: "Last name is required" }}
          />
        </Stack>
        <Stack 
          direction={{
            xl: "row",
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          }} 
          gap={{
            xl: "2rem",
            lg: "2rem",
            md: "1rem",
            sm: "1rem",
            xs: "1rem",
          }} >
          <FormInput02
            name="displayName"
            label="Username"
            control={control}
            rules={{ required: "Username is required" }}
          />
          <FormInput02
            name="emailAddress"
            label="Email Address"
            control={control}
            rules={{ required: "Email address is required" }}
            disabled
          />
        </Stack>
        <Stack 
          direction={{
            xl: "row",
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          }} 
          gap={{
            xl: "2rem",
            lg: "2rem",
            md: "1rem",
            sm: "1rem",
            xs: "1rem",
          }} >
          <FormInput02
            name="jobTitle"
            label="Job Title"
            control={control}
          />
          <FormInput02
            name="acctType"
            label="Account Type"
            control={control}
            disabled
            sx={{
              '& .MuiInputBase-root': {
                height: '50px',
              },
            }}
          />
        </Stack>
        <Stack 
          width={"100%"}
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
                xl: 200,
                lg: 200,
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
                xl: 200,
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
            Save
          </Button>
        </Stack>
      </Box>
    </form>
    </>
  );
}

export default UserProfile;