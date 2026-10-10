import React from "react"

import { Helmet } from "react-helmet-async"

import ManageLicensesProvider from './provider'
import Body from './body';

const ManageLicenses = () => {
    return (
        <ManageLicensesProvider>
            <>
                <Helmet>
                    <title> Control Panel | Manage Licenses </title>
                </Helmet>

                <Body />
            </>
        </ManageLicensesProvider>
    )
};

export default ManageLicenses;