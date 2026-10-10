import { Box, Grid } from "@mui/material";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { AppWidgetSummary } from "@src/sections/@dashboard/app";
import palette from '@src/theme/palette';
import { useNavigate } from "react-router-dom";
import { usePlatformToolsServices } from "./hooks";

const Header = () => {
	const {
		mostPopularDeal,
		mostPopularGoldShopItem,
		mostPopularShopItem,
		totalMissionsCompleted,
	} = usePlatformToolsServices({});
  const navigate = useNavigate();
	const { partner } = usePartnerDropdownContext();

	return (
		<>
			<Box display="flex" flexDirection="row" gap={3}>
				<Grid container spacing={{
            xl: 2.5,
            lg: 2.5,
            md: 2.5,
            sm: 1.5,
            xs: 1.5
          }}>
					<Grid item xs={6} sm={6} md={3} >
						<AppWidgetSummary
							disabled
							hasViewData
							title="Missions Completed"
							value={totalMissionsCompleted}
							color={palette.blue.light}
							icon={'mdi:sword-cross'}
							onClickViewData={() => navigate('/dashboard/platform-tools/mission-data')}
						/>
					</Grid>
						
					<Grid item xs={6} sm={6} md={3} >
						<AppWidgetSummary
							disabled
							hasViewData
							title="Most Popular Deal"
							value={mostPopularDeal?.description}
							color={palette.peach.darker}
							icon={'mdi:fire'}
							valueProps={{
								variant: "h5",
							}}
							onClickViewData={() => navigate('/dashboard/platform-tools/most-popular-deal')}
							/>
					</Grid>

					{partner !== "palmsplay" && <Grid item xs={6} sm={6} md={3} >
						<AppWidgetSummary
							disabled
							hasViewData
							title="Popular Gold Shop Item"
							value={mostPopularGoldShopItem?.description}
							color={palette.orangeYellow.main}
							icon={'mdi:cart'}
							valueProps={{
								variant: "h5",
							}}
							onClickViewData={() => navigate('/dashboard/platform-tools/gold-shop-data')}
							/>
					</Grid>}

					<Grid item xs={6} sm={6} md={3}>
						<AppWidgetSummary
							disabled
							hasViewData
							title="Popular Shop Item"
							color={palette.DarkTurquoise.light}
							value={mostPopularShopItem?.description}
							icon={'mdi:cart'}
							valueProps={{
								variant: "h5",
							}}
							onClickViewData={() => navigate('/dashboard/platform-tools/shop-data')}
						/>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

export default Header