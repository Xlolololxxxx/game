import { Container, Grid } from "@mui/material";
import SvgColor from '@src/components/svg-color';
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { AppWidgetSummary } from "@src/sections/@dashboard/app";
import palette from '@src/theme/palette';
import moment from "moment";
import numeral from "numeral";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePurchasesService } from "./hooks";
import { usePurchasesContext } from "./provider";

type Props = {
	sceenIndex: number;
	onChangeScreen: (value: number) => void;
}

const Header = (props: Props) => {
  const navigate = useNavigate();
	const { state } = usePurchasesContext();
	const { totalPurchase } = usePurchasesService();
	const { partner } = usePartnerDropdownContext();

	const onHandlePress = (index: number) => {
		props.onChangeScreen(index);
		navigate("/dashboard/purchase")
	}

	const labelTotalPurchase = useMemo(() => {
		if(partner === "palmsplay"){
			return `Total Palms Points ${state.fromdate && state.todate ? 
				`(${moment(state.fromdate).format("DD MMM YYYY")} - ${moment(state.todate).format("DD MMM YYYY")})` 
				: `(${moment().format("MMMM")})`}`;
		}
		return `Total Amount of $ ${state.fromdate && state.todate ? 
			`(${moment(state.fromdate).format("DD MMM YYYY")} - ${moment(state.todate).format("DD MMM YYYY")})` 
			: `(${moment().format("MMMM")})`}`;

	},[state, partner]);

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
				<Grid item xs={6} sm={6} md={6} >
					<AppWidgetSummary
						onClick={() => onHandlePress(0)}
						title={`Total Purchases ${state.fromdate && state.todate ? 
							`(${moment(state.fromdate).format("DD MMM YYYY")} - ${moment(state.todate).format("DD MMM YYYY")})` 
							: `(${moment().format("MMMM")})`}`}
						value={totalPurchase?.count}
						color={"#16DBCC"}
						icon={<SvgColor src={`/assets/icons/ic_store.svg`} 
							sx={{ width: {
								xl: 24,
								lg: 24,
								md: 24,
								sm: 18,
								xs: 18
							}, height: {
								xl: 24,
								lg: 24,
								md: 24,
								sm: 18,
								xs: 18
							} }} />}
						/>
				</Grid>
				
				<Grid item xs={6} sm={6} md={6} >
					<AppWidgetSummary
						onClick={() => onHandlePress(1)}
						title={labelTotalPurchase}
						activeIcon={props.sceenIndex === 0 ? "mdi:chevron-down" : "mdi:chevron-up"}
						value={numeral(totalPurchase?.totalAmount).format("0,000.00")}
						color={partner === "palmsplay" ? palette.orangeYellow.main : palette.green.main}
						icon={partner === "palmsplay" ? <SvgColor src={`/assets/icons/ic_palm_tree.svg`} 
							sx={{ 
								width: {
									xl: 24,
									lg: 24,
									md: 24,
									sm: 18,
									xs: 18
								}, height: {
									xl: 24,
									lg: 24,
									md: 24,
									sm: 18,
									xs: 18
								}
							}} /> : "solar:dollar-bold"}
					/>
				</Grid>
			</Grid>
		</Container>
)
}

export default Header