//======================================================GLOBAL VARIABLES================================================//
//create an initial array of characters for the button
var initialCharacterArray = [
    "spiderman",
    "thor",
    "wonderwoman",
    "iron man",
    "superman",
    "black panther",
    "captain america",
    "Thanos",
    "deadpool",
    "snape",
    "morty",
    "rick sanchez",
    "terminator",
    "black widow",
    "the mask",
    "mr bean",
    "ted",
    "garfield",
    "cookie monster",
    "elmo",
    "big bird",
    "ernie",
    "bart simpson",
    "homer simpson",
    "lisa simpsons",
    "minions",
    "grizzly",
    "ice bear",
]
//create an empty array to save the array pulled from the local storage
var CharacterArray = [];
var FavoriteArray = [];

//create an variable to save the data object
var gifArray = [];

//create an variable to save the name of the character that the user clicked
var character = "";

//create a counter for the offset of the api
var offsetCounter = 0;


$(document).ready(function () {
//==================================================INITIAL PREPERATION==============================================//   
    function initial() {
        //-----------------------------------------display tag buttons------------------------------------
        //if the local storage has no key named CharacterArray
        if (localStorage.getItem("CharacterArray") === null) {
            //save the initial character array in local storage
            localStorage.setItem("CharacterArray", JSON.stringify(initialCharacterArray))
            CharacterArray = JSON.parse(localStorage.getItem("CharacterArray"))
        } else {
            //else save the character array get fromt he local storage into CharacterArray
            CharacterArray = JSON.parse(localStorage.getItem("CharacterArray"))
        }
        //create a loop to display the characters as buttons on the screen
        for (let i in CharacterArray) {
            //create li tag to set the button in a list and change the id of the li to the name of the charactrer
            var liTag = $("<li>").attr("id", CharacterArray[i])
            //create buttonTag variable to same new button tag
            //change the text of the button into the name of the character in the array
            var buttonTag = $("<button>").text(CharacterArray[i])
            //append the buttonTag to liTag
            liTag.append(buttonTag)
            //append the liTag to #trendy
            $("#trendy").append(liTag)
        }

        //-----------------------------------------display favorite tags------------------------------------
        FavoriteArray = JSON.parse(localStorage.getItem("FavoriteArray"))
        //create a loop to display the characters in favorite list as buttons on the screen
        for (let i in FavoriteArray) {
            //create li tag to set the button in a list and change the id of the li to the name of the charactrer
            var liTag = $("<li>").attr("id", FavoriteArray[i])
            //create buttonTag variable to same new button tag
            //change the text of the button into the name of the character in the array
            var buttonTag = $("<button>").text(FavoriteArray[i])
            //append the buttonTag to liTag
            liTag.append(buttonTag)
            //append the liTag to #favorite
            $("#favorites").append(liTag)
        }
    }



//===================================================CLICK HANDLERS===================================================//   

    //-----------------------------------------tag buttons click ------------------------------------------
    //clickhandlers for the buttons
    //grab the text in the button and save in the character variable
    $("#button-container").on("click", "button", function () {
        offsetCounter = 0;
        character = $(this).text();
        //make request to Giphy API
        //queryURL for Giphy API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="
            + character + "&api_key=9xw151vAJTX9tO7mQBCWYKh8skjZ7bEm&limit=10&offset=" + offsetCounter;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            //clear up the screen
            $(".item").remove()
            //create a variable gifArray to save the response's gifs
            gifArray = response.data
            //call the display function 
            display()

        })
    })

    //-----------------------------------------add buttons------------------------------------------
    //clickhandlers for the add button
    $("#add").on("click", function () {
        //grab the input string (val)
        var addInput = $("#addInput").val().trim();
        //save the new character into the array
        CharacterArray.push(addInput);
        //sav the new array into local storage
        localStorage.setItem("CharacterArray", JSON.stringify(CharacterArray));
        //populate it as an button in list into the button-container
        //create li tag to set the button in a list and change the id of the li to the name of the charactrer
        var liTag = $("<li>").attr("id", addInput);
        //create buttonTag variable to same new button tag
        //change the text of the button into the name of the character in the array
        var addButtonTag = $("<button>").text(addInput);
        //append the buttonTag to liTag
        liTag.append(addButtonTag);
        //append the liTag to #trendy
        $("#trendy").append(liTag);
    })


    //-----------------------------------------load more click------------------------------------------
    //create a click handler for the loading item
    $(".grid").on("click", ".load", function () {
        //make request to Giphy API
        //queryURL for Giphy API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="
            + character + "&api_key=9xw151vAJTX9tO7mQBCWYKh8skjZ7bEm&limit=10&offset=" + offsetCounter;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //clear up the screen
            //create a variable gifArray to save the response's gifs
            gifArray = response.data
            //call the display function 
            display()
            //remove the load item 
            $("#loaditem").remove();
        });
    });

    //---------------------------------------------gifs click---------------------------------------------------
    //animate the gif when click
    $(".grid").on("click", ".gif", function () {
        //make a variable named state and then store the image's data-state into it.
        var state = $(this).attr("data-state")
        // Check if the variable state is equal to 'still',
        if (state === "still") {

            // then update the src attribute of this image to it's data-animate value,
            $(this).attr("src", $(this).attr("data-animate"))
            // and update the data-state attribute to 'animate'.
            $(this).attr("data-state", "animate")
        }
        // If state is equal to 'animate', then update the src attribute of this
        if (state === "animate") {
            // image to it's data-still value 
            $(this).attr("src", $(this).attr("data-still"));
            //and update the data-state attribute to 'still'
            $(this).attr("data-state", "still")
        }
    });

