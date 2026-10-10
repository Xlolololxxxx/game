// @mui
import { Card, Typography } from '@mui/material';

type ItemsProps = {
  title: string;
  value: string;
};

function Items({ title, value }: ItemsProps) {
  return (
    <Card sx={{
      py: 1,
      gap: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      height: {
        xl: "130px",
        lg: "120px",
        md: "110px",
        sm: "130px",
        xs: "130px",
      },
      boxShadow: 5,
      alignItems: "center",
      justifyContent: "center",
      color: "black",
      bgcolor: "white",
    }}
    >
      <Typography id="noWrap" variant="h4"
         fontSize={{
          xl: "16px",
          lg: "16px",
          md: "14px",
          sm: "14px",
          xs: "14px",
        }} textAlign={"center"}>{value}</Typography>
      <Typography variant="subtitle2"
        fontSize={{
          xl: "14px",
          lg: "14px",
          md: "10.6px",
          sm: "10.6px",
          xs: "10.6px",
        }} textAlign={"center"} sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}

export default Items;
