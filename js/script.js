// script.js

function smoothScrollTo(target, duration = 1500) {
  const start = window.scrollY || window.pageYOffset;
  const end = target.getBoundingClientRect().top + start;
  const distance = end - start;
  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animateScroll(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, start + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      smoothScrollTo(target, 1800); // ← やや長め（1800ms）でふわっと
    }
  });
});


const anchors = document.querySelectorAll('a[href^="#"]');

function smoothScrollHandler(e) {
  e.preventDefault();
  const target = document.querySelector(this.getAttribute('href'));
  if (target) {
    smoothScrollTo(target, 1800); // ふわっとスクロール（先ほどの関数）
  }
}

// PCもスマホも対応
anchors.forEach(anchor => {
  anchor.addEventListener('click', smoothScrollHandler);
  anchor.addEventListener('touchstart', smoothScrollHandler);
});


