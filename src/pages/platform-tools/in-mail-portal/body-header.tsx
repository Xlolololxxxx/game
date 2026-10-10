import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  InputAdornment
} from '@mui/material';
import Iconify from '@src/components/iconify';
import React from 'react';
import { useInMailService } from './hooks';
import { useInMailContext } from './provider';
import { StyledSearch } from './styles.css';

const BodyHeader = () => {
  const { data } = useInMailService();
  const { state, handleSearch, handleCreateMailDialog } = useInMailContext();

  return (
    <StyledWrapRow
      sx={{
        width: "auto",
        my: {
          xl: 0,
          lg: 0,
          md: 0,
          sm: "22px",
          xs: "22px",
        },
        height: {
          xl: 96,
          lg: 96,
          md: 96,
          sm: "auto",
          xs: "auto",
        },
        flexDirection: {
          xl: "row",
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column",
        },
        alignItems: {
          xl: 'center',
          lg: 'center',
          md: 'center',
          sm: 'flex-start',
          xs: 'flex-start',
        },
        justifyContent: {
          xl: 'space-between',
          lg: 'space-between',
          md: 'space-between',
          sm: 'center',
          xs: 'center',
        }
      }}>
      <StyledWrapRight sx={{bgcolor: "green"}}>
        <Box sx={{ fontWeight: "700", color: "rgba(69, 69, 69, 1)" }}>Mail List</Box>
        <StyledCountMails>
          {data?.totalRecords ?? 0} in mails
        </StyledCountMails>
      </StyledWrapRight>
      <StyledWrapRight
        sx={{
          px: 0,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          },
          width: {
            xl: "auto",
            lg: "auto",
            md: "auto",
            sm: "100%",
            xs: "100%",
          },
          height: {
            xl: 50,
            lg: 50,
            md: 50,
            sm: "auto",
            xs: "auto",
          }
        }}>
        <StyledSearch
          value={state.search}
          placeholder="Search"
          sx={{
            width: {
              xl: 320,
              lg: 320,
              md: 320,
              sm: "100%",
              xs: "100%",
            },
            '&.Mui-focused': {
              width: {
                xl: 320,
                lg: 320,
                md: 320,
                sm: "100%",
                xs: "100%",
              }
            },
          }}
          onChange={(event) => handleSearch(event.target.value)}
          endAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{
                  color: 'text.disabled',
                  width: 20,
                  height: 20
                }}
              />
            </InputAdornment>
          }
        />
        <StyledButtonCreate 
          variant="text"
					disableRipple
					disableElevation
					sx={{
						color: "white",
						width: {
							xl: 210,
							lg: 210,
							md: 210,
							sm: "100%",
							xs: "100%",
						},
						height: {
							xl: 47,
							lg: 47,
							md: 47,
							sm: 54,
							xs: 54,
						},
						bgcolor: "purple.dark",
						"&:hover": {
							bgcolor: "purple.main"
						}
					}}
          onClick={handleCreateMailDialog} startIcon={<AddIcon />}>
          Create New Mail
        </StyledButtonCreate>
      </StyledWrapRight>
    </StyledWrapRow>
  );
}


const StyledWrapRight = styled(Box)({
  height: 70,
  display: 'flex',
  flexDirection: "row",
  alignItems: "center",
  marginLeft: 0,
  paddingLeft: 0,
  gap: '1rem'
});

const StyledWrapRow = styled(Box)(() => ({
  // height: 96,
  width: "100%",
  display: 'flex',
}));

const StyledButtonCreate = styled(Button)(({ theme }: any) => ({
  width: 192,
  marginRight: 0,
  display: 'flex',
  color: "white",
  borderRadius: 8,
  backgroundColor: theme.palette.purple.dark,
}));

const StyledCountMails = styled(Box)(() => ({
  width: 95,
  height: 31,
  fontSize: 14,
  display: 'flex',
  fontWeight: 500,
  borderRadius: 48,
  alignItems: "center",
  justifyContent: 'center',
  color: "rgba(33, 33, 33, 1)",
  backgroundColor: "rgba(33, 33, 33, 0.1)",
}));

export default React.memo(BodyHeader);
