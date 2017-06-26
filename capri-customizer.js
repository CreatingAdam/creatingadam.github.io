$(function() {
	console.log("Capri Camper Customizer v1.0");

	// Initialize camper vars
	var currModel = "";
	var currSize = "";
	var prevModel = "";
	var PrevSize = "";
	var darkColors = ["black", "charoal", "blue", "green", "maroon"];

	// Initialize Retreat - DEMO ONLY!!!
	$("#retreat").children("#model").css("background-image", "url(img/retreat/retreat-mid/camper.png)");
	$("#retreat").children("#base").css("background-image", "url(img/retreat/retreat-mid/base/black.png)");
	$("#retreat").children("#fixtures").css("background-image", "url(img/retreat/retreat-mid/fixtures/black.png)");
	$("#retreat").children("#decal").css("background-image", "url(img/retreat/retreat-mid/decal/white.png)");

	// Initialize Cowboy - DEMO ONLY!!!
	$("#cowboy").children("#model").css("background-image", "url(img/cowboy/cowboy-mid/camper.png)");
	$("#cowboy").children("#base").css("background-image", "url(img/cowboy/cowboy-mid/base/black.png)");
	$("#cowboy").children("#fixtures").css("background-image", "url(img/cowboy/cowboy-mid/fixtures/black.png)");
	$("#cowboy").children("#decal").css("background-image", "url(img/cowboy/cowboy-mid/decal/white.png)");

	$(".camper-size-link").on("click", function() {
		// Set previous camper model and size for transitioning classes
		prevModel = $(this).siblings(".active").attr("data-model");
		prevSize = $(this).siblings(".active").attr("data-size");

		// Get new camper model and size
		currModel = $(this).attr("data-model");
		currSize = $(this).attr("data-size");

		initializeCustomizer();
		
		// Remove and apply active class
		$(this).siblings(".active").removeClass("active");
		$(this).addClass("active");

		// Set new data attributes for dropdowns
		$("a.dropdown-item").attr("data-model", currModel);
		$("a.dropdown-item").attr("data-size", currSize);
	});

  	$(".dropdown-menu a").on("click", function() {
		currModel = $(this).attr("data-model");
		currSize = $(this).attr("data-size");
		var camperId = "#" + currModel;
		var component = $(this).attr("data-component");
		var componentId = "#" + component;
		var color = $(this).attr("data-color");
		var imagePathPartial = [currModel, currSize, component, color].join("/");
		var image = "url(img/" + imagePathPartial + ".png)";

		// Set new image for component
		$(camperId).children(componentId).css("background-image", image);
	});

	function initializeCustomizer() {
		var camperId = "#" + currModel;
		var imagePathPartial = [currModel, currSize].join("/");
		var modelImage = "url(img/" + imagePathPartial + "/camper.png)";
		var baseImage = "url(img/" + imagePathPartial + "/base/black.png)";
		var fixturesImage = "url(img/" + imagePathPartial + "/fixtures/black.png)";
		var decalImage = "url(img/" + imagePathPartial + "/decal/white.png)";

		// Set default images for all layers
		$(camperId).children("#model").css("background-image", modelImage);
		$(camperId).children("#base").css("background-image", baseImage);
		$(camperId).children("#stripes").css("background-image", "none");
		$(camperId).children("#accent").css("background-image", "none");
		$(camperId).children("#decal").css("background-image", decalImage);

		// Turn on fixtures image based on model
		switch (currModel) {
			case "retreat":
				$(camperId).children("#fixtures").css("background-image", fixturesImage);
				break;
			case "cowboy":
				$(camperId).children("#fixtures").css("background-image", "none");
				break;
		}

		// Remove old size-specific classes
		$(camperId).removeClass(prevSize + "-div");
		$(camperId).children("#model").removeClass(prevSize + "-model");
		$(camperId).children("#base").removeClass(prevSize + "-component");
		$(camperId).children("#stripes").removeClass(prevSize + "-stripes");
		$(camperId).children("#accent").removeClass(prevSize + "-accent");
		$(camperId).children("#fixtures").removeClass(prevSize + "-component");
		$(camperId).children("#decal").removeClass(prevSize + "-decal");

		// Apply new size-specific classes
		$(camperId).addClass(currSize + "-div");
		$(camperId).children("#model").addClass(currSize + "-model");
		$(camperId).children("#base").addClass(currSize + "-component");
		$(camperId).children("#stripes").addClass(currSize + "-stripes");
		$(camperId).children("#accent").addClass(currSize + "-accent");
		$(camperId).children("#fixtures").addClass(currSize + "-component");
		$(camperId).children("#decal").addClass(currSize + "-decal");
	}
});
