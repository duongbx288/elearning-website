import React, { FC, useEffect, useState, useMemo, cloneElement } from 'react';
import { visuallyHidden } from '@mui/utils';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  TextField,
  Menu,
  Chip,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { LinkStyle, ToolbarStyle } from '../../../styles/style';
import Toolbar from '../../../layout/Toolbar';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AccountCircle, Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { processStatus } from '../../../services/helpers/InfoFilterHelpers';
import _ from 'lodash';
import { Course } from './type';
import CustomCourseDialog from '../../../utility/course/StatusUpdateDialog';
import CourseService, { CourseRequest } from '../../../services/CourseService';

const CourseList = () => {
  const navigate = useNavigate();
  // data
  const [data, setData] = useState<Course[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [loading, setLoading] = useState(true);

  // table state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Dialog state
  const [selected, setSelected] = useState<Course[]>([]);
  const [activateDialog, setActivateDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  const [singleSelected, setSingleSelected] = useState<Course[]>([]);
  const [singleActivateDialog, setSingleActivateDialog] = useState<boolean>(false);
  const [singleUpdateDialog, setSingleUpdateDialog] = useState<boolean>(false);

  const [updateStatus, setUpdateStatus] = useState<string>('');

  useEffect(() => {
    init();
  }, [pagination.pageIndex, pagination.pageSize]);

  console.log(selected);

  const init = () => {
    const request: CourseRequest = {
      pageNum: pagination.pageIndex,
      pageLimit: pagination.pageSize,
    };
    try {
      CourseService.getAllPag(request).then((res) => {
        if (res.data.content.length > 0) {
          setData(res.data.content);
          setRowCount(res.data.totalElements);
          setPageCount(res.data.totalPages);
        }
        setLoading(false);
        return;
      });
    } catch (error) {
      setData([]);
      setLoading(false);
    }
  };

  const handleDelete = () => {};

  const handleUpdate = () => {};

  const handleDetailClick = (courseId: number) => () => {
    const id = courseId;
    navigate('detail/' + id, {state: { id: id }});
  };

  const columns = useMemo<MRT_ColumnDef<Course>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
        size: 100,
      },
      {
        accessorKey: 'name',
        header: 'Tên',
        size: 500,
        Cell: ({ row, cell }) => {
          const id = row.original.id;
          return (
            <Tooltip title={'Chi tiết'}>
              <Typography onClick={handleDetailClick(id)} sx={LinkStyle}>
                {String(cell.getValue())}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái ',
        size: 200,
        Cell: ({ cell }) => {
          return processStatus(cell.getValue());
        },
      },
    ],
    []
  );

  const displayTitle = (st: string) => {
    if (st === 'active') {
      return 'Kích hoạt khóa học đã chọn ?';
    } else if (st === 'inactive') {
      return 'Tạm ngừng khóa học đã chọn ?';
    } else if (st === 'deleted') {
      return 'Xóa khóa học đã chọn ?';
    }
  };

  return (
    <>
      <Toolbar />
      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: 2,
            paddingRight: 2,
            paddingTop: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: 'blue' }}>
            Danh sách khóa học{' '}
          </Typography>
          <div>
            {/* <Button
              variant="contained"
              sx={{
                width: '165px',
              }}
            >
              Thêm khóa học
            </Button> */}
          </div>
        </Box>
        <Box sx={{ padding: 2 }}>
          <MaterialReactTable
            columns={columns}
            data={data}
            enableRowActions
            enableSorting={false}
            enableRowSelection
            enableDensityToggle
            manualPagination
            positionToolbarAlertBanner="bottom"
            onColumnFiltersChange={setColumnFilters}
            onPaginationChange={setPagination}
            rowCount={rowCount}
            pageCount={pageCount}
            selectAllMode="page"
            localization={MRT_Localization_VI}
            getRowId={(row) => String(row.id)}
            muiToolbarAlertBannerProps={
              isError
                ? {
                    color: 'error',
                    children: 'Error loading data',
                  }
                : undefined
            }
            renderRowActionMenuItems={({ closeMenu, row }) => [
              <MenuItem
                key={0}
                onClick={handleDetailClick(row.original.id)}
                sx={{ m: 0, cursor: 'pointer' }}
              >
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                Chi tiết khóa học
              </MenuItem>,
              <MenuItem
                key={1}
                onClick={() => {
                  closeMenu();
                  console.log('Gui Email');
                }}
                sx={{ m: 0, cursor: 'pointer' }}
              >
                <ListItemIcon>
                  <Send />
                </ListItemIcon>
                Gửi email thông báo
              </MenuItem>,
              <MenuItem
                key={2}
                onClick={() => {
                  closeMenu();
                  handleUpdate();
                }}
                sx={{ m: 0, cursor: 'pointer' }}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                Cập nhập
              </MenuItem>,
              <MenuItem
                key={3}
                onClick={() => {
                  closeMenu();
                  setSingleSelected([row.original]);
                  setUpdateStatus('deleted');
                  setSingleActivateDialog(true);
                }}
                sx={{ m: 0, cursor: 'pointer' }}
              >
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                Xóa
              </MenuItem>,
            ]}
            renderTopToolbarCustomActions={({ table }) => {
              const handleDeactivate = () => {
                table.getSelectedRowModel().flatRows.forEach((row) => {
                  selected.push(row.original);
                  return;
                });
                setUpdateStatus('inactive');
                setActivateDialog(true);
              };
              const handleActivate = () => {
                table.getSelectedRowModel().flatRows.forEach((row) => {
                  selected.push(row.original);
                  return;
                });
                setUpdateStatus('active');
                setActivateDialog(true);
              };
              const handleDelete = () => {
                table.getSelectedRowModel().flatRows.forEach((row) => {
                  selected.push(row.original);
                  return;
                });
                setUpdateStatus('deleted');
                setActivateDialog(true);
              };
              return (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button
                    color="success"
                    disabled={table.getSelectedRowModel().flatRows.length === 0}
                    onClick={handleActivate}
                    variant="contained"
                  >
                    Kích hoạt
                  </Button>
                  <Button
                    color="warning"
                    disabled={table.getSelectedRowModel().flatRows.length === 0}
                    onClick={handleDeactivate}
                    variant="contained"
                  >
                    Tạm dừng
                  </Button>
                  <Button
                    color="error"
                    disabled={table.getSelectedRowModel().flatRows.length === 0}
                    onClick={handleDelete}
                    variant="contained"
                  >
                    Xóa
                  </Button>
                </div>
              );
            }}
            state={{
              columnFilters,
              isLoading,
              pagination,
              showAlertBanner: isError,
            }}
          />
        </Box>
      </div>
      <Dialog
        open={activateDialog}
        onClose={() => {
          setActivateDialog(false);
        }}
      >
        <DialogContent>
          <Typography>{displayTitle(updateStatus)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setActivateDialog(false);
            }}
            variant="outlined"
            color="error"
          >
            Thoát
          </Button>
          <Button
            onClick={() => {
              setActivateDialog(false);
              setLoadingUpdate(true);
              setOpenUpdateDialog(true);
            }}
            color="primary"
            variant="contained"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <CustomCourseDialog
        open={openUpdateDialog}
        onClose={() => {
          setOpenUpdateDialog(false);
          setSelected([]);
          init();
        }}
        isLoading={loadingUpdate}
        listEntities={selected}
        setLoading={(loading) => {
          setLoadingUpdate(loading);
        }}
        status={updateStatus}
      />
      <Dialog
        open={singleActivateDialog}
        onClose={() => {
          setSingleActivateDialog(false);
        }}
      >
        <DialogContent>
          <Typography>{displayTitle(updateStatus)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSingleActivateDialog(false);
            }}
            variant="outlined"
            color="error"
          >
            Thoát
          </Button>
          <Button
            onClick={() => {
              setSingleActivateDialog(false);
              setLoadingUpdate(true);
              setSingleUpdateDialog(true);
            }}
            color="primary"
            variant="contained"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <CustomCourseDialog
        open={singleUpdateDialog}
        onClose={() => {
          setSingleUpdateDialog(false);
          setSingleSelected([]);
          init();
        }}
        isLoading={loadingUpdate}
        listEntities={singleSelected}
        setLoading={(loading) => {
          setLoadingUpdate(loading);
        }}
        status={updateStatus}
      />
    </>
  );
};

export default CourseList;
