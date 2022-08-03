using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command:IRequest<Result<Unit>>{
            public Guid id;
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //track in memory
                var activity=await context.Activities.FindAsync(request.id);
                if(activity==null){
                    return null;
                }
                //delete in database
                context.Remove(activity);
                var result= await context.SaveChangesAsync()>0;

                if(!result) {
                    return Result<Unit>.Failure("Failed to delete the activity");
                }
                else{
                    return Result<Unit>.Success(Unit.Value);
                }
             
            }
        }
    }
}