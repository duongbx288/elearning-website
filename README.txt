REACT_APP_SERVER_API_URL

// Moi khoa hoc co cac muc khac nhau - la lesson 
// Moi lesson co cac bai hoc khac nhau
create table lesson_info (
	id int(10) not null auto_increment,
    lesson_id int(10),
    video_link varchar(500),
    content varchar(5000),
    introduction varchar(500),
    start_number int(10),
	created_by varchar(50),
    last_modified_by varchar(50),
    created_at timestamp,
    last_modified_at timestamp,
    primary key (`id`),
    key lesson_infox (`lesson_id`),
    constraint `lesson_id` foreign key(`lesson_id`) references `lesson`(`id`)
);

// Moi hoc vien co tien do hoc khac nhau
create table student_lesson (
	id int(10) not null auto_increment,
    student_id int(10),
    lesson_info_id int(10),
    lesson_id int(10),
    status varchar(50),
	created_by varchar(50),
    last_modified_by varchar(50),
    created_at timestamp,
    last_modified_at timestamp,
	primary key (`id`),
    key student_idsx (`student_id`),
	key lesson_infox (`lesson_info_id`),
	key lessonx (`lesson_id`),
	constraint `lesson_idsl` foreign key(`lesson_id`) references `lesson`(`id`),
    constraint `lesson_info_idsl` foreign key(`lesson_info_id`) references `lesson_info`(`id`),
    constraint `student_idsl` foreign key(`student_id`) references `student`(`id`)
);