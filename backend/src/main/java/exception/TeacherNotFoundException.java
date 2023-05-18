package exception;

public class TeacherNotFoundException extends RuntimeException{
	public TeacherNotFoundException(int id) {
		super("Could not found the Teacher with id "+ id);
	}
}
