using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Tasks.Domain;
using Tasks.Dtos;
using Tasks.Services;

namespace Tasks.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly IEmailsService emailsService;

        public TasksController(IEmailsService emailsService)
        {
            this.emailsService = emailsService;
        }

        [HttpPut("CheckEmailsThatAreNotInDb", Name = "CheckEmailsThatAreNotInDb")]
        public async Task<IEnumerable<string>> CheckEmailsThatAreNotInDb([FromBody]EmailsRequest request)
        {
            return await this.emailsService.GetEmailsThatAreNotInDb(request.Emails);
        }

        [HttpPost("emails", Name = "Add Emails")]
        public async Task AddEmailsToDb([FromBody] EmailsRequest request)
        {
            await this.emailsService.AddEmailsToDb(request.Emails);
        }

        [HttpGet("task2data", Name = "Task 2 data")]
        public async Task<IEnumerable<string>> GetTask2Data()
        {
            return Enumerable.Range(1, 100).Select(i =>
            {
                if (i % 3 == 0)
                {
                    return "Foo";
                }
                if (i % 5 == 0)
                {
                    return "Bar";
                }

                return i.ToString();
            });
        }



        [HttpPut("RearrangeArray", Name = "RearrangeArray")]
        public async Task<IEnumerable<string>> RearrangeArray([FromBody] RearrangeRequest request)
        {
            return request.Array.Skip(request.NewStartingIndex).Concat(request.Array.Take(request.NewStartingIndex));
        }
    }
}