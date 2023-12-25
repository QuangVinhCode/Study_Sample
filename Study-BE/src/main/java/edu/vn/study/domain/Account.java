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
@Table(name = "account")
public class Account {
    @Id
    @Column(name = "id", nullable = false, length = 100)
    private String id;

    @Column(name = "username", nullable = false, length = 100)
    private String username;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "fullname", nullable = false, length = 100)
    private String fullname;

    @Column(name = "date", nullable = false, length = 100)
    private int date;

    @Column(name = "adress", nullable = false, length = 150)
    private String adress;

    @Column(name = "phone_number", nullable = false, length = 150)
    private int phone_number;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "giver")
    @JsonIgnore
    private List<AccountGaveExercise> givenExercises;

    @OneToMany(mappedBy = "completer")
    @JsonIgnore
    private List<AccountCompletedExercise> completedExercises;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "account")
    @JsonIgnore
    private List<AccountJoinLesson> joinedLessons;

    public void setAccountById(Long roleId) {
        this.role = new Role();
        this.role.setId(roleId);
    }
}