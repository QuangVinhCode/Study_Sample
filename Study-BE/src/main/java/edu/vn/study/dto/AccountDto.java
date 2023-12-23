package edu.vn.study.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link edu.vn.study.domain.Account}
 */
@Data
public class AccountDto implements Serializable {
    Long id;
    String username;
    String password;
    String fullname;
    Date date;
    String adress;
    int phone_number;

    RoleDto role;
}