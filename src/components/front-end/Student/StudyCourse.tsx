import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Input,
  Snackbar,
  Typography,
} from '@mui/material';
import { borderRadius } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseService, {
  CourseRequest,
  CourseResponse,
} from '../../../services/CourseService';
import LessonService, { Lesson } from '../../../services/LessonService';
import StudentCourseService from '../../../services/StudentCourseService';
import StudentRating from './studyComponents/StudentRating';

// Hoc
const StudyCourse = () => {
  const navigate = useNavigate();
  
  const { studentId, courseId } = useParams();

  const [courseInfo, setCourseInfo] = useState<CourseRequest>();
  const [studentCourse, setStudentCourse] = useState();
  const [studentLessons, setStudentLessons] = useState();
  const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);

  // Rating
  const [rating, setRating] = useState<number>(0);
  const [ratingContent, setRatingContent] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(false);

  // = 1 thi la gioi thieu khoa hoc
  // khac 1 thi la bai hoc
  const [active, setActive] = useState<number>(1);
  const [lessonActive, setLessonActive] = useState<Lesson>();

  useEffect(() => {
    courseLessons.sort(function (a, b) {
      return parseFloat(a?.lessonNumber) - parseFloat(b?.lessonNumber);
    });
  }, [courseLessons]);

  useEffect(() => {}, [active]);

  console.log(active);

  useEffect(() => {
    if (courseId && courseId != null && !isNaN(Number(courseId))) {
      CourseService.getById(Number(courseId)).then((res) => {
        if (res.data) {
          console.log('course', res.data);
          setCourseInfo(res.data);
        }
      });
      LessonService.getByCourseId(Number(courseId)).then((res) => {
        if (res.data) {
          console.log('lesson', res.data);
          setCourseLessons(res.data);
        }
      });

      if (studentId && studentId != null && !isNaN(Number(studentId))) {
        StudentCourseService.getByStudentIdAndCourseId(
          Number(studentId),
          Number(courseId)
        ).then((res) => {
          if (res.data) {
            console.log('studentCourse', res.data);
            setStudentCourse(res.data);
          } else {
            navigate('/student-page/'+studentId);
          }
        });
        
      }
    }
  }, [courseId, studentId]);

  // Đánh giá khóa học
  const handleRatingContent = (e: any) => {
    setRatingContent(e.target.value);
  }

  const handleGiveRating = (e: any) => {
    console.log(rating);
    console.log(ratingContent);
  }

  const handleCheckActive = () => {
    if (active === 1) {
      return (
        <>
          <Box
            border={'1px'}
            overflow={'scroll'}
            maxHeight={'1000px'}
            sx={{ overflowX: 'hidden', overflowY: 'auto', bgcolor: '#fcf6f6' }}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Box width={'90%'}>
              <CardMedia
                height={'500px'}
                width={'100%'}
                src={courseInfo?.link ? courseInfo.link : ''}
                component="iframe"
              ></CardMedia>
            </Box>
            <Box width={'90%'} marginTop={2}>
              <Box>
                <Typography variant="h4" sx={{ color: '#000000' }}>
                  Giới thiệu về khóa học
                </Typography>
                <Typography sx={{ color: '#000000' }}>
                  {courseInfo?.introduction ? courseInfo.introduction : '-----------'}
                </Typography>
              </Box>
              <Divider sx={{ marginTop: 2 }} />
              <Box>
                <Typography variant="h6" sx={{ color: '#000000', marginTop: 1 }}>
                  Mô tả về khóa học
                </Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: courseInfo?.description ? courseInfo.description : '',
                  }}
                ></div>
              </Box>
            </Box>
          </Box>
          <Box padding={5}></Box>{' '}
        </>
      );
    } else {
      return (
        <>
          <Box
            border={'1px'}
            overflow={'scroll'}
            maxHeight={'1000px'}
            sx={{ overflowX: 'hidden', overflowY: 'auto', bgcolor: '#fcf6f6' }}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            { lessonActive?.videoLink ?
              <Box width={'90%'}>
                <CardMedia
                  height={'500px'}
                  width={'100%'}
                  src={lessonActive?.videoLink ? lessonActive.videoLink : ''}
                  component="iframe"
                ></CardMedia>
              </Box> : <></>
            }
            <Box width={'90%'} marginTop={2}>
              <Box>
                <Typography variant="h4" sx={{ color: '#000000' }}>
                  Bài học {lessonActive?.name ? lessonActive.name : ''}
                </Typography>
                <Typography sx={{ color: '#000000' }}>
                  {lessonActive?.introduction ? lessonActive.introduction : '-----------'}
                </Typography>
              </Box>
              <Divider sx={{ marginTop: 2 }} />
              <Box>
                <div
                  dangerouslySetInnerHTML={{
                    __html: lessonActive?.content ? lessonActive.content : '',
                  }}
                ></div>
              </Box>
            </Box>
          </Box>
          <Box padding={5}></Box>{' '}
        </>
      );
    }
  };

  return (
    <>
      <Divider />
      <Grid container>
        <Grid item xs={9} padding={2} sx={{ bgcolor: '#fcf6f6' }}>
          {handleCheckActive()}
        </Grid>
        <Box border={1}></Box>
        <Grid item xs={2.7} padding={2}>
          <Box
            sx={{
              cursor: 'pointer',
              border: '1px solid black',
              borderRadius: '3px',
              margin: 0.5,
              padding: 1,
              height: '80px',
              background: active === 1 ? '#fcf6f6' : '#ffffff',
            }}
            onClick={() => {
              console.log('clicked-course');
              if (courseInfo) {
                setActive(1);
              }
            }}
          >
            <Typography>Giới thiệu khóa học</Typography>
          </Box>
          <Typography>Danh sách bài học:</Typography>
          <Box
            overflow={'scroll'}
            border={1}
            sx={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden' }}
          >
            {courseLessons.map((item) => {
              return (
                <Box
                  sx={{
                    cursor: 'pointer',
                    border: '1px solid black',
                    borderRadius: '3px',
                    margin: 0.5,
                    padding: 1,
                    height: '80px',
                    background: lessonActive?.id === item?.id ? '#fcf6f6' : '#ffffff',
                  }}
                  onClick={() => {
                    console.log('clicked-item');
                    setActive(2);
                    setLessonActive(item);
                  }}
                >
                  <Typography>
                    {`Bai ${item.lessonNumber}: `}
                    {item.name}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Box padding={2}>
            <Typography>Đánh giá khóa học</Typography>
            <StudentRating rating={rating} setRating={setRating}/>
            <Input
                value={ratingContent? ratingContent: ''}
                onChange={handleRatingContent}
            ></Input>
            <Button onClick={handleGiveRating}>Gửi đánh giá</Button>
          </Box>
        </Grid>
      </Grid>
      <Snackbar></Snackbar>
    </>
  );
};

export default StudyCourse;
