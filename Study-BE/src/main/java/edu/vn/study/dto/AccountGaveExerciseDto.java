package edu.vn.study.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link edu.vn.study.domain.AccountGaveExercise}
 */
@Data
public class AccountGaveExerciseDto implements Serializable {
    Long id;
    String gaveTime;

    AccountDto account;

    ExerciseDto exercise;

}