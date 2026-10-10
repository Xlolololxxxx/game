import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useCoinTransactionBetStats from '@src/hooks/useCoinTransactionBetStatsService';
import PositionedMenu from '@src/pages/platform-tools/overview/menu';
import { CustomYAxisLabel } from '@src/pages/platform-tools/overview/subscription-number';
import useYAxisWidth from '@src/utils/recharts-helper';
import useScreenSizeHelper from '@src/utils/screensize-helper';
import moment from 'moment';
import { useMemo, useState } from 'react';
import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Label,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';

const UserEngagementsChart = () => {
	const [period, setPeriod] = useState("MONTHLY");
	const { data } = useCoinTransactionBetStats(period);
	const yaxis_width = useYAxisWidth(data?.data ?? []);

	const FontYAxis = useScreenSizeHelper({
		DEFAULT: 16,
		LARGE: 13,
		TABLET: 10,
		MOBILE: 9,
	});

	const barSize = useMemo(() => {
		switch(period){
			case "DAILY":
				return 11;
			case "THIS_WEEK":
				return 62;
			case "MONTHLY":
				return 25;
			case "YEARLY":
				return 100;
		}
	},[period]);

	console.log("datadata", data)

	return (
		<Box mt={5}>
			<Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
				Engagement Activity
			</Typography>
			<StyledContainer>
				<PositionedMenu value={period} handleChange={(value: string) => setPeriod(value)} />
				<Box sx={{ width: "100%", overflowX: "auto", height: "100%" }}>
				<Box sx={{ width: {
					xl: "100%",
					lg: "100%",
					md: "100%",
					sm: "900px",
					xs: "900px",
				}, height: "100%" }}>
				<ResponsiveContainer width={"100%"} height="98%">
					<ComposedChart
						data={data?.data ?? []}
						margin={{
							top: 50,
							right: 10,
							bottom: 20,
							left: 10,
						}}>
						<CartesianGrid stroke="#f5f5f5" />
						<XAxis dataKey="label" height={25} fontSize={FontYAxis}/>
						<YAxis width={yaxis_width} fontSize={FontYAxis}>
							<Label
								content={
									<CustomYAxisLabel 
										label="Total engagement" 
										value={data?.totalCount} />}
								angle={0}
								dy={-12}
								position="insideLeft"
							/>
						</YAxis>
						<Tooltip />
						<Bar dataKey="value" barSize={barSize} fill="#84A3FF" />
					</ComposedChart>
				</ResponsiveContainer>
				</Box>
				</Box>
				{period === "DAILY" && 
				<StyledMonth>
					Month of {moment().format("MMMM")}
				</StyledMonth>}
			</StyledContainer>
		</Box>
	)
}

export const StyledContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	width: "100%",
	borderRadius: "25px",
	backgroundColor: "white",
	flexDirection: "column",
  [theme.breakpoints.up("lg")]: {
    padding: "20px",
		height: 350
  },
  [theme.breakpoints.down("lg")]: {
    padding: "20px",
		height: 350
  },
  [theme.breakpoints.down("md")]: {
    padding: "15px",
		height: 350
  },
  [theme.breakpoints.down("sm")]: {
		padding: "8px",
		height: 259
  },
  [theme.breakpoints.down("xs")]: {
		padding: "8px",
		height: 259
  },
}));

export const StyledMonth = styled(Typography)(({ theme }) => ({
	alignSelf: "center", color: "#718EBF",

  [theme.breakpoints.up("lg")]: {
    variant: "h6",
		fontWeight: 700
  },
  [theme.breakpoints.down("lg")]: {
    variant: "h6",
		fontWeight: 700
  },
  [theme.breakpoints.down("md")]: {
    variant: "h6",
		fontWeight: 700
  },
  [theme.breakpoints.down("sm")]: {
		variant: "body1",
		fontSize: 12,
		fontWeight: 700
  },
  [theme.breakpoints.down("xs")]: {
		variant: "body1",
		fontSize: 12,
		fontWeight: 700
  },
}));

export default UserEngagementsChart