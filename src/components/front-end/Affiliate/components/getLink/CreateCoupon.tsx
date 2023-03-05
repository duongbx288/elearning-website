import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CouponService, { CouponRequest } from '../../../../../services/CouponService';

const CreateCoupon = ({ id }) => {
  const [coupon, setCoupon] = useState<string>('');
  const [affiliateId, setAffiliateId] = useState<number>(id);

  // Dialog
  const [open, setOpen] = useState<boolean>(false);
  const [newCoupon, setNewCoupon] = useState<string>('');
  const [openF, setOpenF] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');

  const [error, setError] = useState<string>('');

  useEffect(() => {}, []);

  // Dialog
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenF = () => {
    setOpenF(true);
  };
  const handleCloseF = () => {
    setOpenF(false);
  };

  // Coupon
  const handleCouponInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
  };

  const checkCoupon = () => {
    if (coupon.length < 2) {
      
    }
  }

  const handleCouponSave = async () => {
    const newCoupon = {
      affiliateId: affiliateId,
      couponCode: coupon,
    } as CouponRequest;
    await CouponService.createNewCoupon(newCoupon).then((res) => {
      if (res.data && res.data === 'Successful') {
        setNewCoupon(coupon);
        setOpen(true);
      } else {
        setReason(res.data);
        setOpenF(true);
      }
    });
  };

  useEffect(() => {
    console.log(coupon);
  }, [coupon]);

  return (
    <Box
      border={1}
      borderRadius={'5px'}
      padding={3}
      margin={1}
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Box display={'flex'}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            lineHeight={2.2}
            sx={{ marginRight: 1, fontWeight: '700', fontSize: '16px' }}
          >
            Tạo coupon
          </Typography>
        </Box>
        <TextField
          sx={{ marginRight: 2 }}
          size="small"
          value={coupon}
          onChange={handleCouponInput}
        ></TextField>
        <Button onClick={handleCouponSave} variant={'contained'}>
          <SaveIcon sx={{ marginRight: 1 }} /> Lưu
        </Button>
      </Box>
      <Typography align="center" sx={{ marginTop: 2 }}>
        Bạn được tạo 1 coupon với độ dài 4-20 ký tự (a-z,0-9), viết liền không dấu, không
        phân biệt chữ hoa chữ thường.
      </Typography>
      <Typography align="center">
        Chia sẻ coupon này để nhận ngay hoa hồng từ 40%-60% trên mỗi khóa học.
      </Typography>
      <Box padding={2}></Box>
      <Typography align="center">
        Người sử dụng coupon này cũng được giảm học phí 40% khi mua khóa học.
      </Typography>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
            {`Tạo mới coupon thành công. Mã coupon: ${coupon}`}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openF} onClose={handleCloseF}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          {reason === 'Coupon exists' ? (
            <Typography>Thêm coupon không thành công. Coupon đã tồn tại</Typography>
          ) : (
            <Typography>Thêm coupon không thành công. Có lỗi xảy ra. Xin thử lại sau.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button sx={{margin: 1}} onClick={handleCloseF}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateCoupon;
