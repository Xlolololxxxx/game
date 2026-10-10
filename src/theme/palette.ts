import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  450: '#ADADAD',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const PRIMARY = {
  lighter: '#D1E9FC',
  light: '#76B0F1',
  main: '#2065D1',
  dark: '#103996',
  darker: '#212121',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#44B370',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};

const GREEN = {
  main: '#6AC821',
  dark: '#6AC821',
  darker: '#6AC821',
};

const BLUE = {
  lighter: "#2D60FF10",
  "md-light": "#718EBF",
  light: "#55C1FF",
  main: '#2D60FF',
  dark: '#396AFF',
  darker: '#0E39C1',
};

const PEACH = {
  main: '#FF93B8',
  dark: '#FF93B8',
  darker: '#FF8B8B',
};

const DarkTurquoise = {
  light: "#5AC6BE",
  main: '#16DBCC',
  dark: '#16DBCC',
  darker: '#16DBCC',
};

const VIOLET = {
  light: '#9F99E2',
  main: '#9F99E2',
  dark: '#9F99E2',
  darker: '#9F99E2',
};

const GOLDENDREAM = {
  main: '#E8CF2C',
  dark: '#E8CF2C',
  darker: '#FFC628',
};

const PURPLE = {
  main: '#8F17D9',
  dark: '#6A00AC',
  darker: '#6A00AC',
};

const ORANGEYELLOW = {
  main: '#FFB21D',
  dark: "#FFAF36",
};

const GOLD = {
  main: '#FBDC81',
};

const palette: any = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  green: GREEN,
  blue: BLUE,
  peach: PEACH,
  violet: VIOLET,
  DarkTurquoise,
  goldenDream: GOLDENDREAM,
  orangeYellow: ORANGEYELLOW,
  purple: PURPLE,
  gold: GOLD,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[500],
    label: '#B1B1B1',
  },
  background: {
    paper: '#fff',
    default: GREY[100],
    neutral: GREY[200],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
