import { Typography } from "@mui/material";
import { green, red } from '@mui/material/colors';

type Props = { error: boolean, message: string };

export const ErrorMessage = ({ error, message }: Props) => (
    <Typography
        color={error ? green[600] : red[600]}
        fontSize={12}
    >
        {message}
    </Typography>
)