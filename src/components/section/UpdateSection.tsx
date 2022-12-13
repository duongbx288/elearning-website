import { useEffect } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import BannerService from '../../services/BannerService';
import { Toolbar, Typography, Box, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DataGrid, GridColumns, GridRowId, GridActionsCellItem } from '@mui/x-data-grid';
import { BoxStyle, ToolbarStyle } from '../../styles/style';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
const UpdateSection: React.FC = () => {
  const location = useLocation();
  const state = location.state as CustomState;
  let history = useHistory();
  const userInfo =
    typeof localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '')
      : '';

  const [code, setCode] = React.useState<string>(state.detail.code);
  const [divId, setDivId] = React.useState<string>(state.detail.divId);
  const [displayMode, setDisplayMode] = React.useState<number>(state.detail.mode);
  const [desc, setDesc] = React.useState<string>(state.detail.desc);
  const [width, setWidth] = React.useState<number>(state.detail.width);
  const [height, setHeight] = React.useState<number>(state.detail.height);
  const [createdBy, setCreatedBy] = React.useState(state.detail.createdBy);
  const [errorCode, setErrorCode] = React.useState<String>();
  const [errorDivId, setErrorDivId] = React.useState<String>();
  const [bannerList, setBannerList] = React.useState([] as any[]);
  const [username, setUsername] = React.useState();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [chosenId, setChosenId] = React.useState<any>();

  useEffect(() => {
    fetchData();
    setUsername(userInfo.username);
  }, []);

  const fetchData = () => {
    BannerService.getListBannerFilterBySectionId(state.detail.id).then((res) => {
      setBannerList(res.data);
    });
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  const handleDialogAccept = () => {
    setBannerList(bannerList.filter((row) => row.id !== chosenId));
    BannerService.deleteOnBannerMapping(Number(chosenId), state.detail.id);
    setDialogOpen(false);
  }


  const handleChangeDisplayMode = (event: SelectChangeEvent) => {
    setDisplayMode(event.target.value as unknown as number);
  };
  const handleGoToUpdateBanner = (sectionInfo: SectionInfo) => {
    history.push({
      pathname: '/section/update-banner/' + sectionInfo.id,
      state: { detail: sectionInfo },
    });
  };
  const handleValidateDivIdAndCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      let format = /[`!@#$%^&*()+=[\]{};':"\\|,.<>/?~]/;
      let check = format.test(event.target.value);
      if (check) {
        return 'Nội dung không được chứa kí tự đặc biệt';
      }
      if (event.target.value.length < 2 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 6 kí tự, tối đa 50 kí tự';
      }
    }
  };

  const handleChangeDivId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDivId(event.target.value as string);
    setErrorDivId(handleValidateDivIdAndCode(event));
  };
  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value as string);
    setErrorCode(handleValidateDivIdAndCode(event));
  };
  const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value as string);
  };

  const handleDeleteButton = (id: GridRowId) => () => {
    setChosenId(id);
    handleDialogOpen();
  }

  const handleUpdateClick = (id: GridRowId) => () => {
    const bannerInfo = bannerList.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/banner/update/' + id,
      state: { detail: bannerInfo },
    });
  };
  const saveSection = (event: any) => {
    event.preventDefault();

    if (
      (errorCode == null || typeof errorCode === 'undefined') &&
      (errorDivId == null || typeof errorDivId === 'undefined')
    ) {
      let sectionItem = {
        id: state.detail.id,
        divId: divId,
        mode: displayMode,
        desc: desc,
        code: code,
        width: width,
        height: height,
        createdBy: createdBy,
        lastModifiedBy: username,
      };

      axios.put('/api/sections/' + state.detail.id, sectionItem).then(() => {
        history.goBack();
      });
    }
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
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'title',
      headerName: 'Tên banner',
      minWidth: 250,
      flex: 2,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
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
          <span>{params.value}</span>
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
            onClick={handleUpdateClick(id)}
          />
        </Tooltip>,
        <Tooltip title={'Xóa'}>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            color="error"
            label="Delete"
            onClick={handleDeleteButton(id)}
          />
        </Tooltip>,
      ],
    },
  ];
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
            '&:hover': {
              backgroundColor: 'inherit',
            },
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
            onClick={(e) => saveSection(e)}
          >
            Lưu
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ mx: 5, my: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'blue' }}>
          Chỉnh sửa khu vực
        </Typography>
        <Grid container sx={{ mx: 0 }}>
          <Grid item md={12} lg={4} sx={{ pr: 3, pb: 3 }}>
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
                label="Mã khu vực"
                disabled
                sx={{ color: 'black' }}
                inputProps={{ minLength: 2, maxLength: 30 }}
                type="text"
                error={Boolean(errorCode)}
                helperText={errorCode}
                value={code || ''}
                onChange={handleChangeCode}
              />
              <TextField
                label="Nhập div_id"
                required
                inputProps={{ minLength: 2, maxLength: 30 }}
                type="text"
                error={Boolean(errorDivId)}
                helperText={errorDivId}
                value={divId || ''}
                onChange={handleChangeDivId}
              />
              <TextField
                label="Mô tả"
                type="text"
                value={desc}
                onChange={handleChangeDesc}
              />
              <FormControl sx={{ width: '100%' }}>
                <InputLabel required>Trạng thái hiển thị</InputLabel>
                <Select
                  label="Trạng thái hiển thị *"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChangeDisplayMode}
                >
                  <MenuItem value={'0'}>Hiển thị ngẫu nhiên</MenuItem>
                  <MenuItem value={'1'}>Hiển thị theo tỉ trọng</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Kích thước khu vực"
                type="text"
                value={width + ' x ' + height + ' px'}
                disabled
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
        </Box>
        <Box sx={{ height: '500px', marginTop: '-23px' }} style={BoxStyle}>
          <DataGrid
            rows={bannerList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Box>
      </Box>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Xóa banner
        </DialogTitle>    
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Xóa banner và lưu thay đổi vào database?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Hủy</Button>
          <Button onClick={handleDialogAccept}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default UpdateSection;
