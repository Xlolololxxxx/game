import { Box, FormGroup, Stack, Typography } from '@mui/material';
import { FormCheckBox, FormDatePicker, FormInput, FormInput02 } from '@src/components/form-input';
import { useToasterContext } from '@src/context/Toaster';
import { CodeGeneratorItemType } from '@src/lib/types/code-generator';
import { AlertType } from '@src/lib/types/toaster';
import Config from '@src/utils/api/config';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCodeGeneratorService } from '../hooks';
import GenerateButton from './generate-button';


function SocialLink() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { triggerOpen, triggerClose } = useToasterContext();
  const { onCreateCodeGenerator, onRefreshCodeGenerator } = useCodeGeneratorService();
  const { control, handleSubmit: handleSubmitDetails, 
    watch, getValues } = useForm<Partial<CodeGeneratorItemType>>();
  
  const onSubmitDetails = (data: Partial<CodeGeneratorItemType>) => {
    // const actualDateStartAt = data.startAt?.format('YYYY-MM-DD');
    // const actualDateEndAt = data.endAt?.format('YYYY-MM-DD');

    data.bonusAmount = data.bonusAmount === "custom" ? data.customAmount : data.bonusAmount;
    data.type = "URL";
    // data.startAt = momentTz(actualDateStartAt).tz("America/New_York").format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    data.startAt = data.startAt?.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    data.endAt = data.endAt?.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    
    onCreateCodeGenerator.mutate(data, {
      onSuccess: (response) => {
        setUrl(Config.CODE_GENERATOR_URL + response.data.code);
        onRefreshCodeGenerator();
      },
      onError: (error: any) => {
        console.log("error", error);
        const message = error?.response?.data?.error?.message ?? error.message;

        triggerOpen({
          type: AlertType.error,
          message: message,
        });
      }
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    triggerOpen({
      message: "Copy success!",
    });

    const timeout = setTimeout(() => {
      timeout && clearTimeout(timeout);
      triggerClose();
    },2000);
  }

  return (
    <>
    <form
      onSubmit={handleSubmitDetails(onSubmitDetails)}
      style={{ flex: 1 }}
    >
      <Box display={"flex"}
        flexDirection={"column"} 
        gap="1.7rem" 
        sx={{ width: "100%" }}>
        <Stack 
          direction={{
            xl: "row",
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          }} 
          gap={{
            xl: "4rem",
            lg: "4rem",
            md: "4rem",
            sm: "1rem",
            xs: "1rem",
          }} justifyContent="center">
          <Stack gap="1rem" mt={2} flex={1}>
            <FormInput02
              name="name"
              label="Promotion Name"
              control={control}
              rules={{ required: "Promotion name is required" }}
              labelProps={{
                variant: "body1",
                fontWeight: "700",
              }}
            />
            <Box>
              <FormInput02
                name="channelName"
                label="Channel Name"
                control={control}
                rules={{ required: "Channel name is required" }}
                labelProps={{
                  variant: "body1",
                  fontWeight: "700",
                }}
              />
              <Typography sx={{
                mt: "5px",
                fontSize: 12,
                fontStyle: "italic",
                color: "#B1B6BF"
              }} >Enter Channel where you will use this link</Typography>
            </Box>
          </Stack>
          <Stack gap="1rem" width={{
            xl: 270,
            lg: 270,
            md: 270,
            sm: "100%",
            xs: "100%",
          }} mt={2} flex={0.8}>
            <Typography variant='body1' fontWeight={"700"} >
              Bonus Quantity
            </Typography>
            <FormGroup sx={{flexDirection: "row"}}>
              <FormCheckBox label="1,000,000 Silver"
                name="bonusAmount"
                control={control}
                defaultValue={1000000} />
              <FormCheckBox label="2,000,000 Silver"
                name="bonusAmount"
                control={control}
                defaultValue={2000000} />
              <FormCheckBox label="3,000,000 Silver"
                name="bonusAmount"
                control={control}
                defaultValue={3000000} />
              <Box display={"flex"}
                flexDirection={{
                  xl: "column",
                  lg: "column",
                  md: "column",
                  sm: "row",
                  xs: "row",
                }}>
                <FormCheckBox label="Custom Amount"
                  name="bonusAmount"
                  control={control}
                  defaultValue="custom" />
                <FormInput
                  name="customAmount"
                  control={control}
                  type="number"
                  disabled={watch("bonusAmount") !== "custom"}
                  rules={{ 
                    validate: () => {
                      if(!getValues("bonusAmount")){
                        return "Bonus quantity is required"
                      }
                    }
                  }}
                  sx={{ml: {
                    xl: 4,
                    lg: 4,
                    md: 4,
                    sm: 0,
                    xs: 0,
                  }, width: {
                    xl: "55%",
                    lg: "55%",
                    md: "55%",
                    sm: "100%",
                    xs: "100%",
                  }}}
                />
              </Box>
            </FormGroup>
          </Stack>

          <Stack gap="1rem" mt={2}>
            <Typography variant='body1' fontWeight={"700"}>
              Start and Expiry Date
            </Typography>
            <FormDatePicker
              name="startAt"
              label="Start Date:"
              control={control}
              rules={{ required: "Start Date is required" }}
              labelProps={{
                variant: "body1",
                fontWeight: "500",
                sx: {
                  fontSize: 14
                }
              }}
              sx={{
                width: '50%',
                backgroundColor: '#ffffff',
                color: '#111111',
                '& .MuiInputBase-root': {
                  height: {
                    xs: '40px',
                    sm: '40px',
                    md: '45px',
                    lg: '45px',
                    xl: '50px',
                  },
                },
              }}
            />
            <FormDatePicker
              name="endAt"
              label="End Date:"
              control={control}
              rules={{ required: "End Date is required" }}
              labelProps={{
                variant: "body1",
                fontWeight: "500",
                sx: {
                  fontSize: 14
                }
              }}
              sx={{
                width: '50%',
                height: {
                  xs: '40px',
                  sm: '40px',
                  md: '45px',
                  lg: '45px',
                  xl: '50px',
                },
                backgroundColor: '#ffffff',
                color: '#111111',
                '& .MuiInputBase-root': {
                  height: {
                    xs: '40px',
                    sm: '40px',
                    md: '45px',
                    lg: '45px',
                    xl: '50px',
                  },
                },
              }}
            />
          </Stack>
        </Stack>

        <GenerateButton 
          type="URL"
          isLoading={onCreateCodeGenerator.isPending}
          isSuccess={onCreateCodeGenerator.isSuccess}
          url={url} copied={copied} 
          handleCopyLink={handleCopyLink} />
      </Box>
    </form>
    </>
  );
}

export default SocialLink;