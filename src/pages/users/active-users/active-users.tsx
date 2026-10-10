import { Helmet } from 'react-helmet-async'

import ActiveUsersBody from './active-users-body'

type Props = {}

const ActiveUsers = (props: Props) => {
    return (
        <>
            <Helmet>
                <title> Active Users </title>
            </Helmet>
            <ActiveUsersBody />
        </>
    )
}

export default ActiveUsers