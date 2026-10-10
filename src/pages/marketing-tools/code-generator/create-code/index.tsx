import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import ReferralCode from './referral-code';
import SocialLink from './social-link';

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
      {value === index && <Box sx={{ p: 3, px: {
        xl: 3,
        lg: 3,
        md: 3,
        sm: 0,
        xs: 0,
      } }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CreateCode() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ width: '100%', height: "100%", minHeight: "717px", 
      px: {
        xl: "30px",
        lg: "30px",
        md: "30px",
        sm: "25px",
        xs: "25px",
      }, py: "15px", borderRadius: "25px" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Social Link (URL)" {...a11yProps(0)} />
          <Tab label="Referral Code" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SocialLink />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ReferralCode />
      </CustomTabPanel>
    </Card>
  );
}