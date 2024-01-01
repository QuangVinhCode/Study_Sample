package edu.vn.study.repository;

import edu.vn.study.domain.Subject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findBySubjecttitleStartsWith(String subjecttitle, Pageable pageable);

    List<Subject> findByClassInfo_Id(Long id);


}