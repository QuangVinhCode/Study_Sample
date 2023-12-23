package edu.vn.study.service;

import edu.vn.study.domain.Lesson;
import edu.vn.study.domain.Subject;
import edu.vn.study.dto.LessonDto;
import edu.vn.study.exception.ClassException;
import edu.vn.study.exception.LessonException;
import edu.vn.study.repository.LessonRepository;
import edu.vn.study.repository.SubjectRepository;
import lombok.var;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LessonService {
    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    SubjectService subjectService;
    public Lesson save(LessonDto dto) {
        List<?> foundedList = lessonRepository.findByLessonnameContainsIgnoreCase(dto.getLessonname());

        if (foundedList.size() > 0)
        {
            throw  new LessonException("Bài học đã tồn tại trong hệ thống");
        }
        Subject subject = subjectService.findById(dto.getSubject().getId());
        Lesson entity = new Lesson();

        //BeanUtils.copyProperties(dto,entity);

        entity.setLessonname(dto.getLessonname());
        entity.setLessoncontent(dto.getLessoncontent());
        entity.setSubject(subject);


        if (dto.getPdfFile() != null)
        {
            String filename = fileStorageService.storePDFFile(dto.getPdfFile());


            entity.setLessoncontent(filename);
            dto.setPdfFile(null);
        }

        return lessonRepository.save(entity);
    }

    public List<?> findAll() {
        return lessonRepository.findAll();
    }

    public Page<Lesson> findAll(Pageable pageable){
        return lessonRepository.findAll(pageable);
    }

    public Lesson findById(Long id) {
        Optional<Lesson> found = lessonRepository.findById(id);

        if (!found.isPresent())
        {
            throw new ClassException("Bài học có id "+ id + "không tồn tại");
        }
        return found.get();
    }

    public void  deleteById(Long id){
        Lesson existed = findById(id);

        lessonRepository.delete(existed);
    }

    public Lesson update(Long id ,LessonDto dto) {
        var found = lessonRepository.findById(id);

        if (!found.isPresent())
        {
            throw  new LessonException("Không tìm thấy bài học");
        }

        Subject subject = subjectService.findById(dto.getSubject().getId());
        Lesson entity = new Lesson();

        //BeanUtils.copyProperties(dto,entity);
        entity.setId(dto.getId());
        entity.setLessonname(dto.getLessonname());
        entity.setLessoncontent(dto.getLessoncontent());
        entity.setSubject(subject);

        if (dto.getPdfFile() != null)
        {
            String filename = fileStorageService.storePDFFile(dto.getPdfFile());

            entity.setLessoncontent(filename);
            dto.setPdfFile(null);
        }else{
            entity.setLessoncontent(found.get().getLessoncontent());
        }

        return lessonRepository.save(entity);
    }

    public Page<Lesson> findByName(String name,Pageable pageable){
        return lessonRepository.findByLessonnameContainsIgnoreCase(name,pageable);
    }
}
