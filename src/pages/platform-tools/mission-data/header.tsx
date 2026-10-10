import { Box, Grid } from "@mui/material";
import ButtonBack from "@src/components/buttons/button-back";
import { AppWidgetSummary } from "@src/sections/@dashboard/app";
import palette from '@src/theme/palette';
import { usePlatformToolsServices } from "./hooks";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	const { totalMissionsCompleted } = usePlatformToolsServices({});

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
					<Grid item xs={12} sm={6} md={3} >
						<AppWidgetSummary
							disabled
							title="Missions Completed"
							value={totalMissionsCompleted}
							color={palette.blue.light}
							icon={'mdi:sword-cross'}
						/>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

export default Header