import React, { FC, useEffect, useState, useMemo } from 'react';
import StudentService from '../../services/StudentService';
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
} from '@mui/material';
import { ToolbarStyle } from '../../styles/style';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Toolbar from '../../layout/Toolbar';

type StudentApiResponse = {};

type Affiliate = {
  id: number;
  affiliate_code: string;
  name: string;
  address?: string;
  email?: string;
  status?: string;
  birth_date?: string;
  avatar?: string;
  facebook?: string;
};

const AffiliateList = () => {
  // data
  const [data, setData] = useState<Affiliate[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  // table state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    StudentService.getAllStudent().then((res) => {
      console.log(res);
      if (res.data.length > 0) {
        setData(res.data);
      }
    });
  }, []);

  const columns = useMemo<MRT_ColumnDef<Affiliate>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
      },
      {
        accessorKey: 'name',
        header: 'Tên',
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái ',
        size: 200,
        Cell: ({ cell }) => (
          <Chip
            color="success"
            size={'small'}
            label={String(cell.getValue())}
          />
        ),
      },
      {
        accessorKey: 'birth_date',
        header: 'Ngày sinh ',
        size: 200,
      },
    //   {
    //     accessorKey: 'city',
    //     header: 'Thành phố',
    //   },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'address',
        header: 'Địa chỉ',
      },
    //   {
    //     accessorKey: 'title',
    //     header: 'Chức danh',
    //   },
    ],
    []
  );

  return (
    <>
      <Toolbar />
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ color: 'blue' }}>
            Danh sách học viên{' '}
          </Typography>
          <div>
            <Button
              variant="contained"
              sx={{
                width: '165px',
              }}
              // onClick={() =>
              //   history.push({
              //     pathname: '/website/update/' + websiteInfo.id,
              //     state: { detail: websiteInfo },
              //   })
              // }
            >
              Thêm giáo viên
            </Button>
          </div>
        </Box>
        <Box>
          <MaterialReactTable
            columns={columns}
            data={data}
            enableRowActions={false}
            enableRowSelection
            enableDensityToggle
            enableFilters
            positionToolbarAlertBanner="bottom"
            localization={MRT_Localization_VI}
            // getRowId={(row) => row.name}
            muiToolbarAlertBannerProps={
              isError
                ? {
                    color: 'error',
                    children: 'Error loading data',
                  }
                : undefined
            }
            onColumnFiltersChange={setColumnFilters}
            onPaginationChange={setPagination}
            rowCount={rowCount}
            state={{
              columnFilters,
              isLoading,
              pagination,
              showAlertBanner: isError,
              sorting,
            }}
            renderTopToolbarCustomActions={({ table }) => {
              const handleDeactivate = () => {
                table.getSelectedRowModel().flatRows.map((row) => {
                  alert('....' + row.getValue('id'));
                });
              };
              const handleActivate = () => {};
              return (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button
                    color="error"
                    disabled={table.getSelectedRowModel().flatRows.length === 0}
                    onClick={handleDeactivate}
                    variant="contained"
                  >
                    Deactivate
                  </Button>
                </div>
              );
            }}
          />
        </Box>
      </div>
    </>
  );
};

export default AffiliateList;
