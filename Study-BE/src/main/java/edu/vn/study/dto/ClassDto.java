package edu.vn.study.dto;

import lombok.Data;
import lombok.Value;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link edu.vn.study.domain.Class}
 */
@Data
public class ClassDto implements Serializable {
    Long id;
    @NotEmpty(message = "Tên lớp học không được để trống")
    String classname;



}