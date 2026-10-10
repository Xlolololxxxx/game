import { useEffect, useState } from 'react';
import MonthlyPalmsPoint from './monthly-palms-point';
import { useSearchParams } from 'react-router-dom';
import PurchaseRecords from './purchase-records';
import { Helmet } from 'react-helmet-async';
import PurchaseProvider from './provider';
import Header from './header';

const PurchaseScreen = () => {
  const [params] = useSearchParams();
  const year = params.get("year");
  const month = params.get("month");
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    if (year && month) {
      setScreen(0);
    }
  }, [year, month]);

  return (
    <PurchaseProvider>
      <Helmet>
        <title> Purchases </title>
      </Helmet>
      <Header sceenIndex={screen} onChangeScreen={setScreen} />
      {screen === 0 ? <PurchaseRecords /> : <MonthlyPalmsPoint />}
    </PurchaseProvider>
  );
}

export default PurchaseScreen;
