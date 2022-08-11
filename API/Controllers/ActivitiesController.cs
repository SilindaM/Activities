using Domain;
using Application.Activities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult( await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { id = id }));
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return  HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { id = id }));
        }

    }
}