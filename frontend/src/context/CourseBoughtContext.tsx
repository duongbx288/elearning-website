import React, { useContext, useEffect, useState } from 'react';

export const CourseContext = React.createContext<any>(null);

export const CourseProvider = ({children}) => {

    const [courseBought, setCourseBought] = useState<any>([]);

    useEffect(() => {

    }, []);

    const addCourse = (course: any) => {
        setCourseBought([ ...courseBought, course]);
    }

    const courseContext = {courseBought, addCourse}

    return (
        <CourseContext.Provider value={courseContext}>
            {children}
        </CourseContext.Provider>
    )
}