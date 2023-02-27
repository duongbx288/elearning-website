import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CourseService from '../../../../services/CourseService';
import StudentCourseService, {
  StudentCourseType,
} from '../../../../services/StudentCourseService';

interface CustomState {
  id: number;
}

const StudentCourse = ({ id }) => {
  // const location = useLocation();
  // const student = location.state as CustomState;
  const navigate = useNavigate();

  const [courses, setCourses] = useState<StudentCourseType[]>([]);
  const [favoriteList, setFavoriteList] = useState<StudentCourseType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [studentId, setStudentId] = useState<number>(id);

  const getStudentData = (studentId: number) => {
    StudentCourseService.getByStudentId(studentId).then((res) => {
      if (res.data) {
        setCourses(res.data);
        console.log(res.data);
      }
    });
  };

  useEffect(() => {
    // let info = localStorage.getItem('user-info') || sessionStorage.getItem('user-info');
    // let info1 = JSON.parse(info);
    if (id !== null && typeof id !== 'undefined') {
      getStudentData(studentId);
    }
    //   if (
    //     info1.studentId &&
    //     info1.studentId != null &&
    //     typeof info1.studentId === 'number'
    //   ) {
    //     getStudentData(info1.studentId);
    //   }
    // } else {
    //   getStudentData(studentId);
    // }
  }, [studentId]);

  const renderCourseList = (courseList: StudentCourseType[]) => {
    if (courseList && courseList.length > 0) {
      return (
        <Grid container>
          {courseList.map((course) => {
            return (
              <Grid item xs={3} key={course.courseId}>
                <Card sx={{ margin: 2 }}>
                  <CardHeader
                    sx={{
                      height: '80px',
                      fontSize: '15px',
                    }}
                    title={course.courseName}
                  ></CardHeader>
                  <CardContent sx={{ height: '90px' }}>
                    <Box
                      component={'img'}
                      //  alt="image_alt.PNG"
                      src={course.cover}
                    ></Box>
                  </CardContent>
                  <CardActions sx={{ margin: 1 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        navigate(
                          '/study-course/course=' +
                            course.courseId +
                            '/student=' +
                            course.studentId,
                          {
                            state: {
                              courseId: course.courseId,
                              studentId: course.studentId,
                            },
                          }
                        );
                      }}
                    >
                      Vào học
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      );
    } else {
      return (
        <Box padding={1}>
          <Typography sx={{ marginBottom: 1 }}>Hiện tại không có khóa học</Typography>
          <Button variant={'outlined'} onClick={() => navigate('/course')}>
            Thêm khóa học
          </Button>
        </Box>
      );
    }
  };

  return (
    <>
      <Box margin={1}>
        <Fragment>
          <Typography variant="h5" sx={{ fontWeight: 500, marginTop: 1 }}>
            Khóa học của bạn
          </Typography>
          {renderCourseList(courses)}
          <Divider/>
          <Typography variant="h5" sx={{ fontWeight: 500, marginTop: 1 }}>
            Khóa học yêu thích
          </Typography>
          {renderCourseList(favoriteList)}
        </Fragment>
      </Box>
    </>
  );
};

export default StudentCourse;
