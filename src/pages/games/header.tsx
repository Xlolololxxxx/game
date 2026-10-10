import { Container, Grid } from "@mui/material";
import { AppWidgetSummary } from "@src/sections/@dashboard/app";
import palette from '@src/theme/palette';
import { useNavigate } from "react-router-dom";
import { useGamesService } from "./hooks";
import { useGamesContext } from "./provider";

const WrappedHeader = () => {
	const navigate = useNavigate();

	const { totalGames, mostPopularGoldGame, mostPopularSilverGame } = useGamesService({
		getMostPopularSilver: true,
		getMostPopularGold: true,
		getTotalGames: true
	});

	return (
		<Container>
			<Grid container 
				spacing={{
					xl: 3,
					lg: 3,
					md: 3,
					sm: 1.5,
					xs: 1.5
				}}>
				<Grid item xs={6} sm={6} md={3.2} >
					<AppWidgetSummary
						title="Total Games"
						value={totalGames}
						color={palette.blue.dark}
						icon={'ion:game-controller'}
						/>
				</Grid>
				<Grid item xs={6} sm={6} md={4} >
					<AppWidgetSummary
						onClick={() => navigate('/dashboard/mostplayed?sort=desc&sortBy=totalSilverBet')}
						title="Most Popular Silver Game"
						value={mostPopularSilverGame}
						color={palette.grey[450]}
						icon={'fa6-solid:medal'}
						valueProps={{
							variant: "h5",
						}}
					/>
				</Grid>
				<Grid item xs={6} sm={6} md={4} >
					<AppWidgetSummary
						onClick={() => navigate('/dashboard/mostplayed?sort=desc&sortBy=totalGoldBet')}
						title="Most Popular Gold Game"
						value={mostPopularGoldGame}
						color={palette.orangeYellow.dark}
						icon={'fa6-solid:medal'}
						valueProps={{
							variant: "h5",
						}}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

const Header = () => {
    const { accessControl } = useGamesContext();
    const { allowDataDisplay } = accessControl || {};

    if (!allowDataDisplay) return null;

    return <WrappedHeader />;
}

export default Header