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
public class StudentResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private int pageNum;
    private int pageLimit;
    private int id;
    private String studentCode;
    private String name;
    private Date birth_date;
    private String email;
    private String address;
    private String status;
    private String city;
    private String gender;
    private String avatar;
}
