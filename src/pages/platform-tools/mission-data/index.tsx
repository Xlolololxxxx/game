import { Helmet } from "react-helmet-async";
import Header from "./header";
import TotalNumberOfMissionCompleted from "./total-mission-completed";
import { Container } from "@mui/material";
import MissionActivityTracker from "./mission-activity-tracker";
import MissionActivity from "./mission-activity";

export default function MissionData() {
	return (
		<>
			<Helmet>
				<title> Platform Tools </title>
			</Helmet>
      <Container maxWidth="xl">
				<Header />
				<TotalNumberOfMissionCompleted />
				<MissionActivityTracker />
				<MissionActivity />
			</Container>
		</>
	)
}