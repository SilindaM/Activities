using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        public AccountController(UserManager<AppUser> userManager,SignInManager<AppUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;

        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>>Login(LoginDto loginDto){

            var user=await userManager.FindByEmailAsync(loginDto.Email);
            if(user==null) return Unauthorized();

            var result=await signInManager.CheckPasswordSignInAsync(user,loginDto.Password,false);
            if(result.Succeeded){
                return new UserDto{
                    DisplayName=user.DisplayName,
                    Image=null,
                    Token="token",
                    Username=user.UserName
                };
            }
            return Unauthorized();


        }
    }
}