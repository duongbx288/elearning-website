import { Box, Grid, Typography } from '@mui/material';

export type Info = {
  info?: string;
};

interface CourseInfo {
  courseId: number;
  description: string | null | undefined;
  introduction: string | null | undefined;
}

const CourseIntroduction: React.FC<CourseInfo> = ({
  courseId,
  description,
  introduction,
}: CourseInfo) => {
  const trymore = '';

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body1">{introduction}</Typography>
        </Grid>
      </Grid>
      <Box>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </>
  );
};

export default CourseIntroduction;
