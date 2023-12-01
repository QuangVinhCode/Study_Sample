package edu.vn.study.service;

import edu.vn.study.domain.Class;
import edu.vn.study.exception.ClassException;
import edu.vn.study.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassService {
    @Autowired
    private ClassRepository classRepository;

    public Class save(Class entity) {
        return classRepository.save(entity);
    }

    public Class update(Long id,Class entity) {
        Optional<Class> existed = classRepository.findById(id);
        if(!existed.isPresent())
        {
            throw new ClassException("Lớp có id " + id + " không tồn tại");
        }

        try {
           Class existedClass = existed.get();
           existedClass.setClassname(entity.getClassname());
           return classRepository.save(existedClass);
        }catch (Exception ex)
        {
            throw new ClassException("Lớp muốn cập nhật bị lỗi");
        }
    }

    public List<Class> findAll() {
        return classRepository.findAll();
    }

    public Class findById(Long id) {
        Optional<Class> found = classRepository.findById(id);

        if (!found.isPresent())
        {
            throw new ClassException("Lớp có id "+ id + "không tồn tại");
        }
        return found.get();
    }

    public void  deleteById(Long id){
        Class existed = findById(id);

        classRepository.delete(existed);
    }
}
