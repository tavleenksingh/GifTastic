

	// Initial array of reactions
	var topics = ['Flirting', 'High Five', 'Good Job', 'Excited', 'Eye Roll',
				  'LOL', 'Face Palm', 'Happy', 'Wink', 'Yes'];
	// ========================================================

	// Generic function for displaying the content for each button into the div
	function displayReactionInfo(){

		$('#giphyHolder').empty();

		var reaction = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + reaction + "&fmt=json";
		
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
	     	 console.log(queryURL);
	     	 console.log(response);

	     	 // storing the data from the AJAX request in the results variable
          	 var results = response.data;
          	 console.log(results);

          	 // Looping through each result item
          	for (var i = 0; i < results.length; i++){
          		// Creating and storing a div tag
            	var reactionDiv = $("<div>")
            	reactionDiv.addClass("styleGif")

            	// Creating a paragraph tag with the result item's rating
            	var p = $("<p>").text("Rating: " + results[i].rating);

            	// Creating and storing an image tag
            	var reactionImage = $("<img>");
	            // Setting the src attribute of the image to a property pulled off the result item
	            reactionImage.attr("src", results[i].images.fixed_height_still.url);
	            reactionImage.attr("state", "still");
	            reactionImage.attr("data-still", results[i].images.fixed_height_still.url);
	            reactionImage.attr("data-animate", results[i].images.fixed_height.url);
	            reactionImage.addClass("gif");

	            // Appending the paragraph and image tag to the reactionDiv
	            reactionDiv.append(p);
	            reactionDiv.append(reactionImage);

	            // Prependng the reactionDiv to the HTML page in the "#giphyHolder" div
	            $("#giphyHolder").prepend(reactionDiv);
	          	}
		}); 
	}

	// ========================================================
	// Generic function for animating the reaction gif on clicking it 
	function animateGif(){
		  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
	      var state = $(this).attr("data-state");

	      if (state === "still") {
	        $(this).attr("src", $(this).data("animate"));
	        $(this).attr("data-state", "animate");
	      }
	      else {
	        // If the clicked image's state is still, update it's src attribute to what it's data-animate value is.
	        // Then set the image's data-state to animate
	        $(this).attr("src", $(this).data("still"));
	        $(this).attr("data-state", "still");
	      }
	}

	// ========================================================

	// Generic function for displaying reaction data 
	function renderButtons(){ 

		// Deletes the reactions prior to adding new reaction 
		$('#buttonsView').empty();


		// Loops through the array of reactions
		for (var i = 0; i < topics.length; i++){

			// Then dynamicaly generates buttons for each reaction in the array
		    var a = $('<button>') 
		    a.addClass('reaction btn btn-default'); // Added a class 
		    a.attr('data-name', topics[i]); // Added a data-attribute
		    a.text(topics[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}

	renderButtons();

	// ========================================================

	// This function handles events where one button is clicked
	$('#addReaction').on('click', function(){
		// This line of code will grab the input from the textbox
		var reaction = $('#reaction-input').val().trim();
		// The reaction from the textbox is then added to our array
		topics.push(reaction);
		// array runs which handles the processing of our topics array
		renderButtons();
		return false;
	});


	// ========================================================

	// On click of anything within a div with .reaction class run displayReactionInfo function
	$(document).on('click', '.reaction', displayReactionInfo);

	// On click of anything within a div with .gif class run animateGif function
	$(document).on('click', '.gif', animateGif);

	// ========================================================

