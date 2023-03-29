package vn.project.affiliate.dto.response;
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
public class TeacherResponse implements Serializable{
    private static final long serialVersionUID = 1L;

    private int pageNum;
    private int pageLimit;
    private long id;
    private String teacherCode;
    private String name;
    private Date birthDate;
    private String email;
    private Integer phoneNumber;
    private String address;
    private String city;
    private String status;      
    private String title;
}
