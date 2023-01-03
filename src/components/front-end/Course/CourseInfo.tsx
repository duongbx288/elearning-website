import React, { useEffect, useState } from 'react';
import CourseService, {
  CourseRequest,
  CourseResponse,
} from '../../../services/CourseService';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Icon,
  Typography,
} from '@mui/material';
import { Star } from '@mui/icons-material';
import BasicTabs from './components/Tab/Tab';
import PurchaseCard from './components/PurchaseCard/PurchaseCard';
import CourseTitle, { CourseTitleProps } from './components/CourseTitle/CourseTitle';
interface CustomerState {
  id: number;
}

const CourseInfo = () => {
  const location = useLocation();
  const course = location.state as CustomerState;
  const navigate = useNavigate();

  const [courseInfo, setCourseInfo] = useState<CourseResponse>();
  const [courseId, setCourseId] = useState<number>(0);

  useEffect(() => {
    if (course !== null && typeof course !== 'undefined') setCourseId(course.id);
  }, [course]);

  useEffect(() => {
    if (course !== null && typeof course !== 'undefined') {
      CourseService.getCourseInfo(course.id).then((res) => {
        console.log(res.data);
        if (res.data) {
          setCourseInfo(res.data);
        }
      });
    }
  }, []);

  const courseTitleProps = {
    courseId: courseInfo?.course?.id,
    typeId: courseInfo?.course?.typeId,
    courseRating: courseInfo?.course?.rating,
    teacherId: courseInfo?.course?.teacherId,
    courseName: courseInfo?.course?.name,
    courseIntroduction: courseInfo?.course?.introduction,
    teacherName: courseInfo?.course?.teacherName,
    studentCount: courseInfo?.studentCount,
  };

  return (
    <>
      <Container sx={{ padding: 'auto', background: 'rgb(243, 243, 243)' }}>
        <Grid container sx={{ margin: 1 }}>
          <Grid item sm={12} margin={2}>
            <CourseTitle info={courseTitleProps} />
          </Grid>
          <Grid item sm={8} margin={2}>
            <div className="ratio ratio-16x9 video">
              <iframe
                src="https://www.youtube.com/embed/7xpja4fejbk"
                title="video"
                allowFullScreen
              ></iframe>
            </div>
          </Grid>
          <Grid item sm={3} margin={2}>
            <PurchaseCard courseId={courseId} />
          </Grid>
        </Grid>
        <Grid container sx={{ margin: 1 }}>
          <Grid item sm={8} margin={2}>
            <BasicTabs courseId={courseId} />
          </Grid>
        </Grid>
      </Container>
      <Typography>
        Similar Course ?
      </Typography>
    </>
  );
};

export default CourseInfo;
