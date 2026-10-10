import { IconButton, InputAdornment } from "@mui/material";

import Iconify from "@src/components/iconify";

import { StyledRoot, StyledSearch, StyledWrap } from "@src/sections/@dashboard/styles.css";

import { useManageLicensesService } from "./hooks";
import { useManageLicensesContext } from "./provider";

const Toolbar = () => {
    const { state, handleSearch } = useManageLicensesContext();
    const { isLoading, onRefreshLicenses } = useManageLicensesService();
    const { search } = state || {};

    return (
        <StyledRoot>
            <StyledSearch
                disabled={isLoading}
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search license key"
                startAdornment={
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

            <StyledWrap>
                <IconButton aria-label="delete" color="primary" onClick={onRefreshLicenses}>
                    <Iconify icon={'mdi:refresh'} width={30} />
                </IconButton>
            </StyledWrap>
        </StyledRoot>
    )
}

export default Toolbar;