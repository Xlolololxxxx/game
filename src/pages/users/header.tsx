import { Container, Grid } from "@mui/material";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { AppWidgetSummary } from "@src/sections/@dashboard/app";
import palette from '@src/theme/palette';
import useScreenSizeHelper from "@src/utils/screensize-helper";
import moment from "moment";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUsersService } from "./hooks";
import { useUsersContext } from "./provider";

const WrappedHeader = () => {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const { partner } = usePartnerDropdownContext();
	const onlyActiveUsers = params.get('activeUsers') === 'true';
	const onlyNewUsers = params.get('newUsers') === 'true';
	const fontStyle = useScreenSizeHelper({
		DEFAULT: { fontSize: "15px", lineHeight: "19px", color: "#5922B8" },
		LARGE: { fontSize: "13px", lineHeight: "18px", color: "#5922B8" },
		MOBILE: { fontSize: "11px", lineHeight: "15px", color: "#5922B8" },
	});
	const { state, handleReset, handleToggleUserDemographics,  } = useUsersContext();
	const { totalUsers, totalUsersThisMonth, totalActiveUsers } = useUsersService({
		fetchTotalUsers: true,
		fetchTotalUsersThisMonth: true,
		fetchTotalActiveUsers: true
	});

	const dateLabel = useMemo(() => {
		if(onlyActiveUsers){
			return state.fromDate && state.toDate ? 
			`${moment(state.fromDate).format("DD MMM YYYY")} - ${moment(state.toDate).format("DD MMM YYYY")}` 
			: `${moment().format("DD MMM YYYY")}`;
		}

		return `${moment().format("DD MMM YYYY")}`;
	}, [state.fromDate, state.toDate, onlyActiveUsers]);

	const dateLabelNewUsers = useMemo(() => {
		if(onlyNewUsers){
			return state.fromDate && state.toDate ? 
			`${moment(state.fromDate).format("DD MMM YYYY")} - ${moment(state.toDate).format("DD MMM YYYY")}` 
			: `${moment().format("MMMM YYYY")}`;
		}

		return `${moment().format("MMMM YYYY")}`;
	}, [state.fromDate, state.toDate, onlyNewUsers]);

	return (
		<Container sx={{ marginBottom: 5 }}>
			<Grid container spacing={{
					xl: 2.5,
					lg: 2.5,
					md: 2.5,
					sm: 1.5,
					xs: 1.5
				}}>
				<Grid item xs={6} sm={6} md={3} >
					<AppWidgetSummary
						title="Total No. of Active Users"
						value={totalActiveUsers || 0}
						color={palette.goldenDream.dark}
						icon={'fa-solid:user-clock'}
						activeIcon={onlyActiveUsers ? "mdi:chevron-up" : "mdi:chevron-down"}
						dateValue={dateLabel}
						onClick={() => {
							handleReset();
							if(onlyActiveUsers){
								return navigate('/dashboard/users');
							}else{
								return navigate('/dashboard/users?activeUsers=true');
							}
						}}
					/>
				</Grid>

				<Grid item xs={6} sm={6} md={3} >
					<AppWidgetSummary
						disabled
						title="Total Users"
						value={totalUsers}
						color={palette.DarkTurquoise.dark}
						icon={'fa-solid:users'}
					/>
				</Grid>

				<Grid item xs={6} sm={6} md={3} >
					<AppWidgetSummary
						title="New Users"
						value={totalUsersThisMonth}
						color={palette.peach.dark}
						icon={'mdi:users-plus'}
						activeIcon={onlyNewUsers ? "mdi:chevron-up" : "mdi:chevron-down"}
						dateValue={dateLabelNewUsers}
						onClick={() => {
							handleReset();
							if(onlyNewUsers){
								return navigate('/dashboard/users');
							}else{
								return navigate('/dashboard/users?newUsers=true');
							}
						}}
					/>
				</Grid>

				{partner !== "palmsplay" && (
					<Grid item xs={6} sm={6} md={3}>
						<AppWidgetSummary
							onClick={() => {
								handleReset();
								navigate('/dashboard/users');
								handleToggleUserDemographics();
							}}
							noAmount
							title="Users Demographics"
							color={palette.violet.dark}
							labelProps={{
								sx: fontStyle,
							}}
							icon={'ic:baseline-equalizer'}
						/>
					</Grid>
				)}
			</Grid>
		</Container>
	)
}

const Header = () => {
	const { accessControl } = useUsersContext();
	const { allowDataDisplay } = accessControl || {};

	if (!allowDataDisplay) return null;

	return <WrappedHeader />;
}

export default Header