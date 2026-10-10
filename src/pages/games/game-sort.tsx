import { useMemo, useState } from 'react';
// @mui
import { Button, Menu, MenuItem, Typography } from '@mui/material';
// component
import Iconify from '@src/components/iconify';
import { useGamesContext } from '@src/pages/games/provider';
import useGameProviders from '@src/hooks/useGameProviders';


const SORT_BY_OPTIONS = [
    { value: 'all', label: 'All', gameTypeId: 0 },
];

export default function GameSort() {
    const [open, setOpen] = useState(null);
    const [selected, setSelected] = useState(SORT_BY_OPTIONS[0]);

    const { onDispatch } = useGamesContext();

    const { gameProviders } = useGameProviders();

    const handleOpen = (event: any) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const onSelectionChange = (option: any) => {
        setOpen(null);
        setSelected(option);
        onDispatch("provider")(option.value);
    };

    const mappedGameProviderOptions = useMemo(() => {
        const options = gameProviders?.map((provider) => {
            return {
                value: provider.id,
                label: provider.name,
            }
        });

        return [
            ...SORT_BY_OPTIONS,
            ...options
        ];
    }, [gameProviders]);

    return (
        <>
            <Button
                color="inherit"
                disableRipple
                // sx={{marginRight: 1}}
                onClick={handleOpen}
                endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
            >
                Provider:&nbsp;
                <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {selected.label}
                </Typography>
            </Button>
            <Menu
                keepMounted
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {mappedGameProviderOptions.map((option) => (
                    <MenuItem
                        key={option.value}
                        selected={option.value === selected.value}
                        onClick={() => onSelectionChange(option)}
                        sx={{ typography: 'body2' }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
