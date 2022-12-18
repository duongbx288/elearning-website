import * as React from 'react';
import { FormHelperText, SelectChangeEvent } from '@mui/material';
import Modal from '@mui/material/Modal';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';
import PageService from '../../../services/PageService';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import OutlinedInput from '@mui/material/OutlinedInput';
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

const AddInPage = ({
  username,
  webCode,
  pageNameList,
  setPageNameList,
  setOpenCheckAll,
  pageList,
  setPageList,
  setErrOpen,
  setErrCheckOpen,
  setOpen,
  status,
  websiteId,
  styleModal,
  openModal,
  setOpenModal,
  popUp,
}: any) => {
  const [pageName, setPageName] = React.useState('');
  const [errorName, setErrorName] = React.useState<String>();
  const [errorUrl, setErrorUrl] = React.useState<String>();
  const [pageUrl, setPageUrl] = React.useState('');
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  useEffect(() => {
    getPageList();
  }, [webCode, pageNameList]);
  const handleKeyDownPage = (e: React.KeyboardEvent<HTMLDivElement>) => {
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

  const handleChangePageNameList = (event: SelectChangeEvent<typeof pageNameList>) => {
    const {
      target: { value },
    } = event;
    setPageNameList(typeof value === 'string' ? value.split(',') : value);
  };
  const changePageName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPageName((event.target as HTMLInputElement).value);
    setErrorName(handleValidate(event));
  };

  const changePageUrl = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPageUrl((event.target as HTMLInputElement).value);
    setErrorUrl(handleValidate(event));
  };

  const savePageInfo = () => {
    if (webCode !== '') {
      if (pageName.length === 0 || pageUrl.length === 0) {
        setOpenCheckAll(true);
        return;
        // eslint-disable-next-line array-callback-return
        return;
      } else {
        const PageInfo = {
          id: 0,
          websiteId: websiteId,
          pageName: pageName,
          pageUrl: pageUrl,
          createdDate: new Date(),
          createdBy: username,
        };
        PageService.savePage(PageInfo, setOpen).then((response) => {
          if (typeof response === 'undefined') {
            setOpenModal(false as boolean);
            setErrOpen(true);
          } else {
            setOpenModal(false as boolean);
            setOpen(true);
            setPageList((prevState) => [...prevState, PageInfo]);
          }
        });
      }
    } else {
      setErrCheckOpen(true);
    }
  };
  const getPageList = async () => {
    if (status === 'create') {
      await PageService.getPageByWebsiteCode(webCode).then((res) => {
        setPageList(res.data);
      });
    } else {
    }
  };
  return (
    <FormControl sx={{ width: '100%', height: 100, mt: 3, mb: 2 }}>
      {status === 'update' ? (
        <TextField
          label="Chọn page"
          type="text"
          value={pageNameList}
          InputProps={{ readOnly: true }}
        />
      ) : (
        <>
          <InputLabel id="demo-multiple-checkbox-label">Chọn page</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple={popUp === 'Có' ? true : false}
            value={pageNameList}
            onChange={handleChangePageNameList}
            input={<OutlinedInput label="Chọn page" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
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
                Thêm page mới
              </button>
              <Modal open={openModal}>
                <Box sx={styleModal}>
                  <Typography variant="h6" component="h2">
                    Thêm page mới
                  </Typography>
                  <TextField
                    label="Tên page"
                    type="text"
                    sx={{ width: '100%', marginTop: '20px' }}
                    margin="dense"
                    onChange={changePageName}
                    error={Boolean(errorName)}
                    helperText={errorName}
                    value={pageName}
                    onKeyDown={handleKeyDownPage}
                  />

                  <TextField
                    label="Page url"
                    type="text"
                    sx={{ width: '100%', marginTop: '20px' }}
                    onChange={changePageUrl}
                    error={Boolean(errorUrl)}
                    helperText={errorUrl}
                    value={pageUrl || ''}
                    onKeyDown={handleKeyDownPage}
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
                      onClick={() => savePageInfo()}
                    >
                      Thêm page
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </div>
            {status === 'create' ? (
              pageList.map((item) => (
                <MenuItem key={item.pageName} value={item.pageName}>
                  <Checkbox checked={pageNameList.indexOf(item.pageName) > -1} />
                  <ListItemText primary={item.pageName} />
                </MenuItem>
              ))
            ) : popUp === 'Có' ? (
              <MenuItem key={pageList[0].pageName} value={pageList[0].pageName}>
                <ListItemText primary={pageList[0].pageName} />
              </MenuItem>
            ) : (
              <MenuItem key={pageList[0].pageName} value={pageList[0].pageName}>
                <ListItemText primary={pageList[0].pageName} />
              </MenuItem>
            )}
          </Select>
        </>
      )}
      {popUp === 'Không' ? (
        <></>
      ) : pageNameList.length <= 0 ? (
        <FormHelperText error>Cần chọn page để thêm banner</FormHelperText>
      ) : (
        <></>
      )}
    </FormControl>
  );
};
export default AddInPage;
