import { useEffect, useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridColumns,
  GridRowId,
} from '@mui/x-data-grid';
import {
  Button,
  Box,
  Typography,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageService from '../../services/PageService';
import WebsiteService from '../../services/WebsiteService';
import '../../styles/App.css';
import { LinkStyle, Url } from '../../styles/style';
import { BoxStyle, CellTable } from '../../styles/style';

type WebsiteInfo = {
  id: number;
  code: string;
  domain: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  createdBy?: string;
  lastModifiedBy?: string;
  webKey: string;
};

interface CustomState {
  id: number;
}

const PageListByWebId: React.FC = () => {
  const location = useLocation();
  const websiteId = location.state as CustomState;
  const history = useHistory();

  const [pageList, setPageList] = useState([] as any[]);
  const [pageListToUpdate, setPageListToUpdate] = useState([] as any[]);
  const [websiteInfo, setWebsiteInfo] = useState({} as any);
  const [pageCount, setPageCount] = useState<number>();
  const [open, setOpen] = useState(false);

  const handleOpenScript = () => {
    setOpen(true);
  };

  const handleCloseScript = () => {
    setOpen(false);
  };

  const pageUrl = window.location.href;
  let domain = new URL(pageUrl);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    PageService.getPageByWebsiteId(websiteId.id).then((response) => {
      let pageListInfo = response.data;
      setPageListToUpdate(pageListInfo);
      pageListInfo = pageListInfo.map((item: WebsiteInfo) => {
        return {
          ...item,
          createdDate: changeDateFormat(item.createdDate),
          lastModifiedDate: changeDateFormat(item.lastModifiedDate),
        };
      });
      setPageList(pageListInfo);
    });

    WebsiteService.getWebsiteById(websiteId.id).then((response) => {
      setWebsiteInfo(response.data);
    });
    PageService.countPageByWebsiteId(websiteId.id).then((response) => {
      setPageCount(response.data);
    });
  };

  const changeDateFormat = (date: Date | undefined) => {
    const temp = date?.toString().replace('T', ' ');
    const dotPosition = temp?.lastIndexOf('.');

    return temp?.slice(0, dotPosition);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    var choice = window.confirm('Xóa page và lưu thay đổi vào database?');
    if (choice === true) {
      setPageList(pageList.filter((row) => row.id !== id));
      PageService.deletePage(Number(id));
    } else {
    }
  };

  const handleUpdateClick = (id: GridRowId) => () => {
    const pageInfo = pageListToUpdate.find((item) => item.id === id);
    history.push({
      pathname: '/page/update/' + id,
      state: { detail: pageInfo },
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
        <Typography onClick={handleSectionClick(params.id)} sx={LinkStyle}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'pageUrl',
      headerName: 'Đường dẫn của trang',
      minWidth: 200,
      flex: 2,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography sx={Url}>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: 'createdDate',
      headerName: 'Thời gian tạo',
      minWidth: 150,
      flex: 1.5,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'actions',
      type: 'actions',
      minWidth: 100,
      flex: 1,
      headerName: 'Thao tác',
      getActions: ({ id }) => [
        <Tooltip title={"Sửa"}>
        <GridActionsCellItem
          icon={<EditIcon />}
          color="success"
          style={{ marginRight: '20px' }}
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

  return (
    <div>
      <Box sx={{ mt: 3 }} style={BoxStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ color: 'blue' }}>
            Thông tin chi tiết{' '}
          </Typography>
          <div>
            <Button
              variant="contained"
              sx={{
                width: '165px',
              }}
              onClick={() =>
                history.push({
                  pathname: '/website/update/' + websiteInfo.id,
                  state: { detail: websiteInfo },
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
                <TableCell sx={CellTable}>Tên miền website: </TableCell>
                <TableCell sx={CellTable}>
                  <b>{websiteInfo?.domain}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={CellTable}>Mã website: </TableCell>
                <TableCell sx={CellTable}>
                  <b>{websiteInfo?.code}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={CellTable}>Thời gian tạo:</TableCell>
                <TableCell sx={CellTable}>
                  <b>{changeDateFormat(websiteInfo?.createdDate)}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={CellTable}>Thời gian chỉnh sửa gần nhất:</TableCell>
                <TableCell sx={CellTable}>
                  <b>{changeDateFormat(websiteInfo?.lastModifiedDate)}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={CellTable}>Người tạo:</TableCell>
                <TableCell sx={CellTable}>
                  <b>{websiteInfo?.createdBy}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={CellTable}>Người chỉnh sửa:</TableCell>
                <TableCell sx={CellTable}>
                  <b>{websiteInfo?.lastModifiedBy}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" sx={{ width: 0.5 }} onClick={handleOpenScript}>
              Hướng dẫn hiển thị banner trên trang web của bạn
            </Button>
          </Box>
          <Dialog open={open} onClose={handleCloseScript}>
            <DialogTitle className="text-center">
              Hướng dẫn cài đặt và sử dụng
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography
                  sx={{
                    fontFamily: 'Monospace',
                    letterSpacing: 0.7,
                    lineHeight: 1.3,
                    border: 1,
                    padding: 1.5,
                  }}
                  id="script-text-for-banner"
                >
                  {'Bước 1: Cài đặt thư viện: "npm install sapo-banner"'}
                  <br />
                  <br />
                  {'Bước 2: Copy đoạn code dưới đây trong file app.js'}
                  <br />
                  <br />
                  {`        import start from "sapo-banner"`}
                  <br />
                  {`        var init = {`}
                  <br />
                  {`        code: "`}
                  {websiteInfo.code}
                  {`",`}
                  <br />
                  {`        key: "`}
                  {websiteInfo.webKey}
                  {`"`}
                  <br />
                  {`        }`}
                  <br />
                  {`        start(init) `}
                  <br />
                  {``}
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={handleCloseScript}
                sx={{
                  border: '1px solid green',
                  padding: '5px 20px',
                  backgroundColor: 'green',
                  color: 'white ',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'green',
                  },
                }}
              >
                Tôi đã hiểu
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }} style={BoxStyle}>
        <Box
          sx={{
            mt: 1,
            mb: 3,
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            flexDirection: {sm: 'column', md: 'row'}
          }}
        >
          <Typography variant="h6" sx={{ color: 'blue', mb: 1}}>
            Các trang đã có trong website
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: {sm: '100%', md: '50%'},
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: '165px',
                marginRight: '15px',
                mb: 1,
                ml: 2,
                height: '40px'
              }}
              onClick={() =>
                history.push({ pathname: '/page/add', state: { webId: websiteInfo.id } })
              }
            >
              Thêm trang mới
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '165px',
                mb: 1,  
                ml: 2,
              }}
              onClick={() =>
                history.push({
                  pathname: '/section-and-page/create',
                  state: { detail: websiteInfo },
                })
              }
            >
              Thêm khu vực
            </Button>
          </Box>
        </Box>

        <div className="list">
          <DataGrid
            rows={pageList}
            columns={columns}
            pageSize={10}
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
        </div>
      </Box>
    </div>
  );
};

export default PageListByWebId;
