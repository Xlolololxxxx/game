// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';

// components
import { Link } from 'react-router-dom';
import styles, { Icon } from "./styles.css";


export default function Success() {
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
          sx={styles.t_email_sent}>Thank you for verifying!</Typography>
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
