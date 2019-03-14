// create variable for initial array and for new array
$(document).ready(function(){
    var fruites = ["Apple", "Watermelon", "Banana", "Orange"];
    topics = "";
    
    // function to get the gif and the rating by using AJAX method 
    $(document).on('click', 'button',  function() {
        $('#topics').empty(); 
        var newButton = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newButton + "&api_key=uv8SEMioC9HC4ZqiilX6SX3V8JWJr7je&limit=10&rating=g";
        console.log(queryURL);
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .then(function(response){
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var divGif = $('<div class="item">');
                var rating = results[i].rating;
                var textRating = $('<p>').text("Rating: " + rating);
                var images = $('<img>');
    
                images.attr('src',results[i].images.fixed_height_still.url).attr('data-still',results[i].images.fixed_height_still.url).attr('data-animate',results[i].images.fixed_height.url).attr('data-state',"still").addClass("playPause");
                divGif.append(textRating).append(images);
    
                $('#topics').prepend(divGif);
    
            }
        });
    });
    
    // create function to pause and play the gif
    $(document).on('click', '.playPause',  function() {
        var state = $(this).data("state");
        if (state == "still") {
            $(this).attr('src', $(this).data('animate')).data('state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still')).data('state', 'still');   
        }
    });
    
    // create function to render buttons
    function renderButtons() {
        $("#renButtons").empty();
        for (var i = 0; i < fruites.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("fruite");
            newButton.attr("data-name", fruites[i]);
            newButton.text(fruites[i]);
            $("#renButtons").append(newButton);
        }
    }
    
    // create buttons for initial array
    renderButtons();
    
    // create function to add new array and add them into new buttons
    $("#add-fruite").on('click', function() {
        event.preventDefault();
        var fruite = $("#fruite-input").val().trim();
        fruites.push(fruite);
        renderButtons();
    });
    
    });
    