package edu.vn.study.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "exercise")
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "exercisecontent", nullable = false, length = 250)
    private String exercisecontent;

    @Column(name = "answera", nullable = false, length = 150)
    private String answera;

    @Column(name = "answerb", nullable = false, length = 150)
    private String answerb;

    @Column(name = "answerc", nullable = false, length = 150)
    private String answerc;

    @Column(name = "answerd", nullable = false, length = 150)
    private String answerd;

    @Column(name = "correctanswer", nullable = false, length = 150)
    private String correctanswer;

    @OneToMany(mappedBy = "exercise")
    @JsonIgnore
    private List<AccountGaveExercise> givenByAccounts;

    @OneToMany(mappedBy = "exercise")
    @JsonIgnore
    private List<AccountCompletedExercise> completedByAccounts;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}