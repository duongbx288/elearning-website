import React, { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  TextField,
  Box,
  Typography,
  FormControl,
  Toolbar,
  Button,
  Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoxStyle, ToolbarStyle } from '../../../styles/style';

import WebsiteService from '../../../services/WebsiteService';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateWebsite: React.FC = () => {
  const userInfo =
    typeof localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '')
      : '';

  const [code, setCode] = useState('');
  const [domain, setDomain] = useState('');
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);
  const [errOpen1, setErrOpen1] = useState(false);
  const [errOpen2, setErrOpen2] = useState(false);
  const [errOpen3, setErrOpen3] = useState(false);
  const [errorCode, setErrorCode] = React.useState<String>();
  const [errorDomain, setErrorDomain] = React.useState<String>();
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(userInfo.username);
  }, []);

  // Bấm enter ở textfield sẽ chạy lệnh saveWebsite
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.isTrusted) {
      if (e.repeat) {
        return;
      }
      if (e.key === 'Enter') {
        saveWebsiteInfo();
      }
    } else {
      console.log('Not trusted event-source');
      return;
    }
  };

  // đóng snackbar thông báo
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrOpen(false);
    setErrOpen1(false);
    setErrOpen2(false);
    setErrOpen3(false);
  };

  // kiểm tra thông tin nhập vào
  const handleValidateCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      // Cho phép sử dụng: : / . - _
      let format = /[`!@#$%^&*()+=[\]{};'"\\|,<>?~]/;
      let check = format.test(event.target.value);
      if (check) {
        return 'Nội dung không được chứa kí tự đặc biệt';
      }
      if (event.target.value.length < 1 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 1 kí tự, tối đa 50 kí tự';
      }
    }
  };

  // kiểm tra thông tin nhập vào
  const handleValidateDomain = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      let format = /[`^*()+{};<>]/;
      let check = format.test(event.target.value);
      if (check) {
        return 'Nội dung không được chứa kí tự đặc biệt';
      }
      if (event.target.value.length < 1 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 1 kí tự, tối đa 50 kí tự';
      }
    }
  };

  const changeWebsiteCode = (event: ChangeEvent<HTMLInputElement>): void => {
    setCode((event.target as HTMLInputElement).value);
    setErrorCode(handleValidateCode(event));
  };

  const changeDomain = (event: ChangeEvent<HTMLInputElement>): void => {
    setDomain((event.target as HTMLInputElement).value);
    setErrorDomain(handleValidateDomain(event));
  };

  // Lưu thông tin website
  const saveWebsiteInfo = (): void => {
    if (code.length === 0 || domain.length === 0) {
      setErrOpen1(true);
      return;
    }
    if (
      (errorCode == null || typeof errorCode === 'undefined') &&
      (errorDomain == null || typeof errorDomain === 'undefined')
    ) {
      const WebsiteInfo = {
        id: 0,
        code: code,
        domain: domain,
        createdDate: new Date(),
        createdBy: username,
        webKey: 'code:' + code + ', domain: ' + domain,
      };
      WebsiteService.saveWebsite1(WebsiteInfo, setErrOpen, setErrOpen2, setErrOpen3).then(
        (response) => {
          if (typeof response === 'undefined') {
            return;
          } else if (response.data === 'Add successful!') {
            setOpen(true);
            setTimeout(function () {
              history.goBack();
            }, 3000);
          } else {
            setErrOpen(true);
          }
        }
      );
    } else {
      setErrOpen(true);
      return;
    }
  };

  return (
    <div>
      <Toolbar variant="dense" sx={ToolbarStyle}>
        <Button
          onClick={() => history.goBack()}
          variant="text"
          sx={{
            color: '#637381',
            fontSize: '14px',
            textTransform: 'none',
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: '14px', mr: '5px' }} />
          Quay lại
        </Button>
        <Box sx={{ justifyContent: 'space-between', display: 'inline-flex', gap: 2 }}>
          <Button
            color="error"
            sx={{
              width: '100px',
            }}
            variant="outlined"
            onClick={() => {
              history.push('/website');
            }}
          >
            Thoát
          </Button>
          <Button
            variant="contained"
            sx={{
              width: '100px',
            }}
            onClick={saveWebsiteInfo}
          >
            Lưu
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ m: 5 }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'blue' }}>
          Thêm website mới
        </Typography>
        <Box sx={{ my: 5, mx: 'auto', width: '80%' }} style={BoxStyle}>
          <FormControl sx={{ width: '100%', gap: 3 }}>
            <TextField
              fullWidth
              label="Mã của trang web"
              defaultValue=""
              error={Boolean(errorCode)}
              helperText={errorCode}
              onChange={changeWebsiteCode}
              onKeyDown={handleKeyDown}
            />
            <TextField
              fullWidth
              label="Tên website"
              error={Boolean(errorDomain)}
              helperText={errorDomain}
              onChange={changeDomain}
              onKeyDown={handleKeyDown}
            />
          </FormControl>
        </Box>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="success" sx={{ width: '500px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
            Lưu thành công!
          </Alert>
        </Snackbar>
        <Snackbar open={errOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '500px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
            Lưu không thành công
          </Alert>
        </Snackbar>
        <Snackbar open={errOpen1} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '500px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
            Bạn cần điền đẩy đủ thông tin.
          </Alert>
        </Snackbar>
        <Snackbar open={errOpen2} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '500px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
            Code của trang web đã tồn tại
          </Alert>
        </Snackbar>
        <Snackbar open={errOpen3} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '500px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
            Không có phản hồi
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default CreateWebsite;
