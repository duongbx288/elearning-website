import * as React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BoxStyle, ToolbarStyle } from '../../../styles/style';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SectionService from '../../../services/SectionService';
import SectionStatus from '../section/SectionStatus';
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
  Avatar,
  Icon,
} from '@mui/material';
type PageInfo = {
  id: number;
  websiteId: number;
  pageName: string;
  pageUrl: string;
};
interface CustomState {
  detail: PageInfo;
}
interface Section {
  id: number;
  code: string;
  desc: string;
  width: number;
  height: number;
}
interface SectionMapping {
  id: number;
  pageId: number;
  divId: string;
  sectionCode: string;
  sectionId: number;
  modeHide: number;
  timeHide: number;
  numberHide: number;
  checked: boolean;
}
const AddSectionInPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as CustomState;
  const history = useHistory();
  const userInfo =
    typeof localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '')
      : '';

  const [sectionEnabled, setSectionEnabled] = useState<Section[]>([]);
  const [sectionArray, setSectionArray] = useState<SectionMapping[]>([]);
  const [username, setUsername] = useState();
  const sectionEnabledReverse = [...sectionEnabled].reverse();
  const id = state.detail.id;

  useEffect(() => {
    getData();
    setUsername(userInfo.username);
  }, []);

  const getData = async () => {
    await SectionService.getSectionAvailable(id).then((response) => {
      setSectionEnabled(response.data);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.isTrusted) {
      if (e.key === 'Enter') {
        saveToSectionMapping();
      }
    }
  };

  const saveToSectionMapping = () => {
    console.log(sectionArray);
    sectionArray.map((item) => {
      if (item.checked === true) {
        let newItem = {
          pageId: id,
          divId: item.divId,
          sectionCode: item.sectionCode,
          sectionId: item.id,
          timeHide: item.timeHide,
          modeHide: item.modeHide,
          numberHide:
            typeof item.numberHide === 'object' ? item.numberHide : item.numberHide,
          createdBy: username,
        };
        SectionService.saveSectionMapping(newItem);
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
            onClick={() => saveToSectionMapping()}
          >
            Thêm
          </Button>
        </Box>
      </Toolbar>
      {sectionEnabled.length === 0 ? (
        <Box sx={{ m: 5, justifyContent: 'space-between' }} style={BoxStyle}>
          <Typography variant="h5">Chưa có khu vực</Typography>
          <Button
            sx={{ minWidth: '100px', height: '40px' }}
            variant="contained"
            onClick={() =>
              history.push({
                pathname: '/section/create',
              })
            }
          >
            Thêm mới khu vực
          </Button>
        </Box>
      ) : (
        <Box style={BoxStyle} sx={{ m: 5 }}>
          <Box
            sx={{
              justifyContent: 'space-between',
              display: 'inline-flex',
              width: '100%',
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, color: 'blue' }}>
              Danh sách các khu vực
            </Typography>
            <Button
              sx={{ minWidth: '100px', height: '40px' }}
              variant="contained"
              onClick={() =>
                history.push({
                  pathname: '/section/create',
                })
              }
            >
              Thêm mới khu vực
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e6e8ea' }}>
                  <TableCell align="center" sx={{ width: '15%', minWidth: '100px' }}>
                    ID thẻ div
                  </TableCell>
                  <TableCell align="center" sx={{ width: '30%', minWidth: '310px' }}>
                    Mô tả
                  </TableCell>
                  <TableCell align="center" sx={{ width: '13%', minWidth: '150px' }}>
                    Kích thước
                  </TableCell>
                  <TableCell align="center" sx={{ width: '14%', minWidth: '110px'  }}>
                    Cho phép ẩn
                  </TableCell>
                  <TableCell align="center" sx={{ width: '14%', minWidth: '110px' }}>
                    Thời gian ẩn
                    <Tooltip title={"Số ngày banner sẽ ẩn sau khi bấm nút 'x' trên banner nếu banner là banner pop-up"}><HelpOutlineIcon sx={{fontSize: '17px', ml: 0.5, mb: 0.3}}/></Tooltip>
                  </TableCell>
                  <TableCell align="center" sx={{ width: '14%', minWidth: '110px'  }}>
                  Số lần ẩn
                  <Tooltip title={"Cho biết sau bao nhiêu lần người dùng bấm 'x' trên banner thì banner sẽ dừng hiển thị hoàn toàn"+
                  "- áp dụng với banner pop-up"}><HelpOutlineIcon sx={{fontSize: '17px', ml: 0.5, mb: 0.3}}/></Tooltip>
                  </TableCell>
                  <TableCell align="center" sx={{ width: '12%', minWidth: '80px'  }}>
                    Thêm
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sectionEnabledReverse.map((temp, index) => (
                  <SectionStatus
                    key={index}
                    item={temp}
                    sectionArray={sectionArray}
                    setSectionArray={setSectionArray}
                    handleKeyDown={handleKeyDown}
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
export default AddSectionInPage;
