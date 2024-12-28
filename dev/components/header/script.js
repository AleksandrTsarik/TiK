// ------------------------ menu at scroll --------------------------------

$.fn.scrollMenu = function () {
	let lastScrollTop = 0;

	$(window).on('scroll', () => {
		const curScrollTop = $(window).scrollTop();
		const headerDesc = $(this).find('.header__description');
		const headerDescHeight =
			headerDesc.height() != 0
				? headerDesc.height() + 5
				: headerDesc.height();

		if (curScrollTop > $(this).height()) {
			if (!$(this).hasClass('header-fixed')) {
				$(this).addClass('header-fixed').addClass('show');
				$('body').css('margin-top', `${$(this).height()}px`);
			}
			(curScrollTop < lastScrollTop) && $(this).removeClass('show').addClass('transition');
			(curScrollTop > lastScrollTop) && $(this).addClass('show');
		}
		if (curScrollTop == 0 || curScrollTop <= headerDescHeight) {
			$('header').removeClass('header-fixed').removeClass('show').removeClass('transition');
			$('body').css('margin-top', `0px`);
		}
		lastScrollTop = curScrollTop;
	});
}

$('header').scrollMenu();

//-------------------- height calculation for mobile -----------------------------

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// ------------------------ menu burger --------------------------------

$('.burger').on('click', function (e) {
	$(this).toggleClass("active");
	$(".header__menu").toggleClass("active");
	$('body').toggleClass("lock");
});
$(".header__menu").on('click', function (e) {
	if (e.target.closest('.dropdown') || !e.target.closest('.menu__item')) return;

	$(this).toggleClass("active");
	$('.burger').toggleClass("active");
	$('body').toggleClass("lock");
});

//------------------- menu dropdown -----------------------------

$.fn.dropdownMenu = function () {
	$(this).find('.header__menu').on('click', (e) => {
		if (!(e.target).closest('.dropdown') && !(e.target).closest('.multilevel-menu_open')) return;
		!(e.target).closest('.multilevel-menu_open') && e.preventDefault();

		$('.multilevel-menu_open')
			.removeClass('multilevel-menu_open')
			.find('ul').slideUp(350);
		$(e.target).closest('.dropdown')
			.addClass('multilevel-menu_open')
			.find('ul').slideToggle(350);
	});
};

($(window).width() <= 992) && $('header').dropdownMenu();