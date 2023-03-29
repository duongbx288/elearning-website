import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const More = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        padding={3}
        width={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'300px'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage:
              "url('https://www.bu.edu/ctl/files/2022/11/banner-group-learning2-1200x500.jpg')",
            height: '500px',
          }}
          padding={3}
          marginTop={3}
        >
          <Grid container>
            <Grid item xs={7} sx={{ background: 'white' }} padding={4}>
              <Typography
                textAlign={'center'}
                variant={'h4'}
                marginTop={2}
                marginBottom={2}
                sx={{ color: '#000'}}
              >
                Trở thành giảng viên
              </Typography>
              <Typography marginBottom={3} sx={{ color: '#000'}}>
                Giảng viên mọi nơi giảng dạy hàng ngàn học viên tại ELEARN. Chúng tôi cung
                cấp công cụ và kỹ năng để dạy những gì bạn yêu thích.
              </Typography>
              <Button
                sx={{
                  // color: 'white !important',
                  boxShadow: 3,
                  // background: 'black !important',
                  // ':hover': {
                  //   background: '#000055 !important',
                  // },
                  marginBottom: 3,
                }}
                variant={"contained"}
                fullWidth
                onClick={() => navigate('/teacher-register')}
              >
                Đăng ký ngay
              </Button>
            </Grid>
            <Grid item xs={5} padding={3}></Grid>
          </Grid>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          marginTop={4}
          marginBottom={3}
          padding={3}
          sx={{ 
            width:'96vw',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: "url('https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_Internet.jpg')"
          }}
        >
          <Typography textAlign={'center'} variant={'h5'} color={'black'}>
            Trở thành cộng tác viên giới thiệu khóa học với ELEARN
          </Typography>
          <Typography textAlign={'center'} variant={'h5'} color={'black'} marginBottom={2}>
            {' '}
            Dễ dàng - Nhanh chóng - Tin cậy
          </Typography>
          <Button sx={{ width: '400px', }} onClick={() => navigate('/affiliate-register')} variant={'contained'}>
            Trở thành cộng tác viên
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default More;
