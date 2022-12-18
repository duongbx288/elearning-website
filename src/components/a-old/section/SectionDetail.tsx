import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Toolbar, Typography, Box, Tooltip } from '@mui/material';
import { DataGrid, GridColumns, GridRowId, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import BannerService from '../../../services/BannerService';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoxStyle, ToolbarStyle } from '../../../styles/style';
import { LinkStyle, Url } from '../../../styles/style';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
type SectionInfo = {
  id: number;
  code: string;
  desc: string;
  mode: number;
  divId: string;
  width: number;
  height: number;
  createdBy?: string;
  lastModifiedBy?: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
};
interface CustomState {
  detail: SectionInfo;
}
const SectionDetail: React.FC = () => {
  let history = useHistory();
  const location = useLocation();
  const state = location.state as CustomState;
  const [open, setOpen] = React.useState(false);
  const [errOpen, setErrOpen] = React.useState(false);
  const [bannerList, setBannerList] = React.useState([] as any[]);
  var path = window.location.pathname;
  window.history.back = function () {
    var bodyList = document.querySelector('body') as HTMLElement;
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (path != window.location.pathname) {
          path = window.location.pathname;
        }
      });
    });

    var config = {
      childList: true,
      subtree: true,
    };

    observer.observe(bodyList, config);
  };
  useEffect(() => {
    fetchData();
  }, [path]);
  const fetchData = () => {
    BannerService.getListBannerFilterBySectionId(state.detail.id).then((res) => {
      setBannerList(res.data);
    });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    var choice = window.confirm('Xác nhận Xóa banner?');
    if (choice === true) {
      setBannerList(bannerList.filter((row: { id: GridRowId }) => row.id !== id));
      BannerService.deleteOnBannerMapping(Number(id), state.detail.id);
      setOpen(true);
    }
  };
  const handleViewDetailClick = (id: GridRowId) => () => {
    const bannerInfo = bannerList.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/banner/detail/' + id,
      state: { detail: bannerInfo },
    });
  };
  const handleUpdateClick = (id: GridRowId) => () => {
    const bannerInfo = bannerList.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/banner/update/' + id,
      state: { detail: bannerInfo },
    });
  };
  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const columns: GridColumns = [
    {
      field: 'code',
      headerName: 'Code',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
        <Typography onClick={handleViewDetailClick(params.id)} sx={LinkStyle}>
          {params.value}
        </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'title',
      headerName: 'Tên banner',
      minWidth: 220,
      flex: 2,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
        <Typography onClick={handleViewDetailClick(params.id)} sx={Url}>
          {params.value}
        </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'url',
      headerName: 'URL',
      minWidth: 250,
      flex: 2,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
        <Typography onClick={() => openInNewTab(params.value)} sx={Url}>
          {params.value}
        </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'imgUrl',
      headerClassName: 'super-app-theme--header',
      headerName: 'Ảnh',
      minWidth: 250,
      flex: 2,
      editable: true,
      renderCell: (params) => <img src={params.value} alt="" />,
      cellClassName: 'img-field-css',
    },
    {
      field: 'actions1',
      type: 'actions',
      headerClassName: 'super-app-theme--header',
      headerName: 'Xóa',
      minWidth: 100,
      flex: 1,
      getActions: ({ id }) => [
        <Tooltip title="Sửa">
        <GridActionsCellItem
          icon={<EditIcon />}
          color="success"
          label="Edit"
          onClick={handleUpdateClick(id)}
        /></Tooltip>,
        <Tooltip title="Xóa">
        <GridActionsCellItem
          icon={<DeleteIcon />}
          color="error"
          label="Delete"
          onClick={handleDeleteClick(id)}
        /></Tooltip>,
      ],
    },
  ];
  const handleGoToAddBaner = (sectionInfo: SectionInfo) => {
    history.push({
      pathname: '/section/add-banner/' + sectionInfo.id,
      state: { detail: sectionInfo },
    });
  };
  const handleGoToUpdateSection = (section: any) => {
    history.push({
      pathname: '/section/update/' + section.id,
      state: { detail: section },
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
              history.push('/section');
            }}
          >
            Hủy
          </Button>
          <Button
            sx={{ minWidth: '100px' }}
            variant="contained"
            onClick={() => handleGoToUpdateSection(state.detail)}
          >
            Chỉnh sửa
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ mx: 5, my: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'blue' }}>
          Chi tiết khu vực
        </Typography>
        <Grid container sx={{ mx: 0 }}>
          <Grid item md={12} lg={4} sx={{ pr: 3, pb: 2 }}>
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
                label="Mã code"
                type="text"
                value={state.detail.code}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Div Id"
                type="text"
                value={state.detail.divId}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Mô tả"
                type="text"
                value={state.detail.desc}
                InputProps={{ readOnly: true }}
              />
              <TextField
                InputProps={{ readOnly: true }}
                label="Trạng thái hiển thị"
                type="text"
                value={state.detail.mode === 0 ? 'Ngẫu nhiên' : 'Tỉ trọng'}
              />
              <TextField
                InputProps={{ readOnly: true }}
                label="Kích cỡ"
                type="text"
                value={state.detail.width + 'x' + state.detail.height + ' px'}
              />
            </Box>
          </Grid>
          <Grid item md={12} lg={8}>
            <Box style={BoxStyle}>
              <Typography variant="h6" color="red">
                Mô tả kích thước thẻ div
              </Typography>
            </Box>
            <Box
              sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
              style={BoxStyle}
            >
              <Box
                sx={{
                  width: state.detail.width,
                  height: state.detail.height,
                  backgroundColor: 'lightgray',
                }}
              ></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mx: 5, mb: 5, gap: 3, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
          style={BoxStyle}
        >
          <Typography variant="h6" color="blue">
            Các banner đã có trong khu vực
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleGoToAddBaner(state.detail)}
            sx={{ minWidth: '150px' }}
          >
            Chọn banner
          </Button>
        </Box>
        <Box sx={{ height: '500px', marginTop: '-23px' }} style={BoxStyle}>
          <DataGrid
            rows={bannerList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
          />
        </Box>
      </Box>
    </div>
  );
};
export default SectionDetail;
