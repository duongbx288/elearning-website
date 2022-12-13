import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { BoxStyle1 } from '../../styles/style';
import CardMedia from '@mui/material/CardMedia';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configs/FireBase';
import { v4 } from 'uuid';
import { SelectChangeEvent } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Toolbar, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoxStyle, ToolbarStyle } from '../../styles/style';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import PageService from '../../services/PageService';
import WebsiteService from '../../services/WebsiteService';
import BannerService from '../../services/BannerService';
import AddInWeb from './AddInWeb';
import AddInPage from './AddInPage';
import AddInSection from './AddInSection';
import DemoBanner from './DemoBanner';
import { Divider } from '@mui/material';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
type BannerInfo = {
  id: number;
  code: string;
  title: string;
  imgUrl: string;
  url: string;
  type: string;
  popUp: number;
  modal: number;
  width: number;
  height: number;
  bannerWidth: string;
  createdBy: string;
  lastModifiedBy: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
};
interface CustomState {
  detail: BannerInfo;
}
type SectionMapping = {
  sectionCode: string;
  modeHide: number;
  timeHide: number;
  numberHide: number;
};
const UpdateBanner: React.FC = (props: any) => {
  let id = props.match.params.id;
  const location = useLocation();
  let history = useHistory();
  const userInfo =
    typeof localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '')
      : '';
  const [sectionList, setSectionList] = React.useState([] as any);
  const [websiteId, setWebsiteId] = React.useState<number>(0);
  const state = location.state as CustomState;
  const [displayBox, setDisplayBox] = React.useState('block');
  const [webCode, setWebCode] = React.useState('');
  const [pstValue, setPstValue] = React.useState<string>('0,0');
  const [position, setPosition] = React.useState<string>('default');
  const [positionType, setPositionType] = React.useState<string>('fixed');
  const [pageNameList, setPageNameList] = React.useState<string[]>([]);
  const [sectionNameList, setSectionNameList] = React.useState<string[]>([]);
  const [pageList, setPageList] = React.useState([] as PageInfo[]);
  const [code, setCode] = React.useState(state.detail.code);
  const [bannerWidth, setBannerWidth] = React.useState(state.detail.bannerWidth);
  console.log(' chieu danh tuy chinh : ', state.detail.bannerWidth);
  const [title, setTitle] = React.useState(state.detail.title);
  const [type, setType] = React.useState(state.detail.type);
  const [popUp, setPopUp] = React.useState(state.detail.popUp === 0 ? 'Không' : 'Có');
  const [modal, setModal] = React.useState(state.detail.modal === 0 ? 'Không' : 'Có');
  const [fileName, setFileName] = React.useState('');
  const [imageUpload, setImageUpload] = React.useState(null);
  const [preViewImage, setPreViewImage] = React.useState('');
  const [display, setDisplay] = React.useState(
    state.detail.type === 'Khác' ? 'none' : 'block'
  );
  const [errorTitle, setErrorTitle] = React.useState<String>();
  const [errorPositionValue, setErrorPositionValue] = React.useState<String>();
  const [errorInputWebUrl, setErrorInputWebUrl] = React.useState<String>();
  const [widthImg, setWidthImg] = React.useState(400);
  const [heightImg, setHeightImg] = React.useState(550);
  const [open, setOpen] = React.useState(false);
  const [errOpen, setErrOpen] = React.useState(false);
  const [errCheckOpen, setErrCheckOpen] = React.useState(false);
  const [webUrl, setWebUrl] = React.useState('');
  const [utmSource, setUtmSource] = React.useState('');
  const [campaign, setCampaign] = React.useState('');
  const [utmCampaign, setUtmCampaign] = React.useState('');
  const [utmMedium, setUtmMedium] = React.useState('');
  const [openCheckAll, setOpenCheckAll] = React.useState<boolean>(false);
  const [timeHide, setTimeHide] = React.useState<number>(0);
  const [numberHide, setNumberHide] = React.useState<number>(0);
  const [username, setUsername] = React.useState('');
  const [sectionMappingArray, setSectionMappingArray] = React.useState(
    [] as SectionMapping[]
  );
  const [pst1, setPst1] = React.useState<string>('');
  const [pst2, setPst2] = React.useState<string>('');
  const [pstVl1, setPstVl1] = React.useState<number>(0);
  const [pstVl2, setPstVl2] = React.useState<number>(0);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [linkUrl, setLinkUrl] = React.useState(state.detail.url);

  useEffect(() => {
    getData();
    getListPage(id);
    getWebCode(id);
    getPosition(id);
    setUsername(userInfo.username);
  }, [webCode]);
  const getData = () => {
    axios
      .get('/api/banners/' + id)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setCode(data.code);
        setTitle(data.title);
        setType(data.type);
        setLinkUrl(data.url);
        setPreViewImage(data.imgUrl);
      });
    splitLinkUrl(linkUrl);
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
  const handleChangePosition = (event: SelectChangeEvent) => {
    const position = event.target.value;
    setPosition(position as string);
    if (position === 'default') {
      setPstValue('0');
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
  const getListPage = async (id) => {
    if (popUp === 'Có') {
      let ItemArr = new Array();
      await PageService.getListPageByBannerId(id).then((res) => {
        setPageList(res.data);
        res.data.map((item) => ItemArr.push(item.pageName));
      });

      setPageNameList(ItemArr);
    } else {
      await PageService.getPageViaSectionAndBannerId(id).then((res) => {
        setPageNameList(res.data.pageName);
      });
    }
  };

  const getPosition = async (id: number) => {
    if (pageList.length > 0) {
      await BannerService.getBannerMappingByBannerIdAndPageId(id, pageList[0].id).then(
        (res) => {
          setPosition(res.data.position);
          setPstValue(res.data.positionValue);
          setPositionType(res.data.positionType);
          setTimeHide(res.data.timeHide);
          setNumberHide(res.data.numberHide);
          if (popUp === 'Có') {
            const pstValue = res.data.positionValue;
            let splitIndex2 = pstValue.indexOf(',');
            let pstValue1 = pstValue.slice(0, splitIndex2);
            let pstValue2 = pstValue.slice(splitIndex2 + 1, pstValue.length);
            setPstVl1(pstValue1 as unknown as number);
            setPstVl2(pstValue2 as unknown as number);
            const position = res.data.position;
            let splitIndex1 = position.indexOf('-');
            let value1 = position.slice(0, splitIndex1);
            let value2 = position.slice(splitIndex1 + 1, position.length);
            setPst1(value1);
            setPst2(value2);
          }
        }
      );
    }
  };

  const getWebCode = async (id) => {
    if (popUp === 'Có') {
      await WebsiteService.getWebCodeByBannerId(id).then((res) => {
        setWebCode(res.data.code);
      });
    } else {
      await WebsiteService.getWebViaSectionAndBannerId(id).then((res) => {
        setWebCode(res.data.code);
        PageService.getPageByWebsiteCode(res.data.code).then((response) => {
          setPageList(response.data);
        });
      });
    }
  };
  const handleChangeBannerWidth = (event: SelectChangeEvent) => {
    setBannerWidth(event.target.value as string);
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
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrOpen(false);
  };
  const handleChangeTimeHide = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeHide(event.target.value as unknown as number);
  };
  const handleChangeNumberHide = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberHide(event.target.value as unknown as number);
  };
  const splitLinkUrl = (linkUrl: string) => {
    if (linkUrl.length > 0) {
      let indexOfCampaign = linkUrl.indexOf('campaign');
      let indexOfUtmCampaign = linkUrl.indexOf('utm_campaign');
      let indexOfUtmSource = linkUrl.indexOf('utm_source');
      let indexOfUtmMedium = linkUrl.indexOf('utm_medium');

      let webUrl = linkUrl.slice(0, indexOfCampaign - 1);
      let campaign = linkUrl.slice(indexOfCampaign + 9, indexOfUtmCampaign - 1);
      let utmCampaign = linkUrl.slice(indexOfUtmCampaign + 13, indexOfUtmSource - 1);
      let utmSource = linkUrl.slice(indexOfUtmSource + 11, indexOfUtmMedium - 1);
      let utmMedium = linkUrl.slice(indexOfUtmMedium + 11, linkUrl.length);

      setWebUrl(webUrl);
      setCampaign(campaign);
      setUtmSource(utmSource);
      setUtmMedium(utmMedium);
      setUtmCampaign(utmCampaign);
    } else {
      setWebUrl('');
      setUtmSource('');
      setUtmMedium('');
      setUtmCampaign('');
      setCampaign('');
    }
  };
  const handleChangeUtmCampaign = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUtmCampaign(event.target.value as string);
  };
  const handleChangeCampaignMedium = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUtmMedium(event.target.value as string);
  };
  const handleValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      return 'Nội dung không được để trống';
    }
  };
  const handleChangeWebsiteURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebUrl(event.target.value as string);
    setErrorInputWebUrl(handleValueInput(event));
  };
  const handleChangeSource = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUtmSource(event.target.value as string);
  };
  const onLoadImg = () => {
    let imgLoad = document.getElementById('imgUpload') as HTMLImageElement;
    setWidthImg(imgLoad.naturalWidth);
    setHeightImg(imgLoad.naturalHeight);
  };
  const handleValidateCodeAndTittle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      let format = /[`!@#$%^&*()+=[\]{};':"\\|,.<>?~]/;
      let check = format.test(event.target.value);
      if (check) {
        return 'Nội dung không được chứa kí tự đặc biệt';
      } else if (event.target.value.length < 1 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 6 kí tự, tối đa 50 kí tự';
      }
    }
  };
  const handleChangeType = (event: SelectChangeEvent) => {
    if (event.target.value !== 'Khác') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
    setType(event.target.value as string);
  };
  const handleChangeCampaign = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampaign(event.target.value as string);
  };
  const handleChangeModal = (event: SelectChangeEvent) => {
    setModal(event.target.value as string);
  };
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value as string);
    setErrorTitle(handleValidateCodeAndTittle(event));
  };
  const getImage = (e: any) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setImageUpload(e.target.files[0]);
    setPreViewImage(url);
    setFileName(e.target.files[0].name);
  };

  const saveBanner = (event: any) => {
    event.preventDefault();
    if (errorTitle != null) {
      setErrOpen(true);
      return;
    } else {
      if (imageUpload == null) {
        let bannerItem = {
          id: id,
          code: code,
          title: title,
          imgUrl: preViewImage,
          type: type,
          popUp: popUp === 'Không' ? 0 : 1,
          modal: modal === 'Không' ? 0 : 1,
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
          createdBy: state.detail.createdBy,
          lastModifiedBy: username,
        };
        axios.put('/api/banners', bannerItem).then((response) => {
          if (response.status === 200) {
            if (state.detail.popUp === 1) {
              saveToBannerMapping();
              setOpen(true);
              setTimeout(function () {
                console.log('success');
                history.push('/banner');
              }, 3000);
            } else {
              setTimeout(function () {
                console.log('success');
                history.push('/banner');
              }, 3000);
            }
            // alert('Lưu thành công');
          } else setErrOpen(true);
          // else alert('Đã có lỗi xẩy ra, lưu thất bại');
        });
      } else {
        if (fileName != null) {
          const imageRef = ref(storage, `images/${fileName + v4()}`);
          uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              let bannerItem = {
                id: id,
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
                createdBy: state.detail.createdBy,
                lastModifiedBy: username,
              };
              axios.put('/api/banners', bannerItem).then((response) => {
                if (response.status === 200) {
                  if (state.detail.popUp === 1) {
                    saveToBannerMapping();
                    setOpen(true);
                    setTimeout(function () {
                      history.push('/banner');
                    }, 3000);
                  } else {
                    setOpen(true);
                    setTimeout(function () {
                      history.push('/banner');
                    }, 3000);
                  }
                  // alert('Lưu thành công');
                } else setErrOpen(true);
              });
            });
          });
        }
      }
    }
  };

  const saveToBannerMapping = () => {
    pageList.map((item) => {
      let newItem = {
        id: 0,
        bannerId: id,
        sectionId: 0,
        pageId: item.id,
        position: position,
        positionValue: pstValue,
        positionType: positionType,
        timeHide: timeHide,
        numberHide: numberHide,
        percentage: 0,
        createdBy: state.detail.createdBy,
        lastModifiedBy: username,
      };

      BannerService.updateBannerMapping(newItem);
    });
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
              history.push('/banner');
            }}
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
        <Typography variant="h5" mb={2} color="blue">
          Chỉnh sửa thông tin banner
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ pr: 3, pb: 3 }}>
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
                label="Nhập chủ đề banner"
                type="text"
                value={title || ''}
                required
                error={Boolean(errorTitle)}
                helperText={errorTitle}
                onChange={handleChangeTitle}
              />
              <FormControl sx={{ width: '100%' }}>
                <InputLabel required>Chọn loại banner</InputLabel>
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
                  <MenuItem value={'Liên kết tới một iframe'}>
                    Liên kết tới một iframe
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
              {state.detail.popUp === 0 ? (
                <TextField
                  label="Trạng thái popup"
                  type="text"
                  value={popUp || ''}
                  InputProps={{ readOnly: true }}
                />
              ) : (
                <>
                  <TextField
                    label="Trạng thái popup"
                    type="text"
                    value={popUp || ''}
                    InputProps={{ readOnly: true }}
                  />
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel required>Chọn trạng thái modal</InputLabel>
                    <Select
                      value={modal}
                      fullWidth
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
                      fullWidth
                      onChange={handleChangeTimeHide}
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      label="Số lần ẩn tối đa"
                      required
                      type="number"
                      value={numberHide}
                      fullWidth
                      onChange={handleChangeNumberHide}
                    />
                  </FormControl>
                </>
              )}

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
                <label>
                  <TextField
                    disabled
                    type="text"
                    variant="standard"
                    value={fileName || ''}
                  />
                </label>
              </Stack>
              <Grid item sm={6} md={12}>
                <Card
                  sx={{
                    width: '100%',
                    height: '400px',
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
                status={'update'}
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
                status={'update'}
                websiteId={websiteId}
                styleModal={styleModal}
                openModal={openModal}
                setOpenModal={setOpenModal}
                popUp={popUp}
              />
              {popUp === 'Không' ? (
                <AddInSection
                  setOpenCheckAll={setOpenCheckAll}
                  status={'update'}
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
                  bannerId={id}
                />
              ) : (
                <></>
              )}
              {popUp === 'Có' ? (
                <>
                  <FormControl sx={{ width: '100%', height: 100, mt: -4 }}>
                    <InputLabel id="demo-simple-select-label">Position</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Position"
                      value={position}
                      onChange={handleChangePosition}
                    >
                      <MenuItem value={'default'}>Mặc định</MenuItem>
                      <MenuItem value={'top-left'}>Top, left</MenuItem>
                      <MenuItem value={'top-right'}>Top, right</MenuItem>
                      <MenuItem value={'bottom-left'}>Bottom, left</MenuItem>
                      <MenuItem value={'bottom-right'}>Bottom, right</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: '100%', height: 100, mt: -3 }}>
                    <InputLabel id="demo-simple-select-label">Loại position</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Loại position"
                      value={positionType}
                      onChange={handleChangePositionType}
                    >
                      <MenuItem value={'fixed'}>Fixed</MenuItem>
                      <MenuItem value={'absolute'}>Absolute</MenuItem>
                    </Select>
                  </FormControl>
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
                      label="Nhập giá trị position"
                      autoComplete="off"
                      required
                      type="text"
                      error={Boolean(errorPositionValue)}
                      helperText={errorPositionValue}
                      value={pstValue}
                      onChange={handleChangePositionValue}
                    />
                  </Box>
                  {modal === 'Không' ? (
                    <>
                      <FormControl sx={{ width: '100%', height: 100, mt: 3 }}>
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
          Lưu thành công
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
          Cập nhập thất bại
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
    </div>
  );
};
export default UpdateBanner;
