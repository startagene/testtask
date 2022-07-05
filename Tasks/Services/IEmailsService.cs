namespace Tasks.Services
{
    public interface IEmailsService
    {
        Task<IEnumerable<string>> GetEmailsThatAreNotInDb(string[] emails);

        Task AddEmailsToDb(string[] emails);
    }
}
