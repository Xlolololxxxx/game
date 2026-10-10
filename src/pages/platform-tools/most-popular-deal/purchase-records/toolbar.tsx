import { IconButton, Typography } from "@mui/material";
import Iconify from "@src/components/iconify";
import { StyledRoot, StyledWrap } from "@src/sections/@dashboard/styles.css";
import { useMissionActivityTrackeContext } from "../promotions-data/provider";
import { useMissionTrackerService } from "./hooks";

const Toolbar = () => {
	const { state: PROMOTION } = useMissionActivityTrackeContext();
	const { onRefreshMission } = useMissionTrackerService();

	return (
		<StyledRoot 
		sx={{
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
				{` { ${PROMOTION?.selectedItem?.description} } `} Purchase Records
      </Typography>
			<StyledWrap>
				{/* <Button
					disableRipple
					color="inherit"
					endIcon={<Iconify icon="ic:round-filter-list" />}
					onClick={() => handleToggleFilterSidebar()}
				>
					Filters&nbsp;
				</Button> */}
				<IconButton aria-label="delete" color="primary" onClick={onRefreshMission}>
					<Iconify icon={'mdi:refresh'} width={30} />
				</IconButton>
			</StyledWrap>
		</StyledRoot>
	)
}

export default Toolbar;