import { Box, Grid } from "@mui/material";
import { AppWidgetSummary } from "@src/sections/@dashboard/app";
import palette from '@src/theme/palette';
import { usePlatformToolsServices } from "../overview/hooks";
import ButtonBack from "@src/components/buttons/button-back";
import { useNavigate } from "react-router-dom";


const Header = () => {
	const navigate = useNavigate();
	const { mostPopularDeal } = usePlatformToolsServices({});

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
					<Grid item xs={12} sm={6} md={6} >
						<AppWidgetSummary
							disabled
							title="Most Popular Deal"
							value={mostPopularDeal?.description}
							color={palette.peach.darker}
							icon={'mdi:fire'}
							valueProps={{
								variant: "h5",
							}}
						/>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

export default Header