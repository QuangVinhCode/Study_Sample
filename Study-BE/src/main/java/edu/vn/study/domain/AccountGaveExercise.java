package edu.vn.study.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "account_gave_exercise")
public class AccountGaveExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "giver_id")
    private Account giver;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    // Thêm thuộc tính thời gian giao
    @Column(name = "gave_time")
    private String gaveTime;
}