import { Button, IconButton, Typography } from "@mui/material";
import ButtonExport from "@src/components/buttons/button-export";
import Iconify from "@src/components/iconify";
import { StyledRoot, StyledWrap } from "@src/sections/@dashboard/styles.css";
import { useUsersService } from "./hooks";
import { useProviderContext } from "./provider";

const Toolbar = () => {
	const { handleToggleFilterSidebar } = useProviderContext();
	const { onRefreshPurchases, onExportPurchasesList } = useUsersService();

	return (
		<StyledRoot sx={{
			width: "100%",
			my: {
				xl: 0,
				lg: 0,
				md: 0,
				sm: "22px",
				xs: "22px",
			},
			mt: 5,
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
			<Typography variant="h6" ml={2}>
				USERS 
				<Typography 
					variant="body1" 
					display="inline-block" 
					ml={1.6} fontStyle={"italic"}
					color="#343C6A" fontSize={"14px"} >(users who have claimed the bonus)</Typography>
			</Typography>
			<StyledWrap>
				<Button
					disableRipple
					color="inherit"
					endIcon={<Iconify icon="ic:round-filter-list" />}
					onClick={() => handleToggleFilterSidebar(true)}
				>
					Filters&nbsp;
				</Button>
				<IconButton aria-label="delete" color="primary" onClick={onRefreshPurchases}>
					<Iconify icon={'mdi:refresh'} width={30} />
				</IconButton>
				<ButtonExport
					sx={{ 
						marginLeft: 5, px: 5, 
						bgcolor: "purple.dark",
						"&:hover": {
							bgcolor: "purple.main"
						}
					}}
					onClick={() => onExportPurchasesList.mutate()}
					loading={onExportPurchasesList.isPending}
				/>
			</StyledWrap>
		</StyledRoot>
	)
}

export default Toolbar;