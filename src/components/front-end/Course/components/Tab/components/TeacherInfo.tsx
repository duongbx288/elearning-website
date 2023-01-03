import { useEffect, useState } from 'react';
import TeacherService from '../../../../../../services/TeacherService';

export type Info = {
  info: string;
};

interface TeacherProps {
  teacherId: number | null | undefined;
}

const TeacherInfo: React.FC<TeacherProps> = ({ teacherId }: TeacherProps) => {
  const [teacherInfo, setTeacherInfo] = useState<any>();

  useEffect(() => {
    if (teacherId) {
      TeacherService.getTeacherById(teacherId).then((res) => {
        if (res.data) {
          console.log(res.data);
          setTeacherInfo(res.data);
        }
      });
    }
  }, []);

  return <></>;
};

export default TeacherInfo;
