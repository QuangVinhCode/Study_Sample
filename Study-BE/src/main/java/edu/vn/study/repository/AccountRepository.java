package edu.vn.study.repository;

import edu.vn.study.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByUsernameContainsIgnoreCaseAndPasswordContainsIgnoreCase(String username, String password);

    List<Account> findByUsernameContainsIgnoreCase(String username);

}