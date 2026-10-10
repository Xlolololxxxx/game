import {
    Button,
    TableCell,
    TableRow,
    TextField,
} from '@mui/material';

import { UpdateGameProviderAPIRequestType } from '@src/lib/types/game-providers';
import { useState } from 'react';

const TableRowItem = ({
    item,
    handleUpdatePercentageShare
}: {
    item: UpdateGameProviderAPIRequestType,
    handleUpdatePercentageShare: (item: UpdateGameProviderAPIRequestType) => void
}) => {
    const [newPercentageShare, setNewPercentageShare] = useState<string>();

    return (
        <TableRow hover>
            <TableCell align="left">
                {item.providerName}
            </TableCell>
            <TableCell align="center">
                {item.revenueSharePercent}
            </TableCell>
            <TableCell align="center">
                <TextField
                    type={'number'}
                    value={newPercentageShare}
                    onChange={(e) => setNewPercentageShare(e.target.value)}
                    sx={{
                        width: 110
                    }}
                />
            </TableCell>
            <TableCell>
                <Button
                    size='large'
                    variant={"contained"}
                    onClick={() => {
                        handleUpdatePercentageShare({
                            ...item,
                            revenueSharePercent: Number(newPercentageShare),
                            oldValue: item.revenueSharePercent,
                            newValue: Number(newPercentageShare),
                        });
                    }}
                    disabled={!newPercentageShare}
                    sx={{
                        height: 50,
                        backgroundColor: '#E5EFF4',
                        color: '#457DBF',
                        '&:hover': {
                            backgroundColor: '#E5EFF4',
                        }
                    }}
                >
                    Update
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default TableRowItem;
