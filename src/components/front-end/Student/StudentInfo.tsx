import React, { useEffect, useState } from "react";
import StudentService from "../../../services/StudentService";

const StudentInfo = () => {

    const [info, setInfo] = useState<any>();

    useEffect(() => {
        StudentService.getStudentById(1).then((res) => {
            if (res.data) {
                setInfo(res.data);
                console.log(res.data);
            }
        })
    }, []);

    return (
        <></>
    );
}

export default StudentInfo;