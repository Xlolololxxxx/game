import { CircularProgress, TableCell, TableRow} from '@mui/material'

type RowLoadingProps = {
  colSpan?: number;
  isLoading?: boolean;
}
const RowLoading = (props: RowLoadingProps) => {

  if(!props.isLoading) return null;

  return (
    <TableRow style={{ height: 200 }}>
      <TableCell align="center" colSpan={props.colSpan || 6}  >
        <CircularProgress />
      </TableCell>
    </TableRow>
  )
}

export default RowLoading;