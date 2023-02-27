import { Box, Typography, Tabs, Tab } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AffiliateService, { AffiliateResponse } from '../../../services/AffiliateService';
import TabPanel from '../../../utility/Tab/TabPanel';
import ExploreTab from '../Student/components/ExploreTab';
import InfoTab from '../Student/components/InfoTab';
import StudentCourse from '../Student/components/StudentCourse';

const AffiliatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const affiliate = {} as AffiliateResponse;

  const [loading, setLoading] = useState<boolean>(false);

  const [affiliateId, setAffiliateId] = useState<number>(Number(id));
  const [info, setInfo] = useState<AffiliateResponse>(affiliate);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('affiliate', id);
    if (id !== null && typeof id === 'string') {
      AffiliateService.getAffiliateById(Number(id)).then((res) => {
        if (res.data) {
          setInfo(res.data);
        }
      });
    }
  }, [affiliateId, id]);

  // Tab
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box display={'flex'} alignItems={'center'} flexDirection="column">
      <Box sx={{ width: '80%', bgcolor: '#2a004d', padding: 2 }}>
        <Typography variant="h4" sx={{ color: 'white' }}>
          Cộng tác viên: {info?.name}
        </Typography>
        <Box sx={{ p: 3, mt: 1 }} />
      </Box>
      <Box sx={{ width: '80%' }}>
        <Box>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Course" {...a11yProps(0)} />
            <Tab label="Info" {...a11yProps(1)} />
            <Tab label="Explore" {...a11yProps(2)} />
          </Tabs>
          {/* <TabPanel value={value} index={0}>
            <StudentCourse id={id} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <InfoTab id={id} info={info} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ExploreTab id={id} info={info} />
          </TabPanel> */}
        </Box>
      </Box>
    </Box>
  );
};

export default AffiliatePage;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}
