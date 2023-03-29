package vn.project.affiliate.dto.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAccountRequest {

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
    private String password;

}
