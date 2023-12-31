package edu.vn.study.service;

import edu.vn.study.domain.Class;
import edu.vn.study.domain.Subject;
import edu.vn.study.exception.ClassException;
import edu.vn.study.exception.ExerciseException;
import edu.vn.study.repository.ClassRepository;
import edu.vn.study.repository.LessonRepository;
import edu.vn.study.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private LessonRepository lessonRepository;
    public Subject save(Subject entity) {
        Optional<Subject> existed_subject_class = subjectRepository.findBySubjecttitleLikeAndClassInfo_Id(entity.getSubjecttitle(),entity.getClassInfo().getId());
        if(existed_subject_class.isPresent())
        {
            throw new ExerciseException("Môn có id " + entity.getSubjecttitle() + " và lớp học "+ entity.getClassInfo().getClassname() + " đã tồn tại trong hệ thống");
        }
        return subjectRepository.save(entity);
    }

    public Subject update(Long id,Subject entity) {
        Optional<Subject> existed = subjectRepository.findById(id);
        Optional<Subject> existed_subject_class = subjectRepository.findBySubjecttitleLikeAndClassInfo_Id(entity.getSubjecttitle(),entity.getClassInfo().getId());
        if(!existed.isPresent())
        {
            throw new ExerciseException("Môn có id " + id + " không tồn tại");
        }
        if(existed_subject_class.isPresent())
        {
            throw new ExerciseException("Môn có id " + entity.getSubjecttitle() + " và lớp học "+ entity.getClassInfo().getClassname() + " đã tồn tại trong hệ thống");
        }
        try {
            Subject existedSubject = existed.get();
            existedSubject.setSubjecttitle(entity.getSubjecttitle());
           return subjectRepository.save(existedSubject);
        }catch (Exception ex)
        {
            throw new ExerciseException("Môn muốn cập nhật bị lỗi");
        }
    }

    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }

    public List<Subject> findAllByClass(Long id) {
        return subjectRepository.findByClassInfo_Id(id);
    }

    public Subject findById(Long id) {
        Optional<Subject> found = subjectRepository.findById(id);

        if (!found.isPresent())
        {
            throw new ExerciseException("Môn có id "+ id + "không tồn tại");
        }
        return found.get();
    }

    public void  deleteById(Long id){
        Subject existed = findById(id);
        List<?> list = lessonRepository.findBySubject_Id(id);
        if (!list.isEmpty())
        {
            throw  new ExerciseException("Môn có id "+ id + " có bài học tồn tại");
        }
        subjectRepository.delete(existed);
    }
}
