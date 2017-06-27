/**
 * Capri Camper Customizer
 * Copyright 2017 Capri Camper
 */

$(function () {
	console.log("Capri Camper Customizer v1.0");

	// Initialize camper vars
	var currModel = "";
	var currSize = "";
	var prevModel = "";
	var PrevSize = "";
	var darkColors = ["black", "charcoal", "blue", "maroon"];

	// Initialize Retreat - DEMO ONLY!!!
	$("#retreat").children("#model").css("background-image", "url(img/retreat/retreat-mid/camper.png)");
	$("#retreat").children("#base").css("background-image", "url(img/retreat/retreat-mid/base/black.png)");
	$("#retreat").children("#fixtures").css("background-image", "url(img/retreat/retreat-mid/fixtures/black.png)");
	$("#retreat").children("#decal").css("background-image", "url(img/retreat/retreat-mid/decal/white.png)");

	// Initialize Cowboy - DEMO ONLY!!!
	$("#cowboy").children("#model").css("background-image", "url(img/cowboy/cowboy-mid/camper.png)");
	$("#cowboy").children("#base").css("background-image", "url(img/cowboy/cowboy-mid/base/black.png)");
	$("#cowboy").children("#decal").css("background-image", "url(img/cowboy/cowboy-mid/decal/white.png)");

	// Listen for any change to camper model/size and apply
	$(".camper-size-link").on("click", function () {
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
		var dropdownItem = "a.dropdown-item" + "." + currModel;
		$(dropdownItem).attr("data-model", currModel);
		$(dropdownItem).attr("data-size", currSize);
	});

	// Listen for any component customizations and apply 
	$(".dropdown-menu a").on("click", function () {
		currModel = $(this).attr("data-model");
		currSize = $(this).attr("data-size");
		var camperId = "#" + currModel;
		var component = $(this).attr("data-component");
		var baseColor = $(camperId).attr("data-base-color");
		var stripesColor = $(camperId).attr("data-stripes-color");
		var accentEnabled = $(camperId).attr("data-accent-enabled");
		var componentColor = $(this).attr("data-color");
		var componentArray = [];
		var imagePath = ""

		// DEBUG
		console.log("base: " + baseColor);
		console.log("stripes: " + stripesColor);
		console.log("accent enabled: " + accentEnabled);

		// Save off current color and stripe state
		switch (component) {
			case "accent":
				if (componentColor == "none") {
					// Set data variable to show accent stripe is not shown
					$(camperId).attr("data-accent-enabled", "false");
					// Set the accent background image to none
					setComponentImage(camperId, "#accent", []);
					// Apply appropriate stripes style class
					$(camperId).children("#stripes").removeClass(currSize + "-stripes-with-accent").addClass(currSize + "-stripes");
					// Show the 2-4 stripes pattern if currently showing stripes
					if (stripesColor != "none") {
						componentArray = [currModel, currSize, "stripes", stripesColor];
						setComponentImage(camperId, "#stripes", componentArray);
					}
				} else {
					// Set data variable to show accent stripe is shown
					$(camperId).attr("data-accent-enabled", "true");
					// Show the selected accent color stripe
					componentArray = [currModel, currSize, "accent", componentColor];
					setComponentImage(camperId, "#accent", componentArray);
					// Apply appropriate stripes style class
					$(camperId).children("#stripes").removeClass(currSize + "-stripes").addClass(currSize + "-stripes-with-accent");
					// Show the 2-5 stripes pattern if currently showing stripes
					if (stripesColor != "none") {
						componentArray = [currModel, currSize, "stripes-with-accent", stripesColor];
						setComponentImage(camperId, "#stripes", componentArray);
					}
				}
				break;
			case "stripes":
				// Set data attribute for camper
				$(camperId).attr("data-stripes-color", componentColor);
				// Set the stripes color in appropriate pattern based on if accent stripe shown
				if (accentEnabled == "true") {
					componentArray = [currModel, currSize, "stripes-with-accent", componentColor];
				} else {
					componentArray = [currModel, currSize, "stripes", componentColor];
				}
				setComponentImage(camperId, "#stripes", componentArray);
				// Change the decal color if customizing a Cowboy
				if (currModel == "cowboy") {
					var decalColor = darkColors.indexOf(componentColor) < 0 ? "black" : "white";	
					componentArray = [currModel, currSize, "decal", decalColor];
					setComponentImage(camperId, "#decal", componentArray);
				}
				break;
			case "base":
				// Set data attribute for camper
				$(camperId).attr("data-base-color", componentColor);			
				// Set the base camper color
				componentArray = [currModel, currSize, "base", componentColor];
				setComponentImage(camperId, "#base", componentArray);
				break;
			case "fixtures":
				// Set the fixtures color
				componentArray = [currModel, currSize, "fixtures", componentColor];
				setComponentImage(camperId, "#fixtures", componentArray);
				// Change the decal color if customizing a Retreat
				if (currModel == "retreat") {
					var decalColor = componentColor == "white" ? "black" : "white";	
					componentArray = [currModel, currSize, "decal", decalColor];
					setComponentImage(camperId, "#decal", componentArray);
				}
				break;							
		}
	});

	// Function used to set the background image for a given camper component
	function setComponentImage(camperId, componentId, componentArray) {
		console.log(camperId);
		console.log(componentId);
		console.log(componentArray);
		var imagePath = "none";
		// Only set imagePath to valid path if camper component array is not empty
		if (componentArray.length != 0) {
			if (componentArray[3] != "none") {
				imagePath = "url(img/" + componentArray.join("/") + ".png)";
			}
		}
		// Set background image for component
		$(camperId).children(componentId).css("background-image", imagePath);
	}

	// Function used to initialize a camper customizer
	function initializeCustomizer() {
		var camperId = "#" + currModel;
		var imagePathPartial = [currModel, currSize].join("/");
		var modelImage = "url(img/" + imagePathPartial + "/camper.png)";
		var baseImage = "url(img/" + imagePathPartial + "/base/black.png)";
		var fixturesImage = "url(img/" + imagePathPartial + "/fixtures/black.png)";
		var decalImage = "url(img/" + imagePathPartial + "/decal/white.png)";

		// Initialize data attributes on camper
		$(camperId).attr("data-base-color", "black");
		$(camperId).attr("data-stripes-color", "none");
		$(camperId).attr("data-accent-enabled", "false");

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
		$(camperId).children("#stripes").removeClass(prevSize + "-stripes-with-accent");
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
