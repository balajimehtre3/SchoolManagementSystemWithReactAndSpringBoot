package repository;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer>{
	
}
