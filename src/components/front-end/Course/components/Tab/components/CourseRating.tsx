import { Avatar, Box, Grid, Paper, Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CourseService from '../../../../../../services/CourseService';
import {
  stringToColor,
  stringAvatar,
} from '../../../../../../services/helpers/CourseInfoHelpders';

export type Info = {
  info: string;
};

interface CourseInfo {
  courseId: number;
}

const CourseRating: React.FC<CourseInfo> = ({ courseId }: CourseInfo) => {
  const [ratings, setRatings] = useState<any>([]);

  useEffect(() => {
    CourseService.getRatingOfCourse(courseId).then((res) => {
      if (res.data) {
        setRatings(res.data);
      }
    });
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h4">Bình luận</Typography>

        <Paper>
          {ratings.map((item) => {
            return (
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  {item.avatar && item.avatar !== null ? (
                    <Avatar
                      alt={''}
                      src={item.avatar}
                      sx={{ marginRight: '5px', cursor: 'pointer' }}
                    />
                  ) : (
                    <Avatar
                      {...stringAvatar(item.username)}
                      sx={{ marginRight: '5px', cursor: 'pointer' }}
                    />
                  )}
                </Grid>
                <Grid justifyContent={'left'} item xs zeroMinWidth>
                  <Rating value={item.value ? item.value: 0}/>
                  <h4 style={{ margin: 0, textAlign: 'left' }}>{item.username ? item.username : 'Anonymous'}</h4>
                  <p style={{ textAlign: 'left' }}>
                    {item.content}
                  </p>
                  <p style={{ textAlign: 'left', color: 'gray' }}>{item.createdAt ? item.createdAt : ''}</p>
                </Grid>
              </Grid>
            );
          })}
        </Paper>
      </Box>
    </>
  );
};

export default CourseRating;
