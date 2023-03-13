import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const More = () => {
  return (
    <>
      <Box
        margin={3}
        padding={3}
        width={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'300px'}
      >
        <Typography>Giáo viên</Typography>
        <Typography>Cộng tác viên</Typography>
      </Box>
    </>
  );
};

export default More;
