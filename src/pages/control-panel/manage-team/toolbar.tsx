import { Box, Button, IconButton } from "@mui/material";
import Iconify from "@src/components/iconify";
import { StyledRoot, StyledWrap } from "@src/sections/@dashboard/styles.css";
import { useManageTeamService } from "./hooks";
import { useManageTeamContext } from "./provider";

const Toolbar = () => {
    const { accessControl, handleToggleInviteModal } = useManageTeamContext();
    const { onRefreshUsers } = useManageTeamService();

    return (
        <StyledRoot>
            <Box />
            <StyledWrap>
                <IconButton aria-label="delete" color="primary" onClick={onRefreshUsers}>
                    <Iconify icon={'mdi:refresh'} width={30} />
                </IconButton>
                {accessControl?.allowInviteUser && <Button
                    variant="contained"
                    onClick={() => handleToggleInviteModal(true)}
                >
                    Invite user
                </Button>}
            </StyledWrap>
        </StyledRoot>
    )
}

export default Toolbar