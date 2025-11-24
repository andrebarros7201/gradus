using Microsoft.AspNetCore.Mvc;

namespace Server.Results;

public class ServiceResult<T> {
    public ServiceResultStatus Status { get; set; }
    public T? Data { get; set; }
    public int? Count { get; set; }
    public string? Message { get; set; }

    public static ServiceResult<T> Success(T data, int? count = null) {
        return new ServiceResult<T> {
            Status = ServiceResultStatus.Success,
            Data = data,
            Count = count
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
            ServiceResultStatus.Success =>
                result.Count != null
                    ? new OkObjectResult(new { data = result.Data, count = result.Count })
                    : new OkObjectResult(new { data = result.Data }),

            ServiceResultStatus.BadRequest => new BadRequestObjectResult(new { message = result.Message }),
            ServiceResultStatus.NotFound => new NotFoundObjectResult(new { message = result.Message }),
            ServiceResultStatus.Conflict => new ConflictObjectResult(new { message = result.Message }),
            ServiceResultStatus.Unauthorized => new UnauthorizedObjectResult(new { message = result.Message }),
            ServiceResultStatus.Forbidden => new ObjectResult(new { message = result.Message }) { StatusCode = 403 },
            _ => new BadRequestObjectResult(result.Message)
        };
    }
}