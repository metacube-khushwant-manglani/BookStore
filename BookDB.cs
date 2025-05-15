namespace BookStore.DB {
    public class BookDB {
        public static List<Book> GetBooks() {
            BookDBContext dbContext = new BookDBContext(); 
            return dbContext.Books.ToList();
        }

        public static Book GetBook(int id) {
            BookDBContext dbContext = new BookDBContext(); 
            
            Book book = dbContext.Books.FirstOrDefault((book) => book.BookID == id)!;

            if(book != null) {
                return book;
            } else {
                throw new Exception($"Book with id - {id} not found while getting the book");
            }
        }

        public static List<Book> CreateBook(Book book) {
            BookDBContext dbContext = new BookDBContext(); 
            dbContext.Books.Add(book);
            dbContext.SaveChanges();
            return dbContext.Books.ToList();
        }

        public static Book UpdateBook(Book book) {
            try
            {
                BookDBContext dbContext = new BookDBContext(); 

                Book currentBook = dbContext.Books.FirstOrDefault((currBook) => currBook.BookID == book.BookID)!;

                if(currentBook != null) {
                    currentBook.Title = book.Title;
                    currentBook.Author = book.Author;
                    currentBook.PublishedYear = book.PublishedYear;
                    currentBook.Category = book.Category;

                    dbContext.SaveChanges();

                    return currentBook;
                } else {
                    throw new Exception($"Book with id - {book.BookID} not found while updating the book");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error occurred while updating the book : " + e.Message);
                throw e;
            }
        }

        public static Book DeleteBook(int id) {
            BookDBContext dbContext = new BookDBContext(); 

            Book book = dbContext.Books.FirstOrDefault((book) => book.BookID == id)!;

            if(book != null) {
                dbContext.Books.Remove(book);
                dbContext.SaveChanges();
                return book;
            } else {
                throw new Exception($"Book with id - {id} not found while deleting the book");
            }
        }
    }
}