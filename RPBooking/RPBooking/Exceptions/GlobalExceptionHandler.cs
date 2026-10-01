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
                NotFoundException => (
                    StatusCodes.Status404NotFound,
                    "Resource Not Found",
                    "Requested Resource Does Not Exist."
                ),

                UnauthorizedAccessException => (
                    StatusCodes.Status403Forbidden,
                    "Forbidden",
                    "Access Denied."
                ),

                _ => (
                    StatusCodes.Status500InternalServerError,
                    "Server Error",
                    "Unknown Error."
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
