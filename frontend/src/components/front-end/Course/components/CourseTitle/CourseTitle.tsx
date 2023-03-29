import { Avatar, Box, Breadcrumbs, Grid, Link, Rating, Typography } from '@mui/material';
import { useEffect, useContext, useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import { Image } from '@mui/icons-material';
import {
  stringToColor,
  stringAvatar,
} from '../../../../../services/helpers/CourseInfoHelpders';
import PeopleIcon from '@mui/icons-material/People';


export interface CourseTitleProps {
  info: {
    courseId?: number | null | undefined;
    typeId?: number | null | undefined;
    courseRating?: number | null | undefined;
    teacherId?: number | null | undefined;
    courseName?: string | null | undefined;
    courseIntroduction?: string | null | undefined;
    teacherName?: string | null | undefined;
    studentCount?: number | null | undefined;
    ratingCount?: number | null | undefined;
  };
}

const CourseTitle = ({ info }: CourseTitleProps) => {
  const navigate = useNavigate();
  const [courseInfo, setCourseInfo] = useState<any>(info);

  const [teacherName, setTeacherName] = useState<string>('');

  useEffect(() => {
    document.title = `Khóa học: ${info.courseName ? info.courseName : ''}`;
  }, [info]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/main');
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="#fff" href="/" onClick={handleClick}>
      Trang chủ
    </Link>,
    // <Link
    //   underline="hover"
    //   key="2"
    //   color="#fff"
    //   href="/material-ui/getting-started/installation/"
    //   onClick={handleClick}
    // >
    //   Core
    // </Link>,
    <Typography key="3" color="#fff">
      {info.courseName}
    </Typography>,
  ];

  const handleTeacher = () => {};

  return (
    <>
      <Box
        margin={1}
        padding={2}
        sx={{ borderRadius: '3px', background: '#0b3955', color: '#ededf0', pb: 1 }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{ color: '#fff' }} fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Grid container padding={2} maxHeight={'30vh'}>
          <Grid item xs={10}>
            <Typography variant="h3" fontWeight={600}>
              {info.courseName}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                marginBottom: '1',
              }}
              variant="h6"
            >
              {info.courseIntroduction}
            </Typography>
          </Grid>
        </Grid>
        <Grid container padding={1}>
          <Grid item xs={4} display={'flex'}>
            <Avatar
              {...stringAvatar(info.teacherName)}
              sx={{ marginRight: '5px', cursor: 'pointer' }}
            ></Avatar>
            <Box
              display={'flex'}
              alignItems="center"
              sx={{ marginRight: '10px', cursor: 'pointer' }}
            >
              <Typography>{`Giảng viên: ${info.teacherName}`}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2} display={'flex'}>
            <Box display={'flex'} alignItems="center">
              <Typography>
                <PeopleIcon/>
                {` ${info.studentCount ? info.studentCount : 0} học viên`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3} display={'flex'}>
            <Box display={'flex'} alignItems="center">
              <Rating
                precision={0.1}
                readOnly
                size="small"
                value={info.courseRating ? info.courseRating : 0}
              />
              <Typography sx={{ fontSize: '14px' }}>
                &nbsp;{info.ratingCount ? info.ratingCount : 0} đánh giá
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CourseTitle;
