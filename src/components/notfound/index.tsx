// @mui
import {
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Typography,
} from '@mui/material';

export default function SearchNotFound(props: any) {

  if(!props.isNotFound) return null;

  return (
    <TableBody>
      <TableRow>
        <TableCell align="center" colSpan={props.colSpan || 6} sx={{ py: 3 }}>
          <Paper
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" paragraph>
              Not found
            </Typography>
            <Typography variant="body2">
              No results found for &nbsp;
              <strong>&quot;{props.filterName}&quot;</strong>.
              <br /> Try checking for typos or using complete words.
            </Typography>
          </Paper>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
