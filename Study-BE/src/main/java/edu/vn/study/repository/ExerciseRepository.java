package edu.vn.study.repository;

import edu.vn.study.domain.Account;
import edu.vn.study.domain.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByExercisecontentContainsIgnoreCase(String exercisecontent);

    List<Exercise> findByLesson_Id(Long id);


}