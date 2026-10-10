// @mui
import { Box, Button, ButtonBase, Card, Stack, Typography, useTheme } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}));

type AppProps = {
  color?: string;
  icon?: React.ReactNode | string;
  activeIcon?: React.ReactNode | string;
  title: string;
  value?: string | number;
  sx?: any;
  noAmount?: boolean;
  labelProps?: any;
  valueProps?: any;
  disabled?: boolean;
  onClick?: (args?: any) => void;
  hasViewData?: boolean;
  onClickViewData?: () => void;
  dateValue?: any;

}

export default function AppWidgetSummary({ title, value, icon, color = '#111111', dateValue, activeIcon,
  sx, labelProps, valueProps, noAmount, disabled, onClick, hasViewData, onClickViewData }: AppProps) {
    const theme: any = useTheme();

  return (
    <Card sx={{
      boxShadow: 0,
      height: {
        xl: "120px",
        lg: "120px",
        md: "110px",
        sm: "85px",
        xs: "85px",
      },
      borderRadius: {
        xl: "25px",
        lg: "20px",
        md: "20px",
        sm: "15px",
        xs: "15px",
      },
      ...sx,
    }}
    >
      <ButtonBase disabled={disabled} disableRipple onClick={onClick} 
        sx={{
          display: "flex", 
          pl: {
            xl: "20px",
            lg: "20px",
            md: "10px",
            sm: "8px",
            xs: "8px",
          },
          pr: "10px",
          gap: "0.7rem", 
          width: "100%",
          height: "100%",
          justifyContent: 'flex-start',
          alignItems: "center",
          flexDirection: "row"
        }}>
        <Box>
          <StyledIcon
            sx={{
              color,
              backgroundImage: () =>
                `linear-gradient(135deg, ${alpha(color, 0)} 0%, ${alpha(
                  color,
                  0.24
                )} 100%)`,
              width: {
                xl: theme.spacing(7.2),
                lg: theme.spacing(7.2),
                md: theme.spacing(7.2),
                sm: theme.spacing(4.5),
                xs: theme.spacing(4.5),
              },
              height: {
                xl: theme.spacing(7.2),
                lg: theme.spacing(7.2),
                md: theme.spacing(7.2),
                sm: theme.spacing(4.5),
                xs: theme.spacing(4.5),
              }
            }}
          >
            {typeof icon === 'string' ? 
            <Iconify icon={icon} 
              width={{
                xl: 25,
                lg: 25,
                md: 22,
                sm: 18,
                xs: 18,
              }} 
              height={{
                xl: 25,
                lg: 25,
                md: 22,
                sm: 18,
                xs: 18,
              }} /> : icon}
          </StyledIcon>
        </Box>
        <Box >
          <Typography variant="subtitle2"
            color="#718EBF"
            fontFamily={"Inter"}
            fontSize={{
              xl: "12px",
              lg: "10px",
              md: "10px",
              sm: "10px",
              xs: "10px",
            }}
            textAlign={"left"}
            {...labelProps} >
            {title}
          </Typography>
          <Stack width="auto" direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            {noAmount ? null : <Typography
              variant="h4" 
              fontFamily={"Inter"}
              textAlign={"left"}
              fontSize={{
                xl: "19px",
                lg: "17px",
                md: "17px",
                sm: "11px",
                xs: "11px",
              }}
              {...valueProps} >
              {value}
            </Typography>}
            {activeIcon && <Box sx={{ position: "absolute", right: "10%"}}>
              <Iconify icon={activeIcon} width={25} height={25} color="#4673FE" />
            </Box>}
          </Stack>
        <Typography 
          variant="h4" 
          fontFamily={"Inter"}
          textAlign={"left"}
          sx={{
            position: "absolute",
            marginTop: {
              xl: "3%",
              lg: "3%",
              md: "1%",
              sm: "1%",
              xs: "1%",
            },
            color: "#84A3FF",
            fontSize: {
              xl: "10px",
              lg: "9.1px",
              md: "9px",
              sm: "10px",
              xs: "10px",
            }
          }}
          {...valueProps} >
          {dateValue}
        </Typography>
      </Box>
      </ButtonBase>
     
      {hasViewData && <Button
        onClick={onClickViewData}
        sx={{
          position: "absolute",
          bottom: '3%',
          right: '5%',
          color: "#84A3FF",
          fontSize: {
            xl: "10px",
            lg: "9px",
            md: "9px",
            sm: "9px",
            xs: "9px",
          }
        }}
        endIcon={<Iconify icon="mdi:chevron-right" width={18} />}
      >View Data</Button>}
    </Card>
  );
}
