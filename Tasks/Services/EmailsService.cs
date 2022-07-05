using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Tasks.Domain;

namespace Tasks.Services
{
    public class EmailsService : IEmailsService
    {
        private const string EmailsTempTableName = "EmailsTemp";

        private readonly TasksDbContext tasksDbContext;

        public EmailsService(TasksDbContext tasksDbContext)
        {
            this.tasksDbContext = tasksDbContext;
        }

        public async Task AddEmailsToDb(string[] emails)
        {
            foreach (var email in emails)
            {
                tasksDbContext.EmailRecords.Add(new EmailRecord
                {
                    Email = email,
                });
            }

            await this.tasksDbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<string>> GetEmailsThatAreNotInDb(string[] emails)
        {
            List<string> result = new List<string>();
            SqlConnection dbConnection = (SqlConnection)this.tasksDbContext.Database.GetDbConnection();
            await dbConnection.OpenAsync();

            await MakeTable(emails, dbConnection);

            using (var command = dbConnection.CreateCommand())
            {
                command.CommandText = @"
                    SELECT DISTINCT e.email 
                    FROM ##" + EmailsTempTableName + @" e
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

        private async Task MakeTable(string[] emails, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("CREATE TABLE ##" + EmailsTempTableName + " (email nvarchar(100))", connection);
            cmd.ExecuteNonQuery();

            DataTable localTempTable = new DataTable(EmailsTempTableName);

            DataColumn email = new DataColumn();
            email.DataType = typeof(string);
            email.ColumnName = "email";
            localTempTable.Columns.Add(email);

            foreach (var item in emails)
            {
                DataRow row = localTempTable.NewRow();
                row[0] = item;
                localTempTable.Rows.Add(row);
            }

            localTempTable.AcceptChanges();

            using (SqlBulkCopy bulkCopy = new SqlBulkCopy(connection))
            {
                bulkCopy.DestinationTableName = "##" + EmailsTempTableName;
                await bulkCopy.WriteToServerAsync(localTempTable);
            }
        }
    }
}
