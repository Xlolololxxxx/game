// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';

// components
import { Link } from 'react-router-dom';
import styles, { Icon } from "./styles.css";


export default function PasswordResetSuccess() {
  return (
    <>
     <Stack spacing={3} sx={styles.prs_stack} >
      <Stack  sx={{ my: 2, gap: "1.4rem" }}>
        <Icon
          alt="GWz check circle"
          src="/assets/icons/check-green-circle.svg"
          style={{ pointerEvents: 'none' }}
        />
        <Typography variant="h4" 
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
          sx={{ bgcolor: '#6A00AC' }}
        >
          Login
        </LoadingButton>
      </Link>
    </Stack>
    </>
  );
}
