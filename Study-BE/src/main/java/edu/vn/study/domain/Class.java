package edu.vn.study.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.vn.study.dto.SubjectDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "class")
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "classname", nullable = false, length = 100)
    private String classname;

    @OneToMany(mappedBy = "classInfo", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Subject> subjects;

}