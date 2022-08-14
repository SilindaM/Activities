using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command:IRequest<Result<Unit>>
        {
        public Activity Activity {get;set;}    
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
        private readonly DataContext _context;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context,IUserAccessor userAccessor)
            {
             this._context = context;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var user=await _context.Users.FirstOrDefaultAsync(x=>x.UserName==userAccessor.GetUsername());
                

                //make the person who posted the activity to be the first attendee of the event
                var attendee=new ActivityAttendee{
                    AppUser=user,
                    Activity=request.Activity,
                    isHost=true
                };

                //add the attendee
                request.Activity.Attendees.Add(attendee);
                
                //here we dont save data we keep it in the memory
                _context.Activities.Add(request.Activity);
                //save the data
              var result=  await _context.SaveChangesAsync()>0;

              if(!result){
                return Result<Unit>.Failure("Failed to create activity");
              }
              return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}