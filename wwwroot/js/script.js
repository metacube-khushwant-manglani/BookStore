$(document).ready(function () {
            
    var tableBooks = $("#tableBooks");
    
    // GET The books
    $.ajax({
        type: 'GET',
        url: "/books",
        dataType: 'json',
        success: function (data) {
            let updateBookId;

            $.each(data, function(index, val) {
                const trBook = document.createElement('tr');

                $(trBook)
                    .append(`<td> ${val.bookID} </td>`)
                    .append(`<td> ${val.title} </td>`)
                    .append(`<td> ${val.author} </td>`)
                    .append(`<td> ${val.publishedYear} </td>`)
                    .append(`<td> ${val.category} </td>`)
                    .append("<td><button class='text-white btn btn-warning' data-bs-toggle='modal' data-bs-target='#updateModal'>Update</button></td>")
                    .append("<td><button class='btn btn-danger'>Delete</button></td>")
                    .click(function () {

                        $("body").children().last()
                            .attr("id", `tableRowBook${val.bookID}`)

                        $("body")
                            .append("<button class='d-none' data-bs-toggle='modal'></button>")
                        
                        $("body").children().last()
                            .attr("data-bs-target", `#tableRowBook${val.bookID}`);

                        $('#getTitle')
                            .val(val.title);
                        
                        $('#getAuthor')
                            .val(val.author);
                        
                        $('#getPublishedYear')
                            .val(val.publishedYear);
                        
                        $('#getCategory')
                            .val(val.category);

                        $("body").children().last()
                            .trigger("click");
                    });
            
                var updateTd = $(trBook).children()[5];
                var updateButton = $(updateTd).children()[0];
                    
                $(updateButton)
                    .click(function () {
                        updateBookId = val.bookID;
                        $("#updateTitle")
                            .val(val.title);
                        $("#updateAuthor")
                            .val(val.author);
                        $("#updatePublishedYear")
                            .val(val.publishedYear);
                        $("#updateCategory")
                            .val(val.category);
                    });
                
                var deleteTd = $(trBook).children()[6];
                var deleteButton = $(deleteTd).children()[0];

                $(deleteButton)
                    .click(function () {    
                        // now we use ajax to Delete the book
                        $.ajax({
                            type: "DELETE",
                            url: `/books/${val.bookID}`,
                            contentType: "application/json",
                            data: JSON.stringify(val.bookID),
                            success: function (result) {
                                location.reload(true);
                            },
                            error: function (xhr, status, error) {
                                console.log("Error :-- " + xhr.responseText);
                            } 
                        });                           
                    });

                tableBooks.append(trBook);
            });
            
            $("#saveUpdate")
                .click(function () {

                    const updatedBook = {
                        bookID: updateBookId,
                        Title: $("#updateTitle").val(),
                        Author: $("#updateAuthor").val(),
                        PublishedYear: $("#updatePublishedYear").val(),
                        Category: $("#updateCategory").val()
                    };

                    // now we use ajax to Update the book 
                    $.ajax({
                        type: "PUT",
                        url: "/books",
                        contentType: "application/json",
                        data: JSON.stringify(updatedBook),
                        success: function (result) {
                            // result contains the updated book
                            location.reload(true);
                        },
                        error: function (xhr, status, error) {
                            console.log("Error :-- " + xhr.responseText);
                        } 
                    })  
                })
                .attr("data-bs-dismiss", "modal");
        }
    });

    $("#saveCreate")
        .click(function () {
            
            const createBook = {
                Title: $("#createTitle").val(),
                Author: $("#createAuthor").val(),
                PublishedYear: $("#createPublishedYear").val(),
                Category: $("#createCategory").val()
            };

            // now we use ajax to Create the book
            $.ajax({
                type: "POST",
                url: "/books",
                contentType: "application/json",
                data: JSON.stringify(createBook),
                success: function (result) {
                    // result contains the created book
                    location.reload(true);
                },
                error: function (xhr, status, error) {
                    console.log("Error :-- " + xhr.responseText);
                } 
            })
        })

    $("body").append(`
        <div class='modal fade' id='tableRowBook' tabindex='-1' aria-labelledby='tableRowBookModalLabel' aria-hidden='true'>
            <div class='modal-dialog modal-dialog-centered'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 class='modal-title' id='tableRowBookModalLabel'>Book</h5>
                        <button type='button' class='close-modal btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div class='modal-body'>
                        <form class='d-flex flex-column gap-2' action=''>
                            <div class='form-group'>
                                <label for='getTitle'>Title : </label>
                                <input id='getTitle' class='form-control' type='text' disabled />
                            </div>
                            <div class='form-group'>
                                <label for='getAuthor'>Author : </label>
                                <input id='getAuthor' class='form-control' type='text' disabled />
                            </div>
                            <div class='form-group'>
                                <label for='getPublishedYear'>Published Year : </label>
                                <input id='getPublishedYear' class='form-control' type='number' disabled />
                            </div>
                            <div class='form-group'>
                                <label for='getCategory'>Category : </label>
                                <input id='getCategory' class='form-control' type='text' disabled />
                            </div>
                        </form>
                    </div>
                    <div class='modal-footer'>
                        <button type='button' class='close-modal btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                    </div>
                </div>
            </div>
        </div>
    `);
        
    $(".close-modal")
        .click(function () {
            location.reload(true);
        })
    
});