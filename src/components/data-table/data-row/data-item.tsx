import { memo } from 'react';
import {
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';

type DataItemProps = {
  item: any;
  headers: any[];
  disabled?: boolean;
  onPress?: () => void;
};

const DataItem = (props: DataItemProps) => {
  const {  item, headers } = props;

  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      {headers.map((headerItem: any, index: number) => {
        if(headerItem.highlight){
          return (
            <TableCell key={`${index}`} align={headerItem.align || "left"}>
              <Typography variant="subtitle2" noWrap>
                {item[headerItem.id]}
              </Typography>
            </TableCell>
          )
        }
        
        return <TableCell key={`${index}`} align={headerItem.align || "left"}>{item[headerItem.id]}</TableCell>
      })}
    </TableRow>
  );
};

export default memo(DataItem);
