import { Box, Button, IconButton } from "@mui/material";

import Iconify from "@src/components/iconify";

import { StyledRoot, StyledWrap } from "@src/sections/@dashboard/styles.css";

import { useManagePartnersService } from "./hooks";

import { useManagePartnersContext } from "./provider";

const Toolbar = () => {
    const { accessControl, handleToggleOpenPartnerModal, handleToggleOpenGenerateLicenseModal } = useManagePartnersContext();
    const { onRefreshPartners } = useManagePartnersService();

    return (
        <StyledRoot>
            <Box />
            <StyledWrap sx={{ gap: 2 }}>
                <IconButton aria-label="delete" color="primary" onClick={onRefreshPartners}>
                    <Iconify icon={'mdi:refresh'} width={30} />
                </IconButton>
                {accessControl?.allowCreatePartner && <Button
                    variant="contained"
                    onClick={() => handleToggleOpenPartnerModal(true, 'create')}
                >
                    Create Partner
                </Button>}

                {accessControl?.allowGenerateLicenseKey && <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleToggleOpenGenerateLicenseModal(true, 'create')}
                >
                    Generate License Key
                </Button>}
            </StyledWrap>
        </StyledRoot>
    )
}

export default Toolbar