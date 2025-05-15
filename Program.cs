using BookStore.DB;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Book API", Description = "keep track of your books", Version = "v1" });
});

var app = builder.Build();

if(app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI(c => {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Book API V1");
    });
}

app.UseStaticFiles();

app.MapGet("/", () => "Hello World!");
app.MapGet("/books", () => BookDB.GetBooks());
app.MapGet("/books/{id}", (int id) => BookDB.GetBook(id));
app.MapPost("/books", (Book book) => BookDB.CreateBook(book));
app.MapPut("/books", (Book book) => BookDB.UpdateBook(book));
app.MapDelete("/books/{id}", (int id) => BookDB.DeleteBook(id));

app.Run();
