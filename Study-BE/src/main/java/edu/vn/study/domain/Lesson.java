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
@Table(name = "lesson")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "lessonname", nullable = false, length = 100)
    private String lessonname;

    @Column(name = "lessoncontent", nullable = false, length = 100)
    private String lessoncontent;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Exercise> exercises;

    @OneToMany(mappedBy = "lesson")
    @JsonIgnore
    private List<AccountJoinLesson> joinedAccounts;

    public void setSubjectById(Long subjectId) {
        this.subject = new Subject();
        this.subject.setId(subjectId);
    }
}