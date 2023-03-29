package vn.project.affiliate.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String studentCode;
    private String name;
    private Date birthDate;
    private String email;
    private String address;
    private String status;
    private String city;
    private String gender;
    private String avatar;
}
