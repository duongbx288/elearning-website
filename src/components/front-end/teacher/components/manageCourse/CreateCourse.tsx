import { Box, Typography, Tabs, Tab, Divider, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseService, { CourseRequest } from '../../../../../services/CourseService';
import { Lesson, LessonRequest } from '../../../../../services/LessonService';
import TeacherService, { TeacherResponse } from '../../../../../services/TeacherService';
import TabPanel from '../../../../../utility/Tab/TabPanel';
import { Course } from '../../../../backend/teachers/TeacherDetail';
import BasicInfos from './components/BasicInfos';
import ImageUpload from './components/ImageUpload';
import LessonInfo from './components/CreateLesson';

const CreateCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const temp = {} as CourseRequest;
  const [teacherInfo, setTeacherInfo] = useState<TeacherResponse>();

  // For Tab
  const [basicInfo, setBasicInfo] = useState<CourseRequest>(temp);
  const [image, setImage] = useState<any>('');
  const [lessons, setLessons] = useState<LessonRequest[]>([]);

  useEffect(() => {
    document.title = 'Tạo khóa học';
    if (id !== null && typeof id === 'string') {
      TeacherService.getTeacherById(Number(id)).then((res) => {
        if (res.data) {
          setTeacherInfo(res.data);
        }
      });
    }
  }, []);

  // Tab
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const createNewCourse = () => {
    const courseRequest = {
      teacherId: basicInfo.teacherId,
      name: basicInfo.name,
      description: basicInfo.description,
      introduction: basicInfo.introduction,
      price: basicInfo.price? Number(basicInfo.price) : 0,
      typeId: Number(basicInfo.typeId),
      link: basicInfo.link,
      rating: 0,
      cover: image,
      lessons: lessons,
      createdAt: null,
      lastModifiedAt: null,
    } as CourseRequest;
    console.log(courseRequest);
    CourseService.createCourse(courseRequest).then((res) => {
      if (res.data) {
        console.log('nice');
        navigate(`/teacher-page/`+id);
      }
    })
  }

  const handleBasicInfo = (info: CourseRequest) => {
    setBasicInfo(info);
  }

  const handleImageURL = (info: any) => {
    setImage(info);
  }

  const handleLesson = (lesson : LessonRequest[]) => {
    setLessons(lesson);
  }

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      sx={{ bgcolor: '#f6f9fc' }}
      flexDirection="column"
    >
      <Box sx={{ width: '80%', bgcolor: '#2a004d', padding: 2 }}>
        <Typography variant="h4" sx={{ color: 'white' }}>
          Giáo viên: {teacherInfo?.name}
        </Typography>
        <Typography sx={{ color: 'white' }}>Tạo khóa học</Typography>
        <Button onClick={createNewCourse}> Tạo khóa học</Button>
        <Box sx={{ p: 3, mt: 1 }} />
      </Box>
      <Box sx={{ width: '80%', bgcolor: '#ffffff' }}>
        <Box>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab
              label="Thông tin cơ bản"
              // icon={<BookIcon />}
              iconPosition="start"
              {...a11yProps(0)}
            />
            <Tab
              label="Ảnh bìa khóa học"
              // icon={<BarChartIcon />}
              iconPosition="start"
              {...a11yProps(1)}
            />
            <Tab
              label="Bài học cho khóa học"
              // icon={<CreditCardIcon />}
              iconPosition="start"
              {...a11yProps(2)}
            />
          </Tabs>
          <Divider />
          <TabPanel value={value} index={0}>
            <BasicInfos setBInfo={handleBasicInfo} BInfo={basicInfo}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ImageUpload setCImage={handleImageURL} image={image}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <LessonInfo lesson={lessons} setCLesson={handleLesson}/>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCourse;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
