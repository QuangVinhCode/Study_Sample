package edu.vn.study.repository;

import edu.vn.study.domain.Lesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    Page<Lesson> findByLessonnameContainsIgnoreCase(String lessonname, Pageable pageable);

    List<Lesson> findByLessonnameContainsIgnoreCase(String lessonname);

    List<Lesson> findByIdNotAndLessonnameContainsIgnoreCase(Long id, String lessonname);

}