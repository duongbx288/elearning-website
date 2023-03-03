import { Avatar, Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stringAvatar } from '../../../../services/helpers/CourseInfoHelpders';
import { StudentResponse } from '../../../../services/StudentService';

const InfoTab = ({ id, studentInfo }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<StudentResponse>(studentInfo);
  const [sId, setSId] = useState<number>(Number(id));

  const handleClick = () => {};

  return (
    <Box>
      <Grid container>
        <Grid item xs={3}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ border: '1px solid black', borderRadius: '5px', padding: 2, margin: 3 }}
          >
            <Box padding={3}></Box>
            <Avatar
              alt={''}
              {...stringAvatar(info.name)}
              src={info.avatar}
              sx={{ height: '170px', width: '170px', mb: 2 }}
            ></Avatar>
            <Typography variant="h5">{info.name}</Typography>
            <Button onClick={handleClick} variant={'outlined'} sx={{ mt: 1 }}>
              Cập nhập thông tin
            </Button>
            <Box padding={6}></Box>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{ border: '1px solid black', borderRadius: '5px', padding: 2, margin: 3 }}
          >
            <Typography variant="h4">Thông tin học viên</Typography>
            <Divider sx={{ marginBottom: 2, marginTop: 1 }} />

            <Typography sx={{fontSize: '18px'}}> Mã học viên: {info.studentCode}</Typography>

            <Typography sx={{fontSize: '18px'}}> Ngày sinh:  ---</Typography>

            <Typography sx={{fontSize: '18px'}}> Email: {info.email}</Typography>

            <Typography sx={{fontSize: '18px'}}>Địa chỉ: {info.address}</Typography>

            <Typography sx={{fontSize: '18px'}}>Thành phố: {info.city}</Typography>

            {/* <Typography sx={{fontSize: '18px'}}>Trạng thái: {info.status}</Typography> */}
          </Box>
          <Box
          sx={{ border: '1px solid black', borderRadius: '5px', padding: 2, margin: 3 }}
          >
          <Typography variant="h5">Thống kê thông tin học</Typography>
          <Divider sx={{ marginBottom: 2, marginTop: 1 }} />
          
          <Typography sx={{fontSize: '18px'}}> Số khóa học đã mua: ---</Typography>
          <Typography sx={{fontSize: '18px'}}> Số khóa học đã hoàn thành: ---</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoTab;
