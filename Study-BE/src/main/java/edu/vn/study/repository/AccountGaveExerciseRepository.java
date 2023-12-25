package edu.vn.study.repository;

import edu.vn.study.domain.AccountGaveExercise;
import edu.vn.study.domain.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface AccountGaveExerciseRepository extends JpaRepository<AccountGaveExercise, Long> {
    Optional<AccountGaveExercise> findByExercise(Exercise exercise);

    @Transactional
    void deleteByExercise(Exercise exercise);

}