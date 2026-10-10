import { Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Header from "./header";
import PromotionsData from "./promotions-data";

export default function GoldShopData() {
	return (
		<>
			<Helmet>
				<title> Most Popular Deal </title>
			</Helmet>
      <Container maxWidth="xl">
				<Header />
				<PromotionsData />
			</Container>
		</>
	)
}