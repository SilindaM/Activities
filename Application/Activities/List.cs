using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query: IRequest<Result<List<ActivityDto>>>{}

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
        private readonly DataContext _context;
        private readonly IMapper mapper;
        private readonly IUserAccessor accessor;

            public Handler(DataContext context,IMapper mapper,IUserAccessor accessor)
            {
            this.accessor = accessor;
                this.mapper = mapper;
                this._context = context;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities=await _context.Activities
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider,new {currentUsername=accessor.GetUsername()})
                .ToListAsync(cancellationToken);
               
                 return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}