import React, { useEffect, useState } from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';
import CourseService, {
  CourseRequest,
  CourseResponse,
} from '../../../services/CourseService';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './style.css';
import { Container, Grid, Icon, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import BasicTabs from './components/Tab/Tab';
import PurchaseCard from './components/PurchaseCard/PurchaseCard';
import CourseTitle, { CourseTitleProps } from './components/CourseTitle/CourseTitle';
import CouponService from '../../../services/CouponService';

interface CustomerState {
  id: number;
}

const CourseInfo = () => {
  const location = useLocation();
  const course = location.state as CustomerState;
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [affiliateId, setAffiliateId] = useState(searchParams.get('_affiliateId'));
  const [couponCode, setCouponCode] = useState(searchParams.get('_couponCode'));

  const [loading, setLoading] = useState<boolean>(true);

  const [courseInfo, setCourseInfo] = useState<CourseResponse>();
  const [courseId, setCourseId] = useState<number>(Number(id));
  const [teacherId, setTeacherId] = useState<number>(0);

  // Cookie
  const [cookies1, setCookie1] = useCookies(['affId']);
  const [cookies2, setCookie2] = useCookies(['coupon']);

  useEffect(() => {
    var expire = new Date(Date.now() + 10 * 1000 * 86400);
    var info = {};
    // Tao cookie neu co
    if (course !== null && typeof course !== 'undefined') setCourseId(course.id);
    if (affiliateId && affiliateId !== null && !isNaN(Number(affiliateId))) {
      info['affiliateId'] = affiliateId;
    }
    if (Object.keys(info).length === 0) {
    } else {
      setCookie1('affId', JSON.stringify(info), { path: '/', expires: expire });
    }
  }, [affiliateId, course, setCookie1]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id !== null && typeof id === 'string') {
      CourseService.getCourseInfo(Number(id)).then((res) => {
        if (res.data) {
          setCourseInfo(res.data);
        }
      });
    } else if (course !== null && typeof course !== 'undefined') {
      CourseService.getCourseInfo(course.id).then((res) => {
        if (res.data) {
          setCourseInfo(res.data);
        }
      });
    }
  }, [course, id, searchParams]);

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
                  <iframe
                    src={
                      courseInfo?.course.link && courseInfo?.course.link !== null
                        ? courseInfo?.course.link
                        : "https://www.youtube.com/embed/KcQoJS9R6Lk"
                    }
                    title="video"
                    allowFullScreen
                    allow="accelerometer; autoplay;"
                  ></iframe>
              </div>
            </Grid>
            <Grid item sm={4} padding={2}>
              {/* <PurchaseCard info={courseInfo?.course} /> */}
              <PurchaseCard
                info={courseInfo?.course}
                affiliateId={affiliateId}
                couponCode={searchParams.get('_couponCode')}
              />
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
      {/* <Typography>Similar Course</Typography>
      <Typography>Khóa học từ giáo viên</Typography> */}
    </>
  ) : (
    <></>
  );
};

export default CourseInfo;
