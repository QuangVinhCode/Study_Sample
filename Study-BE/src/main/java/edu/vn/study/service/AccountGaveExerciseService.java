package edu.vn.study.service;

import edu.vn.study.domain.AccountGaveExercise;
import edu.vn.study.domain.Class;
import edu.vn.study.domain.Exercise;
import edu.vn.study.exception.AccountGaveExerciseException;
import edu.vn.study.exception.ClassException;
import edu.vn.study.repository.AccountGaveExerciseRepository;
import edu.vn.study.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountGaveExerciseService {
    @Autowired
    private AccountGaveExerciseRepository accountGaveExerciseRepository;

    @Autowired
    private ExerciseService exerciseService;

    public AccountGaveExercise save(AccountGaveExercise entity) {
        return accountGaveExerciseRepository.save(entity);
    }

    public List<AccountGaveExercise> findAll() {
        return accountGaveExerciseRepository.findAll();
    }
    public AccountGaveExercise findById(Long id) {
        Optional<AccountGaveExercise> found = accountGaveExerciseRepository.findById(id);
        if (!found.isPresent())
        {
            throw new AccountGaveExerciseException(" a Bài tập có tài khoản giao có "+ id + "không tồn tại");
        }
        return found.get();
    }
    public void  deleteById(Exercise exercise){

        accountGaveExerciseRepository.deleteByExercise(exercise);

    }
}
