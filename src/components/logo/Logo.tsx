import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// @mui
import { Box, Link } from '@mui/material';
import Config from '@src/utils/api/config';

const { SITE } = Config || {};

const Logo = forwardRef(({ disabledLink = false, sx, ...other }: any, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: "auto",
        height: 50,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img
        alt=""
        src={`/assets/${SITE}-logo.svg`} />
    </Box>
  );

  if (disabledLink) return <>{logo}</>;

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
