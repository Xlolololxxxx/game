import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import Router from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AccessControlProvider } from './context/AccessControl';
import { PartnerDropdownProvider } from './context/PartnerDropdown';
import ToasterProvider from './context/Toaster';
import queryClient from './query-client';
import { useAuthService } from './store/hooks';
import ThemeProvider from './theme';

const WrappedApp = () => {
  const { onCheckAuth } = useAuthService();
  const { mutate: reAuth, isPending: isCheckingAuth } = onCheckAuth

  const isLoading = isCheckingAuth;

  useEffect(() => {
    reAuth();
  }, [reAuth]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Router />
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ToasterProvider>
              <PartnerDropdownProvider>
                <AccessControlProvider>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Bounce}
                  />
                  <WrappedApp />
                </AccessControlProvider>
              </PartnerDropdownProvider>
            </ToasterProvider>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  );
}
