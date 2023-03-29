package vn.project.affiliate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private long id;
    private String teacherCode;
    private String name;
    private Date birthDate;
    private String email;
    private String phoneNumber;
    private String address;
    private String city;
    private String status;
    private String title;
    private String description;
    private String avatar;
    private String username;
}
