window.onload = function() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
  
  const windowInnerWidth = document.documentElement.clientWidth;
  console.log('windowInnerWidth: ', windowInnerWidth);
  const windowInnerHeight = document.documentElement.clientHeight;
  console.log('windowInnerHeight: ', windowInnerHeight);

  function sizeContent() {
    const bodyHeight = window.innerHeight;
    const headerHeight = document.querySelector('.header').clientHeight;
    const footerHeight = document.querySelector('.footer').clientHeight;
    const titleHeight = document.querySelector('.content__title').clientHeight;
    const content = document.querySelector('.content');
    const contentWrapper = document.querySelector('.content__wrapper');
    const contentLeft = document.querySelector('.content__left .text');
    const contentLeftFull = document.querySelector('.content__wrapper .content__left--full .text');

    contentHeight = bodyHeight - headerHeight - footerHeight - 4;
    content.style.Height = `${contentHeight}px`;
  
    if (windowInnerWidth > 1366) {
      maxHeightContentWrapper = contentHeight - titleHeight - 60;
    } else {
      maxHeightContentWrapper = contentHeight - titleHeight - 40;
    };
    contentWrapper.style.maxHeight = `${maxHeightContentWrapper}px`;
    if (contentLeftFull) {
      contentLeftFull.style.maxHeight = `${maxHeightContentWrapper}px`;
    }

    if (windowInnerWidth < 1025 && windowInnerWidth < windowInnerHeight) {
      contentLeft.style.maxHeight = `${maxHeightContentWrapper * 0.5}px`
    }
  }
  window.addEventListener('resize', sizeContent);
  sizeContent();

  // мобильное меню
  const navIcon = document.querySelector('.nav-icon');
  const mobileMenu = document.querySelector('.mobile-menu');
  const bodyNoscroll = document.body;
  const burgerSpan = document.querySelector('.nav-icon-wrap__text');

  navIcon.addEventListener('click', function () {
    this.classList.toggle('nav-icon--active');
    mobileMenu.classList.toggle('mobile-menu--active');
    bodyNoscroll.classList.toggle('noscroll');
    burgerSpan.classList.toggle('none');
  });

  const mobileNavLinks = document.querySelectorAll('.mobile-menu__item a');

  mobileNavLinks.forEach(function(item){
      item.addEventListener('click', function(){
          navIcon.classList.remove('nav-icon--active');
          mobileMenu.classList.remove('mobile-menu--active');
          bodyNoscroll.classList.remove('noscroll');
      })
  });

  // Закрываем моб.меню при ресайзе экрана
  window.addEventListener('resize', function(){
      navIcon.classList.remove('nav-icon--active');
      mobileMenu.classList.remove('mobile-menu--active');
      bodyNoscroll.classList.remove('noscroll');
  });

  // slider
  new Swiper('.img-slider', {
    loop: true,
    effect: "fade",
    navigation: {
      nextEl: '.img-slider__next',
      prevEl: '.img-slider__prev',
    },
  });

  // custom scroll
    var container = document.querySelector('.scrollbar-container');
    var content = document.querySelector('.text');
    var customScroll = document.querySelector('.scrollbar');
  
    function overflow(e) {
      return e.scrollHeight > e.offsetHeight;
    };
  
    function check() {    
        let bl = document.querySelector('.text');
        if (overflow(bl)) {  
              container.style.display = 'block';
              content.addEventListener('scroll', function(e) {
                customScroll.style.height = container.clientHeight * content.clientHeight / content.scrollHeight + "px";
                customScroll.style.top = container.clientHeight * content.scrollTop / content.scrollHeight + "px";
              });
              
              var eventScroll = new Event('scroll');
              
              window.addEventListener('resize', content.dispatchEvent.bind(content, eventScroll));
              content.dispatchEvent(eventScroll);
              
              customScroll.addEventListener('mousedown', function(start){
                start.preventDefault();
                var y = customScroll.offsetTop;
                var onMove = function(end){
                  var delta = end.pageY - start.pageY;
                  customScroll.style.top = Math.min(container.clientHeight - customScroll.clientHeight, Math.max(0, y + delta)) + 'px';
                  content.scrollTop = (content.scrollHeight * customScroll.offsetTop / container.clientHeight);
                };
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', function(){
                  document.removeEventListener('mousemove', onMove);
                });
              });
            } else {
              container.style.display = 'none';
        }
    };
    window.addEventListener("resize", check);
    check();
}

$(document).ready(function() { 
  // fancybox 
  $('[data-fancybox="gallery"]').fancybox({
    loop: true,
    autoFocus: false,
    buttons: [
      "zoom",
      "close"
    ],
    protect: true,
    animationEffect: "fade",
    animationDuration: 100,
    transitionEffect: "fade",
    hideScrollbar: true,
    backFocus: false,
    lang: "ru",
      i18n: {
          ru: {
              CLOSE: "Закрыть",
              NEXT: "Следующее фото",
              PREV: "Предыдущее фото",
              ERROR: "Контент не может быть загружен. <br/> Попробуйте позже.",
              ZOOM: "Увеличить"
          }
      }
  });
});