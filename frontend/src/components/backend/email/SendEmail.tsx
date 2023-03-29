import React from 'react';
import emailjs from 'emailjs-com';
import Toolbar from '../../../layout/Toolbar';
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
import { BoxStyle, CellTable } from '../../../styles/style';
import { useLocation, useNavigate } from 'react-router-dom';
const TEMPLATE_ID = 'template_x2egisr';
const SERVICE_ID = 'service_m1y0zd9';
const USER_ID = 'HwutxUOM5JtksfCs4'; // public api key

interface CustomState {
  name?: string | undefined;
  email?: string | undefined;
}

const ContactUs = () => {
  const location = useLocation();
  const info = location.state as CustomState;
  const navigate = useNavigate();
  function sendEmail(e) {
    e.preventDefault(); //This is important, i'm not sure why, but the email won't send without it

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      (result) => {
        window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
      },
      (error) => {
        console.log(error.text);
      }
    );
  }

  return (
    <>
      <Toolbar />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, ml: 2, mt: 2 }}>
        <Typography variant="h6" sx={{ color: 'blue' }}>
          Gửi email thông báo{' '}
        </Typography>
      </Box>
      <Box sx={{ mt: 3, ml: 2, mb: 1, mr: 2 }} style={BoxStyle}>
        <form className="contact-form" onSubmit={sendEmail}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <input type="hidden" name="contact_number" style={{width:'50%'}}/>
            <label>Tên</label>
            <input style={{padding: 2}} type="text" name="to_name" placeholder={info.name}/>
            <label>Tới Email</label>
            <input style={{padding: 2}} type="email" name="to_email" placeholder={info.email}/>
            <label>Tiêu đề</label>
            <input style={{padding: 2}} type="text" name="subject" />
            <br/>
            <label>Nội dung email</label>
            <textarea style={{padding: 2}} name="message" />
            <br/>
            <input type="submit" value="Send" />
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ContactUs;
