package edu.vn.study.repository;

import edu.vn.study.domain.Subject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findBySubjecttitleStartsWith(String subjecttitle, Pageable pageable);

    List<Subject> findByClassInfo_Id(Long id);

    Optional<Subject> findBySubjecttitleLikeAndClassInfo_Id(String subjecttitle, Long id);



}