package edu.vn.study.repository;

import edu.vn.study.domain.Lesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    Page<Lesson> findByLessonnameContainsIgnoreCase(String lessonname, Pageable pageable);

    Optional<Lesson> findByLessonnameLikeAndSubject_Id(String lessonname, Long id);


    List<Lesson> findBySubject_Id(Long id);

    Optional<Lesson> findByLessonnameAndIdNot(String lessonname, Long id);


}