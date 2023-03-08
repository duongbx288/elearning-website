import { Box, Typography, Tabs, Tab, Divider } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TeacherService, { TeacherResponse } from '../../../services/TeacherService';
import TabPanel from '../../../utility/Tab/TabPanel';
import AddLinkIcon from '@mui/icons-material/AddLink';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import BarChartIcon from '@mui/icons-material/BarChart';
import BookIcon from '@mui/icons-material/Book';
import ManageCourse from './components/manageCourse/ManageCourses';
import Income from './components/income/Income';

const TeacherPage = () => {
  const { id } = useParams();
  const teacher = {} as TeacherResponse;

  const [teacherId, setTeacherId] = useState<number>(Number(id));
  const [info, setInfo] = useState<TeacherResponse>(teacher);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('affiliate', id);
    if (id !== null && typeof id === 'string') {
      TeacherService.getTeacherById(Number(id)).then((res) => {
        if (res.data) {
          setInfo(res.data);
        }
      });
    }
  }, [teacherId, id]);

  // Tab
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      sx={{ bgcolor: '#f6f9fc' }}
      flexDirection="column"
    >
      <Box sx={{ width: '80%', bgcolor: '#2a004d', padding: 2 }}>
        <Typography variant="h4" sx={{ color: 'white' }}>
          Giáo viên: {info?.name}
        </Typography>
        <Box sx={{ p: 3, mt: 1 }} />
      </Box>
      <Box sx={{ width: '80%', bgcolor: '#ffffff' }}>
        <Box>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab
              label="Khoá học"
              icon={<BookIcon />}
              iconPosition="start"
              {...a11yProps(0)}
            />
            <Tab
              label="Thông tin cá nhân"
              icon={<BarChartIcon />}
              iconPosition="start"
              {...a11yProps(2)}
            />
            <Tab
              label="Thu nhập"
              icon={<CreditCardIcon />}
              iconPosition="start"
              {...a11yProps(1)}
            />
          </Tabs>
          <Divider />
          <TabPanel value={value} index={0}>
            <ManageCourse teacherId={id} />
          </TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
          <TabPanel value={value} index={2}>
            <Income />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherPage;

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
