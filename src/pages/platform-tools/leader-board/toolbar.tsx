import { Box, Button, Typography } from "@mui/material";
import ButtonExport from "@src/components/buttons/button-export";
import { StyledRoot } from "@src/sections/@dashboard/styles.css";
import DateSelected from "./date-selected";
import { useLeaderBoardService } from "./hooks";
import { useLeaderBoardContext } from "./provider";

const Toolbar = () => {
	const { state, handleSwitchCoinType } = useLeaderBoardContext();
	const { onExportUsersList } = useLeaderBoardService();

	return (
		<StyledRoot 
			sx={{
				gap: 1,
				pl: 0,
				width: "100%",
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
					sm: 'flex-end',
					xs: 'flex-end',
				}
			}}>
				<Box display={"flex"} flex={1} gap={2} alignItems={"center"}>
					<Typography variant="h5" >
						WEEKLY LEADERBOARD RANKING
					</Typography>
					<Button 
						variant={state.coinTypeId === 1 ? "contained" : "text"}
						onClick={() => handleSwitchCoinType(1)} >
						SILVER
					</Button>
					<Button 
						variant={state.coinTypeId === 2 ? "contained" : "text"}
						onClick={() => handleSwitchCoinType(2)} >
						GOLD
					</Button>
				</Box>
				<DateSelected />
				<ButtonExport
					variant="text"
					disableRipple
					disableElevation
					sx={{
						color: "white",
						width: {
							xl: "auto",
							lg: "auto",
							md: "auto",
							sm: "100%",
							xs: "100%",
						},
						px: 6, 
						height: 54, 
						bgcolor: "purple.dark",
						"&:hover": {
							bgcolor: "purple.main"
						}
					}}
					onClick={() => onExportUsersList.mutate({})}
					// onClick={onRefreshUsers}
					loading={onExportUsersList.isPending}
				/>
		</StyledRoot>
	)
}

export default Toolbar