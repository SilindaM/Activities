using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command:IRequest
        {
        public Activity Activity {get;set;}    
        }
        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //here we dont save data we keep it in the memory
                _context.Activities.Add(request.Activity);
                //save the data
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}