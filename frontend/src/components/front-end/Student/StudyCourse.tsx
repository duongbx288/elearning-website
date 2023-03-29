import {
  Box,
  Breadcrumbs,
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
import Link from '@mui/material/Link';
import { useNavigate, useParams } from 'react-router-dom';
import CourseRatingService, {
  CourseRatingRequest,
} from '../../../services/CourseRatingService';
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
  const [ratingSent, setRatingSent] = useState<boolean>(false);
  const [studentRating, setStudentRating] = useState<CourseRatingRequest | null>();

  // = 1 thi la gioi thieu khoa hoc
  // khac 1 thi la bai hoc
  const [active, setActive] = useState<number>(1);
  const [lessonActive, setLessonActive] = useState<Lesson>();

  const breadcrumbs = [
    <Typography
      sx={{ color: '#ffffff', cursor: 'pointer', ':hover': {textDecoration: 'underline'}  }}
      key="1"
      color="text.primary"
      onClick={() => navigate('/main')}
    >
      Trang chủ
    </Typography>,
    <Typography
      sx={{ color: '#ffffff', cursor: 'pointer', ':hover': {textDecoration: 'underline'} }}
      key="2"
      color="text.primary"
      onClick={() => navigate('/student-page/' + studentId)}
    >
      Trang quản lý của học viên
    </Typography>,
    <Typography sx={{ color: '#ffffff' }} key="3" color="text.primary">
      {courseInfo?.name}
    </Typography>,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (studentId && !isNaN(Number(studentId)) && courseId && !isNaN(Number(courseId))) {
      CourseRatingService.getByStudentAndCourseId(
        Number(courseId),
        Number(studentId)
      ).then((res) => {
        if (res.data) {
          console.log(res.data);
          setStudentRating(res.data);
        } else setStudentRating(null);
      });
    }
  }, []);

  // Sap xep vi tri khoa hoc
  useEffect(() => {
    courseLessons.sort(function (a, b) {
      return parseFloat(a?.lessonNumber) - parseFloat(b?.lessonNumber);
    });
  }, [courseLessons]);

  // Lấy thông tin cần thiết
  // + Thông tin khóa học
  // + Thông tin bài học của khóa học
  // + Lấy quá trình học của học viên
  // + Lấy bình luận của học viên về khóa học
  useEffect(() => {
    if (courseId && courseId != null && !isNaN(Number(courseId))) {
      CourseService.getById(Number(courseId)).then((res) => {
        if (res.data) {
          setCourseInfo(res.data);
        }
      });
      LessonService.getByCourseId(Number(courseId)).then((res) => {
        if (res.data) {
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
            navigate('/student-page/' + studentId);
          }
        });
      }
    }
  }, [courseId, studentId]);

  // Đánh giá khóa học
  const handleRatingContent = (e: any) => {
    setRatingContent(e.target.value);
  };

  const handleGiveRating = (e: any) => {
    console.log(rating);
    console.log(ratingContent);
    const newRating = {
      studentId: studentId,
      courseId: courseId,
      content: ratingContent ? ratingContent : '',
      value: rating ? rating : 0,
      status: 'active',
    } as CourseRatingRequest;
    CourseRatingService.createCourseRating(newRating).then((res) => {
      if (res.data) {
        console.log(res.data);
        setStudentRating(res.data);
      }
    });
  };

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
                src={courseInfo?.link && courseInfo?.link != null ? courseInfo.link : "https://www.youtube.com/embed/KcQoJS9R6Lk"}
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
            {/* Vì 1 lý do nào đó chỗ này bị loop hiển thị - cần tìm cách khác để hiển thị video */}
            {/* <Box width={'90%'}>
                <CardMedia
                  height={'500px'}
                  width={'100%'}
                  src={lessonActive?.videoLink ? lessonActive.videoLink : ''}
                  component="iframe"
                ></CardMedia>
              </Box> */}

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

  const handleDate = (date) => {
    if (date) {
      const toString = new Date(date).toLocaleDateString();
      return String(toString);
    } else return '----';
  };

  return (
    <>
      <Divider />
      <Grid container>
        <Grid item xs={9} padding={2} sx={{ bgcolor: '#fcf6f6' }}>
          <Box padding={2} marginBottom={2} sx={{ bgcolor: '#2a004d' }}>
            <Breadcrumbs separator="›" sx={{ color: '#ffffff' }} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
            <Typography sx={{ color: '#ffffff' }} variant="h5">
              Khóa học: {courseInfo?.name}
            </Typography>
          </Box>
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
          <Typography sx={{ marginTop: 1 }}>Danh sách bài học:</Typography>
          <Box
            overflow={'scroll'}
            border={1}
            sx={{
              minHeight: '20px',
              maxHeight: '300px',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {courseLessons.map((item) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    cursor: 'pointer',
                    border: '1px solid black',
                    borderRadius: '3px',
                    margin: 0.5,
                    padding: 1,
                    height: '80px',
                    background:
                      lessonActive?.id === item?.id && active !== 1
                        ? '#fcf6f6'
                        : '#ffffff',
                  }}
                  onClick={() => {
                    console.log('clicked-item');
                    setActive(2);
                    setLessonActive(item);
                  }}
                >
                  <Typography>
                    {`Bài ${item.lessonNumber}: `}
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    Chỉnh sửa lần cuối: {handleDate(item.lastModifiedDate)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          {!studentRating ? (
            <Box padding={2} boxShadow={3} marginTop={2}>
              <Typography marginBottom={2}>Đánh giá khóa học</Typography>
              <StudentRating rating={rating} setRating={setRating} readonly={false} />
              <Input
                value={ratingContent ? ratingContent : ''}
                onChange={handleRatingContent}
              ></Input>
              <Button
                sx={{ marginTop: 2 }}
                variant={'outlined'}
                onClick={handleGiveRating}
              >
                Gửi đánh giá
              </Button>
            </Box>
          ) : (
            <Box padding={2} boxShadow={3} marginTop={2}>
              <Typography marginBottom={2}>Đánh giá của học viên</Typography>
              <StudentRating
                rating={studentRating.value}
                setRating={setRating}
                readonly={true}
              />
              <Typography
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 5,
                }}
              >
                {`Nội dung đánh giá: 
                ${studentRating.content ? studentRating.content : 'Không có bình luận'}`}
              </Typography>
              <Typography>Thời gian: {handleDate(studentRating.createdDate)}</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
      <Snackbar></Snackbar>
    </>
  );
};

export default StudyCourse;
