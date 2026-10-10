import { Button, IconButton, Typography } from "@mui/material";
import Iconify from "@src/components/iconify";
import { StyledRoot, StyledWrap } from "@src/sections/@dashboard/styles.css";
import { useMissionTrackerService } from "./hooks";
import { useMissionActivityTrackeContext } from "./provider";

const Toolbar = () => {
	const { onRefreshMission } = useMissionTrackerService();
	const { handleToggleFilterSidebar } = useMissionActivityTrackeContext();

	return (
		<StyledRoot sx={{
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
				sm: 122,
				xs: 122,
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
			}
		}}>
			<Typography variant="h5">
      	Missions Activity Tracker
      </Typography>
			<StyledWrap sx={{gap: 2}}>
				<Button
					disableRipple
					color="inherit"
					endIcon={<Iconify icon="ic:round-filter-list" />}
					onClick={() => handleToggleFilterSidebar()}
				>
					Filters&nbsp;
				</Button>
				<IconButton aria-label="delete" color="primary" onClick={onRefreshMission}>
					<Iconify icon={'mdi:refresh'} width={30} />
				</IconButton>
			</StyledWrap>
		</StyledRoot>
	)
}

export default Toolbar;