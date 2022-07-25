using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query: IRequest<List<Activity>>{}

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
        private readonly DataContext _context;

            public Handler(DataContext context)
            {
            this._context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                try{
                    for(var i=0;i<10;i++){
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(100,cancellationToken);
                    }
                }
                catch (Exception ex) when (ex is TaskCanceledException)
                {

                }
                return await _context.Activities.ToListAsync();
            }
        }
    }
}