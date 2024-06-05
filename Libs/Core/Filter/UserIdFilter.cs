using Core.Extensions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;

namespace Core.Filter
{

    public class UserIdFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (context.HttpContext.Request.Headers.TryGetValue("Authorization", out StringValues authHeader))
            {
                var token = authHeader.FirstOrDefault().ParseJWT();
                var userId = token.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

                if (Guid.TryParse(userId, out Guid userGuid))
                {
                    context.HttpContext.Items["UserId"] = userGuid;
                }
            }

            await next();
        }
    }
}
