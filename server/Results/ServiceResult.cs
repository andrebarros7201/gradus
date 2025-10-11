using Microsoft.AspNetCore.Mvc;

namespace Server.Results;

public class ServiceResult<T> {
    public ServiceResultStatus Status { get; set; }
    public T? Data { get; set; }
    public string? Message { get; set; }

    public static ServiceResult<T> Success(T data) {
        return new ServiceResult<T> {
            Status = ServiceResultStatus.Success,
            Data = data
        };
    }

    public static ServiceResult<T> Error(ServiceResultStatus status, string message) {
        return new ServiceResult<T> {
            Status = status,
            Message = message
        };
    }

    public static IActionResult ReturnStatus(ServiceResult<T> result) {
        return result.Status switch {
            ServiceResultStatus.Success => new OkObjectResult(new { data = result.Data }),
            ServiceResultStatus.NotFound => new NotFoundObjectResult(new { message = result.Message }),
            ServiceResultStatus.Conflict => new ConflictObjectResult(new { message = result.Message }),
            ServiceResultStatus.Unauthorized => new UnauthorizedObjectResult(new { message = result.Message }),
            ServiceResultStatus.Forbidden => new ObjectResult(new { message = result.Message }) { StatusCode = 403 },
            _ => new BadRequestObjectResult(result.Message)
        };
    }
}