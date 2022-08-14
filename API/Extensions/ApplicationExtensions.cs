using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Infrastucture.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationExtensions
    {
        public static IServiceCollection  AddApplicationServices(this IServiceCollection services,IConfiguration configuration){

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
            services.AddDbContext<DataContext>(opt=>{
                opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });

            //add CORS POLICY
            services.AddCors(opt=>{
                opt.AddPolicy("CorsPolicy",policy=>
                {
                    policy.AllowAnyMethod()
                    .AllowAnyHeader().
                    WithOrigins("http://localhost:3000");
                });
            });
            
            services.AddMediatR(typeof(List.Handler).Assembly); 
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddScoped<IUserAccessor,UserAccessor>();
            return services;

        }
    }
}