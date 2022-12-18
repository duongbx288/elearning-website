import * as React from 'react';
import { FormHelperText, SelectChangeEvent } from '@mui/material';
import Modal from '@mui/material/Modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useEffect } from 'react';
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
import { BoxStyle } from '../../../styles/style';
import SectionService from '../../../services/SectionService';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
const styleModal = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '1px solid green',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};
const AddInSection = ({
  status,
  setOpenCheckAll,
  setSectionMappingArray,
  setOpenModal,
  openModal,
  sectionList,
  setSectionList,
  pageList,
  pageNameList,
  sectionNameList,
  setSectionNameList,
  bannerId,
}: any) => {
  const userInfo =
    typeof localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '')
      : '';

  const [code, setCode] = React.useState('');
  const [divId, setDivId] = React.useState('');
  const [displayMode, setDisplayMode] = React.useState<number>();
  const [desc, setDesc] = React.useState('');
  const [errorDivId, setErrorDivId] = React.useState<String>();
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);
  const [display, setDisplay] = React.useState('none');
  const [displayStatusHide, setDisplayStatusHide] = React.useState('none');
  const [username, setUsername] = React.useState('');
  const [hideStatus, setHideStatus] = React.useState<string>('Không');
  const [timeHide, setTimeHide] = React.useState<number>(0);
  const [numberHide, setNumberHide] = React.useState<number>(0);

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
    setUsername(userInfo.username);
    getListSection();
  }, [pageNameList, pageList]);

  const getListSection = () => {
    setSectionList([]);
    if (status === 'create') {
      if (pageList.length !== 0 && pageNameList.length === 1) {
        pageList.map((item) => {
          if (item.pageName === pageNameList[0]) {
            SectionService.getAllSectionByPageId(item.id).then((res) => {
              setSectionList(res.data);
            });
          } else {
            sectionList.length = 0;
          }
        });
      } else {
        sectionList.length = 0;
      }
    } else {
      SectionService.getAllSectionHasBannerIdByPageId(bannerId, 0).then((res) => {
        console.log(' check ress : ', res);
        getSectionNameList(res.data);
      });
    }
  };
  const getSectionNameList = (data) => {
    let newArr = new Array();
    data.map((item) => {
      newArr.push(item.divId);
    });
    setSectionNameList(newArr);
  };

  const getMaxIdSection = () => {
    SectionService.getSectionHasMaxId().then((res) => {
      if (res.data.length !== 0) {
        setCode('section' + (res.data.id + 1));
      } else {
        setCode('section1');
      }
    });
  };
  // getAllSectionByPageId
  const handleChangeDefinition = (event: SelectChangeEvent) => {
    if (event.target.value !== '0') {
      setDisplay('none');
      const value = event.target.value as string;
      let indexX = value.indexOf('x');
      let width = parseInt(value.slice(0, indexX));
      let height = parseInt(value.slice(indexX + 1, value.length));
      setWidth(width);
      setHeight(height);
    } else {
      setDisplay('flex');
    }
  };

  const handleChangeHideStatus = (event: SelectChangeEvent) => {
    if (event.target.value === 'Không') {
      setHideStatus('Không');
      setDisplayStatusHide('none');
    } else {
      setHideStatus('Có');
      setDisplayStatusHide('flex');
    }
  };
  const handleChangeDisplayMode = (event: SelectChangeEvent) => {
    setDisplayMode(event.target.value as unknown as number);
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
  const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWidth(e.target.value as unknown as number);
  };
  const handleChangeHeight = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.value as unknown as number);
  };
  const handleChangeTimeHide = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTimeHide(e.target.value as unknown as number);
  };
  const handleChangeNumberHide = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNumberHide(e.target.value as unknown as number);
  };
  const handleChangeDivId = (event: any) => {
    setDivId(event.target.value as string);
    setErrorDivId(handleValidate(event));
  };
  const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDesc(event.target.value as string);
  };
  const handleChangeSectionNameList = (event: any) => {
    const {
      target: { value },
    } = event;
    setSectionNameList(typeof value === 'string' ? value.split(',') : value);
  };

  const saveSection = (event: any) => {
    event.preventDefault();
    if (
      divId == null ||
      width == null ||
      width === 0 ||
      height == null ||
      height === 0 ||
      errorDivId != null
    ) {
      setOpenCheckAll(true);
      return;
    } else {
      let sectionItem = {
        divId: divId,
        desc: desc,
        mode: displayMode,
        code: code,
        width: width,
        height: height,
        createdBy: username,
      };
      SectionService.save(sectionItem, setOpenCheckAll).then((response) => {
        if (typeof response === 'undefined') {
          window.alert('Tạo thất bại, trùng ID, vui lòng thử lại');
          return;
        } else {
          if (response?.status === 201) {
            setSectionNameList((prevState) => [...prevState, response.data.divId]);
            setSectionList((prevState) => [...prevState, sectionItem]);
            let sectionMappingItem = {
              sectionCode: code,
              modeHide: hideStatus === 'Không' ? 0 : 1,
              timeHide: timeHide,
              numberHide: numberHide,
            };
            setSectionMappingArray((prevState) => [...prevState, sectionMappingItem]);
            setOpenModal(false as boolean);
          } else {
            setOpenCheckAll(true);
            return;
          }
        }
      });
    }
  };
  return (
    <FormControl sx={{ width: '100%', height: 100, mt: -4, mb: 1 }}>
      {status === 'update' ? (
        <TextField
          label="Chọn khu vực"
          type="text"
          value={sectionNameList}
          InputProps={{ readOnly: true }}
        />
      ) : (
        <>
          <InputLabel id="demo-multiple-checkbox-label">Chọn khu vực</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={sectionNameList}
            onChange={handleChangeSectionNameList}
            input={<OutlinedInput label="Chọn khu vực" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            <div>
              <button
                className="btn success text-center text-primary fs-6 "
                style={{ width: '100%' }}
                onClick={() => {
                  setOpenModal(true as boolean);
                  getMaxIdSection();
                }}
              >
                <AddCircleOutlineIcon />
                Thêm khu vực mới
              </button>
              <Modal open={openModal}>
                <Box sx={styleModal}>
                  <Typography variant="h6" component="h2">
                    Thêm khu vực mới
                  </Typography>

                  <Box
                    component="form"
                    sx={{
                      display: 'inline-flex',
                      flexWrap: 'wrap',
                      gap: '2%',
                      width: '100%',
                    }}
                    style={BoxStyle}
                  >
                    <TextField
                      label="Nhập id của thẻ div"
                      autoComplete="off"
                      required
                      inputProps={{ maxLength: 50 }}
                      type="text"
                      error={Boolean(errorDivId)}
                      helperText={errorDivId}
                      value={divId || ''}
                      onChange={handleChangeDivId}
                      sx={{ width: '49%' }}
                    />
                    <FormControl sx={{ width: '49%' }}>
                      <InputLabel required>Trạng thái hiển thị</InputLabel>
                      <Select
                        onChange={handleChangeDisplayMode}
                        label="Trạng thái hiển thị *"
                      >
                        <MenuItem value={'0'}>Hiển thị ngẫu nhiên</MenuItem>
                        <MenuItem value={'1'}>Hiển thị theo tỉ trọng</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Mô tả khu vực"
                      type="text"
                      onChange={handleChangeDesc}
                      sx={{ width: '100%', mt: 3 }}
                    />
                    <FormControl sx={{ mt: 3, width: '49%' }}>
                      <InputLabel id="demo-simple-select-label" required>
                        Kích cỡ khu vực
                      </InputLabel>
                      <Select label="Kích cỡ khu vực *" onChange={handleChangeDefinition}>
                        <MenuItem value={'120x600'}>120x600 px</MenuItem>
                        <MenuItem value={'120x240'}>120x240 px</MenuItem>
                        <MenuItem value={'160x600'}>160x600 px</MenuItem>
                        <MenuItem value={'180x150'}>180x150 px</MenuItem>
                        <MenuItem value={'234x60'}>234x60 px</MenuItem>
                        <MenuItem value={'240x400'}>240x400 px</MenuItem>
                        <MenuItem value={'250x250'}>250x250 px</MenuItem>
                        <MenuItem value={'300x100'}>300x100 px</MenuItem>
                        <MenuItem value={'300x200'}>300x200 px</MenuItem>
                        <MenuItem value={'336x280'}>336x280 px</MenuItem>
                        <MenuItem value={'300x600'}>300x600 px</MenuItem>
                        <MenuItem value={'468x60'}>468x60 px</MenuItem>
                        <MenuItem value={'728x90'}>728x90 px</MenuItem>
                        <MenuItem value={'720x300'}>720x300 px</MenuItem>
                        <MenuItem value={'0'}>Khác</MenuItem>
                      </Select>
                      <Box
                        sx={{
                          display: display,
                          mt: 3,
                          width: '100%',
                          gap: 3,
                          mr: 3,
                          height: 'fit-content',
                        }}
                      >
                        <TextField
                          label="Nhập chiều dài"
                          required
                          type="number"
                          value={width}
                          fullWidth
                          onChange={handleChangeWidth}
                        />
                        <TextField
                          label="Nhập chiều cao"
                          required
                          type="number"
                          value={height}
                          fullWidth
                          onChange={handleChangeHeight}
                        />
                      </Box>
                    </FormControl>

                    <FormControl sx={{ mt: 3, width: '49%' }}>
                      <InputLabel id="demo-simple-select-label" required>
                        Cho phép ẩn
                      </InputLabel>
                      <Select
                        value={hideStatus}
                        label="Cho phép ẩn"
                        onChange={handleChangeHideStatus}
                      >
                        <MenuItem value={'Có'}>Có</MenuItem>
                        <MenuItem value={'Không'}>Không</MenuItem>
                      </Select>
                      <Box
                        sx={{
                          display: displayStatusHide,
                          mt: 3,
                          width: '100%',
                          gap: 3,
                          mr: 3,
                          height: 'fit-content',
                        }}
                      >
                        <TextField
                          label="Nhập số ngày ẩn"
                          required
                          type="number"
                          value={timeHide}
                          fullWidth
                          onChange={handleChangeTimeHide}
                        />
                        <TextField
                          label="Nhập số lần ẩn"
                          required
                          type="number"
                          value={numberHide}
                          fullWidth
                          onChange={handleChangeNumberHide}
                        />
                      </Box>
                    </FormControl>
                  </Box>

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
                      onClick={(e) => {
                        saveSection(e);
                      }}
                    >
                      Xác nhận
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </div>
            {sectionList.map((item) => (
              <MenuItem key={item.id} value={item.divId}>
                <Checkbox checked={sectionNameList.indexOf(item.divId) > -1} />
                <ListItemText primary={item.divId} />
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      {sectionNameList.length <= 0 ? (
        <FormHelperText error>Cần chọn page để thêm banner</FormHelperText>
      ) : (
        <></>
      )}
    </FormControl>
  );
};
export default AddInSection;
