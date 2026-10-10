import { Box, Grid } from "@mui/material";
import ButtonBack from "@src/components/buttons/button-back";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { AppWidgetSummary } from "@src/sections/@dashboard/app";
import palette from '@src/theme/palette';
import { useNavigate } from "react-router-dom";
import { usePlatformToolsServices } from "../overview/hooks";

const Header = () => {
	const navigate = useNavigate();
	const { partner } = usePartnerDropdownContext();
	const { mostPopularGoldShopItem } = usePlatformToolsServices({});

	return (
		<>
			<ButtonBack onClick={() => navigate(-1)} />
			<Box display="flex" flexDirection="row" gap={3}>
				<Grid container spacing={{
            xl: 2.5,
            lg: 2.5,
            md: 2.5,
            sm: 1.5,
            xs: 1.5
          }}>
					{partner !== "palmsplay" && <Grid item xs={12} sm={6} md={3} >
						<AppWidgetSummary
							disabled
							title="Popular Gold Shop Item"
							value={mostPopularGoldShopItem?.description}
							color={palette.orangeYellow.main}
							icon={'mdi:cart'}
							valueProps={{
								variant: "h5",
							}}
						/>
					</Grid>}
				</Grid>
			</Box>
		</>
	)
}

export default Header