import * as React from 'react';
import { FormHelperText, SelectChangeEvent } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import WebsiteService from '../../../services/WebsiteService';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {
  Typography,
  Box,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

type WebInfo = {
  id: number;
  code: string;
  domain: string;
  webKey: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  createdBy?: string;
  lastModifiedBy?: string;
};

const AddInWeb = ({
  username,
  webCode,
  setWebCode,
  setWebsiteId,
  pageNameList,
  status,
  setErrOpen,
  setOpen,
  styleModal,
  openModal,
  setOpenModal,
}: any) => {
  const [webList, setWebList] = React.useState([] as WebInfo[]);
  const [webDomain, setWebDomain] = React.useState('');
  const [errorWebCode, setErrorWebCode] = React.useState<String>();
  const [errorWebDomain, setErrorWebDomain] = React.useState<String>();

  useEffect(() => {
    getAllWebsite();
  }, []);
  const getAllWebsite = async () => {
    await WebsiteService.getAllWebsite().then((res) => {
      setWebList(res.data);
    });
  };

  const handleKeyDownWebsite = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
  const handleValidate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      let format = /[`!@#$%^&*()+\=[\]{};'"\\|,.<>?~]/;
      let check = format.test(event.target.value);
      if (check) {
        return 'Nội dung không được chứa kí tự đặc biệt';
      }
      if (event.target.value.length < 1 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 1 kí tự, tối đa 50 kí tự';
      }
    }
  };
  const handleChangeWebsiteCode = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setWebCode((event.target as HTMLInputElement).value);
    setErrorWebCode(handleValidate(event));
  };
  const handleChangeDomain = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setWebDomain((event.target as HTMLInputElement).value);
    setErrorWebDomain(handleValidate(event));
  };
  const handleChangeWebCode = (event: SelectChangeEvent) => {
    setWebCode(event.target.value as string);
    pageNameList.length = 0;
  };

  const saveWebsiteInfo = async () => {
    if (webCode.length === 0 || webDomain.length === 0) {
      setErrOpen(true);
      return;
    } else {
      let WebsiteInfo = {
        id: 0,
        code: webCode,
        domain: webDomain,
        createdDate: new Date(),
        createdBy: username,
        webKey: 'code:' + webCode + ', domain: ' + webDomain,
      };
      await WebsiteService.saveWebsite(WebsiteInfo).then((response) => {
        if (typeof response === 'undefined') {
          setErrOpen(true);
        } else {
          setOpen(true);
          const newWeb = response.data;
          WebsiteInfo = { ...WebsiteInfo, id: newWeb.id };
          setWebList((prevState) => [...prevState, WebsiteInfo]);
        }
        setOpenModal(false);
      });
    }
  };
  return (
    <FormControl fullWidth sx={{ mt: 3 }}>
      {status === 'update' ? (
        <TextField
          label="Chọn website"
          type="text"
          value={webCode}
          InputProps={{ readOnly: true }}
        />
      ) : (
        <>
          <InputLabel id="demo-simple-select-label">Chọn website</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Chọn website"
            value={webCode || ''}
            onChange={handleChangeWebCode}
          >
            <div>
              <button
                className="btn success text-center text-primary fs-6 "
                style={{ width: '100%' }}
                onClick={() => {
                  setOpenModal(true as boolean);
                }}
              >
                <AddCircleOutlineIcon />
                Thêm website mới
              </button>
              <Modal open={openModal}>
                <Box sx={styleModal}>
                  <Typography variant="h6" component="h2">
                    Thêm website mới
                  </Typography>
                  <TextField
                    label="Mã website"
                    type="text"
                    sx={{ width: '100%', marginTop: '20px' }}
                    margin="dense"
                    onChange={handleChangeWebsiteCode}
                    error={Boolean(errorWebCode)}
                    helperText={errorWebCode}
                    value={webCode || ''}
                    onKeyDown={handleKeyDownWebsite}
                  />

                  <TextField
                    label="domain"
                    type="text"
                    sx={{ width: '100%', marginTop: '20px' }}
                    onChange={handleChangeDomain}
                    error={Boolean(errorWebDomain)}
                    helperText={errorWebDomain}
                    value={webDomain || ''}
                    onKeyDown={handleKeyDownWebsite}
                  />
                  <Box
                    sx={{
                      width: '100%',
                      justifyContent: 'end',
                      display: 'inline-flex',
                      gap: 2,
                      marginTop: '20px',
                    }}
                  >
                    <Button
                      sx={{ minWidth: '100px' }}
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setOpenModal(false as boolean);
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      sx={{ minWidth: '100px' }}
                      variant="contained"
                      onClick={saveWebsiteInfo}
                    >
                      Thêm
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </div>
            {webList.map((item) => (
              <MenuItem
                key={item.id}
                value={item.code}
                onClick={() => {
                  setWebsiteId(item.id);
                }}
              >
                {item.code}
              </MenuItem>
            ))}
          </Select>
        </>
      )}

      {webCode === '' ? (
        <FormHelperText error>Cần có website để thêm banner </FormHelperText>
      ) : (
        <></>
      )}
    </FormControl>
  );
};
export default AddInWeb;
