import { Box, Typography, Button, Tabs, Tab, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseService, { CourseRequest } from '../../../../../services/CourseService';
import LessonService, {
  LessonRequest,
  Lesson,
} from '../../../../../services/LessonService';
import { TeacherResponse } from '../../../../../services/TeacherService';
import TabPanel from '../../../../../utility/Tab/TabPanel';
import BasicInfos from './updateComponents/BasicInfos';
import ImageUpload from './updateComponents/ImageUpload';
import LessonInfo from './updateComponents/LessonInfo';

const UpdateCourse = () => {
  const navigate = useNavigate();
  const { id, teacherId } = useParams();
  const temp = {} as CourseRequest;
  const [teacherInfo, setTeacherInfo] = useState<TeacherResponse>();

  // For Tabs
  const [basicInfo, setBasicInfo] = useState<CourseRequest>();
  const [image, setImage] = useState<any>('');
  const [lessons, setLessons] = useState<LessonRequest[]>([]);

  // Every thing
  const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);
  const [courseInfo, setCourseInfo] = useState<CourseRequest>(temp);

  // Tab change
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    courseLessons.sort(function (a, b) {
      return parseFloat(a?.lessonNumber) - parseFloat(b?.lessonNumber);
    });
  }, [courseLessons]);

  useEffect(() => {
    document.title = 'Cập nhật khóa học';
    if (id !== null) {
      CourseService.getById(Number(id)).then((res) => {
        if (res.data) {
          setCourseInfo(res.data);
          setImage(res.data.cover);
          setBasicInfo(res.data);
        }
      });
      LessonService.getByCourseId(Number(id)).then((res1) => {
        if (res1.data) {
          setCourseLessons(res1.data);
          setLessons(res1.data);
        }
      });
    }
  }, []);

  const handleBasicInfo = (info: CourseRequest) => {
    setBasicInfo(info);
  };

  const handleImageURL = (info: any) => {
    setImage(info);
  };

  const handleLesson = (lesson: LessonRequest[]) => {
    setLessons(lesson);
  };

  const updateCourse = () => {
    const courseRequest = {
      id: id,
      teacherId: basicInfo?.teacherId,
      name: basicInfo?.name,
      description: basicInfo?.description,
      introduction: basicInfo?.introduction,
      price: basicInfo?.price ? Number(basicInfo.price) : 0,
      typeId: Number(basicInfo?.typeId),
      link: basicInfo?.link,
      cover: image,
      lessons: lessons,
      createdDate: courseInfo?.createdDate,
    } as CourseRequest;
    console.log(courseRequest);
    CourseService.createCourse(courseRequest).then((res) => {
      if (res.data) {
        console.log('nice');
        navigate(`/teacher-page/`+teacherId);
      }
    })
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
          Cập nhật khóa học
        </Typography>
        <Typography
          sx={{ color: 'white', cursor: 'pointer', marginTop: 1 }}
          onClick={() => {
            navigate('/teacher-page/' + teacherId);
          }}
        >
          Quay lại
        </Typography>
        <Button onClick={updateCourse} variant={'contained'} sx={{ marginTop: 2 }}>
          {' '}
          Cập nhật khóa học
        </Button>
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
            <BasicInfos setBInfo={handleBasicInfo} info={courseInfo} courseId={id} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ImageUpload setCImage={handleImageURL} image={image} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <LessonInfo lesson={lessons} setCLesson={handleLesson} />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateCourse;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
