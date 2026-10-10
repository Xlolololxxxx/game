import { Helmet } from "react-helmet-async"

import PartnersBody from "./body"
import CreateSuccess from "./create-success"
import PartnersProvider from "./provider"

export default function ManagePartners() {
    return (
        <PartnersProvider>
            <>
                <Helmet>
                    <title> Control Panel | Manage Partners </title>
                </Helmet>

                <CreateSuccess />
                <PartnersBody />
            </>
        </PartnersProvider>
    )
}