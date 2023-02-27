import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { StudentResponse } from '../../../../services/StudentService';

const ExploreTab = ({ id, studentInfo }) => {
  const [studentId, setStudentId] = useState<number>(id);

  const [info, setInfo] = useState<StudentResponse>(studentInfo);

  useEffect(() => {
    console.log('explore');
  }, []);

  return (
    <Grid container>
      <Grid item xs={3}>
        <Box>
          {/* <Card sx={{ margin: 2 }}>
            <CardHeader
              sx={{
                height: '80px',
                fontSize: '15px',
              }}
              title={course.courseName}
            ></CardHeader>
            <CardContent sx={{ height: '90px' }}>
              <Box
                component={'img'}
                //  alt="image_alt.PNG"
                src={course.cover}
              ></Box>
            </CardContent>
            <CardActions sx={{ margin: 1 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  navigate(
                    '/study-course/course=' +
                      course.courseId +
                      '/student=' +
                      course.studentId,
                    {
                      state: {
                        courseId: course.courseId,
                        studentId: course.studentId,
                      },
                    }
                  );
                }}
              >
                Vào học
              </Button>
            </CardActions>
          </Card> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ExploreTab;
