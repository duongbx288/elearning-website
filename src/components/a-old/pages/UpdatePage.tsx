import React, { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import Button from '@mui/material/Button';
import {
  TextField,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  InputLabel,
  FormControl,
  Toolbar,
} from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import PageService from '../../../services/PageService';
import WebsiteService from '../../../services/WebsiteService';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoxStyle, ToolbarStyle } from '../../../styles/style';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type PageInfo = {
  id: number;
  websiteId: number;
  pageName: string;
  pageUrl: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  createdBy?: string;
  lastModifiedBy?: string;
};

interface CustomState {
  detail: PageInfo;
}

const UpdatePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as CustomState;
  const history = useHistory();
  const userInfo =
    typeof localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '')
      : '';

  const [pageName, setPageName] = useState(state.detail.pageName);
  const [websiteId, setWebsiteId] = useState(String(state.detail.websiteId));
  const [pageUrl, setPageUrl] = useState(state.detail.pageUrl);
  const [websiteList, setWebsiteList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);
  const [errOpen1, setErrOpen1] = useState(false);
  const [errOpen2, setErrOpen2] = useState(false);
  const [errOpen3, setErrOpen3] = useState(false);
  const [errorName, setErrorName] = React.useState<String>();
  const [errorTitle, setErrorTitle] = React.useState<String>();
  const [username, setUsername] = useState();

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

  // Bấm enter ở textfield sẽ chạy lệnh updatePage
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.isTrusted) {
      if (e.repeat) {
        return;
      }
      if (e.key === 'Enter') {
        updatePageInfo();
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
    });
    setUsername(userInfo.username);
  }, []);

  const changePageName = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageName((event.target as HTMLInputElement).value);
    setErrorName(handleValidateName(event));
  };

  const changePageUrl = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageUrl((event.target as HTMLInputElement).value);
    setErrorTitle(handleValidateUrl(event));
  };

  const changeWebsiteId = (event: SelectChangeEvent<string>): void => {
    setWebsiteId(event.target.value as string);
  };

  const updatePageInfo = (): void => {
    if (pageName === '' || pageUrl === '') {
      setErrOpen1(true);
      return;
    }
    if (
      (errorName == null || typeof errorName === 'undefined') &&
      (errorTitle == null || typeof errorTitle === 'undefined')
    ) {
      const pageInfo = {
        id: state.detail.id,
        websiteId: Number(websiteId),
        pageName: pageName,
        pageUrl: pageUrl,
        createdDate: state.detail.createdDate,
        lastModifiedDate: new Date(),
        createdBy: state.detail.createdBy,
        lastModifiedBy: username,
      };
      PageService.updatePage1(pageInfo, setErrOpen, setErrOpen2, setErrOpen3).then(
        (response) => {
          if (typeof response === 'undefined') {
            setErrOpen(true);
          } else {
            setOpen(true);
            setTimeout(function () {
              history.goBack();
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
            variant="outlined"
            color="error"
            sx={{
              width: '100px',
            }}
            onClick={() => {
              history.goBack();
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            sx={{
              width: '100px',
            }}
            onClick={updatePageInfo}
          >
            Lưu
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ m: 5 }}>
        <Typography variant="h4" mb={2}>
          Chỉnh sửa thông tin trang
        </Typography>
        <Box sx={{ my: 5, mx: 'auto', width: '80%' }} style={BoxStyle}>
          <FormControl sx={{ gap: 3, width: '100%' }}>
            <InputLabel id="domain-select-label">Domain</InputLabel>
            <Select
              labelId="domain-select-label"
              id="domain-select"
              value={
                typeof websiteId === 'undefined'
                  ? String(state.detail.websiteId)
                  : websiteId
              }
              label="Domain"
              onChange={changeWebsiteId}
            >
              {websiteList.map((item) => {
                return (
                  <MenuItem
                    autoFocus={item['id'] === state.detail.websiteId}
                    value={item['id']}
                  >
                    {item['domain']}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              fullWidth
              label="Tên trang"
              value={pageName || ''}
              error={Boolean(errorName)}
              helperText={errorName}
              onChange={changePageName}
              onKeyDown={handleKeyDown}
            />
            <TextField
              fullWidth
              label="Url"
              value={pageUrl || ''}
              error={Boolean(errorTitle)}
              helperText={errorTitle}
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
            Page Url trùng với page khác
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

export default UpdatePage;
