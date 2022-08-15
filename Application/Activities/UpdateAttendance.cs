using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command:IRequest<Result<Unit>>{
            public Guid id {get;set;}
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly IUserAccessor userAccessor;
        private readonly DataContext context;
            public Handler(DataContext context,IUserAccessor userAccessor)
            {
            this.context = context;
            this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity=await context.Activities
                .Include(a=>a.Attendees)
                .ThenInclude(u=>u.AppUser)
                .FirstOrDefaultAsync(x=>x.Id==request.id);

                if(activity==null) return null;
                var user=await context.Users.FirstOrDefaultAsync(x=>x.UserName==userAccessor.GetUsername());

                var hostUsername=activity.Attendees.FirstOrDefault(x=>x.isHost)?.AppUser?.UserName;
                var attendance=activity.Attendees.FirstOrDefault(x=>x.AppUser.UserName==user.UserName);

                //check if the user is the host name
                if(attendance!=null && hostUsername==user.UserName){
                    activity.isCancelled=!activity.isCancelled;
                }
                //this is a normal attend they can cancel attendence
                if(attendance!=null && hostUsername!=user.UserName){
                    activity.Attendees.Remove(attendance);
                }
                //add new attendence
                if(attendance==null){
                    attendance=new ActivityAttendee{
                        AppUser=user,
                        Activity=activity,
                        isHost=false
                    };
                    activity.Attendees.Add(attendance);
                }
                var result=await context.SaveChangesAsync()>0;

                return result? Result<Unit>.Success(Unit.Value):Result<Unit>.Failure("Problem Updating Attendance");
            }
        }

    }
}