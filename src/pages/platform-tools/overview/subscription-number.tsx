import { Box, Typography } from '@mui/material';

import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';
import useYAxisWidth from '@src/utils/recharts-helper';
import useScreenSizeHelper from '@src/utils/screensize-helper';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
	Area,
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

const SubscriptionNumber = () => {
	const [period, setPeriod] = useState("MONTHLY");
	const { partner } = usePartnerDropdownContext();
	const { subscriptionChart, refetchSubscriptionChart } = usePlatformToolsServices({period});

	const yaxis_width = useYAxisWidth(subscriptionChart?.data ?? []);
	const FontYAxis = useScreenSizeHelper({
		DEFAULT: 16,
		LARGE: 13,
		TABLET: 10,
		MOBILE: 9,
	});

	useEffect(() => {
		if(period){
			refetchSubscriptionChart();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[period]);

	if(["palmsplay", "gambly"].includes(partner)) return null;

	return (
		<Box mt={5}>
			<Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
				Number of Subscriptions
			</Typography>
			<Box 
				p={{
					xl: "20px",
					lg: "20px",
					md: "15px",
					sm: "8px",
					xs: "8px",
				}}
				borderRadius={"25px"} 
				display={"flex"}
				width={"100%"}
				height={350}
				flexDirection={"column"}
				bgcolor={"white"}>
				<PositionedMenu value={period} handleChange={(value: string) => setPeriod(value)} />
				<ResponsiveContainer width="100%" height="94%">
					<ComposedChart
						data={subscriptionChart?.data ?? []}
						margin={{
							top: 50,
							right: 10,
							bottom: 20,
							left: 10,
						}}>
						<CartesianGrid stroke="#f5f5f5" />
						<XAxis dataKey="label" height={25} fontSize={FontYAxis}  />
						<YAxis width={yaxis_width} 
							fontSize={FontYAxis} >
							<Label
								content={<CustomYAxisLabel label="Total number of subscriptions" value={subscriptionChart?.totalCount} />}
								angle={0}
								dx={0}
								dy={-12}
								position="insideLeft"
							/>
						</YAxis>
						<Tooltip />
						<Area type="monotone" dataKey="value" fill="#8884d8" stroke="#8884d8" />
					</ComposedChart>
				</ResponsiveContainer>
				{period === "DAILY" && <Typography variant="h6" alignSelf={"center"} color="#718EBF" >
					Month of {moment().format("MMMM")}
				</Typography>}
			</Box>
		</Box>
	)
}

// Custom Label Component
export const CustomYAxisLabel = ({ viewBox, label, value }: any) => {
  const { x, y } = viewBox;

  return (
    <text x={x} y={y} dy={-27} dx={-10} fill="#000000">
			<Typography
				component="tspan"
				sx={{
					fontSize: {
						xs: 10, // Extra small screens (mobile)
						sm: 12, // Small screens (tablets)
						md: 13, // Medium screens (laptops)
						lg: 14, // Large screens (desktops)
						xl: 17, // Extra-large screens (4K displays)
					},
					fontWeight: "normal",
				}}
			>
				{label}
			</Typography>
			<tspan> </tspan>
			<Typography
				component="tspan"
				sx={{
					fontSize: {
						xs: 10, // Extra small screens (mobile)
						sm: 12, // Small screens (tablets)
						md: 13, // Medium screens (laptops)
						lg: 14, // Large screens (desktops)
						xl: 17, // Extra-large screens (4K displays)
					},
					fontWeight: "bold",
				}}
			>
				{value}
			</Typography>
    </text>
  );
};

export default SubscriptionNumber