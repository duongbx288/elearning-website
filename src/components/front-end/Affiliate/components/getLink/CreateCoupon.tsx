import { Box, Button, Dialog, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';

const CreateCoupon = ({ id }) => {
  const [coupon, setCoupon] = useState<string>('');

  // Dialog
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCouponInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
  };

  const handleCouponSave = () => {
    console.log(coupon);
  };

  useEffect(() => {
    console.log(coupon);
  }, []);

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
      <Typography align="center" sx={{ marginTop: 2}}>
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
      <Dialog open={open}></Dialog>
    </Box>
  );
};

export default CreateCoupon;
