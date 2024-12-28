$(".slider").each((index, item) => {
//   const nav = navigation($(item));
  new Swiper(item, {
    // slidesPerView: 6.5,
    speed: 800,
    spaceBetween: 10,
    grabCursor: true,
    loop: false,
    autoHeight: true,
    navigation: {
      nextEl: ".slider__btn-next",
      prevEl: ".slider__btn-prev",
    },
    breakpoints: {
        1200: {
            slidesPerView: 6.5
        },
        767: {
            slidesPerView: 3.5
        },
        320: {
            slidesPerView: 1.5
        },
    }
  });
});
