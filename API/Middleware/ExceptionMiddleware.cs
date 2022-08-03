using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        public ILogger<ExceptionMiddleware> _logger { get; }
        public IHostEnvironment _env { get; }
        public ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware> logger,IHostEnvironment env)
        {
            this._env = env;
            this._logger = logger;
            this._next = next;
        }
        public async Task InvokeAsync(HttpContext httpContext){
            try{
                    await _next(httpContext);
            }catch(Exception ex){
                _logger.LogError(ex,ex.Message);
                httpContext.Response.ContentType="application/json";
                httpContext.Response.StatusCode=(int)HttpStatusCode.InternalServerError;

                var response=_env.IsDevelopment()
                    ?new AppException(httpContext.Response.StatusCode,ex.Message,ex.StackTrace?.ToString())
                    :new AppException(httpContext.Response.StatusCode,"Server Error");
                
                var options=new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};

                var json=JsonSerializer.Serialize(response,options);
                await httpContext.Response.WriteAsync(json);
            }
        }
    }
}