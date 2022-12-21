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
} from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import Toolbar from '../../layout/Toolbar';
import React, { FC, useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { BoxStyle, CellTable } from '../../styles/style';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import StudentCourseService from '../../services/StudentCourseService';
import { Order } from './type';
import OrderService from '../../services/OrderService';

interface CustomerState {
  id: number;
}

const OrderDetail = () => {
  const location = useLocation();
  const orderId = location.state as CustomerState;
  const history = useHistory();

  const [orderInfo, setOrderInfo] = useState<Order>();
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    OrderService.getById(orderId.id).then((response) => {
      if (response.data) {
        console.log(response);
        setOrderInfo(response.data);
      }
      StudentCourseService.getByStudentId(orderId.id).then((res) => {
        console.log(res);
        setData(res.data);
        return;
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
        accessorKey: 'courseId',
        header: 'id',
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái ',
        size: 200,
        Cell: ({ cell }) => {
          return statusProcess(cell.getValue());
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
        <Box sx={{ mt: 3, ml: 2, mr: 2, mb: 1 }} style={BoxStyle}>
          {/* <Image>avatar</Image> */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'blue' }}>
              Thông tin chi tiết về học viên{' '}
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
                  <TableCell sx={CellTable}>Trạng thái:</TableCell>
                  <TableCell sx={CellTable}>
                    <b>{orderInfo?.status}</b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box style={BoxStyle}>
            <Typography>Khoa hoc da mua</Typography>
            <Typography>Tong tien da chi</Typography>
            <Typography>So khoa hoc da hoan thanh</Typography>
            <Typography>Tong so khoa hoc da mua</Typography>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <MaterialReactTable
            columns={columns}
            data={data}
            localization={MRT_Localization_VI}
            renderTopToolbar={({ table }) => {
              return (
                <>
                  <Box sx={{ padding: 2 }}>
                    <Typography>Các khóa học đã mua</Typography>
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

export default OrderDetail;