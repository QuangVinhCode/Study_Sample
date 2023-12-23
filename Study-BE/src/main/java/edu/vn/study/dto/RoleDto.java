package edu.vn.study.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link edu.vn.study.domain.Role}
 */
@Data
public class RoleDto implements Serializable {
    Long id;
    String rolename;
}