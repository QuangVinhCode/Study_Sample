package edu.vn.study.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "subject")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "subjecttitle", nullable = false, length = 100)
    private String subjecttitle;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Class classInfo;

    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Lesson> lessons;

    public void setClassInfoById(Long classId) {
        this.classInfo = new Class();
        this.classInfo.setId(classId);
    }

}