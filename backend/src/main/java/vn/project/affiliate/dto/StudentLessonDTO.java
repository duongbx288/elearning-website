package vn.project.affiliate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentLessonDTO {

    private Integer studentId;
    private Integer lessonId;
    private String status;

}
