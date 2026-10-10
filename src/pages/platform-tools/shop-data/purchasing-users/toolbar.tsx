import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import Iconify from "@src/components/iconify";
import { StyledRoot, StyledSearch, StyledWrap } from "@src/sections/@dashboard/styles.css";
import { useMissionTrackerService } from "./hooks";
import { usePurchasingUsersContext } from "./provider";

const Toolbar = () => {
	const { state, handleSearch, handleToggleFilterSidebar } = usePurchasingUsersContext();
	const {isLoading, onRefreshMission } = useMissionTrackerService();

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
				Purchasing Users
      </Typography>
			<StyledWrap sx={{ gap: 2 }}>
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

				<StyledSearch
					disabled={isLoading}
					value={state.search}
					sx={{
						ml: 0,
						width: {
							xl: 220,
							lg: 220,
							md: 220,
							sm: "100%",
							xs: "100%",
						},
						'&.Mui-focused': {
							width: {
								xl: 220,
								lg: 220,
								md: 220,
								sm: "100%",
								xs: "100%",
							}
						},
					}}
					onChange={(event) => handleSearch(event.target.value)}
					placeholder="Search User ID"
					endAdornment={
						<InputAdornment position="end">
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
			</StyledWrap>
		</StyledRoot>
	)
}

export default Toolbar;