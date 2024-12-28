$(document).ready(function () {
//------------------- imask -----------------------------

$("input[type=tel]").each((i, element) => {
	const mask = IMask(element, { mask: "+{7}(000)000-00-00" });
});

//-------------------- agreement -----------------------------

$("[name=USER_CONSENT]").parent().addClass('agreement');

//-------------------- tabs -----------------------------

$('[data-tab]').parent().each((index, tabs) => {
	const parent = $(tabs).closest('section');
	const tabsList = $(tabs).children();
	const contentList = $('[data-tabContent]', parent);

	tabsList.first().addClass('active');
	contentList.first().show();

	$(tabs).on('click', '[data-tab]', function () {
		if (!contentList.eq($(this).index())) return;
		tabsList.removeClass('active');
		$(this).addClass('active');

		contentList.hide().eq($(this).index()).show();
	});
});

//-------------------- slider params -----------------------------

const paramsSlider = {
	btns: {
		navigation: {
			nextEl: '.slider__btn-next',
			prevEl: '.slider__btn-prev',
		},
	},
	pag: {
		pagination: {
			el: '.slider__pagination',
			type: 'bullets',
			dynamicMainBullets: 3,
			dynamicBullets: true,
		},
	},
}

const navigation = (slider) => {
	const classArrowsParent = '.slider__btns';
	const checkArrows = $(classArrowsParent, slider).length ? true : false;

	return checkArrows
		? { ...paramsSlider.btns, ...paramsSlider.pag }
		: { ...paramsSlider.pag }
};

// пример слайдера

$('.list-prod__slider').each((index, item) => {
	const nav = navigation($(item));

	new Swiper(item, {
		slidesPerView: 1,
		speed: 800,
		spaceBetween: 20,
		grabCursor: true,
		...nav,
	});
});

//------------------------------ running text ----------------------

const runningText = (element, count = 1) => {
	$(`.${element}`).each((index, el) => {
		let list = $(el).clone().html();

		for (let i = 0; i < count; i++) {
			$(el).append(list);
		}

		let clone = $(el).clone();
		clone.removeClass(element);
		clone.addClass(`${element}_clone`);
		$(el).append(clone);
	})
}

//------------------------------ running number ----------------------

function outNum(section, number, step = 1, time = 5000) {
	const sectionPos = $(section).offset().top - document.documentElement.clientHeight;

	$(window).on('scroll', function () {
		const topWindow = $(window).scrollTop();

		if (sectionPos > topWindow - 100) return;
		if ($(number).hasClass('start')) return;
		$(number, section).addClass('start');

		$(number, section).each((index, item) => {
			const max = item.innerHTML;
			const timing = Math.round(time / (max / step));
			let start = 0;

			let interval = setInterval(() => {
				start = start + step;
				if (start == max) {
					clearInterval(interval);
				}
				item.innerHTML = start;
			},
				timing);
		});
	});
}

// outNum('.test', '.out-num');

//------------------------------ required form ----------------------

$('.form [required]').parent().addClass('required');

//------------------------------ custom input file ----------------------

$('.input-file').on('change', 'input[type=file]', function(){
	let file = this.files[0];
	$(this).next().html(file.name);
	$(this).parent().next().attr('disabled', false);
});

$('.input-file').on('click', 'button', function() {
	const inputFile = $(this).prev().find('input[type=file]');
	inputFile.val('');
	inputFile.next().text('Загрузить');
	$(this).attr('disabled', true);
});

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
$(".js-click-up").on("click", function() {
    $("body").scrollTop(0);
});
});