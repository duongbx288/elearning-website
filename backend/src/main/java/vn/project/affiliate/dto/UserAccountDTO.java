package vn.project.affiliate.dto;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAccountDTO {

    private Integer id;
//    private int userId;
    private Integer studentId;
    private Integer teacherId;
    private Integer affiliateId;
    private String email;
    private String status;
    private String username;
    private String roles;
    private String name;
    private List<Integer> listCourses;
//    private String password;
}
