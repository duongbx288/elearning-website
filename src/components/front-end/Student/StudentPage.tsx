import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanelUnstyled } from '@mui/base';
import { Typography } from '@mui/material';
import TabPanel from '../../../utility/Tab/TabPanel';
import { useNavigate, useParams } from 'react-router-dom';
import StudentCourse from './components/StudentCourse';
import StudentService, {StudentResponse} from '../../../services/StudentService';
import InfoTab from './components/InfoTab/InfoTab';
import ExploreTab from './components/ExploreTab/ExploreTab';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import PersonIcon from '@mui/icons-material/Person';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const StudentPage = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const student = {} as StudentResponse;

  const [loading, setLoading] = useState<boolean>(false);

  const [studentId, setStudentId] = useState<number>(Number(id));
  const [studentInfo, setStudentInfo] = useState<StudentResponse>(student);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('student', id);
    if (id !== null && typeof id === 'string') {
      StudentService.getStudentById(Number(id)).then((res) => {
        if(res.data){
          setStudentInfo(res.data);
        }
      });
    }
  }, [studentId, id]);

  // Tab
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box display={'flex'} alignItems={'center'} sx={{bgcolor: '#f6f9fc'}} flexDirection='column'>
      <Box sx={{width: '80%', bgcolor: '#2a004d', padding: 2}}>
        <Typography variant="h4" sx={{ color: 'white'}}>Học viên: {studentInfo?.name}</Typography>
        <Box sx={{ p: 3, mt: 1 }} />
      </Box>
      <Box sx={{ width: '80%', bgColor: '#ffffff' }}>
        <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Khóa học" icon={<LocalLibraryIcon/>} iconPosition="start" {...a11yProps(0)} />
          <Tab label="Thông tin" icon={<PersonIcon/>} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Khám phá" icon={<ManageSearchIcon/>} iconPosition="start" {...a11yProps(2)} />
        </Tabs>
          <TabPanel value={value} index={0}>
            <StudentCourse id={id}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <InfoTab id={id}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ExploreTab id={id} studentInfo={studentInfo}/>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentPage;

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
