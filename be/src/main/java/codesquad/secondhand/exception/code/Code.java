package codesquad.secondhand.exception.code;

public interface Code {

    boolean isSuccess();
    int getStatus();
    int getCode();
    String getMessage();
}
