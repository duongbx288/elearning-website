import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
import { GridColumns, GridActionsCellItem, GridRowId } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import BannerService from '../../../services/BannerService';
import '../../styles/App.css';
import { Tooltip, Typography } from '@mui/material';
import { LinkStyle, Url } from '../../../styles/style';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Banner from '../../../pages/Banner';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BannerList: React.FC = () => {
  const history = useHistory();
  const [data, setData] = useState([] as any);
  const [open, setOpen] = React.useState(false);
  const [errOpen, setErrOpen] = React.useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrOpen(false);
  };

  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    var choice = window.confirm('Xác nhận Xóa banner?');
    if (choice === true) {
      setData(data.filter((row: { id: GridRowId }) => row.id !== id));
      BannerService.delete(Number(id));
      setOpen(true);
    }
  };

  const handleViewDetailClick = (id: GridRowId) => () => {
    const bannerInfo = data.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/banner/detail/' + id,
      state: { detail: bannerInfo },
    });
  };
  const handleUpdateClick = (id: GridRowId) => () => {
    const bannerInfo = data.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/banner/update/' + id,
      state: { detail: bannerInfo },
    });
  };

  const columns: GridColumns = [
    {
      field: 'code',
      headerName: 'Mã',
      minWidth: 80,
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
      headerName: 'Tên',
      minWidth: 130,
      flex: 1.5,
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
      field: 'website',
      headerName: 'Website',
      width: 150,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'page',
      headerName: 'Trang',
      width: 250,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'url',
      headerName: 'Đường dẫn liên kết',
      minWidth: 200,
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
      headerName: 'Ảnh banner',
      minWidth: 220,
      flex: 2,
      headerClassName: 'super-app-theme--header',
      editable: true,
      renderCell: (params) => (
          <img src={params.value} alt="" />
      ),
      cellClassName: 'img-field-css',
    },
    {
      field: 'actions1',
      type: 'actions',
      headerClassName: 'super-app-theme--header',
      headerName: 'Thao tác',
      minWidth: 100,
      flex: 1,
      getActions: ({ id }) => [
        <Tooltip title={'Sửa'}>
          <GridActionsCellItem
            icon={<EditIcon />}
            color="success"
            style={{ marginRight: '10px' }}
            label="Edit"
            onClick={handleUpdateClick(id)}
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

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    BannerService.getBanner().then((response) => {
      setData(response.data);
    });
  };
  return (
    <div className="list">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={15}
        initialState={{
          sorting: {
            sortModel: [
              {
                field: 'code',
                sort: 'desc',
              },
            ],
          },
        }}
      />
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="success" sx={{ width: '500px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
        Xóa thành công
        </Alert>
      </Snackbar>
      <Snackbar open={errOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '500px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
          Xóa không thành công
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BannerList;
