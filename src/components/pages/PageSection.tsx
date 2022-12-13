import { useEffect, useState, useRef } from 'react';
import { DataGrid, GridActionsCellItem, GridColumns, GridRowId } from '@mui/x-data-grid';
import {
  Button,
  Toolbar,
  Typography,
  Box,
  Divider,
  Icon,
  Tabs,
  Tab,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import PageService from '../../services/PageService';
import SectionService from '../../services/SectionService';
import BannerService from '../../services/BannerService';
import '../../styles/App.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoxStyle, CellTable, ToolbarStyle } from '../../styles/style';
import { LinkStyle, Url } from '../../styles/style';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
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
  pageId: number;
  tabValue?: number;
}

interface TabPanelProps {
  children?: React.ReactNode;

  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PageSection: React.FC = () => {
  const location = useLocation();
  const pageId = location.state as CustomState;
  const history = useHistory();

  const mapPageToNextCursor = useRef<{ [page: number]: GridRowId }>({});
  const [pageSize, setPageSize] = useState(5);
  const [totalRow, setTotalRow] = useState(0);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({} as PageInfo);
  const [bannerList, setBannerList] = useState([] as any[]);
  const [value, setValue] = useState(0);
  const [displayTabSection, setDisplayTabSection] = useState('block');
  const [displayTabBanner, setDisplayTabBanner] = useState('none');
  let checkLength = bannerList.length;
  const BoxStyle2 = {
    backgroundColor: ' #fff',
    boxShadow: '0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)',
    borderRadius: '5px',
    width: '104%',
    margin: '-23px ',
  };
  useEffect(() => {
    fetchData(page);
    fetchDataBanner();
  }, [checkLength, value]);

  const fetchDataBanner = async () => {
    await BannerService.getListBannerPopUpByPage(pageId.pageId).then((res) => {
      setBannerList(res.data);
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchData = (page: number) => {
    axios
      .get('/api/sections/' + page + '/' + pageSize)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setTotalRow(data.totalSections);
      });

    PageService.getPageInfoById(pageId.pageId).then((response) => {
      setPageInfo(response.data);
    });
    SectionService.getSectionByPageId(pageId.pageId).then((response) => {
      setData(response.data.sections);
    });
  };
  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const handleGoToAddBaner = () => {
    history.push({
      pathname: '/page/add-banner/' + pageId.pageId,
      state: { detail: pageId.pageId, websiteId: pageInfo.websiteId },
    });
  };
  const changeDateFormat = (date: Date | undefined) => {
    const temp = date?.toString().replace('T', ' ');
    const dotPosition = temp?.lastIndexOf('.');

    return temp?.slice(0, dotPosition);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    var choice = window.confirm('Xác nhận Xóa section?');
    if (choice === true) {
      setData(data.filter((row: { id: GridRowId }) => row.id !== id));
      SectionService.deleteSectionMapping(Number(id), pageId.pageId);
    }
  };

  const handleDeleteBannerPopUp = (id: GridRowId) => () => {
    var choice = window.confirm('Xác nhận Xóa banner popup?');
    if (choice === true) {
      setBannerList(bannerList.filter((row: { id: GridRowId }) => row.id !== id));
      BannerService.deleteOnBannerMappingByBannerIdAndPageId(Number(id), pageId.pageId);
    }
  };

  const handleViewDetailSectionClick = (id: GridRowId) => () => {
    const sectionInfo = data.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/section/detail/' + id,
      state: { detail: sectionInfo },
    });
  };
  const handleViewDetailBannerClick = (id: GridRowId) => () => {
    const bannerInfo = bannerList.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/banner/detail/' + id,
      state: { detail: bannerInfo },
    });
  };
  const handleUpdateSectionClick = (id: GridRowId) => {
    const sectionInfo = data.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/section/update/' + id,
      state: { detail: sectionInfo },
    });
  };

  const handleGoToUpdateSectionInPage = () => {
    history.push({
      pathname: '/page/update-section/' + pageId.pageId,
      state: { detail: pageId.pageId },
    });
  };

  const handleUpdateBannerPopUp = (id: GridRowId) => {
    const bannerInfo = bannerList.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/banner/update/' + id,
      state: { detail: bannerInfo },
    });
  };
  const columns: GridColumns = [
    {
      field: 'code',
      headerName: 'Mã khu vực',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'divId',
      headerName: 'Id thẻ div',
      minWidth: 150,
      flex: 1.5,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography onClick={handleViewDetailSectionClick(params.id)} sx={LinkStyle}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'desc',
      headerName: 'Mô tả',
      minWidth: 250,
      flex: 2.5,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'width',
      headerName: 'Chiều rộng',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'height',
      headerName: 'Chiều dài',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'actions',
      type: 'actions',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerName: 'Thao tác',
      getActions: ({ id }) => [
        <Tooltip title={'Sửa'}>
          <GridActionsCellItem
            icon={<EditIcon />}
            color="success"
            label="Edit"
            onClick={() => {
              handleUpdateSectionClick(id);
            }}
          />
        </Tooltip>,
        <Tooltip title={'Xóa'}>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            color="error"
            label="Delete"
            onClick={handleDeleteClick(id)}
          />
        </Tooltip>,
      ],
    },
  ];

  const BannerColumns: GridColumns = [
    {
      field: 'code',
      headerName: 'Mã banner',
      description: 'code của banner',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography onClick={handleViewDetailBannerClick(params.id)} sx={LinkStyle}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'title',
      headerName: 'Tên banner',
      description: 'Tên banner',
      minWidth: 200,
      flex: 2,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography onClick={handleViewDetailBannerClick(params.id)} sx={Url}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'url',
      headerName: 'Đường dẫn',
      description: 'Đường dẫn banner dẫn tới',
      minWidth: 250,
      flex: 2,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={() => openInNewTab(params.value)} sx={Url}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'imgUrl',
      headerClassName: 'super-app-theme--header',
      headerName: 'Ảnh',
      description: 'Ảnh',
      minWidth: 270,
      flex: 2,
      editable: true,
      renderCell: (params) => <img src={params.value} alt="" />,
      cellClassName: 'img-field-css',
    },
    {
      field: 'actions1',
      type: 'actions',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerName: 'Thao tác',
      getActions: ({ id }) => [
        <Tooltip title={'Sửa'}>
          <GridActionsCellItem
            icon={<EditIcon />}
            color="success"
            label="Edit"
            onClick={() => {
              handleUpdateBannerPopUp(id);
            }}
          />
        </Tooltip>,
        <Tooltip title={'Xóa'}>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            color="error"
            label="Delete"
            onClick={handleDeleteBannerPopUp(id)}
          />
        </Tooltip>,
      ],
    },
  ];
  const handlePageChange = (newPage: number) => {
    if (newPage === 0 || mapPageToNextCursor.current[newPage - 1]) {
      setPage(newPage);
    }
    fetchData(newPage);
  };

  const handleShowTabSection = () => {
    setDisplayTabSection('block');
    setDisplayTabBanner('none');
  };
  const handleShowTabBanner = () => {
    setDisplayTabSection('none');
    setDisplayTabBanner('block');
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
      </Toolbar>
      <Box sx={{ m: 5 }}>
        <Typography variant="h5" color={'blue'}>
          {' '}
          Thông tin trang{' '}
        </Typography>
        <Box sx={{ mt: 2 }} style={BoxStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'blue' }}>
              Thông tin chi tiết
            </Typography>
            <div>
              <Button
                variant="contained"
                sx={{ mr: '10px',
                      width: '165px'
                }}
                onClick={() =>
                  history.push({
                    pathname: '/page/update/' + pageInfo.id,
                    state: { detail: pageInfo },
                  })
                }
              >
                Sửa thông tin
              </Button>
            </div>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            <Table sx={{ width: '50%' }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={CellTable}>Tên page:</TableCell>
                  <TableCell sx={CellTable}>
                    <b>{pageInfo.pageName}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={CellTable}>Đường dẫn của page:</TableCell>
                  <TableCell sx={CellTable}>
                    <b>{pageInfo.pageUrl}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={CellTable}>Thời gian tạo:</TableCell>
                  <TableCell sx={CellTable}>
                    <b>{changeDateFormat(pageInfo.createdDate)}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={CellTable}>Thời gian chỉnh sửa gần nhất:</TableCell>
                  <TableCell sx={CellTable}>
                    <b>{changeDateFormat(pageInfo.lastModifiedDate)}</b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>
        <Box style={BoxStyle} sx={{ mt: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{ mt: 0, paddingTop: 0 }}
            aria-label="basic tabs example"
          >
            <Box
              sx={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                flexDirection: { sm: 'column', md: 'row' },
              }}
            >
              <Box
                sx={{
                  width: { sm: '100%', md: '50%' },
                  justifyContent: { sm: 'center', md: 'flex-start' },
                  display: 'flex',
                  mb: 2,
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="Các khu vực"
                    {...a11yProps(0)}
                    onClick={handleShowTabSection}
                  ></Tab>
                  <Tab
                    label="Các banner popup"
                    {...a11yProps(1)}
                    onClick={handleShowTabBanner}
                  ></Tab>
                </Tabs>
              </Box>
              <Box
                style={{ display: displayTabBanner }}
                sx={{
                  justifyContent: 'end',
                  width: { sm: '100%', md: '165px' },
                  mb: 2,
                  mr: '10px',
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: '165px',
                    height: '40px',
                  }}
                  onClick={() => handleGoToAddBaner()}
                >
                  Chọn banner
                </Button>
              </Box>

              <Box
                style={{ display: displayTabSection }}
                sx={{
                  width: { sm: '100%', md: '340px' },
                  mb: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    height: '40px',
                    width: '165px',
                    flex: 1,
                  }}
                  onClick={() =>
                    history.push({
                      pathname: '/page/add-section/' + pageInfo.id,
                      state: { detail: pageInfo },
                    })
                  }
                >
                  Chọn khu vực
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: '165px',
                    marginLeft: '10px',
                    height: '40px',
                    flexWrap: 'wrap',
                  }}
                  onClick={() => handleGoToUpdateSectionInPage()}
                >
                  Chỉnh sửa
                </Button>
              </Box>
            </Box>
          </Tabs>
          <TabPanel value={value} index={1}>
            <Box sx={{ width: '100%' }} style={BoxStyle2}>
              <div className="list">
                <DataGrid
                  rows={bannerList}
                  columns={BannerColumns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                />
              </div>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={0}>
            <Box sx={{ width: '100%' }} style={BoxStyle2}>
              <div className="list">
                <DataGrid
                  rows={data}
                  columns={columns}
                  pagination
                  paginationMode="server"
                  pageSize={pageSize}
                  rowsPerPageOptions={[pageSize]}
                  onPageChange={handlePageChange}
                  rowCount={totalRow}
                  disableSelectionOnClick
                  initialState={{
                    sorting: {
                      sortModel: [
                        {
                          field: 'pageName',
                          sort: 'desc',
                        },
                      ],
                    },
                  }}
                />
              </div>
            </Box>
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
};

export default PageSection;

/// OLD TAB
{
  /* <Box>
<Box
  sx={{
    mt: 2,
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }}
  style={BoxStyle}
>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab
      label="Các khu vực"
      {...a11yProps(0)}
      onClick={handleShowTabSection}
    ></Tab>
    <Tab
      label="Các banner popup"
      {...a11yProps(1)}
      onClick={handleShowTabBanner}
    ></Tab>
    <div style={{ display: displayTabBanner }}>
      <Button
        variant="contained"
        sx={{
          minWidth: '150px',
          marginLeft: '710px',
          height: '40px',
        }}
        onClick={() => handleGoToAddBaner()}
      >
        Chọn banner
      </Button>
    </div>

    <div style={{ display: displayTabSection, marginLeft: '560px' }}>
      <Button
        variant="contained"
        sx={{
          height: '40px',
          minWidth: '150px',
        }}
        onClick={() =>
          history.push({
            pathname: '/page/add-section/' + pageInfo.id,
            state: { detail: pageInfo },
          })
        }
      >
        Chọn khu vực
      </Button>
      <Button
        variant="contained"
        sx={{
          minWidth: '150px',
          marginLeft: '10px',
          height: '40px',
          flexWrap: 'wrap',
        }}
        onClick={() => handleGoToUpdateSectionInPage()}
      >
        Chỉnh sửa
      </Button>
    </div>
  </Tabs>
</Box>
<TabPanel value={value} index={1}>
  <Box sx={{ width: '100%' }} style={BoxStyle2}>
    <div className="list">
      <DataGrid
        rows={bannerList}
        columns={BannerColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  </Box>
</TabPanel>
<TabPanel value={value} index={0}>
  <Box sx={{ width: '100%' }} style={BoxStyle2}>
    <div className="list">
      <DataGrid
        rows={data}
        columns={columns}
        pagination
        paginationMode="server"
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        onPageChange={handlePageChange}
        rowCount={totalRow}
        disableSelectionOnClick
        initialState={{
          sorting: {
            sortModel: [
              {
                field: 'pageName',
                sort: 'desc',
              },
            ],
          },
        }}
      />
    </div>
  </Box>
</TabPanel>
</Box> */
}
