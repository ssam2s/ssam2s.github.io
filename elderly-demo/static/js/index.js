window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 220;

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
         0,  1,  0,  1,  2,  2,  3,  4,  3,  0,
         3,  1,  0,  0,  5,  8,  9, 11, 15, 16,
        20, 21, 20, 19, 23, 25, 28, 30, 29, 30,
        30, 30, 31, 32, 33, 30, 30, 29, 31, 32,
        32, 31, 33, 31, 32, 34, 35, 34, 36, 38,
        39, 40, 41, 42, 40, 41, 43, 44, 45, 42,
        46, 47, 46, 49, 50, 52, 53, 54, 55, 58,
        60, 61, 60, 63, 64, 65, 66, 65, 67, 68,
        72, 73, 70, 71, 73, 75, 74, 73, 76, 77,
        76, 77, 77, 75, 78, 79, 81, 83, 85, 84,
        89, 88, 87, 90, 91, 92, 93, 90, 93, 94,
        95, 97, 96, 95, 96, 95, 97, 98, 97, 98,
        99, 98, 97, 99, 97, 95, 96, 99,100,100,
        99,100,100,100, 99,100,100,100, 99,100,
        95, 97, 96, 95, 96, 95, 97, 98, 97, 98,
        99, 98, 97, 99, 97, 95, 96, 99,100,100,
        99,100,100,100, 99,100,100,100, 99,100,
        95, 97, 96, 95, 96, 95, 97, 98, 97, 98,
        99, 98, 97, 99, 97, 95, 96, 99,100,100,
        99,100,100,100, 99,100,100,100, 99,100,
        95, 97, 96, 95, 96, 95, 97, 98, 97, 98,
        99, 98, 97, 99, 97, 95, 96, 99,100,100
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
