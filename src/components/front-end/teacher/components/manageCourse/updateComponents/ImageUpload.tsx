import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import storage from '../../../../../../configs/FireBase';

const ImageUpload = ({ setCImage, image }) => {
  const [cover, setCover] = useState<string>(image); // Hinh anh gioi thieu khoa hoc

  
  const [imageUpload, setImageUpload] = useState<any>('');
  const [previewImage, setPreviewImage] = useState(image);
  const [fileName, setFileName] = useState();
  // Tai anh len firebase

  const [percent, setPercent] = useState<any>();

  const handleImageChange = (e: any) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setImageUpload(e.target.files[0]);
    setPreviewImage(url);
    setFileName(e.target.files[0].name);
  };

  const handleUploadImage = () => {
    if (!imageUpload) {
      alert('Please choose an image');
    }
    const storageRef = ref(storage, `files/${imageUpload.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageUpload);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent1 = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent1);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setCover(url);
          setCImage(url);
        });
      }
    );
  };

  return (
    <>
      <Grid container>
        <Grid item xs={6} padding={1}>
          <Typography>Ảnh bìa khóa học</Typography>
          <input type="file" accept="image/*" onChange={handleImageChange}></input>
          <Button variant="outlined" onClick={handleUploadImage}>
            Tải ảnh
          </Button>
        </Grid>
        <Grid item xs={6} padding={1}>
          <Card>
            <CardMedia
              component="img"
              id="imgUpload"
              image={previewImage || ''}
              sx={{ objectFit: 'contain', maxWidth: '200px', maxHeight: '200px' }}
            ></CardMedia>
            <CardContent>
              <Typography noWrap>Ảnh khóa học</Typography>
              <Typography>{typeof percent !== 'undefined' && !isNaN(percent) ? percent !== 100 ? `${percent} % đã tải` : `Tải ảnh thành công` : ''}</Typography>
              <Typography>{cover ? cover : ''}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box padding={3}></Box>
    </>
  );
};

export default ImageUpload;
