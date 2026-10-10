// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';

// components
import { Link } from 'react-router-dom';
import styles, { Icon } from "./styles.css";


export default function EmailSent() {
  return (
    <>
     <Stack spacing={3} sx={styles.fss_stack} >
      <Stack  sx={{ my: 2, gap: "1.5rem" }}>
        <Icon
          alt="GWz check circle"
          src="/assets/icons/ic_notification_mail.svg"
          style={{ pointerEvents: 'none' }}
        />
        <Typography variant="h4" 
          sx={styles.t_email_sent}>Check your email and verify to continue</Typography>
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
    </Stack>
    </>
  );
}
