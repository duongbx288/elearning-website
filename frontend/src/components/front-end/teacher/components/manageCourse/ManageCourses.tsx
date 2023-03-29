import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService, {
  CourseRequest,
  CourseResponse,
} from '../../../../../services/CourseService';
import { altImage } from '../../../../../utility/Common';

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
            <Grid item xs={3} key={item.id}>
              <Box>
                <Card sx={{ margin: 2 }}>
                  <CardHeader
                    sx={{
                      height: '100px',
                      fontSize: '13px',
                    }}
                    titleTypographyProps={{ fontSize: '20px'}}
                    title={item.name}
                  ></CardHeader>
                  <CardContent>
                    <Box
                      sx={{ height: '100px' }}
                      component={'img'}
                      //  alt="image_alt.PNG"
                      src={item.cover && item.cover != null ? item.cover : altImage}
                    />
                    <Typography></Typography>
                  </CardContent>
                  <CardActions>
                    <Box display={'flex'}>
                    <Button
                      variant={'contained'}
                      onClick={() => {
                        navigate('/course-update/' + item.id + '/teacher/' + teacherId);
                      }}
                      sx={{ marginRight: 1}}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      variant={'outlined'}
                      onClick={() => {
                        navigate('/course-info/' + item.id);
                      }}
                    >
                      Thông tin
                    </Button>
                    </Box>
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          );
        })}
        {courseCreated.length <= 0 ? (
          <>
            <Typography sx={{ marginTop: 3 }}>Giáo viên chưa tạo khóa học nào</Typography>
          </>
        ) : (
          <></>
        )}
      </Grid>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Box>
        <Box marginBottom={3}>
          <Typography variant={'h6'}>Tạo khóa học</Typography>
        </Box>
        <Button
          onClick={() => {
            navigate(`/teacher-page/${teacherId}/create-course`);
          }}
          variant={'outlined'}
        >
          Tạo khóa học
        </Button>
      </Box>
    </Box>
  );
};

export default ManageCourse;
