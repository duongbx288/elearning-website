import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService, {
  CourseCriteria,
  CourseRequest,
} from '../../../../../services/CourseService';
import { altImage } from '../../../../../utility/Common';

const RecommendCourse = ({ studentId }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [listCourses, setListCourse] = useState([]);

  const [recommended, setRecommended] = useState<CourseRequest[]>([]);
  useEffect(() => {
    setLoading(true);
    var criteria = {} as CourseCriteria;
    axios
      .get('http://127.0.0.1:8000/recommend/get-course/' + studentId)
      .then((res) => {
        console.log(res.data);
        if (res.data.recommend) {
          setListCourse(res.data.recommend);
          console.log(res.data.recommend);
          criteria = {
            listCourseId: res.data.recommend,
            studentId: studentId,
          } as CourseCriteria;
          CourseService.getRecommendCourse(criteria).then((res) => {
            if (res.data) {
              console.log(res.data);
              setRecommended(res.data);
              setLoading(false);
            }
          });
        }
      })
      .catch((error) => {
        console.log('cant get recommend course');
        criteria = {
          listCourseId: [],
          studentId: studentId,
        } as CourseCriteria;
        CourseService.getRecommendCourse(criteria).then((res) => {
          if (res.data) {
            console.log(res.data);
            setRecommended(res.data);
            setLoading(false);
          }
        });
      });
  }, [studentId]);

  return !loading ? (
    <>
      <Box>
        <Typography></Typography>
        <Grid container>
          {recommended.map((item) => (
            <Grid item xs={3}>
              <Card sx={{ margin: 2 }}>
                <CardHeader
                  sx={{
                    display: 'flex',
                    overflow: 'hidden',
                    '& .MuiCardHeader-content': {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                    },
                  }}
                  title={item.name}
                  titleTypographyProps={{ noWrap: true }}
                >
                  <Typography>{item.name}</Typography>
                </CardHeader>
                <CardContent sx={{ height: '120px', width: '100%' }}>
                  <Box
                    component={'img'}
                    alt="Cover image"
                    sx={{ objectFit: 'contain' }}
                    src={item.cover && item.cover !== null ? item.cover : altImage}
                  ></Box>
                </CardContent>
                <CardActions sx={{ margin: 1 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      navigate('/course-info/' + item.id, {
                        state: {
                          id: item.id,
                        },
                      });
                    }}
                  >
                    Xem thông tin
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Button></Button>
        </Grid>
      </Box>
    </>
  ) : (
    <Box display={'flex'} justifyContent={'center'} margin={2}>
      <CircularProgress/>
    </Box>
  )
};

export default RecommendCourse;
