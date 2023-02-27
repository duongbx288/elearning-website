import { Avatar, Box, Grid, Pagination, Paper, Rating, Typography } from '@mui/material';
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
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    // CourseService.getRatingOfCourse(courseId).then((res) => {
    //   if (res.data) {
    //     setRatings(res.data);
    //   }
    // });
    CourseService.getRatingOfCoursePag(courseId, pageNum - 1).then((res) => {
      if (res.data) {
        console.log(res.data);
        setRatings(res.data.content);
        setTotalPage(res.data.totalPages);
      }
    });
  }, [pageNum]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNum(value);
  };

  return (
    <>
      <Box>
        <Box marginBottom={2}>
          <Typography variant="h6">Đánh giá</Typography>
        </Box>
        <Box>
          {ratings.map((item) => {
            return (
              <Grid container padding={2} key={item.id} margin={2} sx={{ boxShadow: 1 }}>
                <Grid item marginLeft={1}>
                  {item.avatar && item.avatar !== null ? (
                    <Avatar
                      alt={''}
                      src={item.avatar}
                      sx={{ marginRight: '5px', cursor: 'pointer' }}
                    />
                  ) : (
                    <Avatar
                      {...stringAvatar(item.studentName)}
                      sx={{ marginRight: '5px', cursor: 'pointer' }}
                    />
                  )}
                </Grid>
                <Grid justifyContent={'left'} item xs={9} key={item.id}>
                  <Rating readOnly value={item.value ? item.value : 0} key={item.id} />
                  <Typography variant="h6" sx={{ margin: 0, textAlign: 'left' }}>
                    {item.studentName ? item.studentName : 'Anonymous'}
                  </Typography>
                  <Typography sx={{ textAlign: 'left' }}>{item.content}</Typography>
                  <Typography sx={{ textAlign: 'left', color: 'gray' }}>
                    {item.createdAt ? item.createdAt : ''}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
          <Pagination count={totalPage} page={pageNum} onChange={handleChange} />
        </Box>
      </Box>
    </>
  );
};

export default CourseRating;
