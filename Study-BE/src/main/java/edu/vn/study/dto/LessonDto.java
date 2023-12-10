package edu.vn.study.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.vn.study.domain.Subject;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
@Data
public class LessonDto implements Serializable {

    private Long id;
    @NotEmpty(message = "Tên bài học không được để trống")
    private String lessonname;

    private String lessoncontent;

    private SubjectDto subject;

    @JsonIgnore
    private MultipartFile pdfFile;
}
