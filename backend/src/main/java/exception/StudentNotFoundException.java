package exception;

public class StudentNotFoundException extends RuntimeException{
	public StudentNotFoundException(int id) {
		super("Could not found the Student with id "+ id);
	}
}
