package edu.vn.study.domain;

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
@Table(name = "account")
public class Account {
    @Id
    @Column(name = "id", nullable = false, length = 100)
    private Long id;

    @Column(name = "username", nullable = false, length = 100)
    private String username;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "fullname", nullable = false, length = 100)
    private String fullname;

    @Temporal(TemporalType.DATE)
    @Column(name = "date")
    private Date date;

    @Column(name = "adress", nullable = false, length = 150)
    private String adress;

    @Column(name = "phone_number", nullable = false, length = 150)
    private int phone_number;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "giver")
    private List<AccountGaveExercise> givenExercises;

    @OneToMany(mappedBy = "completer")
    private List<AccountCompletedExercise> completedExercises;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy = "account")
    private List<AccountJoinLesson> joinedLessons;
}