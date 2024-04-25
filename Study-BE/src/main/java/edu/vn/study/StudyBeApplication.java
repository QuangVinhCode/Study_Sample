package edu.vn.study;

import edu.vn.study.config.DataLoaderRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class StudyBeApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(StudyBeApplication.class, args);
        DataLoaderRunner dataLoaderRunner = context.getBean(DataLoaderRunner.class);
        dataLoaderRunner.init();
    }

}
