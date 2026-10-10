import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import Security from './security';
import UserProfile from './user-profile';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UserDetails() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Card sx={{ width: {
        xl: "100%",
        lg: "100%",
        md: "90%",
        sm: "90%",
        xs: "90%",
      }, height: "100%", 
      px: {
        xl: "30px",
        lg: "30px",
        md: "10px",
        sm: "10px",
        xs: "10px",
      }, py: "15px", borderRadius: "25px" }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Update User Profile" {...a11yProps(0)} />
            <Tab label="Security" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <UserProfile />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Security />
        </CustomTabPanel>
      </Card>
    </Box>
  );
}