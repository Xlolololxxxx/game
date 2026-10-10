import React, { createContext, useEffect, useState } from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

import { AlertType, ToasterConfig, ToasterProviderContextValueType, ToasterProviderProps } from '@src/lib/types/toaster';

import toasterEventEmitter, { TOASTER_EVENT } from '@src/utils/event-emitter';

const initialConfig = {
    type: AlertType.success,
    title: '',
    message: '',
};

const ToasterContext = createContext<ToasterProviderContextValueType>({} as ToasterProviderContextValueType);

const ToasterProvider = ({ children }: ToasterProviderProps) => {
    const [open, setOpen] = useState(false);
    const [config, setConfig] = useState<ToasterConfig>(initialConfig);

    const triggerOpen = (conf: ToasterConfig) => {
        setOpen(true);
        setConfig(conf);
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        const handleToasterEvent = (config: ToasterConfig) => {
            console.log('toaster event', config)
            triggerOpen(config);
        };

        toasterEventEmitter.on(TOASTER_EVENT, handleToasterEvent);

        return () => {
            toasterEventEmitter.off(TOASTER_EVENT, handleToasterEvent);
        };
    }, []);

    const value = { triggerOpen, triggerClose: handleClose };

    return (
        <ToasterContext.Provider value={value}>
            {children}
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleClose}
                    severity={config.type}
                    variant="standard"
                    sx={{ width: '100%' }}
                >
                    {config.title && <AlertTitle>{config.title}</AlertTitle>}
                    {config.message}
                </Alert>
            </Snackbar>
        </ToasterContext.Provider>
    )
}

export const useToasterContext = () => {
    return React.useContext(ToasterContext);
}

export default ToasterProvider;