import React, { useEffect, useState, useRef } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  GridColumns,
  GridActionsCellItem,
  GridRowId,
  GridRenderCellParams,
} from '@mui/x-data-grid-pro';
import '../../styles/banner/bannerList.css';
import SectionService from '../../../services/SectionService';
import '../../styles/App.css';
import { LinkStyle } from '../../../styles/style';
import { Tooltip, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SectionList: React.FC = () => {
  const mapPageToNextCursor = useRef<{ [page: number]: GridRowId }>({});
  const [pageSize, setPageSize] = useState(5);
  const [totalRow, setTotalRow] = useState(0);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [errOpen, setErrOpen] = React.useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrOpen(false);
  };

  const history = useHistory();
  const [data, setData] = useState([] as any);

  const handleDeleteClick = (id: GridRowId) => () => {
    var choice = window.confirm('Xác nhận Xóa section?');
    if (choice === true) {
      setData(data.filter((row: { id: GridRowId }) => row.id !== id));
      SectionService.deleteSMBySectionId(Number(id));
      SectionService.delete(Number(id));
      /// Thêm hàm setOpen(true) - thông báo thành công, setErrOpen(true) - thông báo lỗi
      /// ở đây - kiểm tra điều kiện
      setOpen(true);
    }
  };

  const handleViewDetailClick = (id: GridRowId) => () => {
    const sectionInfo = data.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/section/detail/' + id,
      state: { detail: sectionInfo },
    });
  };

  const handleUpdateClick = (id: GridRowId) => () => {
    const sectionInfo = data.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/section/update/' + id,
      state: { detail: sectionInfo },
    });
  };

  const columns: GridColumns = [
    {
      field: 'divId',
      headerName: 'ID thẻ div',
      minWidth: 120,
      flex: 1.2,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={handleViewDetailClick(params.id)} sx={LinkStyle}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'code',
      headerName: 'Mã khu vực',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={handleViewDetailClick(params.id)} sx={LinkStyle}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'desc',
      headerName: 'Mô tả',
      minWidth: 250,
      flex: 2,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'mode',
      headerName: 'Trạng thái hiển thị',
      minWidth: 150,
      flex: 1.5,
      headerClassName: 'super-app-theme--header',
      renderCell: (params: any) =>
        params.row.mode === 0 ? (
          <Typography>Ngẫu nhiên</Typography>
        ) : (
          <Typography>Tỉ trọng</Typography>
        ),
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
      field: 'actions1',
      type: 'actions',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerName: 'Tùy chỉnh',
      getActions: ({ id }) => [
        <Tooltip title={"Sửa"}>
        <GridActionsCellItem
          icon={<EditIcon />}
          color="success"
          label="Edit"
          onClick={handleUpdateClick(id)}
        /></Tooltip>,
        <Tooltip title={"Xóa"}>
        <GridActionsCellItem
          icon={<DeleteIcon />}
          color="error"
          label="Delete"
          onClick={handleDeleteClick(id)}
        /></Tooltip>,
      ],
    },
  ];

  useEffect(() => {
    fetchData(page);
  }, []);
  const fetchData = (page: number) => {
    axios
      .get('/api/sections/' + page + '/' + pageSize)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setTotalRow(data.totalSections);
        setData(data.sections);
      });
  };
  const handlePageChange = (newPage: number) => {
    if (newPage === 0 || mapPageToNextCursor.current[newPage - 1]) {
      setPage(newPage);
    }
    fetchData(newPage);
  };

  return (
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

export default SectionList;
