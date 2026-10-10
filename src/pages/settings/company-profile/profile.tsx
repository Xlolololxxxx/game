import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { FormAutoComplete, FormInput02 } from '@src/components/form-input';
import { useAccessControlContext } from '@src/context/AccessControl';
import { formatAddress } from '@src/utils/country-formatter';
import { COUNTRIES } from '@src/utils/mockdata/menu-options';
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCompanyProfileService } from './hooks';

const initialFormState = {
  companyName: '',
  ownerFirstName: '',
  ownerLastName: '',
  emailAddress: '',
  phoneNumber: '',
  street: '',
  city: '',
  postCode: '',
  country: COUNTRIES[0]
};

type Props = {
  handleActivateLicense: () => void;
}

function CompanyProfile(props: Props) {
  const theme: any = useTheme();

  const navigate = useNavigate();

  const [enableEdit, setEnableEdit] = useState(false);

  const { state } = useAccessControlContext();
  const { access } = state || {};
  const { settings } = access || {};
  const { allowUpdateBusinessDetails, allowUpdateLicenseKey } = settings || {};

  const { data, onUpdateCompanyProfile } = useCompanyProfileService();

  const { control, handleSubmit, reset, getValues } = useForm<typeof initialFormState>({
    defaultValues: initialFormState,
  });

  const onSubmitDetails = (formData: typeof initialFormState) => {
    const {
      companyName,
      ownerFirstName,
      ownerLastName,
      city,
      country,
      emailAddress,
      phoneNumber,
      postCode,
      street
    } = formData;

    onUpdateCompanyProfile.mutate({
      companyName: companyName,
      owner: {
        firstName: ownerFirstName,
        lastName: ownerLastName,
        city: city || '',
        country: country.value || 1,
        // provinceId: country.value || 1,
        emailAddress: emailAddress || '',
        phoneNumber: phoneNumber || '',
        postCode: postCode || '',
        street: street || ''
      }
    }, {
      onSuccess: () => setEnableEdit(false)
    });
  };

  const handleToggleEdit = () => {
    if (enableEdit) {
      handleSubmit(onSubmitDetails)();
      return;
    }

    setEnableEdit(true);
    reset();
  };

  const handleCancel = () => {
    if (enableEdit) {
      reset();
      setEnableEdit(!enableEdit);
      return;
    }
    navigate(-1);
  }

  const _renderAddressAsString = () => {
    const { country: currentCountry, ...rest } = getValues();

    return formatAddress({
      ...rest,
      country: {
        id: currentCountry?.value,
        name: data?.owner?.userDetail?.country?.name
      }
    })
  }

  useEffect(() => {
    if (data?.owner) {
      const { companyName, owner } = data || {};
      const { firstName = '', lastName = '', userDetail, 
        emailAddress, phoneNumber } = owner || {};
      const { street, city, postCode, country } = userDetail || {};

      reset({
        companyName,
        ownerFirstName: firstName,
        ownerLastName: lastName,
        emailAddress,
        phoneNumber,
        street,
        city,
        postCode,
        country: {value: country.id, label: country.name},
      });
    }
  }, [data, reset]);

  return (
    <>
      <Box sx={{ display: "flex", flex: 1 }} >
        <Box display={"flex"} flexDirection={"column"} gap="1.3rem"
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
              name="ownerFirstName"
              label="First Name"
              control={control}
              disabled={!enableEdit}
              rules={{ required: "First name is required" }}
            />
            <FormInput02
              name="ownerLastName"
              label="Last Name"
              control={control}
              disabled={!enableEdit}
              rules={{ required: "Last name is required" }}
            />
          </Stack>
          <Stack direction={{
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
              name="phoneNumber"
              label="Contact Number"
              control={control}
              disabled={!enableEdit}
              rules={{ required: "Contact Number: is required" }}
            />
            <FormInput02
              name="emailAddress"
              label="Email Address"
              control={control}
              disabled
              rules={{ required: "Email address is required" }}
            />
          </Stack>

          {enableEdit ? (
            <>
              <Typography variant='h5'>
                Address
              </Typography>
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
                  name="street"
                  label="Street"
                  control={control}
                  rules={{ required: "Street is required" }}
                />
                <FormInput02
                  name="city"
                  label="City"
                  control={control}
                  rules={{ required: "City is required" }}
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
                <FormAutoComplete
                  name="country"
                  label="Country"
                  options={COUNTRIES}
                  control={control}
                  getOptionLabel={(option: any) => `${option.label}`}
                />
                <FormInput02
                  name="postCode"
                  label="Postal Code"
                  control={control}
                />
              </Stack>
            </>
          ) : (
            <FormInput02
              name="none"
              label="Address"
              control={control}
              value={_renderAddressAsString()}
              disabled
            />
          )
          }

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
            }} justifyContent={"center"} mt={2}>
            <Button
              variant="outlined"
              type="reset"
              sx={{
                width: {
                  xl: 200,
                  lg: 200,
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
                height: "45px",
                color: theme.palette.grey[700],
                borderColor: theme.palette.grey[600],
                "&:hover": {
                  bgcolor: theme.palette.grey[200],
                }
              }}
              onClick={handleCancel}
            >
              {enableEdit ? "Cancel" : "Back"}
            </Button>
            {allowUpdateBusinessDetails && (
              <Button
                variant="contained"
                onClick={handleToggleEdit}
                type={"button"}
                sx={{
                  width: {
                    xl: 200,
                    lg: 200,
                    md: "100%",
                    sm: "100%",
                    xs: "100%",
                  }, 
                  height: "45px",
                  bgcolor: theme.palette.purple.dark,
                  "&:hover": {
                    bgcolor: theme.palette.purple.main,
                  }
                }}>
                {enableEdit ? "Save" : "Update Profile"}
              </Button>
            )}
          </Stack>
          {!enableEdit && allowUpdateLicenseKey && (
            <Button
              variant="contained"
              sx={{
                alignSelf: "center",
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "50%",
                  lg: 430,
                  xl: 430,
                },
                height: "45px",
                bgcolor: theme.palette.blue.darker,
                "&:hover": {
                  bgcolor: theme.palette.blue.main,
                }
              }}
              onClick={props.handleActivateLicense}
            >
              Activate License
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}

export default CompanyProfile;