import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CourseIntroduction from './components/CourseIntroduction';
import CourseCurriculum from './components/CourseCurriculum';
import TeacherInfo from './components/TeacherInfo';
import CourseRating from './components/CourseRating';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(courseId: number) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', background: '#fff' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Giới thiệu" {...a11yProps(0)} />
          <Tab label="Nội dung khóa học" {...a11yProps(1)} />
          <Tab label="Thông tin giảng viên" {...a11yProps(2)} />
          <Tab label="Đánh giá" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CourseIntroduction/>
        </TabPanel>
      <TabPanel value={value} index={1}>
        <CourseCurriculum courseId={courseId}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TeacherInfo/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CourseRating/>
      </TabPanel>
    </Box>
  );
}