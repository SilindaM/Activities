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
        public class Query: IRequest<Result<PagedList<ActivityDto>>>{
            public ActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
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

            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query= _context.Activities
                .Where(d=>d.Date>=request.Params.StartDate)
                    .OrderBy(d=>d.Date)
                    .ProjectTo<ActivityDto>(mapper.ConfigurationProvider,
                        new {currentUsername=accessor.GetUsername()})
                    .AsQueryable();

                if(request.Params.isGoing && !request.Params.isHost){
                    query=query.Where(x=>x.Attendees.Any(a=>a.Username==accessor.GetUsername()));
                }
                if(request.Params.isHost && request.Params.isGoing){
                    query=query.Where(x=>x.HostUsername==accessor.GetUsername());
                }
               
                 return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>.CreateAsync(query,request.Params.pageNumber,request.Params.PageSize)
                 );
            }
        }
    }
}