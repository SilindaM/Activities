using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command:IRequest{
            public Guid id;
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //track in memory
                var activity=await context.Activities.FindAsync(request.id);
                //delete in database
                context.Remove(activity);
                return Unit.Value;
            }
        }
    }
}