//-----  isMobile  -----//
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i) }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i) }, Windows: function () { return navigator.userAgent.match(/IEMobile/i) }, any: function () { return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() } };


$(document).ready(function() {

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$('.slick').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		dots: false,
		rows: 2,
		arrows: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					dots: true,
					arrows: false,
				}
			},
			{
				breakpoint: 650,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: true,
					arrows: false,
				}
			},
			{
				breakpoint: 430,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
					arrows: false,
				}
			}
		]
	});

	$(".popup-link").fancybox({
		'speedIn': 500,
		'speedOut': 400,
		'padding': 0,
		'helpers': {
			'overlay': { 'locked': false }
		},
		'touch': false
	});


	$(".toggle_menu").click(function () {
		$(this).toggleClass("on");
		$(".mobile-menu").toggleClass("show");
		$("body").addClass("no-scroll");
		$(".menu-overlay").addClass("show");
		return false;
	});

	$(".toggle_menu-close").click(function (e) {
		e.preventDefault();
		$(".toggle_menu").removeClass("on");
		$(".mobile-menu").removeClass("show");
		$("body").removeClass("no-scroll");
		$(".menu-overlay").removeClass("show");
		return false;
	});
	$(".menu-overlay").click(function () {
		$(".toggle_menu").removeClass("on");
		$(".mobile-menu").removeClass("show");
		$("body").removeClass("no-scroll");
		$(".menu-overlay").removeClass("show");
		return false;
	});



	$('input[type="tel"]').keydown(function (event) {
		if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
			(event.keyCode == 65 && event.ctrlKey === true) ||
			(event.keyCode >= 35 && event.keyCode <= 39)) {
			return;
		}
		else {
			if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
				event.preventDefault();
			}
		}
	});

	if (!isMobile.any()) {
		$("input[name='phone'], input[type='tel']").mask("+7 (999) 999-99-99", {
			completed: function () { $(this).attr('data-valid', 'true'); }
		});
	};

	svg4everybody();

});


