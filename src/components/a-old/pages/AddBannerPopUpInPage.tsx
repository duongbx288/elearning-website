import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BoxStyle, ToolbarStyle } from '../../../styles/style';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BannerService from '../../../services/BannerService';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  Toolbar,
  Box,
  Button,
  Typography,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  SelectChangeEvent,
} from '@mui/material';
import PageBanner from './PageBanner';
type Banner = {
  id: number;
  title: string;
  imgUrl: string;
  url: string;
};
type BannerMapping = {
  id: number;
  position: string;
  positionValue: string;
  checked: boolean;
  createdBy?: string;
  timeHide: number;
  numberHide: number;
};

interface CustomState {
  detail: number;
  websiteId: number;
}

const AddBannerPopUpInPage: React.FC = (props: any) => {
  const pageId = props.match.params.id;
  const location = useLocation();
  const state = location.state as CustomState;

  const history = useHistory();
  const userInfo =
    typeof localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '')
      : '';

  const [bannerList, setBannerList] = useState([] as Banner[]);
  const [bannerArray, setBannerArray] = useState([] as BannerMapping[]);
  const [username, setUsername] = useState();

  useEffect(() => {
    fetchDataBanner();
    setUsername(userInfo.username);
  }, []);

  const fetchDataBanner = () => {
    BannerService.getListBannerPopUpNotInPage(Number(pageId)).then((res) => {
      setBannerList(res.data);
    });
  };
  const saveToBannerMapping = () => {
    bannerArray.map((item) => {
      if (item.checked === true) {
        let newItem = {
          bannerId: item.id,
          sectionId: 0,
          pageId: pageId,
          position: item.position === 'undefined' ? 0 : item.position,
          positionValue: item.positionValue === 'undefined' ? 0 : item.positionValue,
          percentage: 0,
          createdBy: username,
          timeHide: item.timeHide,
          positionType: 'fixed',
          numberHide: item.numberHide,
          lastModifiedBy: username,
        };
        BannerService.saveBannerMapping(newItem);
      }
    });
    history.goBack();
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
          <Button
            sx={{ minWidth: '100px' }}
            variant="contained"
            onClick={() => saveToBannerMapping()}
          >
            Thêm
          </Button>
        </Box>
      </Toolbar>
      {bannerList.length === 0 ? (
        <Box sx={{ m: 5 }} style={BoxStyle}>
          <Typography variant="h5">Không có banner nào phù hợp</Typography>
          <Button
            sx={{ minWidth: '100px', marginTop: '20px' }}
            variant="contained"
            onClick={() =>
              history.push({
                pathname: '/banner/create',
                state: { popUp: 1, pageId: pageId, websiteId: state.websiteId },
              })
            }
          >
            Tạo mới banner
          </Button>
        </Box>
      ) : (
        <Box style={BoxStyle} sx={{ m: 5 }}>
          <Typography variant="h5">
            Danh sách các banner phù hợp{' '}
          </Typography>
          <Button
            sx={{ minWidth: '100px', mb: 1, mt: 1 }}
            variant="contained"
            onClick={() =>
              history.push({
                pathname: '/banner/create',
                state: { popUp: 1, pageId: pageId, websiteId: state.websiteId },
              })
            }
          >
            Tạo mới banner
          </Button>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e6e8ea' }}>
                  <TableCell align="center" sx={{ width: '5%' }}>
                    Mã
                  </TableCell>
                  <TableCell align="center" sx={{ width: '20%' }}>
                    Chủ đề
                  </TableCell>
                  <TableCell align="center" sx={{ width: '25%' }}>
                    Ảnh banner
                  </TableCell>
                  <TableCell align="center" sx={{ width: '15%' }}>
                    Vị trí điều chỉnh
                  </TableCell>
                  <TableCell align="center" sx={{ width: '10%' }}>
                    Giá trị
                  </TableCell>
                  <TableCell align="center" sx={{ width: '10%' }}>
                    Số lần ẩn
                    <Tooltip title={"Cho biết sau bao nhiêu lần người dùng bấm 'x' trên banner thì banner sẽ dừng hiển thị hoàn toàn"+
                  "- áp dụng với banner pop-up"}><HelpOutlineIcon sx={{fontSize: '17px', ml: 0.5, mb: 0.3}}/></Tooltip>
                  </TableCell>
                  <TableCell align="center" sx={{ width: '10%' }}>
                    Số ngày ẩn
                    <Tooltip title={"Số ngày banner sẽ ẩn sau khi bấm nút 'x' trên banner nếu banner là banner pop-up"}><HelpOutlineIcon sx={{fontSize: '17px', ml: 0.5, mb: 0.3}}/></Tooltip>
                  </TableCell>
                  <TableCell align="center" sx={{ width: '5%' }}>
                    Thêm
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {bannerList.map((item, index) => (
                  <PageBanner
                    key={index}
                    item={item}
                    bannerArray={bannerArray}
                    setBannerArray={setBannerArray}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};
export default AddBannerPopUpInPage;
