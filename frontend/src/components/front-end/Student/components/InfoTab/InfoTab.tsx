import { Alert, Avatar, Box, Button, Divider, Grid, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stringAvatar } from '../../../../../services/helpers/CourseInfoHelpders';
import StudentService, { StudentResponse } from '../../../../../services/StudentService';
import Common from '../../../../../utility/Common';
import UpdateTab from './UpdateTab';

const InfoTab = ({ id }) => {
  const temp = {} as StudentResponse;
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState<StudentResponse>(temp);
  const [sId, setSId] = useState<number>(Number(id));

  const [update, setUpdate] = useState(false);

  // Snackbar
  const [open, setOpen] = useState<boolean>(false);
  const horizontal = 'center';
  const vertical = 'top';
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    setUpdate(true);

    console.log('sdfs');
  };

  useEffect(() => {
    if (id !== null && typeof id === 'string') {
      StudentService.getStudentById(Number(id)).then((res) => {
        if(res.data){
          setStudentInfo(res.data);
        }
      });
    }
  }, [update]);

  return !update ? (
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
              alt={studentInfo.name}
              src={studentInfo.avatar}
              sx={{ height: '170px', width: '80%', mb: 2 }}
            ></Avatar>
            <Typography variant="h5">{studentInfo.name}</Typography>
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

            <Typography sx={{ fontSize: '18px' }}>
              {' '}
              Mã học viên: {studentInfo.studentCode}
            </Typography>

            <Typography sx={{ fontSize: '18px' }}> Ngày sinh: {Common.handleDate(studentInfo.birthDate)}</Typography>

            <Typography sx={{ fontSize: '18px' }}> Email: {studentInfo.email}</Typography>

            <Typography sx={{ fontSize: '18px' }}>Địa chỉ: {studentInfo.address}</Typography>

            <Typography sx={{ fontSize: '18px' }}>Thành phố: {studentInfo.city}</Typography>

            {/* <Typography sx={{fontSize: '18px'}}>Trạng thái: {studentInfo.status}</Typography> */}
          </Box>
          <Box
            sx={{ border: '1px solid black', borderRadius: '5px', padding: 2, margin: 3 }}
          >
            <Typography variant="h5">Thống kê thông tin học</Typography>
            <Divider sx={{ marginBottom: 2, marginTop: 1 }} />

            <Typography sx={{ fontSize: '18px' }}> Số khóa học đã mua: ---</Typography>
            <Typography sx={{ fontSize: '18px' }}>
              {' '}
              Số khóa học đã hoàn thành: ---
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        sx={{ width: '600px' }}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          variant="filled"
          severity="success"
          onClose={() => setOpen(false)}
          sx={{ width: '600px' }}
        >
          Cập nhật thành công!
        </Alert>
      </Snackbar>
    </Box>
  ) : (
    <UpdateTab stuId={id} setOpen={setOpen} studentInfo={studentInfo} setUpdate={setUpdate} />
  );
};

export default InfoTab;
