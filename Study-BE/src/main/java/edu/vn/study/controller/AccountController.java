package edu.vn.study.controller;

import edu.vn.study.domain.Account;
import edu.vn.study.dto.AccountDto;
import edu.vn.study.service.AccountService;
import edu.vn.study.service.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping()
    public ResponseEntity<?> registerAccount(@Valid @RequestBody AccountDto dto, BindingResult result) {
        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }
        Account registeredAccount = accountService.register(dto);
        return new ResponseEntity<>(registeredAccount, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<?>> getAllAccounts() {
        List<?> accounts = accountService.findAll();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @GetMapping("/{id}/get")
    public ResponseEntity<?> getAccountById(@PathVariable("id") String id) {
        Account account = accountService.findById(id);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @PatchMapping("/login/{username}/{password}")
    public ResponseEntity<?> loginAccount(@PathVariable("username") String username,@PathVariable("password") String password) {

        Account loggedInAccount = accountService.login(username, password);
        return new ResponseEntity<>(loggedInAccount, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccountById(@PathVariable String id) {
        accountService.deleteById(id);
        return new ResponseEntity<>("Account with ID " + id + " has been deleted", HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable("id") String id, @Valid @RequestBody AccountDto dto, BindingResult result) {
        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }

        Account updatedAccount = accountService.update(id, dto);
        return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
    }
}
