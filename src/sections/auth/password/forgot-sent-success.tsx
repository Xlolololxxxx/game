// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';

// components
import { Link } from 'react-router-dom';
import styles, { Icon } from "./styles.css";


export default function ForgotSentSuccess() {
  return (
    <>
     <Stack spacing={3} sx={styles.fss_stack} >
      <Stack  sx={{ my: 2, gap: "1.5rem" }}>
        <Icon
          alt="GWz check circle"
          src="/assets/icons/check-green-circle.svg"
          style={{ pointerEvents: 'none' }}
        />
        <Typography variant="h4" 
          sx={styles.t_email_sent}>Email Sent!</Typography>
        <Typography variant="body1" 
          sx={styles.fss_t_description}>Please check your registered email and follow the instructions to update your password.</Typography>
      </Stack>

      <Link to="/login">
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{ bgcolor: '#6A00AC' }}
        >
          Back to Sign In
        </LoadingButton>
      </Link>

      {/* <Stack alignItems="center" justifyContent="center" sx={{ pt: 2 }}>
        <Typography display="inline" variant="body1" fontFamily={"Inter"} sx={{ fontSize: 14, fontWeight: "700", color: 'black' }}>
          Didn’t received an email?{" "}
          <ButtonBase onClick={() => openInNewTab("https://fortune8.online/contact-us")}>
            <Typography display="inline" 
              variant="body1" sx={{ fontSize: 14, fontWeight: "700", color: '#2563EB', fontFamily: "Inter" }}>
              Contact GWz Admin
            </Typography>
          </ButtonBase>
        </Typography>
      </Stack> */}
    </Stack>
    </>
  );
}
