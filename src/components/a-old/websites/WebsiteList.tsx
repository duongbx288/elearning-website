import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridColumns,
  GridRowId,
} from '@mui/x-data-grid';
import { Dialog, Tooltip, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../../styles/App.css';
import { LinkStyle, Url } from '../../../styles/style';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import WebsiteService from '../../../services/WebsiteService';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WebsiteList: React.FC = () => {
  const history = useHistory();

  const [websiteList, setWebsiteList] = useState([] as any[]);
  const [websiteListTemp, setWebsiteListTemp] = useState([] as any[]);
  const [open, setOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [chosenId, setChosenId] = useState<any>();

  useEffect(() => {
    getData();
  }, []);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  const handleDialogAccept = () => {
    setWebsiteListTemp(websiteListTemp.filter((row) => row.id !== chosenId));
    WebsiteService.deleteWebsite(Number(chosenId)).then((response) => {
      if (typeof response === 'undefined') {
        setErrOpen(true);
      } else {
        setOpen(true);
      }
    });
    setDialogOpen(false);
  }

  const getData = () => {
    WebsiteService.getAllWebsite().then((response) => {
      setWebsiteList(response.data);
      let websiteListInfo = response.data;
      websiteListInfo = websiteListInfo.map((item) => {
        return {
          ...item,
          createdDate: changeDateFormat(item.createdDate),
          lastModifiedDate: changeDateFormat(item.lastModifiedDate),
        };
      });
      setWebsiteListTemp(websiteListInfo);
    });
  };

  const changeDateFormat = (date: Date | undefined) => {
    const temp = date?.toString().replace('T', ' ');
    const dotPosition = temp?.lastIndexOf('.');

    return temp?.slice(0, dotPosition);
  };

  const handleDeleteButton = (id: GridRowId) => () => {
    setChosenId(id);
    handleDialogOpen();
  }

  const handleUpdateClick = (id: GridRowId) => () => {
    const websiteInfo = websiteList.find((item) => item.id === id);
    history.push({
      pathname: '/website/update/' + id,
      state: { detail: websiteInfo },
    });
  };

  const handlePageClick = (id: GridRowId) => () => {
    const websiteId = id;
    const websiteInfo = websiteList.find((item) => item.id === id);
    history.push({
      pathname: '/website/' + id + '/page',
      state: { id: websiteId },
    });
  };

  const columns: GridColumns = [
    {
      field: 'code',
      headerName: 'Mã website',
      flex: 1,
      minWidth: 100,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
        <Typography onClick={handlePageClick(params.id)} sx={LinkStyle}>
          {params.value}
        </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'domain',
      headerName: 'Tên website',
      minWidth: 200,
      flex: 2,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span className="table-cell-truncate">{params.value}</span>
        </Tooltip>
      )
    },
    {
      field: 'createdDate',
      headerName: 'Thời gian tạo',
      minWidth: 200,
      flex: 2,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span className="table-cell-truncate">{params.value}</span>
        </Tooltip>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Thao tác',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      getActions: ({ id }) => [
        <Tooltip title={"Sửa"}>
        <GridActionsCellItem
          icon={<EditIcon />}
          color="success"
          label="Edit"
          onClick={handleUpdateClick(id)}
          sx={{
            padding: 0.5
          }}
        />
        </Tooltip>,
        <Tooltip title={"Xóa"}>
        <GridActionsCellItem
          icon={<DeleteIcon />}
          color="error"
          label="Delete"
          onClick={handleDeleteButton(id)}
          sx={{
            padding: 0.5
          }}
        />
        </Tooltip>,
      ],
    },
  ];

  return (
    <div className="list">
      <DataGrid
        rows={websiteListTemp}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        initialState={{
          sorting: {
            sortModel: [
              {
                field: 'createdDate',
                sort: 'desc',
              },
            ],
          },
        }}
        checkboxSelection
      />
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="success" sx={{ width: '500px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
          Xóa thành công
        </Alert>
      </Snackbar>
      <Snackbar open={errOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '500px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
          Xóa không thành công
        </Alert>
      </Snackbar>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Xóa website
        </DialogTitle>    
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Xóa website và lưu thay đổi vào database?
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

export default WebsiteList;
