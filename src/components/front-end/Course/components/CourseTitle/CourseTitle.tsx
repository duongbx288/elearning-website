import { Breadcrumbs, Grid, Link, Rating, Typography } from '@mui/material';
import { useEffect, useContext, useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
  };
}

const CourseTitle = ({ info }: CourseTitleProps) => {
  const [courseInfo, setCourseInfo] = useState<any>(info);

  const [teacherName, setTeacherName] = useState<string>('');

  useEffect(() => {}, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
      MUI
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Core
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Grid container padding={2} maxHeight={'20vh'}>
        <Grid item xs={12}>
          <Typography variant="h3">{info.courseName}</Typography>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <Typography variant="h6">{info.courseIntroduction}</Typography>
      <Typography variant="h6">{info.teacherName}</Typography>
      <Typography variant="h6">{info.teacherId}</Typography>
      <Rating value={info.courseRating ? info.courseRating : 0} />
    </>
  );
};

export default CourseTitle;
