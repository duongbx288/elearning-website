import { Button, Typography, Box, Toolbar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { BoxStyle, ToolbarStyle } from '../styles/style';

import PageList from '../components/old/pages/PageList';

const PageManage: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <Toolbar variant="dense" sx={ToolbarStyle}>
        <Typography variant="h5">Danh sách các trang</Typography>
        <Button variant="contained" onClick={() => history.push('/page/add')}>
          Tạo Mới
        </Button>
      </Toolbar>
      <div id="test-banner-here" className="test-banner-here"></div>
      <Box sx={{ m: 3 }}>
        {/* <Typography variant="h5">Danh sách các trang</Typography> */}
        <div id="summer1d"></div>
        <div id="test"></div>
        <Box sx={{ mt: 2 }} style={BoxStyle}>
          <PageList />
        </Box>
      </Box>
    </div>
  );
};

export default PageManage;
