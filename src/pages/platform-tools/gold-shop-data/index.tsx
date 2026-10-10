import { Helmet } from "react-helmet-async";
import Header from "./header";
import { Container } from "@mui/material";
import GoldShop from "./gold-shop";
import PurchasingUsers from "./purchasing-users";

export default function GoldShopData() {
	return (
		<>
			<Helmet>
				<title> Platform Tools </title>
			</Helmet>
      <Container maxWidth="xl">
				<Header />
				<GoldShop />
				<PurchasingUsers />
			</Container>
		</>
	)
}