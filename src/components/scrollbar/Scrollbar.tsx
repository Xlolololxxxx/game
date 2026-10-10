import { memo } from 'react';
import { Box } from '@mui/material';
import { StyledRootScrollbar } from './styles';

function Scrollbar({ children, sx, ...other }: any) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      {children}
    </StyledRootScrollbar>
  );
}

export default memo(Scrollbar);
