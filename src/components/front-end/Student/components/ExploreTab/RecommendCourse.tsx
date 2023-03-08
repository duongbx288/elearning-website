import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CourseService, { CourseCriteria } from '../../../../../services/CourseService';

const RecommendCourse = ({ studentId }) => {
  const [listCourses, setListCourse] = useState([]);

  const [recommended, setRecommended] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/recommend/get-course/' + studentId).then((res) => {
      console.log(res.data);
      if (res.data.recommend) {
        setListCourse(res.data.recommend);
        console.log(res.data.recommend);
        const criteria = {
            listCourseId: res.data.recommend,
            studentId: studentId,
        } as CourseCriteria;
        CourseService.getRecommendCourse(criteria).then((res) => {
            if(res.data) {
                console.log(res.data);
                setRecommended(res.data);
            }
        })
      }
    });
  }, []);

  return (
    <>
      <Box>
        <Typography></Typography>
        <Grid container>
        <Card sx={{ margin: 2 }}>
          <CardHeader
            sx={{
              height: '80px',
              fontSize: '15px',
            }}
            // title={course.courseName}
          ></CardHeader>
          <CardContent sx={{ height: '90px' }}>
            <Box
              component={'img'}
              //  alt="image_alt.PNG"
            //   src={course.cover}
            ></Box>
          </CardContent>
          <CardActions sx={{ margin: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                // navigate(
                //   '/study-course/course=' +
                //     course.courseId +
                //     '/student=' +
                //     course.studentId,
                //   {
                //     state: {
                //       courseId: course.courseId,
                //       studentId: course.studentId,
                //     },
                //   }
                // );
              }}
            >
              Vào học
            </Button>
          </CardActions>
        </Card>
        <Button></Button>
        </Grid>
      </Box>
    </>
  );
};

export default RecommendCourse;
