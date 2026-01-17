// js/carousel.js

// js/carousel.js
export function initCarousel(containerId, images = [], options = {}) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(images) || images.length === 0) return;

  const opts = {
    autoAdvance: true,
    intervalMs: 3000,
    random: true,
    ...options,
  };

  let currentIndex = 0;
  let timerId = null;

  // --- basic render (adjust if your carousel already renders differently) ---
  container.innerHTML = `
    <div class="carousel-inner">
      <button class="carousel-btn prev" aria-label="Previous">‹</button>
      <img class="carousel-img" alt="" />
      <button class="carousel-btn next" aria-label="Next">›</button>
    </div>
  `;

  const imgEl = container.querySelector(".carousel-img");
  const prevBtn = container.querySelector(".prev");
  const nextBtn = container.querySelector(".next");

  function render() {
    const src = images[currentIndex];
    imgEl.src = src;
    imgEl.onerror = () => {
      // if an image fails, skip to another
      goToNext(true);
    };
  }

  function getRandomNextIndex() {
    if (images.length <= 1) return currentIndex;

    let next = currentIndex;
    // avoid immediate repeat
    while (next === currentIndex) {
      next = Math.floor(Math.random() * images.length);
    }
    return next;
  }

  function goToNext(isAuto = false) {
    if (opts.random) {
      currentIndex = getRandomNextIndex();
    } else {
      currentIndex = (currentIndex + 1) % images.length;
    }
    render();
  }

  function goToPrev() {
    if (opts.random) {
      currentIndex = getRandomNextIndex();
    } else {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
    render();
  }

  // Buttons
  prevBtn?.addEventListener("click", () => {
    goToPrev();
    restartTimer();
  });

  nextBtn?.addEventListener("click", () => {
    goToNext();
    restartTimer();
  });

  // --- Auto-advance ---
  function startTimer() {
    if (!opts.autoAdvance || images.length <= 1) return;
    stopTimer();
    timerId = window.setInterval(() => {
      if (document.hidden) return; // don't advance in background tab
      goToNext(true);
    }, opts.intervalMs);
  }

  function stopTimer() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function restartTimer() {
    stopTimer();
    startTimer();
  }

  // Pause on hover
  container.addEventListener("mouseenter", stopTimer);
  container.addEventListener("mouseleave", startTimer);

  // Pause/resume on tab visibility change
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopTimer();
    else startTimer();
  });

  // Initial
  render();
  startTimer();

  // Optional: return controls (handy if you ever want to stop/destroy later)
  return {
    next: goToNext,
    prev: goToPrev,
    start: startTimer,
    stop: stopTimer,
  };
}
