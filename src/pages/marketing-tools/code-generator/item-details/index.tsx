import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { FormCheckBox, FormInput02 } from '@src/components/form-input';
import { useToasterContext } from '@src/context/Toaster';
import { CodeGeneratorItemType } from '@src/lib/types/code-generator';
import { AlertType } from '@src/lib/types/toaster';
import Config from '@src/utils/api/config';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCodeGeneratorService } from '../hooks';
import { useCodeGeneratorContext } from '../provider';
import GenerateCode from './generate-code';
import TooltipLabel from './label-tooltip';
import styles from "./styles.css";


function ItemDetails() {
  const [url, setUrl] = useState("");
  const { triggerOpen, triggerClose } = useToasterContext();
  const [copied, setCopied] = useState(false);
  const { state: {editDetails}, handleCloseDetails } = useCodeGeneratorContext();
  const { updateCodeGeneratorStatus, onRefreshCodeGenerator } = useCodeGeneratorService();
  const { control, reset } = useForm<Partial<CodeGeneratorItemType>>();
  
  const onSubmitDetails = (data: Partial<CodeGeneratorItemType>) => {
    const params = {
      id: editDetails.id,
      status: editDetails.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
    }

    updateCodeGeneratorStatus.mutate(params, {
      onSuccess: (response) => {
        handleCloseDetails();
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

  useEffect(() => {
    reset({
      ...editDetails,
      accessCount: editDetails.type === "REF" ? "N/A" : editDetails.accessCount
    });
    const url = editDetails.type === "URL" ?  Config.CODE_GENERATOR_URL + editDetails.code : editDetails.code;
    setUrl(url);
  }, [editDetails, reset]);

  return (
    <Card sx={{ width: '100%', height: "100%", px: "30px", py: "15px", pb: 6, borderRadius: "25px" }}>
      <form style={{ flex: 1 }}>
        <Box display={"flex"} 
          flexDirection={"column"} 
          gap="1.7rem" 
          sx={{ width: "100%" }} >
          <Stack 
            display={"flex"} 
            direction={{
              xl: "row",
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            }}
            gap={{
              xl: "0rem",
              lg: "0rem",
              md: "0rem",
              sm: "1rem",
              xs: "1rem",
            }}
            alignItems={{
              xl: "center",
              lg: "center",
              md: "center",
              sm: "flex-start",
              xs: "flex-start",
            }} justifyContent={"space-between"} pr={5} mt={2}>
            <Typography variant="h6" fontWeight={"700"}>
              {editDetails.name} Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: "row", gap: "2rem", alignItems: "center", justifyContent: "center" }}>
              <Typography display="inline" variant="body1" sx={styles.t_status} >
                Status: 
                <Typography display="inline" variant="body1" fontWeight={"600"} 
                  color={editDetails.status === "INACTIVE" ? "error.main" : '#44B370'}>
                  {editDetails.status === "INACTIVE" ? "Inactive" : "Active"}
                </Typography>
              </Typography>
              <Button 
                onClick={onSubmitDetails} 
                variant="contained"
                sx={styles.btn_deactivation} >{editDetails.status === "INACTIVE" ? "ACTIVATE" : "DEACTIVATE"}</Button>
            </Box>
          </Stack>
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
                disabled
                label="Promotion Name"
                control={control}
                rules={{ required: "Promotion name is required" }}
                labelProps={{
                  variant: "body1",
                  fontWeight: "700",
                }}
              />
              <FormInput02
                name="channelName"
                label="Channel Name"
                disabled
                control={control}
                labelProps={{
                  variant: "body1",
                  fontWeight: "700",
                }}
              />
            </Stack>
            <Stack gap="1rem" mt={2} flex={1}>
              <FormInput02
                name="accessCount"
                disabled
                placeholder='0'
                label={<TooltipLabel label="Number of Link Clicks" tooltipMessage='How many user clicked on the link' />}
                control={control}
                labelProps={{
                  variant: "body1",
                  fontWeight: "700",
                }}
              />
              <FormInput02
                name="claimCount"
                label={<TooltipLabel label="User Engagement" tooltipMessage='How many users claimed the offer' />}
                placeholder='0'
                disabled
                control={control}
                labelProps={{
                  variant: "body1",
                  fontWeight: "700",
                }}
              />
            </Stack>
            <Stack gap="1rem" width={270} mt={2} flex={0.8}>
              <Typography variant='body1' fontWeight={"700"} >
                Bonus Quantity
              </Typography>
              <FormCheckBox 
                label={`${numeral(editDetails.bonusAmount).format("0,000")} Silver`}
                name="bonusAmount"
                control={control}
                defaultValue={editDetails.bonusAmount} />
              <Typography display="inline" variant='body1' fontSize={"14px"}>
                Start Date:{" "}
                <Typography display="inline" variant='body1' fontSize={"14px"} fontWeight={"700"}>
                  {moment(editDetails.startAt).format("MM/DD/YYYY")}
                </Typography>
              </Typography>
              <Typography display="inline" variant='body1' fontSize={"14px"}>
                End Date:{" "}
                <Typography display="inline" variant='body1' fontSize={"14px"} fontWeight={"700"}>
                  {moment(editDetails.endAt).format("MM/DD/YYYY")}
                </Typography>
              </Typography>
            </Stack>
          </Stack>
          <GenerateCode
            type={editDetails.type}
            url={url} copied={copied} 
            handleCopyLink={handleCopyLink} />
        </Box>
      </form>
    </Card>
  );
}

export default ItemDetails;