import { Container, Grid } from "@mui/material";
import SvgColor from "@src/components/svg-color";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { AppWidgetSummary } from "@src/sections/@dashboard/app";
import palette from '@src/theme/palette';
import moment from "moment";
import { useMemo } from "react";
import { useRedeemTransactionsService } from "./hooks";
import { useRedeemTransactionsContext } from "./provider";

const Header = () => {
	const { partner } = usePartnerDropdownContext();
	const { state } = useRedeemTransactionsContext();
	const { rewardsTotal, goldEchangeTotal } = useRedeemTransactionsService({ allowFetchStats: true});
	const title = useMemo(() => {
		let label = "Amount of GWz Gold";
		if(partner === "fortune8"){
			label = "Amount of GWz Gold";
		}else if(partner === "palmsplay"){
			label = "Amount of PG Redeemed";
		}else if(partner === "gambly"){
			label = "Total Sweeps Coins Redeemed (Rewards)";
		}else {
			label = "Amount of Gold";
		}

		return label
	},[partner]);

	const dateLabel = useMemo(() => {
		return state.fromDate && state.toDate ? 
			`${moment(state.fromDate).format("DD MMM YYYY")} - ${moment(state.toDate).format("DD MMM YYYY")}` 
			: `${moment().format("MMMM")}`;
	}, [state.fromDate, state.toDate]);

	return (
		<Container sx={{ my: 1, flexDirection: "row", gap: 3 }}>
			<Grid container spacing={{
					xl: 2.5,
					lg: 2.5,
					md: 2.5,
					sm: 1.5,
					xs: 1.5
				}}>
				<Grid item xs={12} sm={partner === "gambly" ? 6 : 12} md={6} >
					<AppWidgetSummary
						title={title}
						disabled
						value={rewardsTotal}
						color={palette.goldenDream.dark}
						icon={<SvgColor src={`/assets/icons/ic_redeem_palms.svg`} sx={{ width: 24, height: 24 }} />}
						dateValue={dateLabel}
					/>
				</Grid>
				{partner === "gambly" && <Grid item xs={12} sm={6} md={6} >
					<AppWidgetSummary
						disabled
						title={"Total Sweeps Coins Exchanged (Gold Exchange)"}
						value={goldEchangeTotal}
						color={palette.goldenDream.dark}
						icon={<SvgColor src={`/assets/icons/ic_redeem_palms.svg`} sx={{ width: 24, height: 24 }} />}
						dateValue={dateLabel}
					/>
				</Grid>}
			</Grid>
		</Container>
	)
}

export default Header;