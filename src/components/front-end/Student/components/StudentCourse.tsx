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
    // }
  }, [studentId, id]);

  useEffect(() => {

    // Cap nhap cac khoa hoc da hoc tren storage
    var listCourseId = [] as number[];
    if (courses && courses.length > 0) {
      courses.forEach((item) => {
        if (item.courseId) listCourseId.push(item.courseId);
      });
    }
    if (
      localStorage.getItem('user-info') != null &&
      typeof localStorage.getItem('user-info') !== 'undefined'
    ) {
      var userInfo = localStorage.getItem('user-info');
      if (userInfo) {
        var info = { ...JSON.parse(userInfo), listCourses: listCourseId };
        localStorage.setItem('user-info', JSON.stringify(info));
      }
    }
    if (
      sessionStorage.getItem('user-info') != null &&
      typeof sessionStorage.getItem('user-info') !== 'undefined'
    ) {
      var userInfo1 = sessionStorage.getItem('user-info');
      if (userInfo1) {
      var info1 = { ...JSON.parse(userInfo1), listCourses: listCourseId };
      sessionStorage.setItem('user-info', JSON.stringify(info1));
      }
    }
  }, [courses]);

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
                    titleTypographyProps={{ fontSize: '18px'}}
                    title={course.courseName}
                  >
                  </CardHeader>
                  <CardContent sx={{ height: '90px' }}>
                    <Box
                      component={'img'}
                      //  alt="image_alt.PNG"
                      src={course.cover ? course.cover : './Alternate.PNG'}
                    ></Box>
                  </CardContent>
                  <CardActions sx={{ margin: 1 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        navigate(
                          '/study-course/course/' +
                            course.courseId +
                            '/student/' +
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
          <Divider />
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
