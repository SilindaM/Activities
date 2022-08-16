using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command:IRequest<Result<Photo>>
        {
            public IFormFile File {get;set;
        }
            public class Handler : IRequestHandler<Command, Result<Photo>>
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
                public async Task <Result<Photo>>Handle(Command request,CancellationToken cancellationToken){
                    var user=await dataContext.Users.Include(p=>p.Photos)
                    .FirstOrDefaultAsync(x=>x.UserName==userAccessor.GetUsername());

                    if(user==null) return null;
                    var photoUploadResult=await photoAccessor.AddPhoto(request.File);

                    var photo=new Photo{
                        Url=photoUploadResult.Url,
                        Id=photoUploadResult.PublicId
                    };
                    //check if there photo,if not make it main photo
                    if(!user.Photos.Any(x=>x.IsMain)) photo.IsMain=true;

                    user.Photos.Add(photo);

                    var result =await dataContext.SaveChangesAsync()>0;
                
                    if(result) return Result<Photo>.Success(photo);
                    
                    return Result<Photo>.Failure("Problem add photo");
                }
            }
        }
    }
}