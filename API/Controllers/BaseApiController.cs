using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseApiController:ControllerBase
    {
      private IMediator _mediator;

      protected IMediator Mediator=>_mediator??= HttpContext.RequestServices.GetService<IMediator>();

      protected ActionResult HandleResult<T>(Result<T> result){
          if(result.isSuccess && result.Value!=null){
                return Ok(result.Value);
            }
            else if(result.isSuccess && result.Value==null){
                    return NotFound();
            }
            else if(result==null){
                return NotFound();
            }
            else{
                return BadRequest(result.Error);
            }
      }
    }
}