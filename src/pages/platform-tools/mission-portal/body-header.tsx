import styled from '@emotion/styled';
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  Stack,
  TextField
} from '@mui/material';
import React from 'react';
import { useMissionContext } from './provider';

const BodyHeader = () => {
  const { state, handleSearch } = useMissionContext();

  return (
    <StyledWrapRow>
      <StyledWrapRight>
        <Box sx={{ fontWeight: "700", color: "rgba(69, 69, 69, 1)" }}>Missions List</Box>
      </StyledWrapRight>
      <StyledWrapRight>
        <StyledSearchStack>
          <StyledSearchInput
            id="input-search"
            value={state.search}
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </StyledSearchStack>
      </StyledWrapRight>
    </StyledWrapRow>
  );
}

const StyledSearchStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: "row",
  height: 40,
  borderRadius: 8,
  border: '1px solid rgba(33, 33, 33, 0.2)',
}));

const StyledSearchInput = styled(TextField)(({ theme }) => ({
  display: 'flex',
  flexDirection: "row",
  height: 40,
  borderRadius: 0,
  borderRight: '1px solid rgba(33, 33, 33, 0.2)',
}));

const StyledWrapRight = styled(Box)({
  height: 96,
  display: 'flex',
  flexDirection: "row",
  alignItems: "center",
  marginLeft: 0,
  paddingLeft: 0,
  gap: '1rem'
});

const StyledWrapRow = styled(Box)({
  height: 96,
  width: "100%",
  display: 'flex',
  alignItems: "center",
  justifyContent: 'space-between',
});

export default React.memo(BodyHeader);
