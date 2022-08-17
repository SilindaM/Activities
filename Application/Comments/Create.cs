using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command:IRequest<Result<CommentDto>>{
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
            
        }
        public class CommandValidator:AbstractValidator<Command>{
            public CommandValidator(){
                RuleFor(x=>x.Body).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
        private readonly DataContext context;
            private readonly IUserAccessor accessor;
        private readonly IMapper mapper;

            public Handler(DataContext context,IMapper mapper,IUserAccessor accessor)
            {
            this.mapper = mapper;
                 this.context = context;
                this.accessor = accessor;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity=await context.Activities.FindAsync(request.ActivityId);
                if(activity==null) return null;

                var user=await context.Users
                .Include(p=>p.Photos)
                .SingleOrDefaultAsync(x=>x.UserName==accessor.GetUsername());


                var comment=new Comment{
                        Author=user,
                        Activity=activity,
                        Body=request.Body
                };
                activity.Comments.Add(comment);

                var success=await context.SaveChangesAsync()>0;

                if(success) return Result<CommentDto>.Success(mapper.Map<CommentDto>(comment));
                return Result<CommentDto>.Failure("Failed To Comment");
            }
        }
    }
}