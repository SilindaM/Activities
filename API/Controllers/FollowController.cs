using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Followers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController:BaseApiController
    {
        
        [HttpPost("{username}")]
        public async Task<IActionResult>Follow(string username)
        {
           return HandleResult(await Mediator.Send(new FollowToggle.Command{TargetUsername=username}));
        }
        
    }
}