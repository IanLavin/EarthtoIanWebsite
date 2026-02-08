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

  container.innerHTML = `
    <div class="carousel-inner">
      <button class="carousel-btn prev" aria-label="Previous"><</button>
      <img class="carousel-img" alt="" />
      <button class="carousel-btn next" aria-label="Next">></button>
    </div>
  `;

  const imgEl = container.querySelector(".carousel-img");
  const prevBtn = container.querySelector(".prev");
  const nextBtn = container.querySelector(".next");

  function getRandomNextIndex() {
    if (images.length <= 1) return currentIndex;
    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * images.length);
    }
    return nextIndex;
  }

  function render() {
    imgEl.src = images[currentIndex];
    imgEl.onerror = () => {
      goToNext();
    };
  }

  function goToNext() {
    if (opts.random) currentIndex = getRandomNextIndex();
    else currentIndex = (currentIndex + 1) % images.length;
    render();
  }

  function goToPrev() {
    if (opts.random) currentIndex = getRandomNextIndex();
    else currentIndex = (currentIndex - 1 + images.length) % images.length;
    render();
  }

  function stopTimer() {
    if (!timerId) return;
    window.clearInterval(timerId);
    timerId = null;
  }

  function startTimer() {
    if (!opts.autoAdvance || images.length <= 1) return;
    stopTimer();
    timerId = window.setInterval(() => {
      if (document.hidden) return;
      goToNext();
    }, opts.intervalMs);
  }

  function restartTimer() {
    stopTimer();
    startTimer();
  }

  prevBtn?.addEventListener("click", () => {
    goToPrev();
    restartTimer();
  });

  nextBtn?.addEventListener("click", () => {
    goToNext();
    restartTimer();
  });

  container.addEventListener("mouseenter", stopTimer);
  container.addEventListener("mouseleave", startTimer);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopTimer();
    else startTimer();
  });

  render();
  startTimer();

  return {
    next: goToNext,
    prev: goToPrev,
    start: startTimer,
    stop: stopTimer,
  };
}
