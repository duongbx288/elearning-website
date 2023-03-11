import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Divider,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import CourseService, { CourseRequest } from '../../../../../../services/CourseService';
  import TeacherService, {
    TeacherResponse,
  } from '../../../../../../services/TeacherService';
  import TypeService, { TypeResponse } from '../../../../../../services/TypeService';
  import storage from '../../../../../../configs/FireBase';
  import ReactQuill from 'react-quill';
  import 'react-quill/dist/quill.snow.css';
  import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
  
  const BasicInfos = ({ setBInfo , info, courseId }) => {
    const { id } = useParams();
  
    const [category, setCategory] = useState<TypeResponse[]>([]);
    const [name, setName] = useState<string>(info?.name); // ten khoa hoc
    const [description, setDescription] = useState<string>(info?.description);
    const [introduction, setIntroduction] = useState<string>(info?.introduction);
    const [price, setPrice] = useState<string>(info?.price);
    const [typeId, setTypeId] = useState<string>(info?.typeId);
    const [link, setLink] = useState<string>(info?.link); // Video gioi thieu
  

  
    useEffect(() => {
      document.title = 'Tạo khóa học';
      TypeService.getAllType().then((res) => {
        if (res.data) {
          setCategory(res.data);
        }
      });
    }, []);
  
    const handleTypeChange = (event: SelectChangeEvent) => {
      setTypeId(event.target.value);
    };
  
    const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
  
    const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const regex = /^[0-9\b]+$/;
      if (event.target.value === '' || regex.test(event.target.value)) {
        setPrice(event.target.value);
      }
    };
  
    const handleLinkInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLink(event.target.value);
    };
  
    const handleIntroductionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIntroduction(event.target.value);
    };
  
    // Text Editor
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ font: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
    };
  
    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
    ];
  
    const handleCreateCourse = () => {
      const newCourse = {
        teacherId: id,
        name: name,
        description: description ? description : '',
        introduction: introduction,
        price: Number(price),
        typeId: Number(typeId),
        link: link,
        rating: 0,
      } as CourseRequest;
      setBInfo(newCourse);
    };
  
    return (
      <>
        <Box display={'flex'} alignItems={'center'} flexDirection="column">
          <Box component={'form'} sx={{ padding: 3 }}>
            <Grid container>
              <Grid item xs={3} padding={1}>
                <TextField
                  value={name ? name : ''}
                  placeholder={'Điền tên..'}
                  label="Tên khóa học"
                  onChange={handleNameInput}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={2} padding={1}>
                <TextField
                  value={price? price : ''}
                  placeholder={'Điền giá..'}
                  label="Gía khóa học"
                  onChange={handlePriceInput}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={3} padding={1}>
                <TextField
                  value={link ? link : ''}
                  placeholder={'Link video giới thiệu'}
                  label="Link video giới thiệu"
                  onChange={handleLinkInput}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={3} padding={1}>
                <FormControl sx={{ marginLeft: 2, width: '300px' }}>
                  <InputLabel id="demo-simple-select-label">Loại khóa học</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typeId ? typeId : "1"}
                    label="Loại khóa học"
                    onChange={handleTypeChange}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                    }}
                  >
                    {category.map((item) => {
                      return (
                        <MenuItem value={item.id} key={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} padding={1}>
                <TextField
                  value={introduction ? introduction : ''}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder={'Giới thiệu sơ lược về khóa học'}
                  label="Giới thiệu sơ lược về khóa học"
                  onChange={handleIntroductionInput}
                ></TextField>
              </Grid>
              <Grid item xs={12} padding={1}>
                <Box padding={0.1} sx={{ border: '1px solid' }}></Box>
              </Grid>
              <Grid item xs={6} padding={1}>
                <Typography>Mô tả khóa học</Typography>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={description ? description : ''}
                  onChange={setDescription}
                  placeholder={'Mô tả...'}
                />
              </Grid>
              <Grid item xs={6} padding={1}>
                <Typography>Preview:</Typography>
                <Box border={'1px solid gray'} padding={1}>
                  <div dangerouslySetInnerHTML={{ __html: description }}></div>
                </Box>
              </Grid>
              <Grid item xs={12} padding={1}>
                <Box padding={0.1} sx={{ border: '1px solid' }}></Box>
              </Grid>
  
            </Grid>
  
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Button variant="outlined" onClick={handleCreateCourse}>
              Lưu thông tin
            </Button>
          </Box>
        </Box>
      </>
    );
  };
  
  export default BasicInfos;
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  