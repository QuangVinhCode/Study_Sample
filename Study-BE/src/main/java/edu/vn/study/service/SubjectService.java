package edu.vn.study.service;

import edu.vn.study.domain.Class;
import edu.vn.study.domain.Subject;
import edu.vn.study.exception.ClassException;
import edu.vn.study.repository.ClassRepository;
import edu.vn.study.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    public Subject save(Subject entity) {
        return subjectRepository.save(entity);
    }

    public Subject update(Long id,Subject entity) {
        Optional<Subject> existed = subjectRepository.findById(id);
        if(!existed.isPresent())
        {
            throw new ClassException("Môn có id " + id + " không tồn tại");
        }

        try {
            Subject existedSubject = existed.get();
            existedSubject.setSubjecttitle(entity.getSubjecttitle());
           return subjectRepository.save(existedSubject);
        }catch (Exception ex)
        {
            throw new ClassException("Môn muốn cập nhật bị lỗi");
        }
    }

    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }

    public Subject findById(Long id) {
        Optional<Subject> found = subjectRepository.findById(id);

        if (!found.isPresent())
        {
            throw new ClassException("Môn có id "+ id + "không tồn tại");
        }
        return found.get();
    }

    public void  deleteById(Long id){
        Subject existed = findById(id);

        subjectRepository.delete(existed);
    }
}
