package edu.vn.study.service;

import edu.vn.study.domain.*;
import edu.vn.study.domain.Class;
import edu.vn.study.dto.AccountDto;
import edu.vn.study.dto.AccountGaveExerciseDto;
import edu.vn.study.dto.ExerciseDto;
import edu.vn.study.exception.AccountException;
import edu.vn.study.exception.ClassException;
import edu.vn.study.exception.ExerciseException;
import edu.vn.study.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.var;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ExerciseService {
    @Autowired
    ExerciseRepository exerciseRepository;

    public Exercise save(ExerciseDto dto) {
        List<?> foundList = exerciseRepository.findByExercisecontentContainsIgnoreCase(dto.getExercisecontent());

        if (!foundList.isEmpty()) {
            throw new ExerciseException("Tên bài tập đã tồn tại trong hệ thống");
        }
        if (!dto.getCorrectanswer().equalsIgnoreCase(dto.getAnswera())
                && !dto.getCorrectanswer().equalsIgnoreCase(dto.getAnswerb())
                && !dto.getCorrectanswer().equalsIgnoreCase(dto.getAnswerc())
                && !dto.getCorrectanswer().equalsIgnoreCase(dto.getAnswerd())) {
            throw new ExerciseException("Đáp án phải nằm trong câu trả lời");
        }
        Exercise entity = new Exercise();
        entity.setExercisecontent(dto.getExercisecontent());
        entity.setAnswera(dto.getAnswera());
        entity.setAnswerb(dto.getAnswerb());
        entity.setAnswerc(dto.getAnswerc());
        entity.setAnswerd(dto.getAnswerd());
        entity.setCorrectanswer(dto.getCorrectanswer());
        Lesson lesson = new Lesson();
        lesson.setId(dto.getLesson_id());

        entity.setLesson(lesson);

        return exerciseRepository.save(entity);
    }

    public Exercise update(Long id ,ExerciseDto dto) {
        var foundList = exerciseRepository.findById(dto.getId());

        if (!foundList.isPresent()) {
            throw new ExerciseException("Tên bài tập đã tồn tại trong hệ thống");
        }
        if (!dto.getCorrectanswer().equalsIgnoreCase(dto.getAnswera())
                && !dto.getCorrectanswer().equalsIgnoreCase(dto.getAnswerb())
                && !dto.getCorrectanswer().equalsIgnoreCase(dto.getAnswerc())
                && !dto.getCorrectanswer().equalsIgnoreCase(dto.getAnswerd())) {
            throw new ExerciseException("Đáp án phải nằm trong câu trả lời");
        }
        Exercise entity = new Exercise();
        entity.setId(dto.getId());
        entity.setExercisecontent(dto.getExercisecontent());
        entity.setAnswera(dto.getAnswera());
        entity.setAnswerb(dto.getAnswerb());
        entity.setAnswerc(dto.getAnswerc());
        entity.setAnswerd(dto.getAnswerd());
        entity.setCorrectanswer(dto.getCorrectanswer());
        Lesson lesson = new Lesson();
        lesson.setId(dto.getLesson_id());

        entity.setLesson(lesson);

        return exerciseRepository.save(entity);
    }

    public List<Exercise> findAll() {
        return exerciseRepository.findAll();
    }
    public Exercise findById(Long id) {
        Optional<Exercise> found = exerciseRepository.findById(id);

        if (!found.isPresent())
        {
            throw new ClassException("exerciseRepository Bài tập có id "+ id + "không tồn tại");
        }
        return found.get();
    }
    public void  deleteById(Long id){
        Exercise existed = findById(id);

        exerciseRepository.delete(existed);
    }
}
