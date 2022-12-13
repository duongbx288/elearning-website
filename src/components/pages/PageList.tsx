import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridColumns,
  GridRowId,
} from '@mui/x-data-grid';
import { Button, Tooltip, Typography } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageService from '../../services/PageService';
import WebsiteService from '../../services/WebsiteService';
import '../../styles/App.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LinkStyle, Url } from '../../styles/style';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface CustomState {
  detail: number;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PageList: React.FC = () => {
  const location = useLocation();
  const websiteId = location.state as CustomState;
  const history = useHistory();
  const [pageList, setPageList] = useState([] as any[]);
  const [websiteInfo, setWebsiteInfo] = useState();
  const [webDomain, setWebDomain] = useState([] as any[]);
  const [open, setOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);

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

  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getData = () => {
    if (typeof websiteId === 'undefined') {
      PageService.getAllPage().then((response) => {
        setPageList(response.data);
      });
    } else {
      PageService.getPageByWebsiteId(websiteId.detail).then((response) => {
        setPageList(response.data);
      });
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    var choice = window.confirm('Xóa page và lưu thay đổi vào database?');
    if (choice === true) {
      setPageList(pageList.filter((row) => row.id !== id));
      PageService.deletePage(Number(id)).then((response) => {
        if (typeof response === 'undefined') {
          setErrOpen(true);
        } else {
          setOpen(true);
        }
      });
    } else {
    }
  };

  const handleUpdateClick = (id: GridRowId) => () => {
    const pageInfo = pageList.find((item) => item.id === id);
    history.push({
      pathname: '/page/update/' + id,
      state: { detail: pageInfo },
    });
  };

  const handleWebsiteClick = (id: GridRowId) => () => {
    const pageInfo = pageList.find((item) => item.id === id);
    const websiteId = pageInfo.websiteId;
    history.push({
      pathname: '/website/' + websiteId + '/page',
      state: {
        id: websiteId,
      },
    });
  };

  const handleSectionClick = (id: GridRowId) => () => {
    history.push({
      pathname: '/page/' + id + '/section',
      state: {
        pageId: id,
      },
    });
  };

  const columns: GridColumns = [
    {
      field: 'pageName',
      headerName: 'Tên trang',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
        <Typography onClick={handleSectionClick(params.id)} sx={LinkStyle}>
          {params.value}
        </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'webDomain',
      headerName: 'Tên website',
      minWidth: 200,
      flex: 2,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
        <Typography onClick={handleWebsiteClick(params.id)} sx={LinkStyle}>
          {params.value}
        </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'pageUrl',
      headerName: 'Đường dẫn của trang',
      minWidth: 150,
      flex: 1.5,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      width: 150,
      headerClassName: 'super-app-theme--header',
      headerName: 'Thao tác',
      getActions: ({ id }) => [
        <Tooltip title={"Sửa"}>
        <GridActionsCellItem
          icon={<EditIcon />}
          color="success"
          label="Edit"
          onClick={handleUpdateClick(id)}
        /></Tooltip>
        ,
        <Tooltip title={"Xóa"}>
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

  return (
    <div className="list">
      <DataGrid
        rows={pageList}
        columns={columns}
        rowsPerPageOptions={[10]}
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

export default PageList;
