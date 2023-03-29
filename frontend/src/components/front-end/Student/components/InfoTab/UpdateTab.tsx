import {
    Alert,
    Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import StudentService, { StudentResponse } from '../../../../../services/StudentService';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../../../../../configs/FireBase';
import StudentUpdate from '../../../../backend/student/StudentUpdate';

const UpdateTab = ({ stuId, studentInfo, setUpdate, setOpen }) => {
  const [name, setName] = useState<string>(studentInfo.name ? studentInfo.name : '');
  const [email, setEmail] = useState<string>(studentInfo.email ? studentInfo.email : '');
  const [birthDate, setBirthDate] = useState<Date>(studentInfo.birthDate);
  const [address, setAddress] = useState<string>(
    studentInfo.address ? studentInfo.address : ''
  );
  const [city, setCity] = useState<string>(studentInfo.city ? studentInfo.city : '');

  const [gender, setGender] = useState<string>(
    studentInfo.gender ? studentInfo.gender : ''
  );

  // Image update
  const [avatar, setAvatar] = useState<string>(
    studentInfo.avatar ? studentInfo.avatar : ''
  );
  const [previewImage, setPreviewImage] = useState(
    studentInfo.avatar ? studentInfo.avatar : ''
  );
  const [imageUpload, setImageUpload] = useState<any>('');
  const [percent, setPercent] = useState<any>();

  // Snackbar
  const [error, setError] = useState<boolean>(false);
  const horizontal = 'center';
  const vertical = 'top'


  const handleNameChange = (e: any) => setName(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handleAddressChange = (e: any) => setAddress(e.target.value);
  const handleCityChange = (e: any) => setCity(e.target.value);
  const handleAvatarChange = (e: any) => setAvatar(e.target.value);
  const handleGenderChange = (e: any) => setGender(e.target.value);
  const handleBirthDateChange = (value) => {
    setBirthDate(value);
  };

  console.log(studentInfo);

  // Snackbar
  const handleErrOpen = () => setError(true);

  const handleUpdate = () => {
    const update = {
      // eslint-disable-next-line no-control-regex
      studentCode: 'student_' + stuId + name.replace(/\s+/g, '').replace(/[^\x00-\x7F]/g, ""),
      id: stuId,
      name: name,
      birthDate: birthDate,
      email: email,
      address: address,
      city: city,
      gender: gender,
      avatar: avatar,
    } as StudentResponse;
    console.log(update);
    StudentService.updateStudent(update)
      .then((res) => {
        if (res.data) {
          console.log('success');
          setOpen(true);
          setUpdate(false);
        }
      })
      .catch((e: Error) => {
        handleErrOpen();
      });
  };


  // Upload avatar
  const handleImageChange = (e: any) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setAvatar(url);
    setPreviewImage(url);
    setImageUpload(e.target.files[0]);
  };

  const handleUploadImage = () => {
    if (!imageUpload) {
      alert('Please choose an image');
    }
    const storageRef = ref(storage, `files/${imageUpload.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageUpload);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent1 = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent1);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setAvatar(url);
        });
      }
    );
  };

  // Quay ve trang thong tin
  const handleReturn = () => {
    setUpdate(false);
  };

  return (
    <Box>
      <Box padding={2} boxShadow={3} margin={0.5} borderRadius={1}>
        <Typography
          sx={{ cursor: 'pointer', ':hover': { color: 'blue' } }}
          onClick={handleReturn}
        >
          <ChevronLeftIcon /> Quay lại
        </Typography>
        <Divider sx={{ marginBottom: 2, marginTop: 1 }} />
        <Typography variant={'h6'} marginBottom={1}>
          Cập nhật thông tin
        </Typography>
        <Grid container padding={2}>
          <Grid item xs={3}>
            <TextField
              value={name}
              label={'Tên'}
              onChange={handleNameChange}
              placeholder={'Tên'}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={email}
              label={'Email'}
              onChange={handleEmailChange}
              placeholder={'Email'}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={city}
              label={'Thành phố'}
              onChange={handleCityChange}
              placeholder={'Thành phố'}
            />
          </Grid>
        </Grid>
        <Grid container padding={2}>
          <Grid item xs={7}>
            <TextField
              value={address}
              onChange={handleAddressChange}
              placeholder={'Địa chỉ'}
              label={'Địa chỉ'}
              fullWidth
              multiline
              maxRows={3}
            />
          </Grid>
          <Grid item xs={3} marginLeft={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Ngày sinh"
                inputFormat="MM/dd/yyyy"
                value={birthDate}
                onChange={handleBirthDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid container>
          <Grid item xs={4} padding={2}>
            <Box boxShadow={3} display='flex' justifyContent={'center'} padding={1}>
                <Avatar 
                alt={''}
                src={previewImage}
                sx={{ objectFit: 'cointain', height: '150px', width: '150px', mb: 2 }}></Avatar>
            </Box>
            </Grid>
            <Grid item xs={5} padding={1} spacing={2}>
              <Typography>Ảnh đại diện</Typography>
              <input type="file" accept="image/*" onChange={handleImageChange}></input>
              <Button variant="outlined" onClick={handleUploadImage}>
                Tải ảnh
              </Button>
              <Typography>
                {typeof percent !== 'undefined'? percent !== 100 ? `${percent} % đã tải` : `Tải ảnh thành công` : ''}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Button onClick={handleUpdate} variant={'outlined'}>Cập nhật thông tin</Button>
      </Box>
      <Snackbar
        open={error}
        sx={{ width: '600px' }}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
        onClose={() => setError(false)}
      >
        <Alert
          variant="filled"
          severity="warning"
          onClose={() => setError(false)}
          sx={{ width: '600px' }}
        >
          Cập nhật không thành công
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateTab;
