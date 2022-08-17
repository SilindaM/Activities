using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Services;
using Domain;
using Infrastucture;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,IConfiguration configuration){
            services.AddIdentityCore<AppUser>(opt=>{
                opt.Password.RequireNonAlphanumeric=false;
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>();

            var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt=>{
                opt.TokenValidationParameters=new Microsoft.IdentityModel.Tokens.TokenValidationParameters{
                    ValidateIssuerSigningKey=true,
                    IssuerSigningKey=key,
                    ValidateIssuer=false,
                    ValidateAudience=false
                };
                opt.Events=new JwtBearerEvents{
                    OnMessageReceived=context=>{
                        var accessToken=context.Request.Query["access_token"];
                        var path=context.HttpContext.Request.Path;

                        if(!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chats"))){
                            context.Token=accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });
            services.AddAuthorization(opt=>{
                opt.AddPolicy("IsActivityHost",policy=>{
                    policy.Requirements.Add(new IsHostRequirement());

                });
            });
            services.AddTransient<IAuthorizationHandler,IsHostRequirementHandle>();
            services.AddScoped<TokenService>();

            return services;
        }
    }
}