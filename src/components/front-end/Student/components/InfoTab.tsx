import { Avatar, Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stringAvatar } from '../../../../services/helpers/CourseInfoHelpders';
import { StudentResponse } from '../../../../services/StudentService';

const InfoTab = ({ id, studentInfo }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<StudentResponse>(studentInfo);
  const [sId, setSId] = useState<number>(Number(id));

  const handleClick = () => {

  }

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
            {info.avatar && info.avatar !== null ? (
              <Avatar
                alt={''}
                src={info.avatar}
                sx={{ height: '200px', width: '200px', mb: 2 }}
              ></Avatar>
            ) : (
              <Avatar
                {...stringAvatar(info.name)}
                sx={{ height: '200px', width: '200px', mb: 2 }}
              ></Avatar>
            )}
            <Typography variant="h5">{info.name}</Typography>
            <Button
                onClick={handleClick}
                variant={"outlined"}
                sx={{ mt: 1}}
            >Cập nhập thông tin</Button>
            <Box padding={6}></Box>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{ border: '1px solid black', borderRadius: '5px', padding: 2, margin: 3 }}
          >
            <Typography variant="h4">Thông tin học viên</Typography>
            <Divider sx={{ marginBottom: 2, marginTop: 1}}/>

            <Typography> Mã học viên: {info.studentCode}</Typography>

            <Typography> Ngày sinh: </Typography>

            <Typography> Email: {info.email}</Typography>

            <Typography>Địa chỉ: {info.address}</Typography>

            <Typography>Thành phố: {info.city}</Typography>

            <Typography>Trạng thái: {info.status}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoTab;
