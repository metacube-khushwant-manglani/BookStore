using Microsoft.EntityFrameworkCore;

namespace BookStore
{
    public class BookDBContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        //public readonly string connectionString = "Server=KHUSHWANT-MANGL\\SQLEXPRESS;" +
        //                                          "Database=LibraryDB;" +
        //                                          "Trusted_Connection=True;TrustServerCertificate=True;" +
        //                                          "Connection Timeout=30;" +
        //                                          "Encrypt=True;";

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfiguration config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .AddEnvironmentVariables()
            .Build();


            IConfigurationSection section = config.GetSection("ConnectionStrings");

            var connectionString = section["DefaultConnection"];

            // System.Diagnostics.Debug.WriteLine(connectionString);

            optionsBuilder.UseSqlServer(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Book>().ToTable(table => table.HasTrigger("TiggerName"));
        }
    }
}