//========================================================FUNCTIONS=================================================//   

    //-----------------------------------------display gifs and stuff ------------------------------------------
    function display() {
        //increase the offsetCounter to set the the next request from result +10 on
        offsetCounter = offsetCounter + 10;
        //run a loop to display all the gif info in the array
        for (let i = 0; i < gifArray.length; i++) {
            //create a new div and set the class as item
            var itemTag = $("<div>").addClass("item");
            //gif----------------------------------------------------------------
            //create a new img div and set the class as gif
            var imgTag = $("<img>").addClass("gif");
            //save the sill and animate gif in variables
            var gifStill = gifArray[i].images.original_still.url;
            var gifAnimate = gifArray[i].images.original.url;
            //save the still image url as the src of the img div
            imgTag.attr("src", gifStill);
            //save the still image url in a data-still attribute
            imgTag.attr("data-still", gifStill);
            // save the animate image url in a data-animate attribute
            imgTag.attr("data-animate", gifAnimate);
            // create a attribute data state and set it as still
            imgTag.attr("data-state", "still");

            //title----------------------------------------------------------------
            //create new div and set class as title
            var titleTag = $("<div>").addClass("title");
            // change the text of the title div to the title in the response
            titleTag.text(gifArray[i].title);
            //hint----------------------------------------------------------------
            //create new div and set class as hint
            var hintTag = $("<div>").addClass("hint");
            // change the text of the rating div to the rating in the response
            hintTag.text("Click to move 👆");

            //rating----------------------------------------------------------------
            //create new div and set class as rating
            var ratingTag = $("<div>").addClass("rating");
            // change the text of the rating div to the rating in the response
            ratingTag.text("Rating: " + gifArray[i].rating);

            //url----------------------------------------------------------------
            //create new button and set class as url
            var urlTag = $("<button>").addClass("url")
            // set the text of the rating div to the rating in the response
            urlTag.text("Giphy Link")
            urlTag.attr("onclick", 'window.location.href="' + gifArray[i].url + '"')

            //download----------------------------------------------------------------
            //create new button and set class as download
            var downloadTag = $("<button>")
            // set the text of the rating div to the rating in the response
            downloadTag.html("Download")
            downloadTag.attr("onclick", 'window.location.href="' + gifAnimate + '"')
            // downloadTag.attr("href", gifAnimate)
            downloadTag.attr("download", "")

            //append-------------------------------------------------------------------
            //append the img, rating and titile div to item
            itemTag.append(titleTag, imgTag, hintTag, ratingTag, urlTag, downloadTag)
            //append item to .grid
            $(".grid").append(itemTag)
            //Span the item if it's too big-----------------------------------------------
            //if the height of the gif is bigger than 250px, span the gif to more row
            var imgHeight = gifArray[i].images.original.height
            var imgWidth = gifArray[i].images.original.width
            var imgDisplayHeight = imgHeight * 275 / imgWidth
            if (($(".rating").height() + $(".title").height() + imgDisplayHeight + 40) > 320) {
                itemTag.css("grid-row-end", "span 2")
            }
        }
        //load more------------------------------------------------------------------------
        //set the loading img to the screen after all the gifs as a click handler
        //create a new div and set the class as item
        var loadItemTag = $("<div>").addClass("item");
        loadItemTag.attr("id", "loaditem")
        //create a new img div and set the class as gif
        var loadImgTag = $("<img>").addClass("load");
        //save the still image url as the src of the img div
        loadImgTag.attr("src", "assets/images/CommunityLoading.gif");
        //append the loadImgTag to loadItemTag
        loadItemTag.append(loadImgTag);
        //append loadItemTag to .grid
        $(".grid").append(loadItemTag);
    }

    //------------------------------------------drag & drop & save favorite tags--------------------------------------------
    $(function () {
        //create a function that make the trendy and favorite list mutual draggable
        $("#trendy, #favorites").sortable({
            //handler of the sorting is the button
            handle: 'button',
            cancel: '',
            connectWith: ".connectedSortable",
            //save the changed lists of the tags into arrays and update the arrays to local storage
            update: function (event, ui) {
                var changedList = this.id;
                var order = $(this).sortable('toArray');
                var newArray = {
                    id: changedList,
                    order: order,
                }
                localStorage.setItem("FavoriteArray", JSON.stringify(newArray.order))

            },
            stop: function (event, ui) {
                var changedList = this.id;
                var order = $(this).sortable('toArray');
                var originalArray = {
                    id: changedList,
                    order: order,
                }
                localStorage.setItem("CharacterArray", JSON.stringify(originalArray.order))

            }
        }).disableSelection();
    });

//========================================================Function Listener=================================================//   
initial()

});




