import React, { useEffect, useState } from 'react';
import Header from '../../../common/header/Header';
import Footer from '../../../common/footer/Footer';
import CourseService, { CourseRequest } from '../../../services/CourseService';
import { useLocation, useHistory } from 'react-router-dom';
import './style.css';
import { Button, Card, CardActions, CardContent, Container, Grid, Icon, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import BasicTabs from './components/Tab';
interface CustomerState {
  id: number;
}

const CourseInfo = ({ CartItem, addToCart, decreaseQty }) => {
  const location = useLocation();
  const course = location.state as CustomerState;
  const history = useHistory();

  const [courseInfo, setCourseInfo] = useState<CourseRequest>();

  useEffect(() => {
    CourseService.getById(course.id).then((res) => {
      console.log(res.data);
      if (res.data) {
        setCourseInfo(res.data);
      }
    });
  }, []);

  return (
    <>
      <Header CartItem={CartItem} />
      <Container sx={{ padding: 'auto', background: 'rgb(243, 243, 243)' }}>
        <Grid container sx={{margin: 1}}>
          <Grid item sm={8} margin={2}>
            <div className="ratio ratio-16x9 video">
              <iframe
                src="https://www.youtube.com/embed/vlDzYIIOYmM"
                title="video"
                allowFullScreen
              ></iframe>
            </div>
          </Grid>
          <Grid item sm={3} margin={2}>
              <Card>
                <CardContent>
                  <Typography>Text</Typography>
                  <Button fullWidth>Try</Button>
                  <Button fullWidth>Try</Button>
                  <Star/>
'                </CardContent>
                <CardActions></CardActions>
              </Card>
          </Grid>
        </Grid>
        <Grid container sx={{margin: 1}}>
          <Grid item sm={8} margin={2}>
            <BasicTabs/>
          </Grid>
        </Grid>

      </Container>
      <Footer />
    </>
  );
};

export default CourseInfo;
