package edu.vn.study.controller;

import edu.vn.study.domain.Account;
import edu.vn.study.domain.AccountGaveExercise;
import edu.vn.study.domain.Exercise;
import edu.vn.study.dto.AccountDto;
import edu.vn.study.dto.ExerciseDto;
import edu.vn.study.service.AccountGaveExerciseService;
import edu.vn.study.service.ExerciseService;
import edu.vn.study.service.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/exercises")
public class ExerciseController {
    @Autowired
    ExerciseService exerciseService;

    @Autowired
    AccountGaveExerciseService accountGaveExerciseService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping()
    public ResponseEntity<?> createExercise(@Valid @RequestBody ExerciseDto dto, BindingResult result) {
        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }
        Exercise exercise = exerciseService.save(dto);

        AccountGaveExercise accountGaveExercise = new AccountGaveExercise();
        Account account = new Account();
        account.setId(dto.getAccount_id());
        accountGaveExercise.setGiver(account);
        accountGaveExercise.setExercise(exercise);
        LocalDateTime currentTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedTime = currentTime.format(formatter);

        accountGaveExercise.setGaveTime(formattedTime);
        accountGaveExerciseService.save(accountGaveExercise);

        return new ResponseEntity<>(accountGaveExercise, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateExercise(@PathVariable("id") Long id,@Valid @RequestBody ExerciseDto dto, BindingResult result) {
        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }
        Exercise exercise = exerciseService.update(id,dto);

        return new ResponseEntity<>(exercise, HttpStatus.CREATED);
    }

    @PatchMapping("/quiz/{id}")
    public ResponseEntity<?> quiz(@PathVariable("id") Long id){

        return new ResponseEntity<>(exerciseService.findByLessonId(id), HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<?> getExercises(){
        return new ResponseEntity<>(exerciseService.findAll(),HttpStatus.OK);
    }

    @GetMapping("/{id}/get")
    public  ResponseEntity<?> getExercise(@PathVariable("id") Long id){
        return new ResponseEntity<>(exerciseService.findById(id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExercise(@PathVariable("id") Long id)
    {
        Exercise exercise = exerciseService.findById(id);
        accountGaveExerciseService.deleteById(exercise);
        exerciseService.deleteById(id);
        return  new ResponseEntity<>("Bài tập có id " + id + " đã được xóa",HttpStatus.OK);
    }
}
