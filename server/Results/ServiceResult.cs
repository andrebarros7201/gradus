namespace Server.Results;

public class ServiceResult<T> {
    public ServiceResultStatus Status { get; set; }
    public T? Data { get; set; }
    public string? Message { get; set; }

    public static ServiceResult<T> Ok(T data) {
        return new ServiceResult<T> {
            Status = ServiceResultStatus.Ok,
            Data = data
        };
    }

    public static ServiceResult<T> Error(ServiceResultStatus status, string message) {
        return new ServiceResult<T> {
            Status = status,
            Message = message
        };
    }
}