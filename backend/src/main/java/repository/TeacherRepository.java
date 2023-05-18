package repository;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Integer>{

}
