import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Typography,
  } from '@mui/material';
  import { list } from 'firebase/storage';
  import { Fragment, useEffect, useState } from 'react';
  import _ from 'lodash';
  import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
  import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
  import { useNavigate } from 'react-router-dom';
  import { Order } from '../../components/backend/order/type';
  import OrderService from '../../services/OrderService';
  
  interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    listEntities: Order[];
    status: string;
  }
  
  function getMessageError(e: any) {
    let message = `${`error:error.errorCommon`}`;
    try {
      if (typeof e === 'string') {
        message = e;
      } else if (e.request.status === 422) {
        // try {
        //   const fieldErrors = e.response.request.response.data_error.errors;
        //   message = Object.keys(fieldErrors)
        //     .map((key) => (isNil(key) || key.trim().length === 0 ? fieldErrors[key] : `${key} : ${fieldErrors[key]}`))
        //     .join(" , ");
        // } catch (e) {}
        message = 'error';
      } else if (e.response.status === 404) {
        // const fieldErrors = e.response.request.response.error;
        // message = Object.keys(fieldErrors)
        //   .map((key) => (isNil(key) || key.trim().length === 0 ? fieldErrors[key] : `${key} : ${fieldErrors[key]}`))
        //   .join(" , ");
        message = 'error';
      } else if (e.request.status === 403 || e.request.status === 401) {
        message = `${`error:error.notHaveAccess`}`;
      } else if (e.response.status === 500) {
        message = e.response.data.error.message;
      }
    } catch (e) {}
    return message;
  }

  const CustomOrderDialog = (props: CustomDialogProps) => {
    const navigate = useNavigate();
    const { open, onClose, isLoading, setLoading, listEntities, status } = props;
    const [listSuccess, setListSuccess] = useState<Order[]>([]);
    const [listFailed, setListFailed] = useState<{ order: Order; error: string }[]>(
      []
    );
  
    const [showDetailSuccess, setShowDetailSuccess] = useState<boolean>(false);
    const [showDetailFail, setShowDetailFail] = useState<boolean>(false);
  
    let success: Order[];
    let failed: { order: Order; error: string }[] = [];
  
    useEffect(() => {
      if (open && isLoading) {
        setListSuccess([]);
        setListFailed([]);
        success = [];
        failed = [];
        if (listEntities && listEntities.length > 0) {
          updateEntities(0);
        } else {
          setLoading(false);
        }
      }
    }, [open, isLoading]);
  
    const updateEntities = async (index: number) => {
      if (listEntities && listEntities.length > 0 && index <= listEntities.length - 1) {
        let entity = listEntities[index];
        if (entity && entity.id) {
          let request = {
            id: entity.id,
            status: status,
          };
          try {
            await OrderService.updateOrdersStatus(request);
            success.push(entity);
            console.log('okay?');
          } catch (error) {
            failed.push({ order: entity, error: getMessageError(error) });
            setListFailed(failed);
          } finally {
            setTimeout(() => {
              updateEntities(index + 1);
            }, 200);
          }
        }
      } else {
        setLoading(false);
      }
    };
  
    const processStatusUpdate = (status: string) => {
      if (status === 'active') {
        return 'Kích hoạt đơn hàng.';
      } else if (status === 'inactive') {
        return 'Tạm dừng đơn hàng.';
      } else if (status === 'deleted') {
        return 'Hủy bỏ đơn hàng.';
      } else if (status === 'completed') {
        return 'Hoàn thành đơn hàng.';
      }
    };
  
    return (
      <Dialog open={open} fullWidth={true} disableEscapeKeyDown={true}>
        <DialogContent>
          <Fragment>
            <Typography variant="h6">
              {isLoading ? 'Đang xử lí thông tin....' : 'Xử lí hoàn tất'}
            </Typography>
          </Fragment>
          <Box marginTop={'16px'}>
            <>
              <Typography>{processStatusUpdate(status)}</Typography>
            </>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>Ok</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default CustomOrderDialog;
  