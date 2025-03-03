'use-stric';

// lenis
const lenis = new Lenis({
  duration: 1.4, // 기본 1, 값을 높이면 스크롤이 더 천천히 이동
  easing: (t) => 1 - Math.pow(1 - t, 3), // 부드러운 감속 효과
  smoothWheel: true, // 휠 스크롤 부드럽게 적용
  smoothTouch: false, // 모바일 터치 스크롤 부드럽게 설정 (원하는 경우 true)
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

lenis.stop();

// 첫 화면 scroll animation
gsap.registerPlugin(ScrollTrigger);
gsap.set('.visual-introwrap', { autoAlpha: 0, y: 100 });

const tl = gsap.timeline();

tl.to('body', { overflow: 'hidden' })
  .to('.visual-titlewrap', { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', ease: 'power2.out', scale: 1 })
  .to('.visual-titlewrap', { autoAlpha: 0, duration: 1.2 }, '+=2')
  .to('.visual-titlewrap', { display: 'none' }, '+=1')
  .to('.visual-introwrap', { display: 'flex', autoAlpha: 1, y: 0, duration: 1 })
  .to('.visual-list .list-item', { autoAlpha: 1, stagger: 0.3, duration: 1 })
  .to('body', { overflowY: 'scroll' })
  .to('.scrolldown-lottie', { autoAlpha: 1 })
  .add(() => {
    console.log('Lenis 시작!');
    lenis.start();
  });

ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  // pin: true,
  // markers: true,
  pinSpacing: false,
  anticipatePin: 1,
});

lottie.loadAnimation({
  container: document.querySelector('.scrolldown-lottie'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: './assets/lottie/scrolldown.json',
});

// horizontal scroll
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', function () {
  let pinWrap = document.querySelector('.portfolio .inner');
  let pinWrapWidth = pinWrap.scrollWidth; // 전체 가로 너비
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;

  // 가로 스크롤 애니메이션
  gsap.to('.portfolio .fp-auto-height', {
    x: -horizontalScrollLength, // 왼쪽 끝까지 이동
    ease: 'none',
    scrollTrigger: {
      trigger: '.portfolio',
      start: 'top top',
      end: () => `+=${pinWrapWidth + window.innerWidth}`,
      pin: true,
      scrub: 1, // 부드러운 스크롤
      invalidateOnRefresh: true, // 창 크기 변경 시 자동 업데이트
    },
  });

  ScrollTrigger.refresh();
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
