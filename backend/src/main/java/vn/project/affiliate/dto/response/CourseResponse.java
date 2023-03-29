package vn.project.affiliate.dto.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.project.affiliate.dto.CommentDTO;
import vn.project.affiliate.dto.CourseDTO;
import vn.project.affiliate.dto.CourseRatingDTO;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {

    CourseDTO course;
    int studentCount;
    int studentComplete;
    List<CommentDTO> comments;
    List<CourseRatingDTO> ratings;
}
