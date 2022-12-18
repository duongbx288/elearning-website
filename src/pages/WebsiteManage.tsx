import { useHistory } from 'react-router-dom';
import { Button, Typography, Toolbar, Box } from '@mui/material';
import { BoxStyle, ToolbarStyle } from '../styles/style';

import WebsiteList from '../components/old/websites/WebsiteList';

const WebsiteManage: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <Toolbar variant="dense" sx={ToolbarStyle}>
        <Typography variant="h5">Danh sách các website</Typography>
        <Button variant="contained" onClick={() => history.push('/website/add')}>
          {' '}
          Tạo Mới{' '}
        </Button>
      </Toolbar>
      <div id="test-banner-here" className="test-banner-here"></div>
      <Box sx={{ m: 3 }}>
        {/* <Typography variant="h5">Danh sách các Website</Typography> */}
        <Box sx={{ mt: 2 }} style={BoxStyle}>
          <WebsiteList />
        </Box>
      </Box>
    </div>
  );
};

export default WebsiteManage;
