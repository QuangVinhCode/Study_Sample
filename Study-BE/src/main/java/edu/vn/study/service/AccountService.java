package edu.vn.study.service;

import edu.vn.study.domain.Account;
import edu.vn.study.domain.Lesson;
import edu.vn.study.domain.Role;
import edu.vn.study.domain.Subject;
import edu.vn.study.dto.AccountDto;
import edu.vn.study.dto.LessonDto;
import edu.vn.study.exception.AccountException;
import edu.vn.study.exception.ClassException;
import edu.vn.study.exception.LessonException;
import edu.vn.study.repository.AccountRepository;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    RoleService roleService;

    public Account register(AccountDto dto) {
        List<?> foundList = accountRepository.findByUsernameContainsIgnoreCase(dto.getUsername());

        if (!foundList.isEmpty()) {
            throw new AccountException("Tên tài khoản đã tồn tại trong hệ thống");
        }

        Role role = roleService.findById(dto.getRole().getId());
        Account entity = new Account();

        Random random = new Random();

        // Tạo ID ngẫu nhiên trong khoảng từ 1 đến 9999
        int randomId = random.nextInt(9999) + 1;

        // Lấy thời gian hiện tại
        LocalDateTime currentTime = LocalDateTime.now();

        // Định dạng thời gian với giờ, phút, giây
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

        // Ghép số ngẫu nhiên với thời gian hiện tại
        String finalId = randomId + currentTime.format(formatter);

        entity.setId(finalId);
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());
        entity.setFullname(dto.getFullname());
        entity.setDate(dto.getDate());
        entity.setAdress(dto.getAdress());
        entity.setPhone_number(dto.getPhone_number());
        entity.setRole(role);

        return accountRepository.save(entity);
    }

    public List<?> findAll() {
        return accountRepository.findAll();
    }


    public Account findById(String id) {
        Optional<Account> found = accountRepository.findById(id);

        if (!found.isPresent())
        {
            throw new AccountException("Tài khoản có id "+ id + "không tồn tại");
        }
        return found.get();
    }

    public Account login(String username,String password) {
        Optional<Account> found = accountRepository.findByUsernameContainsIgnoreCaseAndPasswordContainsIgnoreCase(username,password);

        if (!found.isPresent())
        {
            throw new AccountException("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
        return found.get();
    }

    public void  deleteById(String id){
        Account existed = findById(id);

        accountRepository.delete(existed);
    }

    public Account update(String id ,AccountDto dto) {
        Optional<Account> foundList = accountRepository.findById(id);

        if (!foundList.isPresent()) {
            throw new AccountException("Tên tài khoản đã tồn tại trong hệ thống");
        }

        Role role = roleService.findById(dto.getRole().getId());
        Account entity = new Account();

        Random random = new Random();

        // Tạo ID ngẫu nhiên trong khoảng từ 1 đến 9999
        int randomId = random.nextInt(9999) + 1;

        // Lấy thời gian hiện tại
        LocalDateTime currentTime = LocalDateTime.now();

        // Định dạng thời gian với giờ, phút, giây
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

        // Ghép số ngẫu nhiên với thời gian hiện tại
        String finalId = randomId + currentTime.format(formatter);

        entity.setId(finalId);
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());
        entity.setFullname(dto.getFullname());
        entity.setDate(dto.getDate());
        entity.setAdress(dto.getAdress());
        entity.setPhone_number(dto.getPhone_number());
        entity.setRole(role);

        return accountRepository.save(entity);
    }
}
