import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService, {
  CourseRequest,
  CourseResponse,
} from '../../../../../services/CourseService';

const ManageCourse = ({ teacherId }) => {
  const navigate = useNavigate();

  const [courseCreated, setCourseCreated] = useState<CourseRequest[]>([]);

  useEffect(() => {
    CourseService.getByTeacherId(teacherId).then((res) => {
      if (res.data) {
        console.log(res.data);
        setCourseCreated(res.data);
      }
    });
  }, []);

  return (
    <Box>
      <Typography variant="h4">Các khóa học đã tạo</Typography>
      <Grid container>
        {courseCreated.map((item) => {
          return (
            <Grid item xs={3}>
              <Box>
                <Card sx={{ margin: 2, height: '300px' }}>
                  <CardHeader
                    sx={{
                      height: '100px',
                      fontSize: '13px',
                    }}
                    title={item.name}
                  ></CardHeader>
                  <CardContent>
                    <Box
                      sx={{ height: '50px' }}
                      component={'img'}
                      //  alt="image_alt.PNG"
                      src={item.cover}
                    />
                    {item.name}
                    {item.teacherName}
                  </CardContent>
                  <CardActions>{item.price}</CardActions>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Box>
        <Box> Tạo khóa học </Box>
        <Button onClick={() => {navigate(`/teacher-page/${teacherId}/create-course`)}} variant={'outlined'}>Tạo khóa học</Button>
      </Box>
    </Box>
  );
};

export default ManageCourse;
