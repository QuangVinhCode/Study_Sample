package edu.vn.study.service;

import edu.vn.study.domain.Class;
import edu.vn.study.domain.Role;
import edu.vn.study.exception.ClassException;
import edu.vn.study.repository.ClassRepository;
import edu.vn.study.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Role findById(Long id) {
        Optional<Role> found = roleRepository.findById(id);

        if (!found.isPresent())
        {
            throw new ClassException("Quyền hạn có id "+ id + "không tồn tại");
        }
        return found.get();
    }
}
