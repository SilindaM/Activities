using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command :IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext dataContext;
            private readonly IPhotoAccessor photoAccessor;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext dataContext,IPhotoAccessor photoAccessor,IUserAccessor userAccessor)
            {
                this.dataContext = dataContext;
                this.photoAccessor = photoAccessor;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user=await dataContext.Users.Include(p=>p.Photos)
                .FirstOrDefaultAsync(x=>x.UserName==userAccessor.GetUsername());

                if(user==null) return null;

                var photo=user.Photos.FirstOrDefault(x=>x.Id==request.Id);

                if(photo.IsMain) return Result<Unit>.Failure("You cannot delete main photo");

                var result=await photoAccessor.DeletePhoto(photo.Id);

                if(result==null) return Result<Unit>.Failure("Problem dekete from cloudinary");

                user.Photos.Remove(photo);

                var success=await dataContext.SaveChangesAsync()>0;

                if(success) return Result<Unit>.Success(Unit.Value);
                 return Result<Unit>.Failure("Problem delete photo from api");
            }
        }
    }
}