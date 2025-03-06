window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 139;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
  var risk_levels = [
    1, 1, 2, 2, 2, 8, 9, 14, 14, 14, 17, 18, 19, 20, 21, 22, 22, 23, 23, 23, 24, 26, 26, 29, 32, 37, 40, 41, 46, 50, 51, 53, 53, 53, 53, 53, 54, 54, 54, 55, 56, 57, 59, 59, 62, 66, 66, 67, 67, 72, 72, 74, 74, 75, 80, 80, 80, 82, 84, 85, 86, 87, 88, 89, 89, 94, 97, 98, 98, 100, 98, 99, 97, 95, 96, 97, 96, 95, 100, 100, 96, 97, 96, 98, 97, 95, 95, 99, 97, 98, 95, 96, 100, 95, 98, 98, 95, 97, 99, 95, 98, 97, 99, 96, 100, 99, 97, 99, 96, 96, 98, 96, 96, 98, 95, 100, 97, 95, 96, 99, 100, 96, 100, 99, 100, 99, 100, 99, 96, 100, 99, 98, 100, 99, 100, 100, 97, 100, 99
    ];
  $('#interpolation-image-wrapper').append("위험도: " + risk_levels[i]);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
