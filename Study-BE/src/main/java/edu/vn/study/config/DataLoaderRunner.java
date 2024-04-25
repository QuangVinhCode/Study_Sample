package edu.vn.study.config;

import edu.vn.study.domain.Account;
import edu.vn.study.domain.Role;
import edu.vn.study.repository.AccountRepository;
import edu.vn.study.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
@Component
public class DataLoaderRunner  {
    @Autowired
    private final RoleRepository roleRepository;

    @Autowired
    private final AccountRepository accountRepository;
    @Autowired
    public DataLoaderRunner(RoleRepository roleRepository,AccountRepository accountRepository) {
        this.roleRepository = roleRepository;
        this.accountRepository=accountRepository;
    }


    @PostConstruct
    public void init() {
        if (roleRepository.count() == 0) {
            // Thêm dữ liệu nếu bảng role trống
            Role adminRole = new Role();
            adminRole.setRolename("Quản trị viên");

            Role teacherRole = new Role();
            teacherRole.setRolename("Giáo viên");

            Role studentRole = new Role();
            studentRole.setRolename("Học sinh");

            roleRepository.save(adminRole);
            roleRepository.save(teacherRole);
            roleRepository.save(studentRole);

            Account accountadmin = new Account();
            accountadmin.setId("QT0000000000");
            accountadmin.setFullname("Quản trị viên");
            accountadmin.setUsername("admin");
            accountadmin.setPassword("1");
            accountadmin.setAdress(" ");
            accountadmin.setDate(0);
            accountadmin.setPhone_number(0);
            Role role = new Role();
            role.setId(1L);
            accountadmin.setRole(role);
            accountRepository.save(accountadmin);
        }
    }
}
