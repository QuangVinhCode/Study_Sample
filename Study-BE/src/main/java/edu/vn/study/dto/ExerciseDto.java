package edu.vn.study.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link edu.vn.study.domain.Exercise}
 */
@Data
public class ExerciseDto implements Serializable {
    Long id;
    String exercisecontent;
    String answera;
    String answerb;
    String answerc;
    String answerd;
    String correctanswer;

    Long lesson_id;

    String account_id;
}