import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AffiliateService, { AffiliateRequest } from '../../../services/AffiliateService';
import { useAppSelector } from '../../../store/hooks';
import './style.css';

const AffiliateRegister = () => {
  const navigate = useNavigate();

  // Affiliate Info
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [avatar, setAvatar] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [facebook, setFacebook] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // User-info
  const [username, setUsername] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>();

  // Login menu
  const account = useAppSelector((state) => {
    return state.authentication.account;
  });

  useEffect(() => {
    if (account.username && account.username.length > 0) {
      setUsername(account.username);
      let info = localStorage.getItem('user-info') || sessionStorage.getItem('user-info');
      if (info) {
        var inf = JSON.parse(info);
        if (inf.affiliateId && inf.affiliateId != 0 && inf.affiliateId != null) {
          navigate('/main');
          alert('Người dùng đã có tài khoản affiliate');
        } else {
          setUserInfo(inf);
        }
      } else {
        navigate('/main');
        alert('Có lỗi xảy ra. Xin thử đăng nhập lại');
      }
    } else {
      navigate('/main');
      alert('Người dùng cần đăng nhập vào tài khoản hệ thống để đăng kí cộng tác viên');
    }
  }, []);

  // Handle new info
  const handleNameChange = (e: any) => setName(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handleAddressChange = (e: any) => setAddress(e.target.value);
  const handleFacebookChange = (e: any) => setFacebook(e.target.value);
  const handleBirthDateChange = (value) => {
    setBirthDate(value);
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === '' || regex.test(event.target.value)) {
      setPhoneNumber(event.target.value);
    }
  };

  const handleUpdate = () => {
    const update = {
      // eslint-disable-next-line no-control-regex
      name: name,
      birthDate: birthDate,
      email: email,
      address: address,
      avatar: avatar,
      phoneNumber: phoneNumber,
      facebook: facebook,
      username: username || userInfo?.username || '',
    } as AffiliateRequest;
    AffiliateService.registerAffiliate(update).then((res) => {
        if (res.data) {
            const newInfo = userInfo;
            newInfo['affiliateId'] = res.data.id;
            if (localStorage.getItem('user-info')) {
                localStorage.setItem('user-info', JSON.stringify(newInfo));
            } else {
                sessionStorage.setItem('user-info', JSON.stringify(newInfo));
            }
            navigate('/main');
        }
    })
  };

  return (
    <section id="new-section">
      <Box
        sx={{
          border: '2px solid rgba(255,255,255,0.5)',
          borderRadius: '10px',
          backdropFilter: 'blur(15px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'white',
        }}
        padding={2}
      >
        <Typography variant="h4" sx={{ margin: 3 }}>
          Đăng ký cộng tác viên
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Box marginTop={1} marginBottom={2}>
            <TextField
              placeholder="Tên"
              value={name}
              onChange={handleNameChange}
              label={'Tên'}
              sx={{ marginRight: 3, width: '263px' }}
            ></TextField>
            <TextField
              placeholder="Số điện thoại"
              value={phoneNumber}
              onChange={handlePhoneChange}
              label={'Số điện thoại'}
              sx={{ width: '263px' }}
            ></TextField>
          </Box>
          <Box marginTop={1} marginBottom={2}>
            <TextField
              placeholder="Địa chỉ email"
              value={email}
              type={'email'}
              label={'Địa chỉ email'}
              onChange={handleEmailChange}
              sx={{ marginRight: 3, width: '263px' }}
            ></TextField>
            <TextField
              placeholder="Địa chỉ"
              value={address}
              onChange={handleAddressChange}
              label={'Địa chỉ'}
              sx={{ width: '263px' }}
            ></TextField>
          </Box>
          <Box marginTop={1} marginBottom={2}>
            <TextField
              placeholder="facebook"
              value={facebook}
              onChange={handleFacebookChange}
              label={'Link facebook'}
              sx={{ width: '263px', marginRight: 3 }}
            ></TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Ngày sinh"
                inputFormat="MM/dd/yyyy"
                value={birthDate}
                onChange={handleBirthDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Box marginTop={2} marginBottom={1}>
            <Button variant="contained" fullWidth onClick={handleUpdate}>
              Đăng ký
            </Button>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default AffiliateRegister;
