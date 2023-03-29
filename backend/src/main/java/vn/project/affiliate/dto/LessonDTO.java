package vn.project.affiliate.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.project.affiliate.entity.LessonInfoEntity;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LessonDTO implements Serializable{
    private static final long serialVersionUID = 1L;

    private Integer id;
    private Integer courseId;
    private String name;
    private String content;
    private String introduction;
    private String status;
    private int lessonNumber;
    private String videoLink;
    private String locked;
    private Instant createdDate;
    private Instant lastModifiedDate;
}
