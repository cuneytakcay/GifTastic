// Create and Array to hold all topics
var topics = ["cat", "dog", "goat", "horse", "owl"];

// Start the page with pre-determined themes
for (var i = 0; i < topics.length; i++) {

	var btn = $("<button>" + topics[i].toUpperCase() + "</button>").addClass("btn btn-info mr-0 mb-0");
	$("#btn-holder").append(btn);

}

// ==================================== FUNCTIONS =======================================

// Request query from Giphy Api 
function requestQuery(theme) {

	// Declare url variable
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theme + "&api_key=dc6zaTOxFJmzC";

	// Request query
	$.ajax({

		url: queryURL,
		method: "GET"

	}).done(function(response) {

		var wrapper, divTop, divBot;

		// Dump 12 still images into the gif-holder
		for (var i = 0; i < 12; i++) {

			wrapper = $("<div>").addClass("d-inline-block mb-4");
			divTop = $("<div class=\"text-left\">").html("<em>Rating: " + response.data[i].rating + "</em><br>");
			divBot = $("<div class=\"gif-div mr-2 mt-2\">");
			divBot.append("<img src=\"" + response.data[i].images["480w_still"].url + "\" id=" + i + " class=\"gif\">");
			wrapper.append(divTop);
			wrapper.append(divBot);
			$("#gif-holder").append(wrapper);

		}

		// This will be true if a gif is playing
		var gifInAction = false;
		var gifImg, idNum, srcStill, srcGif;

		// When a gif is clicked, if gifInAction is false, that gif will play and gifInAction will become true
		$(".gif").on("click", function() {
			
			if (!gifInAction) {

				gifImg = $(this);
				idNum = $(this).attr("id");
				srcStill = response.data[idNum].images["480w_still"].url;
				srcGif = response.data[idNum].images.downsized.url;

				gifImg.addClass("action");
				$(".action").attr("src", srcGif);
				gifInAction = true;

			} else { 

				$(".action").attr("src", srcStill);
				$(".action").removeClass("action");
				gifInAction = false;

			}
			
		})

	});

}

// Theme buttons will be created with this function
function createButtons(input) {

	topics.push(input);

	$("#btn-holder").empty();

	for (var i = 0; i < topics.length; i++) {

		var btn = $("<button>" + topics[i].toUpperCase() + "</button>").addClass("btn btn-info mr-0 mb-0");
		$("#btn-holder").append(btn);

	}

}

// ========================= START THE PAGE WITH RANDOM GIFS ==============================

requestQuery("funny");

// ================================== ADD NEW THEMES ======================================

$("#add-btn").on("click", function () {

	// This is to prevent the form element from trying to submit anything
	event.preventDefault();

	var inputTopic = $("#input-topic").val();

	if (inputTopic.length > 0 && !topics.includes(inputTopic.toLowerCase())) {

		createButtons(inputTopic);

	}

	$("#input-topic").val("");

})

// ================================== SELECT THEME ======================================

// When a button is clicked, the theme assigned to the button will call gifs with that theme
$("#btn-holder").on("click", "button", function() {

	// Clear the gif-holder before dumping new gifs
	$("#gif-holder").empty();

	// Assign the theme to the theme variable to pass as a parameter
	var selectedTheme = $(this).text();

	// Call the requestQuery function to dump new gifs
	requestQuery(selectedTheme);
	
})

// ======================================================================================




