$(function() {
	console.log("Capri Camper Customizer v1");

	// Change camper color on swatch click
	$("img.color-swatch").on("click", function() {
		var color_name = $(this).attr("data-color");
		var camper_img = "url(img/retreat-8/r8-" + color_name + ".png)";
		// Swap background image for camper
		$("#camperColor").css("background-image", camper_img);

		// Set trim color
		if (color_name == "white") {
			$("#camperTrim").css("background-image", "url(img/retreat-8/r8-white-trim.png)");
		} else {
			$("#camperTrim").css("background-image", "url(img/retreat-8/r8-black-trim.png)");
		}
	});
});
