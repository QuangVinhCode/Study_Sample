package edu.vn.study.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

/**
 * DTO for {@link edu.vn.study.domain.Class}
 */
@Data
public class SubjectDto implements Serializable {
    Long id;

    @NotEmpty(message = "Tên môn học không được để trống")
    String subjecttitle;

    ClassDto classInfo;
}