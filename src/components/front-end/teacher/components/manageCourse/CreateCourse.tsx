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
import { CourseRequest } from '../../../../../services/CourseService';
import TeacherService, { TeacherResponse } from '../../../../../services/TeacherService';
import TypeService, { TypeResponse } from '../../../../../services/TypeService';
import storage from '../../../../../configs/FireBase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const CreateCourse = () => {
  const { id } = useParams();
  const temp = {} as CourseRequest;
  const [courseInfo, setCourseInfo] = useState<CourseRequest>();
  const [teacherInfo, setTeacherInfo] = useState<TeacherResponse>();

  const [category, setCategory] = useState<TypeResponse[]>([]);

  const [teacherId, setTeacherId] = useState<number>();
  const [teacherName, setTeacherName] = useState<string>('');
  const [name, setName] = useState<string>(''); // ten khoa hoc
  const [description, setDescription] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [typeId, setTypeId] = useState<string>();
  const [link, setLink] = useState<string>(); // Video gioi thieu
  const [cover, setCover] = useState<string>(); // Hinh anh gioi thieu khoa hoc

  const [imageUpload, setImageUpload] = useState<any>('');
  const [previewImage, setPreviewImage] = useState('');
  const [fileName, setFileName] = useState();

  const [lesson, setLesson] = useState([]);
  const [lessonInfos, setLessonInfos] = useState([]);

  // Tab
  const [value, setValue] = useState(0);




  useEffect(() => {
    document.title = 'Tạo khóa học';
    TypeService.getAllType().then((res) => {
      if (res.data) {
        setCategory(res.data);
      }
    });
    if (id !== null && typeof id === 'string') {
      TeacherService.getTeacherById(Number(id)).then((res) => {
        if (res.data) {
          setTeacherInfo(res.data);
        }
      });
    }
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

  // Tai anh len firebase
  const handleImageChange = (e: any) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setImageUpload(e.target.files[0]);
    setPreviewImage(url);
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0]);
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
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setCover(url);
        });
      }
    );
  };

  const handleCreateCourse = () => {
    const newCourse = {
      teacherId: id,
      name: name,
      description: description ? description : '',
      introduction: introduction,
      price: Number(price),
      typeId: Number(typeId),
      link: link,
      cover: cover,
      rating: 0,
    } as CourseRequest;
    console.log(newCourse);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        sx={{ bgcolor: '#f6f9fc' }}
        flexDirection="column"
      >
              <Box sx={{ width: '80%', bgcolor: '#ffffff' }}>
        {/* <Box>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab
              label="Khoá học"
              icon={<BookIcon />}
              iconPosition="start"
              {...a11yProps(0)}
            />
            <Tab
              label="Thông tin cá nhân"
              icon={<BarChartIcon />}
              iconPosition="start"
              {...a11yProps(2)}
            />
            <Tab
              label="Thu nhập"
              icon={<CreditCardIcon />}
              iconPosition="start"
              {...a11yProps(1)}
            />
          </Tabs>
          <Divider />
          <TabPanel value={value} index={0}>
            <ManageCourse teacherId={id} />
          </TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
          <TabPanel value={value} index={2}>
            <Income />
          </TabPanel>
        </Box> */}
      </Box>
        <Box sx={{ width: '80%', bgcolor: '#2a004d', padding: 2 }}>
          <Typography variant="h4" sx={{ color: 'white' }}>
            Giáo viên: {teacherInfo?.name}
          </Typography>
          <Box sx={{ p: 3, mt: 1 }} />
        </Box>
        <Box sx={{ width: '80%', padding: 2 }}>
          <Typography variant="h5">Tạo mới khóa học</Typography>
          <Divider />
          <Box component={'form'} sx={{ padding: 3 }}>
            <Grid container>
              <Grid item xs={3} padding={1}>
                <TextField
                  value={name}
                  placeholder={'Điền tên..'}
                  label="Tên khóa học"
                  onChange={handleNameInput}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={2} padding={1}>
                <TextField
                  value={price}
                  placeholder={'Điền giá..'}
                  label="Gía khóa học"
                  onChange={handlePriceInput}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={3} padding={1}>
                <TextField
                  value={link}
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
                    value={typeId}
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
                  value={introduction}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder={'Giới thiệu sơ lược về khóa học'}
                  label="Giới thiệu sơ lược về khóa học"
                  onChange={handleIntroductionInput}
                ></TextField>
              </Grid>
              <Grid item xs={12} padding={1}><Box padding={0.1} sx={{ border: '1px solid'}}></Box></Grid>
              <Grid item xs={6} padding={1}>
                <Typography>Mô tả khóa học</Typography>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={description}
                  onChange={setDescription}
                  placeholder={"Mô tả..."}
                />
              </Grid>
              <Grid item xs={6} padding={1}>
                <Typography>Preview:</Typography>
                <Box border={'1px solid gray'} padding={1}>
                  <div dangerouslySetInnerHTML={{ __html: description }}></div>
                </Box>
              </Grid>
              <Grid item xs={12} padding={1}><Box padding={0.1} sx={{ border: '1px solid'}}></Box></Grid>
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
                    <Typography noWrap>{cover}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Button variant="outlined" onClick={handleCreateCourse}>
              Thêm khóa học
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateCourse;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}