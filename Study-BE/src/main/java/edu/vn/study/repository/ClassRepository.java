package edu.vn.study.repository;

import edu.vn.study.domain.Class;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassRepository extends JpaRepository<Class, Long> {
    List<Class> findByClassnameStartsWith(String classname, Pageable pageable);
}