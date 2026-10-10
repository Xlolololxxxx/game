import { useSearchParams } from "react-router-dom";

import { useMemo } from "react";
import ActiveUsers from "./active-users/active-users";
import Header from "./header";
import Main from "./main";
import NewUsers from "./new-users";
import UsersProvider from "./provider";
import UsersFilterSidebar from "./user-filter";

const UsersPage = () => {
	const [params] = useSearchParams();
	const onlyNewUsers = params.get('newUsers') === 'true';
	const onlyActiveUsers = params.get('activeUsers') === 'true';

	const Component = useMemo(() => {
		if(onlyActiveUsers){
			return <ActiveUsers />;
		}else if(onlyNewUsers){
			return <NewUsers />;
		}else{
			return <Main />;
		}

	},[onlyNewUsers, onlyActiveUsers]);

	return (
		<UsersProvider>
			<>
				<Header />
				{Component}
				<UsersFilterSidebar />
			</>
		</UsersProvider>
	)
}

export default UsersPage