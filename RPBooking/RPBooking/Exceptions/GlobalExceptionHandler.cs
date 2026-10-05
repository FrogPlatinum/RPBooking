using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace RPBooking.Exceptions
{
    public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            logger.LogError(exception, "Error captured: {Messsage}", exception.Message);

            var (statusCode, title, detail) = exception switch
            {
                //400
                BadRequestException => (
                    StatusCodes.Status400BadRequest,
                    "Bad Request",
                    "Syntax or Business rule violation."
                ),
                //401
                UnauthorizedException => (
                    StatusCodes.Status401Unauthorized,
                    "Unauthorized",
                    "User must be logged in."
                ),
                //403
                UnauthorizedAccessException => (
                    StatusCodes.Status403Forbidden,
                    "Forbidden",
                    "User does not have permission."
                ),
                //404
                NotFoundException => (
                    StatusCodes.Status404NotFound,
                    "Resource Not Found",
                    "Requested resource does not exist."
                ),
                //409
                ConflictException =>(
                    StatusCodes.Status409Conflict,
                    "Conflict",
                    "Resource already exists, or is not in a viable state."
                ),
                //422
                UnprocessableEntityException =>(
                    StatusCodes.Status422UnprocessableEntity,
                    "Unprocessable Entity",
                    "Validation failed"
                ),
                //500
                _ => (
                    StatusCodes.Status500InternalServerError,
                    "Server Error",
                    "Unexpected server error."
                )
            };

            httpContext.Response.StatusCode = statusCode;

            var problemDetails = new ProblemDetails
            {
                Status = statusCode,
                Title = title,
                Detail = detail,
                Instance = httpContext.Request.Path
            };

            await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
            return true;
        }
    }
}
