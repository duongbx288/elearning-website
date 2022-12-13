import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configs/FireBase';
import { SelectChangeEvent } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BannerService from '../../services/BannerService';
import { Divider } from '@mui/material';
import { BoxStyle1 } from '../../styles/style';
import DemoBanner from './DemoBanner';
import AddInWeb from './AddInWeb';
import AddInPage from './AddInPage';
import AddInSection from './AddInSection';

import {
  Toolbar,
  Typography,
  Box,
  TextField,
  Grid,
  Card,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  CardMedia,
} from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoxStyle, ToolbarStyle } from '../../styles/style';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import SectionService from '../../services/SectionService';
const styleModal = {
  position: 'absolute' as 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid green',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Input = styled('input')({
  display: 'none',
});

type PageInfo = {
  id: number;
  websiteId: number;
  pageName: string;
  pageUrl: string;
  webDomain?: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  createdBy?: string;
  lastModifiedBy?: string;
};
type SectionMapping = {
  sectionCode: string;
  modeHide: number;
  timeHide: number;
  numberHide: number;
};
interface CustomState {
  popUp: number;
  pageId: number;
  websiteId: number;
}

const CreateBanner: React.FC = () => {
  let history = useHistory();
  const userInfo =
    typeof localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '')
      : '';
  const [sectionList, setSectionList] = React.useState([] as any);
  const location = useLocation();
  const [websiteId, setWebsiteId] = React.useState<number>(0);
  const state =
    typeof location.state === 'undefined' ? 0 : (location.state as CustomState);
  const [displayBox, setDisplayBox] = React.useState('none');
  const [webCode, setWebCode] = React.useState('');
  const [pstValue, setPstValue] = React.useState<string>('0,0');
  const [position, setPosition] = React.useState<string>('default');
  const [positionType, setPositionType] = React.useState<string>('fixed');
  const [pageNameList, setPageNameList] = React.useState<string[]>([]);
  const [sectionNameList, setSectionNameList] = React.useState<string[]>([]);
  const [pageList, setPageList] = React.useState([] as PageInfo[]);
  const [code, setCode] = React.useState('');
  const [bannerWidth, setBannerWidth] = React.useState('native');
  const [title, setTitle] = React.useState('');
  const [type, setType] = React.useState('');
  const [popUp, setPopUp] = React.useState(typeof state === 'object' ? 'Có' : 'Không');
  const [modal, setModal] = React.useState('Không');
  const [fileName, setFileName] = React.useState('');
  const [imageUpload, setImageUpload] = React.useState(null);
  const [preViewImage, setPreViewImage] = React.useState('');
  const [display, setDisplay] = React.useState('none');
  const [errorTitle, setErrorTitle] = React.useState<String>();
  const [errorPositionValue, setErrorPositionValue] = React.useState<String>();
  const [errorInputWebUrl, setErrorInputWebUrl] = React.useState<String>();
  const [widthImg, setWidthImg] = React.useState(400);
  const [heightImg, setHeightImg] = React.useState(550);
  const [open, setOpen] = React.useState(false);
  const [errOpen, setErrOpen] = React.useState(false);
  const [errImage, setErrImage] = React.useState(false);
  const [errCheckOpen, setErrCheckOpen] = React.useState(false);
  const [errInput, setErrInput] = React.useState(false);
  const [webUrl, setWebUrl] = React.useState('');
  const [utmSource, setUtmSource] = React.useState('');
  const [campaign, setCampaign] = React.useState('');
  const [utmCampaign, setUtmCampaign] = React.useState('');
  const [utmMedium, setUtmMedium] = React.useState('');
  const [openCheckAll, setOpenCheckAll] = React.useState<boolean>(false);
  const [timeHide, setTimeHide] = React.useState<number>(0);
  const [numberHide, setNumberHide] = React.useState<number>(0);
  const [username, setUsername] = useState('');
  const [sectionMappingArray, setSectionMappingArray] = React.useState(
    [] as SectionMapping[]
  );
  const [pst1, setPst1] = React.useState<string>('');
  const [pst2, setPst2] = React.useState<string>('');
  const [pstVl1, setPstVl1] = React.useState<number>(0);
  const [pstVl2, setPstVl2] = React.useState<number>(0);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  useEffect(() => {
    setUsername(userInfo.username);
    getIdBanner();
  }, []);

  const getIdBanner = () => {
    BannerService.getBannerHasMaxId().then((res) => {
      if (res.data.id != undefined) {
        setCode('banner' + (res.data.id + 1));
      } else {
        setCode('banner1');
      }
    });
  };
  const handleValidatePositionValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      let input = event.target.value;
      var regex = new RegExp('^[0-9]{1,4}[,]{1}[ ]{0,1}[0-9]{1,4}[ ]*$');
      var test = regex.test(input);
      if (test) {
      } else {
        return 'Thông tin nhập không đúng định dạng (Lưu ý: Số nhập vào tối đa có 4 chữ số)';
      }
    } else {
      return 'Thông tin vị trí banner không được để trống';
    }
  };

  const handleChangePositionValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pstValue = event.target.value;
    setPstValue(event.target.value as string);
    setErrorPositionValue(handleValidatePositionValue(event));
    let splitIndex2 = pstValue.indexOf(',');
    let value1 = pstValue.slice(0, splitIndex2);
    let value2 = pstValue.slice(splitIndex2 + 1, pstValue.length);
    setPstVl1(value1 as unknown as number);
    setPstVl2(value2 as unknown as number);
  };
  const handleChangePositionType = (event: SelectChangeEvent) => {
    setPositionType(event.target.value as string);
  };
  const handleChangeBannerWidth = (event: SelectChangeEvent) => {
    setBannerWidth(event.target.value as string);
  };
  const handleChangePosition = (event: SelectChangeEvent) => {
    const position = event.target.value;
    setPosition(position as string);
    if (position === 'default') {
      setPstValue('0,0');
      setDisplayBox('none');
    }

    if (position !== 'default') {
      setDisplayBox('flex');
    }
    let splitIndex1 = position.indexOf('-');
    let value1 = position.slice(0, splitIndex1);
    let value2 = position.slice(splitIndex1 + 1, position.length);
    setPst1(value1);
    setPst2(value2);
  };
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setErrOpen(false);
    setErrCheckOpen(false);
    setOpenCheckAll(false);
    setErrImage(false);
    setErrInput(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.isTrusted) {
      if (e.repeat) {
        return;
      }
      if (e.key === 'Enter') {
        saveBanner(e);
      }
    } else {
      console.log('Not trusted event-source');
      return;
    }
  };
  const handleValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      return 'Nội dung không được để trống';
    }
  };
  const handleChangeTimeHide = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeHide(event.target.value as unknown as number);
  };
  const handleChangeNumberHide = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberHide(event.target.value as unknown as number);
  };
  const handleChangeWebsiteURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebUrl(event.target.value as string);
    setErrorInputWebUrl(handleValueInput(event));
  };

  const handleChangeUtmCampaign = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUtmCampaign(event.target.value as string);
  };
  const handleChangeCampaign = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampaign(event.target.value as string);
  };
  const handleChangeCampaignMedium = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUtmMedium(event.target.value as string);
  };
  const handleChangeSource = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUtmSource(event.target.value as string);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    if (event.target.value !== 'Khác') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
    setType(event.target.value as string);
  };

  const onLoadImg = () => {
    let imgLoad = document.getElementById('imgUpload') as HTMLImageElement;
    setWidthImg(imgLoad.naturalWidth);
    setHeightImg(imgLoad.naturalHeight);
  };

  const handleValidateCodeAndTittle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      let format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
      let check = format.test(event.target.value);
      if (check) {
        return 'Nội dung không được chứa kí tự đặc biệt';
      } else if (event.target.value.length < 1 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 1 kí tự, tối đa 50 kí tự';
      }
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value as string);
    setErrorTitle(handleValidateCodeAndTittle(event));
  };
  const handleChangePopUp = (event: SelectChangeEvent) => {
    setPopUp(event.target.value as string);
  };
  const handleChangeModal = (event: SelectChangeEvent) => {
    setModal(event.target.value as string);
  };
  const getImage = (e: any) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setImageUpload(e.target.files[0]);
    setPreViewImage(url);
    setFileName(e.target.files[0].name);
  };
  const saveBanner = async (event: any) => {
    event.preventDefault();
    if (title.length === 0 || type.length === 0) {
      setOpenCheckAll(true);
      return;
    }
    if (errorTitle != null) {
      setErrInput(true);
      return;
    }
    if (type != 'Khác') {
      if (webUrl.length === 0) {
        setOpenCheckAll(true);
        return;
      }
      if (errorInputWebUrl != null) {
        setErrInput(true);
        return;
      }
    }
    if (imageUpload == null) {
      setErrImage(true);
      return;
    }
    if (popUp === 'Có') {
      if (
        pageNameList.length === 0 ||
        webCode.length === 0 ||
        (position !== 'default' && pstValue == '')
      ) {
        setOpenCheckAll(true);
        return;
      }
      if (errorPositionValue != null) {
        setErrInput(true);
        return;
      }
    }
    const imageRef = ref(storage, `images/${fileName}`);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        let bannerItem = {
          code: code,
          title: title,
          type: type,
          popUp: popUp === 'Không' ? 0 : 1,
          modal: modal === 'Không' ? 0 : 1,
          imgUrl: url,
          url:
            type === 'Khác'
              ? ''
              : webUrl +
                '?' +
                'campaign=' +
                campaign +
                '&utm_campaign=' +
                utmCampaign +
                '&utm_source=' +
                utmSource +
                '&utm_medium=' +
                utmMedium,
          width: widthImg,
          height: heightImg,
          bannerWidth: bannerWidth,
          createdBy: username,
        };
        axios.post('/api/banners', bannerItem).then((res) => {
          if (res.status === 200) {
            if (popUp === 'Có') {
              saveBannerMappingPage(code).then((res) => {
                setOpen(true);
                setTimeout(function () {
                  history.goBack();
                }, 3000);
              });
            } else {
              saveBannerMappingSection().then((response) => {
                saveSectionMapping().then((res) => {
                  setOpen(true);
                  setTimeout(function () {
                    history.goBack();
                  }, 3000);
                });
              });
            }
          }
        });
      });
    });
  };

  const saveBannerMappingPage = async (code: string) => {
    await BannerService.getBannerByCode(code).then((res) => {
      let bannerId = res.data.id;
      pageList.map((pageItem) => {
        pageNameList.map((pageNameItem) => {
          if (pageItem.pageName === pageNameItem) {
            let newItem = {
              bannerId: bannerId,
              sectionId: 0,
              pageId: pageItem.id,
              position: position,
              positionType: positionType,
              timeHide: timeHide,
              numberHide: numberHide,
              positionValue: pstValue,
              percentage: 0,
              createdBy: username,
            };
            BannerService.saveBannerMapping(newItem);
          }
        });
      });
    });
  };
  const saveBannerMappingSection = async () => {
    await BannerService.getBannerByCode(code).then((res) => {
      let bannerId = res.data.id;
      sectionList.map((item) => {
        if (sectionMappingArray.length > 0) {
          sectionMappingArray.map((sectionItem) => {
            if (item.code === sectionItem.sectionCode) {
              SectionService.getByCode(sectionItem.sectionCode).then((res) => {
                let newItem = {
                  bannerId: bannerId,
                  sectionId: res.data.id,
                  pageId: 0,
                  position: '0',
                  positionType: '0',
                  timeHide: 0,
                  numberHide: 0,
                  positionValue: 0,
                  percentage: 0,
                  createdBy: username,
                };
                BannerService.saveBannerMapping(newItem).then((res) => {});
              });
            }
          });
        } else {
          let newItem = {
            bannerId: bannerId,
            sectionId: item.id,
            pageId: 0,
            position: '0',
            positionType: '0',
            timeHide: 0,
            numberHide: 0,
            positionValue: 0,
            percentage: 0,
            createdBy: username,
          };
          BannerService.saveBannerMapping(newItem);
        }
      });
    });
  };
  const saveSectionMapping = async () => {
    pageList.map((pageItem) => {
      if (pageItem.pageName === pageNameList[0]) {
        sectionMappingArray.map((sectionItem) => {
          let newItem = {
            pageId: pageItem.id,
            sectionCode: sectionItem.sectionCode,
            timeHide: sectionItem.timeHide,
            modeHide: sectionItem.modeHide,
            numberHide: sectionItem.numberHide,
            createdBy: username,
          };
          SectionService.saveSectionMapping(newItem);
        });
      }
    });
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
            sx={{ minWidth: '100px' }}
            variant="outlined"
            onClick={() => {
              history.goBack();
            }}
            color="error"
          >
            Hủy
          </Button>
          <Button
            sx={{ minWidth: '100px' }}
            variant="contained"
            onClick={(e) => saveBanner(e)}
          >
            Lưu
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ m: 5 }}>
        <Typography variant="h5" color="blue" mb={2}>
          Thêm banner mới
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} sx={{ pr: 3, pb: 3 }}>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                '& .MuiTextField-root': {
                  width: '100%',
                },
              }}
              style={BoxStyle}
            >
              <TextField
                label="Nhập tên banner"
                type="text"
                required
                error={Boolean(errorTitle)}
                helperText={errorTitle}
                value={title || ''}
                onChange={handleChangeTitle}
                onKeyDown={handleKeyDown}
              />
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label" required>
                  Chọn loại banner
                </InputLabel>
                <Select
                  value={type}
                  onChange={handleChangeType}
                  label="Chọn loại banner *"
                >
                  <MenuItem value={'Khác'}>
                    <em>Khác</em>
                  </MenuItem>
                  <MenuItem value={'Liên kết tới một link mới'}>
                    Liên kết tới một link mới
                  </MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: display }}>
                <Box
                  sx={{
                    display: 'flex',

                    flexDirection: 'column',
                    gap: 3,
                    '& .MuiTextField-root': {
                      width: '100%',
                    },
                  }}
                  style={BoxStyle}
                >
                  <TextField
                    label="URl Trang Web"
                    required
                    type="text"
                    value={webUrl || ''}
                    fullWidth
                    error={Boolean(errorInputWebUrl)}
                    helperText={errorInputWebUrl}
                    onChange={handleChangeWebsiteURL}
                    onKeyDown={handleKeyDown}
                  />
                  <TextField
                    label="Campaign"
                    required
                    type="text"
                    value={campaign || ''}
                    fullWidth
                    onChange={handleChangeCampaign}
                    onKeyDown={handleKeyDown}
                  />
                  <TextField
                    label="UTM Campaign"
                    required
                    type="text"
                    value={utmCampaign || ''}
                    fullWidth
                    onChange={handleChangeUtmCampaign}
                    onKeyDown={handleKeyDown}
                  />
                  <TextField
                    label="UTM Source"
                    required
                    type="text"
                    value={utmSource || ''}
                    fullWidth
                    onChange={handleChangeSource}
                    onKeyDown={handleKeyDown}
                  />
                  <TextField
                    label="UTM Medium"
                    required
                    type="text"
                    value={utmMedium || ''}
                    fullWidth
                    onChange={handleChangeCampaignMedium}
                    onKeyDown={handleKeyDown}
                  />
                </Box>
              </Box>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel required>Chọn trạng thái popup</InputLabel>
                <Select
                  value={popUp}
                  onChange={handleChangePopUp}
                  label="Chọn trạng thái popup *"
                >
                  <MenuItem value={'Không'}>Không</MenuItem>
                  <MenuItem value={'Có'}>Có</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel required>Chọn trạng thái modal</InputLabel>
                <Select
                  fullWidth
                  value={modal}
                  onChange={handleChangeModal}
                  label="Chọn trạng thái modal *"
                >
                  <MenuItem value={'Không'}>Không</MenuItem>
                  <MenuItem value={'Có'}>Có</MenuItem>
                </Select>
                <TextField
                  sx={{ mt: 2 }}
                  label="Ẩn trong số ngày"
                  required
                  type="number"
                  value={timeHide}
                  // fullWidth
                  onChange={handleChangeTimeHide}
                />
                <TextField
                  sx={{ mt: 2 }}
                  label="Số lần ẩn tối đa"
                  required
                  type="number"
                  value={numberHide}
                  // fullWidth
                  onChange={handleChangeNumberHide}
                />
              </FormControl>
              <Stack direction="row" spacing={2}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={getImage}
                  />
                  <Button variant="contained" component="span">
                    Tải ảnh lên
                  </Button>
                </label>
                <label style={{ width: '70%' }}>
                  <TextField
                    disabled
                    type="text"
                    value={fileName || ''}
                    fullWidth
                    variant="standard"
                  />
                </label>
              </Stack>
              <Grid item sm={6} md={12}>
                <Card
                  sx={{
                    width: '100%',
                    height: '350px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  style={BoxStyle}
                >
                  <CardMedia
                    component="img"
                    id="imgUpload"
                    onLoad={onLoadImg}
                    image={preViewImage || ''}
                    sx={{ objectFit: 'contain' }}
                  />
                </Card>
              </Grid>
            </Box>
          </Grid>
          <Grid item sm={12} md={6} sx={{ pr: 3, pb: 3 }} display="flex">
            <Box
              component="form"
              sx={{
                marginLeft: '20px',
                width: '100%',
              }}
              style={BoxStyle1}
            >
              <div className="mt-4 mb-4">
                <p className="text-center mt-2 mb-2 fs-5">Thông tin website</p>
              </div>
              <Divider />
              <AddInWeb
                username={username}
                webCode={webCode}
                setWebCode={setWebCode}
                setWebsiteId={setWebsiteId}
                pageNameList={pageNameList}
                status={'create'}
                setErrOpen={setErrOpen}
                setOpen={setOpen}
                styleModal={styleModal}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
              <AddInPage
                username={username}
                webCode={webCode}
                pageNameList={pageNameList}
                setPageNameList={setPageNameList}
                setOpenCheckAll={setOpenCheckAll}
                pageList={pageList}
                setPageList={setPageList}
                setErrOpen={setErrOpen}
                setErrCheckOpen={setErrCheckOpen}
                setOpen={setOpen}
                status={'create'}
                websiteId={websiteId}
                styleModal={styleModal}
                openModal={openModal}
                setOpenModal={setOpenModal}
                popUp={popUp}
              />
              {popUp === 'Không' ? (
                <AddInSection
                  setOpenCheckAll={setOpenCheckAll}
                  status={'create'}
                  pageList={pageList}
                  pageNameList={pageNameList}
                  setSectionMappingArray={setSectionMappingArray}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  sectionList={sectionList}
                  setSectionList={setSectionList}
                  setPageNameList={setPageNameList}
                  sectionNameList={sectionNameList}
                  setSectionNameList={setSectionNameList}
                />
              ) : (
                <></>
              )}
              {popUp === 'Có' ? (
                <>
                  <FormControl sx={{ width: '100%', height: 100, mt: -3 }}>
                    <InputLabel id="demo-simple-select-label">Vị trí banner</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Vị trí banner"
                      value={position}
                      onChange={handleChangePosition}
                    >
                      <MenuItem value={'default'}>Mặc định</MenuItem>
                      <MenuItem value={'top-left'}>Có khoảng cách với Top và Left của trang </MenuItem>
                      <MenuItem value={'top-right'}>Có khoảng cách với Top và Right của trang</MenuItem>
                      <MenuItem value={'bottom-left'}>Có khoảng cách với Bottom và Left của trang</MenuItem>
                      <MenuItem value={'bottom-right'}>Có khoảng cách với Bottom và Right của trang</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: '100%', height: 100, mt: -3 }}>
                    <InputLabel id="demo-simple-select-label">Loại vị trí</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Loại vị trí "
                      value={positionType}
                      onChange={handleChangePositionType}
                    >
                      <MenuItem value={'fixed'}>Vị trí cố định</MenuItem>
                      <MenuItem value={'absolute'}>Vị trí tương đối</MenuItem>
                    </Select>
                  </FormControl>
                  {modal === 'Không' ? (
                    <>
                      <FormControl sx={{ width: '100%', height: 100, mt: -3 }}>
                        <InputLabel id="demo-simple-select-label">
                          Tùy chỉnh kích cỡ ảnh
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Tùy chỉnh kích cỡ ảnh"
                          value={bannerWidth}
                          onChange={handleChangeBannerWidth}
                        >
                          <MenuItem value={'native'}>Tự nhiên</MenuItem>
                          <MenuItem value={'fullWidth'}>Bằng chiều dài màn hình</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
              <Box
                component="form"
                sx={{
                  display: displayBox,
                  marginTop: '-25px',
                  flexDirection: 'column',
                  gap: 1,
                  '& .MuiTextField-root': {
                    width: '100%',
                  },
                }}
              >
                <TextField
                  label="Nhập khoảng cách lần lượt"
                  autoComplete="off"
                  required
                  type="text"
                  error={Boolean(errorPositionValue)}
                  helperText={errorPositionValue}
                  value={pstValue}
                  onChange={handleChangePositionValue}
                />
              </Box>
              {popUp === 'Có' ? (
                <DemoBanner
                  modal={modal}
                  position={position}
                  pst1={pst1}
                  pst2={pst2}
                  pstVl1={pstVl1}
                  pstVl2={pstVl2}
                  widthImg={widthImg}
                  heightImg={heightImg}
                  preViewImage={preViewImage}
                />
              ) : (
                <></>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{
            width: '500px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          Tạo thành công
        </Alert>
      </Snackbar>
      <Snackbar
        open={errOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          sx={{
            width: '500px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          Tạo thất bại
        </Alert>
      </Snackbar>
      <Snackbar
        open={errCheckOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          sx={{
            width: '500px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          Chưa chọn website để hiển thị banner
        </Alert>
      </Snackbar>
      <Snackbar
        open={openCheckAll}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          sx={{
            width: '500px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          Bạn cần nhập đầy đủ thông tin trước khi lưu.
        </Alert>
      </Snackbar>
      <Snackbar
        open={errImage}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          sx={{
            width: '500px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          Ảnh chưa được tải lên
        </Alert>
      </Snackbar>
      <Snackbar
        open={errInput}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          sx={{
            width: '500px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          Thông tin nhập vào không phù hợp
        </Alert>
      </Snackbar>
    </div>
  );
};
export default CreateBanner;
