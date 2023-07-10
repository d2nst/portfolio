$(function () {
  $('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
    menu: '#myMenu',
    navigation: true,
    navigationPosition: 'right',
    scrollingSpeed: 1000,
    onLeave: function (origin, destination, direction) {
      // 빠른전환으로 이벤트중복시 fullpage와 swiper전환시점 분리막기
      $('#fullpage').on('scroll', function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      });

      swiper.mousewheel.disable();
    },
    afterLoad: function (anchorLink, index) {
      // console.log('현재 섹션 번호' + index);
      $('header ul li').removeClass('on');
      $('header ul li:nth-child(' + index + ')').addClass('on');

      $('#fullpage').off('scroll mousewheel');
      if (!$('.fp-completely .swiper-wrapper').length > 0)
        $('#fullpage').off('touchmove'); // 모바일분기
      if (swiper) swiper.mousewheel.enable();
      if (!$('#portfolio').hasClass('active'))
        $.fn.fullpage.setAllowScrolling(true);
    },
  });
});

// swiper
const length = $('#portfolio .swiper-slide').length;
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 150,
  freeMode: false,
  speed: 1000,
  autoHeight: true,
  mousewheel: true,
  // allowTouchMove: false,
  on: {
    slideChange: function () {
      const idx = this.activeIndex;
      // 처음과 마지막 슬라이드가 아닐경우 fullpage전환 막기
      if (this.activeIndex != 0 && idx != length)
        $.fn.fullpage.setAllowScrolling(false);
      if (length == 7 && idx == 0) $.fn.fullpage.setAllowScrolling(false); //슬라이드가 4개밖에 없을때
      // console.log('즉시 : ' + idx);
    },
    slideChangeTransitionEnd: function () {
      const idx = this.activeIndex;
      // 처음과 마지막 슬라이드일 경우 fullpage전환 풀기
      if (idx == 0 || idx >= length - 1) $.fn.fullpage.setAllowScrolling(true);
      // console.log('전환후 : ' + idx);
    },
    //touchmove를 하게 되면 드래그로 슬라이드 시 오류난다. 필요시 사용
    // touchMove: function (e) {
    //   const startY = e.touches.startY;
    //   setTimeout(function () {
    //     if (startY > e.touches.currentY) swiper.slideNext();
    //     else swiper.slidePrev();
    //   }, 100);
    // },
  },
});

// footer 년도 변경
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();

// * mouse cursor custom start *
let mousePointer = document.querySelector('.cursor');
let mouseHover = document.querySelectorAll('[data-cursor-class]');

window.addEventListener('mousemove', cursor);

function cursor(e) {
  mousePointer.style.top = e.pageY + 'px';
  mousePointer.style.left = e.pageX + 'px';
}

mouseHover.forEach((link) => {
  link.addEventListener('mouseleave', () => {
    mousePointer.classList.remove('link-grow');
  });
  link.addEventListener('mouseover', () => {
    mousePointer.classList.add('link-grow');
  });
});

// home 부분 텍스트 애니메이션
Splitting();

TweenMax.staggerFrom(
  '.char',
  1.7,
  {
    y: 70,
    rotation: 90,
    rotationX: -50,
    opacity: 0,
    transformOrigin: '50% 50%',
    ease: Back.easeInOut.config(1.7),
  },
  0.05
);

// 모달 팝업창 만들기
const modalBtn = document.querySelectorAll('.more__btn');
const closeModalBtn = document.querySelector('.close__btn');
const modalOverlay = document.querySelector('.overlay');

for (let i = 0; i < modalBtn.length; i++) {
  modalBtn[i].addEventListener('click', () => {
    const modalId = modalBtn[i].getAttribute('data-modal-id');
    console.log('modalId: ', modalId);
    const modal = document.getElementById(modalId);
    console.log('modal: ', modal);

    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      modalOverlay.style.display = 'none';
    });

    modalOverlay.addEventListener('click', () => {
      modal.style.display = 'none';
      modalOverlay.style.display = 'none';
    });

    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
    $.fn.fullpage.setAllowScrolling(false);
  });
}
