import { Helmet } from "react-helmet-async"
import Body from "./body"
import UserDemographics from "./demographics"
import UserBalance from "./user-balance"
import UserDetailsDialog from "./user-details"
import UserTierLevel from "./user-tier-level"

type Props = {}

const Main = (props: Props) => {
    return (
        <>
            <Helmet>
                <title> Users </title>
            </Helmet>
            <UserDemographics />
            <Body />
            <UserDetailsDialog />
            <UserBalance />
            <UserTierLevel />
        </>
    )
}

export default Main