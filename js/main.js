'use-stric';

// lenis
const lenis = new Lenis({
  duration: 1.3, // 기본 1, 값을 높이면 스크롤이 더 천천히 이동
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
  let horizontalScrollLength = pinWrapWidth - window.innerWidth + 250;

  // 가로 스크롤 애니메이션
  gsap.to('.portfolio .fp-auto-height', {
    x: -horizontalScrollLength, // 왼쪽 끝까지 이동
    ease: 'none',
    scrollTrigger: {
      trigger: '.portfolio',
      start: 'top top',
      end: () => `+=${horizontalScrollLength}`,
      pin: true,
      scrub: 1, // 부드러운 스크롤
      invalidateOnRefresh: true,
      anticipatePin: false,
    },
  });

  ScrollTrigger.refresh();
});

// footer 년도 변경
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();

// 모든 모달 버튼과 닫기 버튼 가져오기
const modalBtns = document.querySelectorAll('.more__btn');
const modalOverlay = document.querySelector('.overlay');

// 모달 열기 버튼 이벤트 추가
modalBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal-id'); // 해당 버튼의 모달 ID 가져오기
    const modal = document.getElementById(modalId); // 모달 찾기

    if (modal) {
      modal.classList.add('active'); // 모달 활성화
      modalOverlay.classList.add('active'); // 오버레이 활성화
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    }
  });
});

// 닫기 버튼 이벤트 추가
document.querySelectorAll('.close__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal__wrap'); // 현재 모달 찾기
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // 스크롤 다시 활성화
  });
});

// 오버레이 클릭 시 닫기 기능 추가
modalOverlay.addEventListener('click', () => {
  document.querySelectorAll('.modal__wrap.active').forEach((modal) => {
    modal.classList.remove('active');
  });
  modalOverlay.classList.remove('active');
  document.body.style.overflow = ''; // 스크롤 다시 활성화
});
