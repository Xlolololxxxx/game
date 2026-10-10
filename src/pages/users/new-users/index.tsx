import { Helmet } from 'react-helmet-async'

import ActiveUsersBody from './new-users-body'

type Props = {}

const ActiveUsers = (props: Props) => {
    return (
        <>
            <Helmet>
                <title> New Users </title>
            </Helmet>
            <ActiveUsersBody />
        </>
    )
}

export default ActiveUsers