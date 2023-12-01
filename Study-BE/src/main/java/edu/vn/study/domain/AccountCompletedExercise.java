package edu.vn.study.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "account_completed_exercise")
public class AccountCompletedExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "completer_id")
    private Account completer;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;


    @Column(name = "completed_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date completedTime;


    @Column(name = "scores", nullable = false)
    private int scores;

    @OneToMany(mappedBy = "accountCompletedExercise")
    private List<Rated_Accounts> ratedAccounts;

}