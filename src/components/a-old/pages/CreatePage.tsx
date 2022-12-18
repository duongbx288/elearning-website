import React, { FC, useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import Button from '@mui/material/Button';
import {
  Grid,
  TextField,
  Box,
  Select,
  NativeSelect,
  MenuItem,
  SelectChangeEvent,
  Typography,
  InputLabel,
  FormControl,
  Divider,
} from '@mui/material';
import WebsiteService from '../../../services/WebsiteService';
import PageService from '../../../services/PageService';
import Toolbar from '@mui/material/Toolbar';
import { useHistory, useLocation } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { BoxStyle, ToolbarStyle } from '../../../styles/style';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CustomState {
  webId: number;
}

const CreatePage: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const pageState = location.state as CustomState;
  const webId = typeof pageState === 'undefined' ? undefined : pageState.webId;
  const userInfo =
    typeof localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '')
      : '';

  const [pageName, setPageName] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [websiteId, setWebsiteId] = useState(
    typeof pageState === 'undefined' ? '' : String(webId)
  );

  const [websiteList, setWebsiteList] = useState([]);
  const [open, setOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);
  const [errOpen1, setErrOpen1] = useState(false);
  const [errOpen2, setErrOpen2] = useState(false);
  const [errOpen3, setErrOpen3] = useState(false);
  const [errorName, setErrorName] = React.useState<String>();
  const [errorUrl, setErrorUrl] = React.useState<String>();
  const [username, setUsername] = useState();
  const [webCode, setWebCode] = useState('');

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

  // Bấm enter ở textfield sẽ chạy lệnh savePage
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.isTrusted) {
      if (e.repeat) {
        return;
      }
      if (e.key === 'Enter') {
        savePageInfo();
      }
    } else {
      console.log('Not trusted event-source');
      return;
    }
  };

  const handleValidateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      let format = /[`!@#$%^&*()+=[\]{};'"|,<>?~]/;
      let check = format.test(event.target.value);
      if (check) {
        return 'Nội dung không được chứa kí tự đặc biệt';
      }
      if (event.target.value.length < 1 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 1 kí tự, tối đa 50 kí tự';
      }
    }
  };

  const handleValidateUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      let format = /[`!@%^*()+[\]{};'"|,<>?~]/;
      let check = format.test(event.target.value);
      if (check) {
        return 'Nội dung không được chứa kí tự đặc biệt';
      }
      if (event.target.value.length < 1 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 1 kí tự, tối đa 50 kí tự';
      }
    }
  };

  useEffect(() => {
    WebsiteService.getAllWebsite().then((response) => {
      setWebsiteList(response.data);
      if (typeof pageState !== 'undefined') {
        const found = response.data.find((info) => info['id'] == pageState.webId);
        setWebCode(found.code);
      }
    });
    setUsername(userInfo.username);
  }, []);

  const changePageName = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageName((event.target as HTMLInputElement).value);
    setErrorName(handleValidateName(event));
  };

  const changePageUrl = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageUrl((event.target as HTMLInputElement).value);
    setErrorUrl(handleValidateUrl(event));
  };

  const changeWebsiteId = (event: SelectChangeEvent<string>): void => {
    setWebsiteId(event.target.value as string);
  };

  const savePageInfo = (): void => {
    if (pageName === '' || pageUrl === '' || websiteId === '') {
      setErrOpen1(true);
      return;
    } else if (
      (errorName == null || typeof errorName === 'undefined') &&
      (errorUrl == null || typeof errorUrl === 'undefined')
    ) {
      const PageInfo = {
        id: 0,
        websiteId: Number(websiteId),
        pageName: pageName,
        pageUrl: pageUrl,
        createdDate: new Date(),
        createdBy: username,
      };
      PageService.savePage1(PageInfo, setErrOpen, setErrOpen2, setErrOpen3).then(
        (response) => {
          if (typeof response === 'undefined') {
            return;
          } else {
            setOpen(true);
            setTimeout(function () {
              if (typeof pageState === 'undefined') {
                history.push('/page');
              } else {
                history.push({
                  pathname: '/website/' + websiteId + '/page',
                  state: {
                    id: websiteId,
                  },
                });
              }
            }, 3000);
          }
        }
      );
    } else {
      setErrOpen(true);
    }
  };

  return (
    <div>
      <Toolbar variant="dense" style={ToolbarStyle}>
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
            sx={{ minWidth: '100px' }}
            variant="outlined"
            color="error"
            onClick={() => {
              history.goBack();
            }}
          >
            Hủy
          </Button>
          <Button sx={{ minWidth: '100px' }} variant="contained" onClick={savePageInfo}>
            Lưu lại
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ mx: 10, my: 5 }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'blue' }}>
          Thêm trang mới
        </Typography>
        <Box sx={{ my: 5 }} style={BoxStyle}>
          <FormControl sx={{ width: '100%' }}>
            {typeof pageState !== 'undefined' ? (
              <TextField fullWidth label="Mã website" value={webCode} margin="dense" />
            ) : (
              <>
                <InputLabel id="domain-select-label">Mã website</InputLabel>
                <Select
                  labelId="domain-select-label"
                  id="domain-select"
                  value={typeof pageState === 'undefined' ? websiteId : String(webId)}
                  label="Mã website"
                  onChange={changeWebsiteId}
                  sx={{
                    minWidth: '300px',
                  }}
                >
                  {websiteList.map((item) => {
                    return (
                      <MenuItem value={item['id']} key={item['id']}>
                        {item['code']}
                      </MenuItem>
                    );
                  })}
                </Select>
              </>
            )}
            <TextField
              fullWidth
              label="Tên trang"
              defaultValue=""
              error={Boolean(errorName)}
              helperText={errorName}
              margin="dense"
              onChange={changePageName}
              onKeyDown={handleKeyDown}
            />
            <TextField
              fullWidth
              label="Url"
              margin="dense"
              error={Boolean(errorUrl)}
              helperText={errorUrl}
              onChange={changePageUrl}
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
            Bạn cần nhập đầy đủ thông tin trước khi lưu.
          </Alert>
        </Snackbar>
        <Snackbar open={errOpen2} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '500px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
            Page Url đã tồn tại
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

export default CreatePage;
