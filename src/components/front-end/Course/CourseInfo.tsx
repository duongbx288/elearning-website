import React, { useEffect, useState } from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';
import CourseService, {
  CourseRequest,
  CourseResponse,
} from '../../../services/CourseService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const { id, affiliateId, coupon } = useParams();
  
  const [loading, setLoading] = useState<boolean>(true);
  
  const [courseInfo, setCourseInfo] = useState<CourseResponse>();
  const [courseId, setCourseId] = useState<number>(Number(id));
  const [teacherId, setTeacherId] = useState<number>(0);

  // Cookie
  const [cookies1, setCookie1] = useCookies(['affId']);
  const [cookies2, setCookie2] = useCookies(['coupon']);
  

  useEffect(() => {
    var now = new Date(Date.now() + 10 * 1000 * 86400);

    // Tao cookie neu co 
    var expires = (new Date(Date.now()+ 10 * 86400*1000)).toUTCString();
    if (course !== null && typeof course !== 'undefined') setCourseId(course.id);
    if (affiliateId !== null && typeof affiliateId !== 'undefined') {
      setCookie1('affId', affiliateId, {path: '/', expires: now});
      document.cookie = "cookieName=aff_id; expires=" + expires + ";path=/;"
    }
    if (coupon !== null && typeof coupon !== 'undefined') {
      console.log('getCoupon!', coupon);
      const couponInfo = {
        couponCode: coupon,
        useTime: 0,
      }
      setCookie2('coupon', JSON.stringify(couponInfo), {path: '/', expires: now});
    }


  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id !== null && typeof id === 'string') {
      CourseService.getCourseInfo(Number(id)).then((res) => {
        if (res.data) {
          setCourseInfo(res.data);
          console.log(res.data);
        }
      });
    } else if (course !== null && typeof course !== 'undefined') {
      CourseService.getCourseInfo(course.id).then((res) => {
        if (res.data) {
          setCourseInfo(res.data);
          console.log(res.data);
        }
      });
    }
  }, [course, id]);

  useEffect(() => {
    setTeacherId(courseInfo?.course.teacherId ? courseInfo.course.teacherId : 0);
    setLoading(false);
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

  return !loading ? (
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
      <Typography>Similar Course</Typography>
      <Typography>Khóa học từ giáo viên</Typography>
    </>
  ) : <></>;
};

export default CourseInfo;
