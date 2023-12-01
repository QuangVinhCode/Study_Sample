package edu.vn.study.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "ranks")
public class Ranks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "rankname", nullable = false)
    private String rankname;

    @OneToMany(mappedBy = "rank")
    private List<Rated_Accounts> ratedAccounts;

}