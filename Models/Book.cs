using System.ComponentModel.DataAnnotations;

public record Book {
    [Key]
    public int BookID { get; set; }
    
    [StringLength(60, MinimumLength = 3)]
    [Required]
    public string ? Title { get; set; }
    
    [StringLength(15, MinimumLength = 3)]
    [Required]
    public string ? Author { get; set; }
    
    [Required]
    public int PublishedYear { get; set; }
    
    [StringLength(25, MinimumLength = 3)]
    [Required]
    public string ? Category { get; set; }

    public Book(string title, string author, int publishedYear, string category) {
        Title = title;
        Author = author;
        PublishedYear = publishedYear;
        Category = category;
    }
}