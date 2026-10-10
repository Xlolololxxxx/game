import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { Box, Container, IconButton, Stack } from "@mui/material";
import { StyledContainer } from "@src/sections/@dashboard/app/user-engagements";
import useYAxisWidth, { CustomMultiLineTick } from '@src/utils/recharts-helper';
import useScreenSizeHelper from "@src/utils/screensize-helper";
import React, { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ButtonGroups from "./button-group";
import { useUsersService } from "./hooks";
import { useUsersContext } from "./provider";

const itemsPerPage = 16;

const WrappedUserDemographics = () => {
	const { demographicsData } = useUsersService({ fetchDemographics: true });
	const { state, onDispatch } = useUsersContext();
	const { showDemographics, selectedDemographicCategory } = state || {};
	const [activeTab, setActiveTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

	const FontYAxis = useScreenSizeHelper({
		DEFAULT: 14,
		LARGE: 10,
		TABLET: 9,
		MOBILE: 8,
	});

	const handleSwitchActiveTab = (newActive: number) => {
		setActiveTab(newActive);

		const categoryObject: any = {
			1: 'gender',
			2: 'age',
			3: 'country',
		}
		onDispatch('selectedDemographicCategory')(categoryObject[newActive]);
	}

	const pageCount = Math.ceil(demographicsData.length / itemsPerPage);

	const currentData = useMemo(() => {
		if(activeTab === 3){

		return demographicsData.slice(
				currentPage * itemsPerPage,
				(currentPage + 1) * itemsPerPage
			);
		}

		return demographicsData;
	},[currentPage, demographicsData, activeTab]);

	const yaxis_width = useYAxisWidth(currentData);

	if (!showDemographics) return null;

	return (
		<Container sx={{ marginTop: 5 }}>
			<Box mb={2}>
				<ButtonGroups 
					activeTab={activeTab}
					onPress={handleSwitchActiveTab} />
			</Box>
			<StyledContainer sx={{
				justifyContent: "flex-end",
				alignItems: "flex-end",
			}}>
				{activeTab === 1 && 
				<Stack display={"flex"} gap={2} width="auto" direction={"row"} pr={2} position={"absolute"} alignSelf={"flex-end"}>
					<Gender label="Male" boxColor="#84A3FF" />
					<Gender label="Female" boxColor="#FF94C0" />
					<Gender label="Other" boxColor="#B1B6BF" />
				</Stack>}
				<Box sx={{ width: "100%", overflowX: "auto", height: "100%" }}>
				<Box sx={{ width: {
					xl: selectedDemographicCategory === 'country' ? "130%" : "100%",
					lg: selectedDemographicCategory === 'country' ? "130%" : "100%",
					md: "100%",
					sm: "900px",
					xs: "900px",
				}, height: "100%" }}>
				<ResponsiveContainer width="100%" height="90%">
					<BarChart
						data={currentData}
						margin={{
							top: 50,
							right: 10,
							bottom: 20,
							left: 10,
						}}
						style={{
							zIndex: 3,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						{selectedDemographicCategory === 'country' ? (
							<XAxis
								dataKey="name"
								textAnchor="end"
								height={60}
								dy={110}
								tick={<CustomMultiLineTick fontSize={FontYAxis} />}
								fontSize={FontYAxis}
								interval={0} // show all ticks
							/>
						) : (
							<XAxis dataKey="name" fontSize={FontYAxis} />
						)}
						<YAxis width={yaxis_width} fontSize={FontYAxis} label={{ value: '', position: 'insideLeft', dy: 20, dx: 0 }} />
						<Tooltip />
						<Bar dataKey="numUsers" shape={<CustomizedBar />} />
					</BarChart>
				</ResponsiveContainer>
				</Box>
				</Box>
				{activeTab === 3 && 
				<Box 
					sx={{
						display: "flex",
						flexDirection: "row",
						position: "absolute",
						zIndex: 21,
					}}>
					<IconButton disabled={currentPage === 0} 
						sx={{p: 0, color: "#4673FE"}} 
						onClick={() => setCurrentPage((prev) => {
							if(prev > 0){
								return prev - 1;
							}
							return prev;
						})}>
						<ChevronLeftOutlinedIcon fontSize={"large"} />
					</IconButton>
					
					<IconButton disabled={currentPage === pageCount - 1} 
						sx={{p: 0, color: "#4673FE"}} 
						onClick={() => setCurrentPage(currentPage + 1)}>
						<ChevronRightOutlinedIcon fontSize={"large"} />
					</IconButton>
				</Box>}
			</StyledContainer>
		</Container>
	)
}

const Gender = (props: any) => {
	return (
		<Box gap={1} display={"flex"} flexDirection={"row"} alignItems={"center"} color="#718EBF">
			<Box width={15} height={15} borderRadius={"5px"} bgcolor={props.boxColor} />
			{props.label}
		</Box>
	)
}

const CustomizedBar = (props: any) => {
  const { x, y, width, height, genderName } = props;

	const color = React.useMemo(() => {
		if(genderName){
			switch(genderName){
				case "MALE":
					return "#84A3FF";
				case "FEMALE":
					return "#FF94C0";
				case "OTHER":
					return "#B1B6BF";
				default:
					return "#8884d8";
			}
		}else{
			return "#8884d8";
		}
	},[genderName]);
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        rx={7} // Rounded corners
        ry={7} // Rounded corners
      />
    </g>
  );
};

const UserDemographics = () => {
	const { accessControl } = useUsersContext();
	const { allowDemoGraphs } = accessControl || {};

	if (!allowDemoGraphs) return null;

	return <WrappedUserDemographics />
}

export default UserDemographics