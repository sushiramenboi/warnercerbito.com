(function ($) {
	"use strict";

	var devboy_portfolio = {
		/* ============================================================ */
		/* PRELOADER
        /* ============================================================ */
		preloader: function () {
			$(window).on("load", function () {
				$(".preloader").fadeOut();
			});
		},

		/* ============================================================ */
		/* Jquery Plugins Calling
        /* ============================================================ */
		onePageFunction: function () {
			$('#nav a[href*="#"]:not([href="#"])').on('click', function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                          scrollTop: target.offset().top - 0,
                        }, 100);
                        return false;
                    }
                }
            });

			// Scrollspy
			var sectionIds = $('a.nav-link');
			if ($('#nav').length) {
				$(document).scroll(function(){
					sectionIds.each(function(){
	
						var container = $(this).attr('href');
						var containerOffset = $(container).offset().top;
						var containerHeight = $(container).outerHeight();
						var containerBottom = containerOffset + containerHeight;
						var scrollPosition = $(document).scrollTop();
				
						if(scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20){
							$(this).addClass('active');
						} else{
							$(this).removeClass('active');
						}
					});
				});
			}   
		},
		/* ============================================================ */
		/* Jquery Plugins Calling
        /* ============================================================ */
		commonActivation: function () {
			// Animated Headline
			$(".hero-banner").animatedHeadline({
				animationType: "clip",
			});
			$(".menu-header").animatedHeadline({
				animationType: "clip",
			});

			// Fun Facts Counterup
			$(".counter").counterUp({
				delay: 10,
				time: 2000,
			});

			// Extra page Card social icons show on small device by Toggle
			$(".card .media-holder .elips").click(function () {
				$(this).parent().siblings().stop().slideToggle(400);

				$(document).click(function (e) {
					var target = e.target;
					if (
						!$(target).is(".card .media-holder .elips") &&
						!$(target).parents().is(".card .media-holder .elips")
					) {
						$(".card .drop-menu").slideUp();
					}
				});
			});
		},
		/* ============================================================ */
		/* Fortfolio Isotop Gallery
        /* ============================================================ */
		portfolio_isotop: function () {

			$(window).on("load resize",function(e){ 
                var $container = $('.portfolio-inner'),
                isotope = function () {
                    $container.isotope({
                        resizable: true,
                        itemSelector: '.portfolio-item',
                        layoutMode: 'packery',
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.portfolio-item',
                        },
                        hiddenStyle: {
                            transform: 'scale(.2) skew(30deg)',
                            opacity: 0
                        },
                        visibleStyle: {
                            transform: 'scale(1) skew(0deg)',
                            opacity: 1,
                        },
                        transitionDuration: '.5s',
                    });
                };
                isotope(); 

                var $isotopefilters = $('.portfolio-wrapper .filter-button');
                $isotopefilters.on( 'click', 'li', function() {
                    $(this).addClass('active').siblings().removeClass('active');

                    var filterValue = $( this ).attr('data-filter');
                    $container.isotope({ 
                        filter: filterValue 
                    });
                });
            }); 
		},
		/* ============================================================ */
		/* Mobile Menu Intigration
        /* ============================================================ */
		mobile_menu: function () {
			//Clone Mobile Menu
			function cloneMobileMenu($cloneItem, $mobileLoc) {
				var $combinedmenu = $($cloneItem).clone();
				$combinedmenu.appendTo($mobileLoc);
			}
			cloneMobileMenu("header .menu", ".mobile-menu");

			function mobile_menu(selector, actionSelector) {
				var mobile_menu = $(selector);
				mobile_menu.on("click", function () {
					$(selector).toggleClass("is-menu-open");
				});

				var hamburgerbtn = $(selector);
				hamburgerbtn.on("click", function () {
					$(actionSelector).toggleClass("is-menu-open");
				});

				$(document).on("click", function (e) {
					var selectorType = $(actionSelector).add(mobile_menu);
					if (
						selectorType.is(e.target) !== true &&
						selectorType.has(e.target).length === 0
					) {
						$(actionSelector).removeClass("is-menu-open");
					}
				});
			}
			mobile_menu(".toggler-menu, .close-menu", ".mobile-menu, body");

			$(".mobile-menu").on("click", "li", function () {
				$(this).addClass("active").siblings().removeClass("active");
			});

			$(".mobile-menu ul li a").on("click", function () {
				$(".mobile-menu, .toggler-menu, body").removeClass("is-menu-open");				
			});
		},
		/* ============================================================ */
		/* Sticky Menu
        /* ============================================================ */
		sticky_menu: function () {
			var fixed_top = $(".mob-header");
			$(window).on("scroll", function () {
				if ($(this).scrollTop() > 100) {
					fixed_top.addClass("sticky");
				} else {
					fixed_top.removeClass("sticky");
				}
			});
		},
		/* ============================================================ */
		/*  Carousels
        /* ============================================================ */
		site_carousel: function () {
			// Checking HTML has dir attribute and its value rtl
			function rtl_dir() {
				var rtlHTML = $("html").attr("dir");
				if (rtlHTML == "rtl") {
					return true;
				} else {
					return false;
				}
			}
			var serviceCarousel = $(".serviceCarousel");
			serviceCarousel.owlCarousel({
				items: 1,
				loop: 1,
				dots: 1,
				autoplay: 1,
				margin: 40,
				rtl: rtl_dir(),
				autoplaySpeed: 1000,
				responsive: {
					// breakpoint from 576 up
					576: {
						items: 2,
						margin: 25,
					},
					// breakpoint from 768 up
					768: {
						items: 3,
						margin: 25,
					},
					// breakpoint from 1200 up
					1200: {
						items: 4,
						margin: 30,
					},
					// breakpoint from 1200 up
					1536: {
						items: 5,
						margin: 30,
					},
					1720: {
						items: 5,
						margin: 40,
					},
				},
				onInitialized: addDotButtonText,
				onResized: addDotButtonText,
			});
			function addDotButtonText() {
				// loop through each dot element
				$(".owl-dot").each(function () {
					// remove old text nodes
					$(this).find(".offscreen").remove();

					// grab its (zero-based) order in the series
					var idx = $(this).index() + 1;

					// append a span to the button containing descriptive text
					$(this).append(
						'<span class="offscreen">Go to slide ' + idx + "</span>"
					);
				});
			}

			var clientCarousel = $(".clientCarousel");
			clientCarousel.owlCarousel({
				items: 2,
				loop: 1,
				dots: !1,
				autoplay: 1,
				margin: 10,
				rtl: rtl_dir(),
				autoplaySpeed: 1000,
				responsive: {
					// breakpoint from 450 up
					450: {
						items: 3,
					},
					// breakpoint from 768 up
					768: {
						items: 4,
						margin: 20,
					},
					// breakpoint from 1200 up
					1200: {
						items: 4,
						margin: 30,
					},
				},
			});
			var pricingCarousel = $('.pricing-carousel');
			if (pricingCarousel.length) {
				pricingCarousel.owlCarousel({
					items: 1,
					loop: !1,
					dots: !1,
					autoplay: !1,
					margin: 40,
					rtl: rtl_dir(),
					autoplaySpeed: 1000,
					responsive: {
						// breakpoint from 768 up
						768: {
							items: 2,
							margin: 25,
						},
						// breakpoint from 1024 up
						1024: {
							items: 3,
							margin: 30,
						},
						// breakpoint from 1400 up
						1400: {
							items: 3,
							margin: 40,
						}						
					},
				});
			};
			var portfolioItemSlider = $(".item-slider");
			portfolioItemSlider.owlCarousel({
				items: 1,
				loop: 1,
				dots: 1,
				autoplay: 1,
				margin: 0,
				rtl: rtl_dir(),
				autoplaySpeed: 1000,
			});

			$(".feedback .feedbackCarousel").slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				asNavFor: ".feedback .feedbackNav",
				rtl: rtl_dir(),
			});
			$(".feedback .feedbackNav").slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				asNavFor: ".feedback .feedbackCarousel",
				dots: false,
				focusOnSelect: true,
				arrows: false,
				centerMode: true,
				centerPadding: "0",
				rtl: rtl_dir(),
			});
		},
		/* ============================================================ */
		/* Scroll Top
        /* ============================================================ */
		scroll_to_top: function () {
			$("body").append(
				"<a href='#top' title='Scroll Top' id='scroll-top' class='topbutton btn-hide'><span class='fas fa-level-up-alt'></span></a>"
			);
			var $scrolltop = $("#scroll-top");
			$(window).on("scroll", function () {
				if ($(this).scrollTop() > $(this).height()) {
					$scrolltop.addClass("btn-show").removeClass("btn-hide");
				} else {
					$scrolltop.addClass("btn-hide").removeClass("btn-show");
				}
			});
			$("a[href='#top']").on("click", function () {
				$("html, body").animate(
					{
						scrollTop: 0,
					},
					"normal"
				);
				return false;
			});
		},
		/* ============================================================ */
		/* Background Image
        /* ============================================================ */
		background_image: function () {
			$("[data-bg-color], [data-bg-image]").each(function() {
                var $this = $(this);               
    
                if(  $this.attr("data-bg-color") !== undefined ){                        
                    $this.css("background-color", $this.attr("data-bg-color") );
                }
                if( $this.attr("data-bg-image") !== undefined ){
                    $this.css("background-image", "url("+ $this.attr("data-bg-image") +")" );    
                    $this.css("background-size", $this.attr("data-bg-size") );
                    $this.css("background-repeat", $this.attr("data-bg-repeat") );
                    $this.css("background-position", $this.attr("data-bg-position") );
                    $this.css("background-blend-mode", $this.attr("data-bg-blend-mode") );
                }
            });
		},
		/* ============================================================ */
		/* Circle Progressbar
        /* ============================================================ */
		circleProgressbar: function () {
			function animateElements() {
				$(".progressbar").each(function () {
					var elementPos = $(this).offset().top;
					var topOfWindow = $(window).scrollTop();
					var percent = $(this).find(".circle").attr("data-percent");
					var animate = $(this).data("animate");
					if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
						$(this).data("animate", true);
						$(this).find(".circle").circleProgress({
							startAngle: -Math.PI / 2,
							value: percent / 100,
							thickness: 6,
							lineCap: "round",	
							emptyFill: "#B7B7B7",
							fill: {
								color: "#262626",
							},					
						})
						.on(
							"circle-animation-progress",
							function (event, progress, stepValue) {
								$(this)
									.parent()
									.find("span")
									.text((stepValue * 100).toFixed(0));
							}
						).stop();
						if ($('body').hasClass('dark')) {
							$(this).find(".circle").circleProgress({												
								emptyFill: "#262626",
								fill: {
									color: "#d79d4b",
								},
							});
						}
					}
					if (elementPos + $(window).width() > 576 && !animate) {
						$(this).find(".circle").circleProgress({
							size: 232,
							thickness: 8,
						})
						.on(
							"circle-animation-progress", 
							function (event, progress, stepValue) {
							$(this)
							.parent()
							.find("span")
							.text((stepValue * 100).toFixed(0));
						}).stop();
					}
				});
			}
			// Show animated elements
			animateElements();
			$(window).scroll(animateElements);
		},
		circleProgressbarDark: function () {
			function animateElements2() {
				$(".progressbar").each(function () {					
					$(this).find(".circle").circleProgress({												
						emptyFill: "#262626",
						fill: {
							color: "#d79d4b",
						},
					});					
				});
			}
			// Show animated elements
			animateElements2();
		},
		// Circle Progressbar for Light Version
		circleProgressbarLight: function () {
			function animateElements3() {
				$(".progressbar").each(function () {					
					$(this).find(".circle").circleProgress({												
						emptyFill: "#B7B7B7",
						fill: {
							color: "#262626",
						},
					});				
				});
			}
			// Show animated elements
			animateElements3();
		},
		/* ============================================================ */
		/* Portfolio Popup
        /* ============================================================ */
		portfolioPopup: function () {
			$(".gallery_zoom").each(function () {
				// the containers for all your galleries
				$(this).magnificPopup({
					delegate: "a.zoom", // the selector for gallery item
					type: "image",
					gallery: {
						enabled: true,
					},
					removalDelay: 300,
					mainClass: "mfp-fade",
				});
			});
			$(".popup-youtube, .popup-vimeo").each(function () {
				// the containers for all your galleries
				$(this).magnificPopup({
					disableOn: 700,
					type: "iframe",
					mainClass: "mfp-fade",
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false,
				});
			});
			$(".soundcloude_link").magnificPopup({
				type: "image",
				gallery: {
					enabled: true,
				},
			});			
		},

		calendarHolder: function () {
			if ($(".calendar-block").length) {
				var getdate = new Date();
				document.getElementById("date").innerHTML = getdate.getDate();

				var getmonth = new Date();
				var month = [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				];
				document.getElementById("month").innerHTML = month[getmonth.getMonth()];

				var year = new Date();
				document.getElementById("year").innerHTML = year.getFullYear();

				$(".calendar-block").datepicker({
					showOtherMonths: true,
					firstDay: 0,
					dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
					changeMonth: true,
					changeYear: true,
					dateFormat: "MM yy",
					stepMonths: 0,
					monthNamesShort: [
						"January",
						"February",
						"March",
						"April",
						"May",
						"Jun",
						"July",
						"August",
						"September",
						"October",
						"November",
						"December",
					],
				});
			}
		},

		initializ: function () {
			devboy_portfolio.preloader();
			devboy_portfolio.onePageFunction();
			devboy_portfolio.mobile_menu();
			devboy_portfolio.commonActivation();
			devboy_portfolio.portfolio_isotop();
			devboy_portfolio.sticky_menu();
			devboy_portfolio.scroll_to_top();
			devboy_portfolio.background_image();
			devboy_portfolio.circleProgressbar();
			devboy_portfolio.site_carousel();
			devboy_portfolio.portfolioPopup();
			devboy_portfolio.calendarHolder();
		},
	};
	$(function () {
		devboy_portfolio.initializ();

		// Style Switcher
		$('.style-switcher .toggle-btn').on('click', function() {
			$('.style-switcher').toggleClass('active');
		}); 
		$('.style-back .variant').on('click', function(e) {    
			var style_bg = $(this).attr('data-bg');
			if( style_bg == "dark" ){
				$('body').addClass('dark');
				devboy_portfolio.circleProgressbarDark();
			
			} else {
				$('body').removeClass('dark');
				devboy_portfolio.circleProgressbarLight();
			}
		});
	});
})(jQuery);
