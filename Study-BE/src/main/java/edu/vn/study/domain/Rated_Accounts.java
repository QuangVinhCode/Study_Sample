package edu.vn.study.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "rated_accounts")
public class Rated_Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;

    @Column(name = "location", nullable = false)
    private int location;

    @ManyToOne
    @JoinColumn(name = "account_completed_exercise_id")
    private AccountCompletedExercise accountCompletedExercise;

    @ManyToOne
    @JoinColumn(name = "rank_id")
    private Ranks rank;
}