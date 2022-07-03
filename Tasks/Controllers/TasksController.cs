using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Tasks.Domain;
using Tasks.Dtos;

namespace Tasks.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {

        private readonly ILogger<TasksController> _logger;
        private readonly TasksDbContext tasksDbContext;

        public TasksController(ILogger<TasksController> logger, TasksDbContext tasksDbContext)
        {
            _logger = logger;
            this.tasksDbContext = tasksDbContext;
        }

        [HttpPut("CheckEmailsThatAreNotInDb", Name = "CheckEmailsThatAreNotInDb")]
        public async Task<IEnumerable<string>> CheckEmailsThatAreNotInDb([FromBody]EmailsRequest request)
        {
            List<string> result = new List<string>();
            await tasksDbContext.Database.GetDbConnection().OpenAsync();

            using (var command = tasksDbContext.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = @"
                    SELECT e.email 
                    FROM 
                    (
                      VALUES" + string.Join(',', request.Emails.Where(s => !string.IsNullOrWhiteSpace(s)).Select(e => "('" + e + "')")) + @"
                    ) AS e(email)
                    EXCEPT
                    SELECT Email FROM dbo." + nameof(tasksDbContext.EmailRecords) + ";";
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        result.Add((string)reader.GetValue(0));
                    }
                }
            }

            return result;
        }



        [HttpPost("emails", Name = "Add Emails")]
        public async Task AddEmailsToDb([FromBody] EmailsRequest request)
        {
            request.Emails.ForEach(email =>
            {
                tasksDbContext.EmailRecords.Add(new EmailRecord
                {
                    Email = email,
                });
            });

            await tasksDbContext.SaveChangesAsync();
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