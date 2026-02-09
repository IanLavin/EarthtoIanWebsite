import yearlyVideos from "./yearly-videos.js";
import { initMenu } from "./js/menu.js";

const listEl = document.getElementById("years-list");

initMenu();
renderYearCards();

function renderYearCards() {
  if (!listEl) return;
  listEl.innerHTML = "";

  const sorted = [...yearlyVideos].sort((a, b) => b.year - a.year);
  sorted.forEach((item) => {
    listEl.appendChild(createYearCard(item));
  });
}

function createYearCard(item) {
  const article = document.createElement("article");
  article.className = "year-card";

  const heading = document.createElement("h2");
  heading.className = "year-title";
  heading.textContent = String(item.year);

  const subtitle = document.createElement("p");
  subtitle.className = "year-subtitle";
  subtitle.textContent = item.title || `${item.year} Year In Review`;

  const summary = document.createElement("p");
  summary.className = "year-summary";
  summary.textContent = item.summary || "Recap video coming soon.";

  article.appendChild(heading);
  article.appendChild(subtitle);
  article.appendChild(summary);

  if (Array.isArray(item.highlights) && item.highlights.length) {
    const chips = document.createElement("div");
    chips.className = "year-highlights";

    item.highlights.forEach((highlight) => {
      const chip = document.createElement("span");
      chip.className = "year-chip";
      chip.textContent = highlight;
      chips.appendChild(chip);
    });

    article.appendChild(chips);
  }

  const embed = createEmbed(item);
  if (embed) article.appendChild(embed);
  else article.appendChild(createPlaceholder());

  return article;
}

function createEmbed(item) {
  if (!item?.id || !item?.provider) return null;

  const wrap = document.createElement("div");
  wrap.className = "year-video-embed";
  const iframe = document.createElement("iframe");
  iframe.loading = "lazy";
  iframe.allowFullscreen = true;
  iframe.title = item.title || `${item.year} Year In Review`;

  if (item.provider === "vimeo") {
    iframe.src = `https://player.vimeo.com/video/${encodeURIComponent(item.id)}`;
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
  } else if (item.provider === "youtube") {
    iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(item.id)}`;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
  } else {
    return null;
  }

  wrap.appendChild(iframe);
  return wrap;
}

function createPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.className = "year-video-placeholder";
  placeholder.textContent = "Video link coming soon";
  return placeholder;
}
