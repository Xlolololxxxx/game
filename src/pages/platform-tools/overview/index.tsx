import { Helmet } from "react-helmet-async";
import Header from "./header";
import TotalNumberOfPurchase from "./total-purchase";
import { Container } from "@mui/material";
import LeaderBoard from "../leader-board";
import SubscriptionNumber from "./subscription-number";

export default function PlatformTools() {
	return (
		<>
			<Helmet>
				<title> Platform Tools </title>
			</Helmet>
      <Container maxWidth="xl">
				<Header />
				<TotalNumberOfPurchase />
				<SubscriptionNumber />
				<LeaderBoard />
			</Container>
		</>
	)
}