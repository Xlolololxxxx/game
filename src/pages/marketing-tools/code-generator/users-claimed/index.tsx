import Body from './body';
import PurchasesFilterSidebar from './filter';
import Provider from './provider';

const UsersClaimed = () => {

  return (
    <Provider>
      <>
        <Body />
        <PurchasesFilterSidebar />
      </>
    </Provider>
  );
}

export default UsersClaimed;
