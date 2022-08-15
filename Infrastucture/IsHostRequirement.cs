using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastucture
{
    public class IsHostRequirement:IAuthorizationRequirement
    {
        
    }
    public class IsHostRequirementHandle : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext dbContent;
        private readonly IHttpContextAccessor httpContextAccessor;

        public IsHostRequirementHandle(DataContext dbContent,IHttpContextAccessor httpContextAccessor)
        {
            this.dbContent = dbContent;
            this.httpContextAccessor = httpContextAccessor;
        }

        //check if the user is the owner of an event
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId=context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(userId==null) return Task.CompletedTask;

            var activityId=Guid.Parse(httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x=>x.Key=="id").Value?.ToString());

            var attendee=dbContent.ActivityAttendees
             .AsNoTracking()
            .SingleOrDefaultAsync(x=>x.AppUserId==userId &&x.ActivityId==activityId).Result;
            
            if(attendee==null) return Task.CompletedTask;

            if(attendee.isHost) context.Succeed(requirement);
            return Task.CompletedTask;

                    }
    }
}
