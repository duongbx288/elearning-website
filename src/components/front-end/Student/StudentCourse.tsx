import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CourseService from '../../../services/CourseService';
import StudentCourseService, {
  StudentCourseType,
} from '../../../services/StudentCourseService';

interface CustomState {
  id: number;
}

const StudentCourse = () => {
  const location = useLocation();
  const student = location.state as CustomState;
  const navigate = useNavigate();

  const [courses, setCourses] = useState<StudentCourseType[]>([]);
  const [favoriteList, setFavoriteList] = useState<StudentCourseType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [studentId, setStudentId] = useState<number>(0);

  useEffect(() => {
    if (student != null && typeof student !== 'undefined') setStudentId(student.id);
  }, [student]);

  useEffect(() => {
    StudentCourseService.getByStudentId(studentId).then((res) => {
      if (res.data) {
        setCourses(res.data);
        console.log(res.data);
      }
    });
  }, [studentId]);

  const renderCourseList = (courseList: StudentCourseType[]) => {
    if (courseList && courseList.length > 0) {
      return (
        <Grid container>
          {courseList.map((course) => {
            return (
              <Grid item xs={3}>
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
                     component={"img"}
                    //  alt="image_alt.PNG"
                     src={course.cover}
                    ></Box>
                  </CardContent>
                  <CardActions sx={{margin: 1}}>
                    <Button onClick={() => {
                        navigate('/study-course/course='+course.courseId+'/student='+course.studentId, {
                            state: { courseId: course.courseId, studentId: course.studentId}
                        });
                    }}
                    variant='contained'
                    color='success'
                    >Vào học</Button>
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
      <Container sx={{ padding: 'auto', background: 'rgb(243, 243, 243)' }}>
        <Box margin={1}>
          <Fragment>
            <Typography variant="h5" sx={{ fontWeight: 500, marginTop: 1 }}>
              Khóa học của bạn
            </Typography>
            {renderCourseList(courses)}
            <Typography variant="h5" sx={{ fontWeight: 500, marginTop: 1 }}>
              Khóa học yêu thích
            </Typography>
            {renderCourseList(favoriteList)}
          </Fragment>
        </Box>
      </Container>
    </>
  );
};

export default StudentCourse;
