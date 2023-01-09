import React, { useEffect, useState } from 'react';
import CourseService, {
  CourseRequest,
  CourseResponse,
} from '../../../services/CourseService';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import { Container, Grid, Icon, Typography } from '@mui/material';
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
  const [teacherId, setTeacherId] = useState<number>(0);

  useEffect(() => {
    if (course !== null && typeof course !== 'undefined') setCourseId(course.id);
  }, [course]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (course !== null && typeof course !== 'undefined') {
      CourseService.getCourseInfo(course.id).then((res) => {
        if (res.data) {
          setCourseInfo(res.data);
          console.log(res.data);
        }
      });
    }
  }, []);

  useEffect(() => {
    setTeacherId(courseInfo?.course.teacherId ? courseInfo.course.teacherId : 0);
  }, [courseInfo]);

  const courseTitleProps = {
    courseId: courseInfo?.course?.id,
    typeId: courseInfo?.course?.typeId,
    courseRating: courseInfo?.course?.rating,
    ratingCount: courseInfo?.course.ratingCount,
    teacherId: courseInfo?.course?.teacherId,
    courseName: courseInfo?.course?.name,
    courseIntroduction: courseInfo?.course?.introduction,
    teacherName: courseInfo?.course?.teacherName,
    studentCount: courseInfo?.studentCount,
  };

  const purchaseCardProps = {};

  return (
    <>
      <Container sx={{ padding: 'auto', background: 'rgb(243, 243, 243)' }}>
        <Grid container sx={{ margin: 1 }}>
          <Grid item sm={12} margin={1}>
            <CourseTitle info={courseTitleProps} />
          </Grid>
          <Grid container item sm={12} margin={2} sx={{ mt: 0 }}>
            <Grid item sm={8} padding={2}>
              <div className="ratio ratio-16x9 video">
                {courseInfo?.course.link ? (
                  <iframe
                    src={courseInfo?.course.link}
                    title="video"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div></div>
                )}
              </div>
            </Grid>
            <Grid item sm={4} padding={2}>
              <PurchaseCard info={courseInfo?.course} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ margin: 1 }}>
          <Grid item sm={8} margin={2}>
            <BasicTabs
              courseId={courseId}
              teacherId={teacherId}
              introduction={courseInfo?.course.introduction}
              description={courseInfo?.course.description}
            />
          </Grid>
        </Grid>
      </Container>
      <Typography>Similar Course ?</Typography>
      <Typography>Khóa học từ giáo viên</Typography>
    </>
  );
};

export default CourseInfo;
