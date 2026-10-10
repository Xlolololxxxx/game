import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { FormInput02 } from '@src/components/form-input';
import { ContactSupportType } from '@src/lib/types/settings';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContactSupportService } from './hooks';
import ResultModal from './result-modal';
import { useAuthService } from '@src/store/hooks';

const initialFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
} as ContactSupportType;

function InputDetails() {
  const theme: any = useTheme();
  const [openResult, setOpenResult] = useState(false);
  const { currentUser } = useAuthService();

  const { onSendEmailSupport } = useContactSupportService();
  const { control, handleSubmit, reset } = useForm<ContactSupportType>({
    defaultValues: initialFormState,
  });

  console.log("currentUsercurrentUser", currentUser)

  const onSubmitDetails = (formData: ContactSupportType) => {
    onSendEmailSupport.mutate(formData, {
      onSuccess: () => {
        setOpenResult(true);
        reset();
      },
      onError: () => {
        setOpenResult(true);
        reset();
      },
    });
  };

  useEffect(() => {
    if (currentUser) {
      const { firstName = '', lastName = '', 
        emailAddress } = currentUser || {};

      reset({
        name: firstName + " " + lastName,
        email: emailAddress,
      });
    }
  }, [currentUser, reset]);

  return (
    <>
      <Box sx={{ flex: 1 }} >
        <Typography sx={{ fontFamily: "Inter", fontWeight: "600", whiteSpace: "pre-line"}}>
        You will be contacting the Gameworkz support team. Please provide a full description{"\n"}
        of issues you are experiencing and we will endevour to get back to you as soon as possible.
        </Typography>
        <Box display={"flex"} flexDirection={"column"} mt={2} gap="1.3rem"
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
              disabled
              name="name"
              control={control}
              placeholder="Name"
              rules={{ required: "Name is required" }}
            />
            <FormInput02
              name="email"
              disabled
              control={control}
              placeholder="Email"
              rules={{ required: "Email is required" }}
            />
          </Stack>
          <FormInput02
            name="subject"
            control={control}
            placeholder="Subject"
            rules={{ required: "Subject is required" }}
          />
          <FormInput02
            name="message"
            control={control}
            minRows={6} // Ensures enough height
            placeholder="Type your message..."
            multiline
            sx={{
              '& .MuiInputBase-root': {
                minHeight: {
                  xs: '120px',
                  sm: '120px',
                  md: '130px',
                  lg: '180px',
                  xl: '193px',
                }
              }
            }}
            rules={{ required: "Message is required" }}
          />

          <LoadingButton
            variant="contained"
            onClick={handleSubmit(onSubmitDetails)}
            type={"button"}
            loading={onSendEmailSupport.isPending}
            sx={{
              display: "flex",
              alignSelf: "flex-end",
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
            Send
          </LoadingButton>
          <Box height={80} />
        </Box>
      </Box>
      <ResultModal
        open={openResult}
        success={onSendEmailSupport.isSuccess}
        onClose={() => setOpenResult(false)}
      />
    </>
  );
}

export default InputDetails;