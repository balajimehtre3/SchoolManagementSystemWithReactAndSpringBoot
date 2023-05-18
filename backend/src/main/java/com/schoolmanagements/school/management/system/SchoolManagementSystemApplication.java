package com.schoolmanagements.school.management.system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "controller") 
@EntityScan(basePackages = {"model"})
@EnableJpaRepositories(basePackages = {"repository"})
public class SchoolManagementSystemApplication { 

	public static void main(String[] args) {  
		SpringApplication.run(SchoolManagementSystemApplication.class, args);
	}

}
