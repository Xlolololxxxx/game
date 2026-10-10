import { Box, Typography } from '@mui/material';

import useYAxisWidth from '@src/utils/recharts-helper';
import useScreenSizeHelper from '@src/utils/screensize-helper';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
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
import { usePlatformToolsServices } from './hooks';
import PositionedMenu from './menu';
import { CustomYAxisLabel } from './subscription-number';
import { StyledContainer, StyledMonth } from '@src/sections/@dashboard/app/user-engagements';

const TotalNumberOfPurchase = () => {
	const [period, setPeriod] = useState("MONTHLY");
	const { purchaseChart, refetchPurchaseChart } = usePlatformToolsServices({period});

	const yaxis_width = useYAxisWidth(purchaseChart?.data ?? []);
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

	useEffect(() => {
		if(period){
			refetchPurchaseChart();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[period]);

	return (
		<Box mt={5}>
			<Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
				Total Number of Purchases
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
				<ResponsiveContainer width="100%" height="98%">
					<ComposedChart
						data={purchaseChart?.data ?? []}
						margin={{
							top: 50,
							right: 10,
							bottom: 20,
							left: 10,
						}}>
						<CartesianGrid stroke="#f5f5f5" />
						<XAxis dataKey="label"
							height={25} 
							fontSize={FontYAxis} />
						<YAxis 
							width={yaxis_width} 
							fontSize={FontYAxis} >
							<Label
								content={
									<CustomYAxisLabel 
										label="Total number of purchases" 
										value={purchaseChart?.totalCount} />}
								angle={0}
								dx={0}
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
				{period === "DAILY" && <StyledMonth >
					Month of {moment().format("MMMM")}
				</StyledMonth>}
			</StyledContainer>
		</Box>
	)
}

export default TotalNumberOfPurchase