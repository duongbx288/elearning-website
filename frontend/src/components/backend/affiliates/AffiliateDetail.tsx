import {
  Box,
  Chip,
  Typography,
  Button,
  TableCell,
  TableRow,
  Divider,
  Table,
  TableBody,
  Grid,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Toolbar from '../../../layout/Toolbar';
import React, { FC, useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { BoxStyle, CellTable } from '../../../styles/style';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import StudentCourseService from '../../../services/StudentCourseService';
import TeacherService from '../../../services/TeacherService';
import { Teacher } from '../teachers/type';
import AffiliateService from '../../../services/AffiliateService';
import { Affiliate } from './type';
import { Order } from '../order/type';
import OrderService from '../../../services/OrderService';

interface CustomerState {
  id: number;
}

type Course = {
  courseId?: number;
  courseName?: string;
  price?: number | string;
  status?: string;
  description?: string;
};

const AffiliateDetail = () => {
  const location = useLocation();
  const affiliateId = location.state as CustomerState;
  const navigate = useNavigate();

  const [affiliateInfo, setAffiliateInfo] = useState<Affiliate>();
  const [data, setData] = useState<Order[]>([]);
  const [countStudent, setCountStudent] = useState<number>(0);
  const [countOrder, setCountOrder] = useState<number>(0);

  useEffect(() => {
    AffiliateService.getAffiliateById(affiliateId.id).then((response) => {
      if (response.data) {
        setAffiliateInfo(response.data);
      }
      OrderService.getByAffiliateId(affiliateId.id).then((res) => {
        setData(res.data);
        setCountOrder(res.data.length);
        return;
      });
      AffiliateService.countStudent(affiliateId.id).then((res1) => {
        if (res1.data) {
          setCountStudent(res1.data);
        }
      });
    });
  }, []);

  const statusProcess = (status: any) => {
    if (String(status) === 'active') {
      return <Chip color="success" size={'small'} label={'Hoạt động'} />;
    } else if (String(status) === 'inactive') {
      return <Chip color="warning" size={'small'} label={'Tạm ngừng'} />;
    } else if (String(status) === 'deleted') {
      return <Chip color="error" size={'small'} label={'Đã xóa'} />;
    } else return;
  };

  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id đơn hàng',
      },
      {
        accessorKey: 'userId',
        header: 'Id người sử dụng',
      },
      {
        accessorKey: 'affiliateId',
        header: 'Mã affiliate',
      },
      {
        accessorKey: 'total',
        header: 'Tổng tiền',
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái ',
        size: 200,
        Cell: ({ cell }) => {
          return statusProcess(cell.getValue());
        },
      },
      {
        accessorKey: 'createdDate',
        // accessorFn: (row) => row.birth_date ? new Date(row.birth_date) : row.birth_date,
        header: 'Ngày tạo',
        size: 200,
        Cell: ({ cell }) => {
          const date = String(cell.getValue());
          const toString = new Date(date).toLocaleDateString();
          return (
            <Typography>
              {String(toString) === 'Invalid Date' ? '---' : String(toString)}
            </Typography>
          );
        },
      },
    ],
    []
  );

  const formatDate = (date: string) => {
    const toString = new Date(date).toLocaleDateString();
    return toString;
  };

  return (
    <>
      <Toolbar />
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Box sx={{ mt: 3, ml: 2, mr: 2, mb: 1 }} style={BoxStyle}>
              {/* <Image>avatar</Image> */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ color: 'blue' }}>
                  Thông tin chi tiết về người phân phối{' '}
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    sx={{
                      width: '165px',
                    }}
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
                      <TableCell sx={CellTable}>Tên người phân phối: </TableCell>
                      <TableCell sx={CellTable}>
                        <b>{affiliateInfo?.name}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={CellTable}>Địa chỉ:</TableCell>
                      <TableCell sx={CellTable}>
                        <b>{affiliateInfo?.address}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={CellTable}>Email:</TableCell>
                      <TableCell sx={CellTable}>
                        <b>{affiliateInfo?.email}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={CellTable}>Trạng thái:</TableCell>
                      <TableCell sx={CellTable}>
                        <b>{statusProcess(affiliateInfo?.status)}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={CellTable}>Ngày sinh:</TableCell>
                      <TableCell sx={CellTable}>
                        <b>{formatDate(String(affiliateInfo?.birthDate))}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={CellTable}>Link facebook:</TableCell>
                      <TableCell sx={CellTable}>
                        <b>{affiliateInfo?.facebook}</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ mt: 3, mr: 2, mb: 1 }} style={BoxStyle}>
              <Typography>Số đơn hàng đã chốt được: {countOrder}</Typography>
              <Typography>Số học sinh giới thiệu được: {countStudent}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ padding: 2 }}>
          <MaterialReactTable
            columns={columns}
            data={data}
            localization={MRT_Localization_VI}
            renderTopToolbar={({ table }) => {
              return (
                <>
                  <Box sx={{ padding: 2 }}>
                    <Typography>Các đơn đã chốt được</Typography>
                  </Box>
                  <Divider />
                </>
              );
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default AffiliateDetail;
