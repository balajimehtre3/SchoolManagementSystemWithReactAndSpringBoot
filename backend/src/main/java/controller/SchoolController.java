package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import exception.StudentNotFoundException;
import exception.TeacherNotFoundException;
import model.Student;
import model.Teacher;
import repository.StudentRepository;
import repository.TeacherRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class SchoolController {
	
	@Autowired
	private StudentRepository sr;
	
	@Autowired
	private TeacherRepository tr;
	
	@PostMapping("/addStudent")
	private Student newStudent(@RequestBody Student newStudent) {
		return sr.save(newStudent);
	}
	
	@GetMapping("/getStudent")
	private List<Student> getAllStudent(){
		return sr.findAll();
	}
	
	@GetMapping("/getStudentById/{id}")
	private Student getStudentById(@PathVariable int id) {
		return sr.findById(id)
				.orElseThrow(()->new StudentNotFoundException(id));
	}
	
	@PutMapping("/updateStudent/{id}")
	private Student updateStudent(@RequestBody Student newStudent) {
		return sr.save(newStudent);
	}
	
	@DeleteMapping("/deleteStudent/{id}")
	private String deleteStudent(@PathVariable int id) {
		if(!sr.existsById(id)) {
			throw new StudentNotFoundException(id);
		}else {
			sr.deleteById(id);
			return "Student with id "+id+" Has Deleted";
		}
	}
	
	
	@PostMapping("/addTeacher")
	private Teacher newTeacher(@RequestBody Teacher newTeacher) {
		return tr.save(newTeacher);
	}
	
	@GetMapping("/getTeacher")
	private List<Teacher> getAllTeacher(){
		return tr.findAll();
	}
	
	@GetMapping("/getTeacherById/{id}")
	private Teacher getTeacherById(@PathVariable int id) {
		return tr.findById(id)
				.orElseThrow(()->new TeacherNotFoundException(id));
	}
	
	@PutMapping("/updateTeacher/{id}")
	private Teacher updateTeacher(@RequestBody Teacher newTeacher) {
		return tr.save(newTeacher);
	}
	
	@DeleteMapping("/deleteTeacher/{id}")
	private String deleteTeacher(@PathVariable int id) {
		if(!tr.existsById(id)) {
			throw new TeacherNotFoundException(id);
		}else {
			tr.deleteById(id);
			return "Teacher with id "+id+" Has Deleted";
		}
	}
}

















