import { issues, getIssue } from "../content/issues.js";
import { brand } from "../content/brand.js";

const root = document.querySelector("#app");
const pagesBase = window.location.pathname === "/the-standard" || window.location.pathname.startsWith("/the-standard/")
  ? "/the-standard"
  : "";
const withBase = (value) => `${pagesBase}${value}`;
const path = window.location.pathname.slice(pagesBase.length).replace(/\/+$/, "") || "/";

function masthead(light = false) {
  return `
    <header class="masthead ${light ? "masthead--light" : ""}">
      <a class="wordmark" href="${withBase("/")}">The Standard.</a>
      <span class="masthead__note">One principle. One application. One competitive advantage.</span>
      <span class="brand-mark" aria-label="${brand.name}">
        <img src="${withBase(light ? brand.logos.onLight : brand.logos.onDark)}" alt="${brand.name}">
      </span>
    </header>`;
}

function home() {
  const libraryIssues = [...issues].reverse();
  document.title = "The Standard — Private Leadership Series";
  root.innerHTML = `
    <a class="skip-link" href="${withBase("/#library")}">Skip to issue library</a>
    <section class="home-hero">
      ${masthead()}
      <div class="home-hero__content reveal">
        <h1>The <span>Standard.</span></h1>
        <p class="series-intro">A private weekly series on leadership, performance and the principles that create a competitive advantage.</p>
      </div>
    </section>
    <main id="library" class="library">
      <div class="library__heading reveal">
        <h2>The issue library</h2>
        <span class="eyebrow">Private circulation · 2026</span>
      </div>
      ${libraryIssues.map((issue) => `
        <a class="issue-card reveal" href="${withBase(`/issues/${issue.slug}/`)}" aria-label="Read Issue ${issue.number}: ${issue.title}">
          <span class="issue-card__number">${issue.number}</span>
          <span>
            <span class="eyebrow">${issue.readingTime}${issue.audio ? ` · ${issue.audio.durationLabel}` : ""}</span>
            <h3>${issue.title}</h3>
            <p>${issue.summary}</p>
          </span>
          <span class="issue-card__action">Read issue</span>
        </a>`).join("")}
      <p class="coming reveal">More principles coming.</p>
    </main>
    <footer class="site-footer">
      <span>The Standard · Private leadership series</span>
      <img src="${withBase(brand.logos.onDark)}" alt="${brand.name}">
    </footer>`;
  initReveal();
}

function renderSection(section, quote) {
  return `
    <section class="article-section reveal" id="${section.id}" data-section="${section.id}">
      <div class="section-heading">
        <span class="eyebrow">${section.eyebrow}</span>
        <h2>${section.title}</h2>
      </div>
      <div class="section-body">
        ${section.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        ${section.comparisons ? `
          <div class="language-shifts" aria-label="Turn reactions into useful responses">
            ${section.comparisons.map((comparison) => `
              <div class="language-shift">
                <span class="language-shift__context">${comparison.context}</span>
                <div>
                  <span class="language-shift__label">The reaction</span>
                  <p>${comparison.reaction}</p>
                </div>
                <div>
                  <span class="language-shift__label">The useful response</span>
                  <p>${comparison.response}</p>
                </div>
              </div>`).join("")}
          </div>` : ""}
        ${section.prompts ? `<ol class="prompt-list">${section.prompts.map((item) => `<li>${item}</li>`).join("")}</ol>` : ""}
      </div>
    </section>
    ${section.media ? `
      <figure class="story-media reveal">
        <div class="story-media__image"><img src="${withBase(section.media.src)}" alt="${section.media.alt}"></div>
        <figcaption>
          <span>${section.media.caption}</span>
          <small><a href="${section.media.sourceUrl}" target="_blank" rel="noreferrer">${section.media.credit}</a> · <a href="${section.media.licenseUrl}" target="_blank" rel="noreferrer">${section.media.license}</a></small>
        </figcaption>
      </figure>` : ""}
    ${quote ? `<aside class="pull-quote reveal" aria-label="Key idea"><blockquote>${quote.text}</blockquote></aside>` : ""}`;
}

function renderAudio(issue) {
  if (!issue.audio) return "";
  const audio = issue.audio;
  return `
    <section class="audio-edition" id="listen" data-section="listen" aria-labelledby="audio-edition-title">
      <div class="audio-edition__inner reveal" data-audio-player>
        <div class="audio-edition__intro">
          <span class="eyebrow">The Audio Edition</span>
          <h2 id="audio-edition-title">${audio.label}</h2>
          <p>${audio.description}</p>
        </div>
        <div class="audio-edition__deck">
          <div class="audio-controls" role="group" aria-label="Audio edition controls">
            <button class="audio-button" type="button" data-audio-back aria-label="Back 15 seconds" disabled>−15</button>
            <button class="audio-button audio-button--play" type="button" data-audio-play aria-label="Play audio edition" disabled>▶</button>
            <div class="audio-timeline">
              <span data-audio-current>0:00</span>
              <input type="range" min="0" max="100" value="0" step="0.1" data-audio-range aria-label="Audio timeline" aria-valuetext="0:00" disabled>
              <span data-audio-duration>${audio.durationLabel}</span>
            </div>
            <button class="audio-button" type="button" data-audio-forward aria-label="Forward 15 seconds" disabled>+15</button>
            <select class="audio-speed" data-audio-speed aria-label="Playback speed" disabled>
              <option value="1" selected>1×</option>
              <option value="1.25">1.25×</option>
              <option value="1.5">1.5×</option>
            </select>
          </div>
          <div class="audio-edition__meta">
            <span>Spoken essay</span>
            <span data-audio-status aria-live="polite">Ready to listen</span>
            <a class="audio-download" href="${withBase(audio.src)}" download>Download MP3</a>
          </div>
          <details class="audio-transcript">
            <summary>Read the exact transcript</summary>
            <div>${audio.transcript.map((paragraph) => `<p>${paragraph}</p>`).join("")}</div>
          </details>
          <audio preload="metadata" data-audio src="${withBase(audio.src)}">
            Your browser does not support audio playback. <a href="${withBase(audio.src)}">Download the audio edition</a>.
          </audio>
        </div>
      </div>
    </section>`;
}

function issuePage(issue) {
  document.title = `${issue.title} — The Standard No. ${issue.number}`;
  const issueHref = withBase(`/issues/${issue.slug}/`);
  const shareUrl = new URL(issueHref, window.location.origin).href;
  const navItems = [
    ...(issue.audio ? [["listen", "Listen"]] : []),
    ...issue.sections.map((section) => [section.id, section.eyebrow]),
    ["application", "The Application"],
    ["question", "Question for Mat"],
    ["standard", "The Standard"]
  ];
  root.innerHTML = `
    <a class="skip-link" href="${issueHref}#article">Skip to article</a>
    <div class="progress" aria-hidden="true"><div class="progress__bar"></div></div>
    <section class="issue-hero">
      ${masthead()}
      <div class="issue-hero__inner">
        <div class="issue-number" aria-label="Issue ${issue.number}">${issue.number}</div>
        <div class="issue-hero__copy reveal">
          <span class="eyebrow">The Standard — No. ${issue.number}</span>
          <h1>${issue.title}</h1>
          <p class="thesis">${issue.thesis}</p>
          <div class="hero-meta meta">
            <span>${issue.readingTime}</span>
            <span>${issue.publicationDate}</span>
            <span>Private circulation</span>
          </div>
        </div>
      </div>
    </section>
    <main id="article">
      ${renderAudio(issue)}
      <div class="issue-layout">
        <nav class="section-nav" aria-label="Issue sections">
          <span class="section-nav__label">In this issue</span>
          ${navItems.map(([id, label]) => `<a href="${issueHref}#${id}">${label}</a>`).join("")}
        </nav>
        <article class="article">
          ${issue.sections.map((section) => renderSection(section, issue.pullQuotes.find((quote) => quote.after === section.id))).join("")}
          <section class="application reveal" id="application" data-section="application">
            <div class="application__head">
              <div>
                <span class="eyebrow">The Application</span>
                <h2>Make the standard visible.</h2>
              </div>
              <ol>${issue.applicationPoints.map((point) => `<li>${point}</li>`).join("")}</ol>
            </div>
          </section>
          <section class="question reveal" id="question" data-section="question">
            <span class="eyebrow">The Question for Mat</span>
            <h2>${issue.closingQuestion}</h2>
          </section>
        </article>
      </div>
      <section class="closing" id="standard" data-section="standard">
        <div class="closing__inner reveal">
          <span class="eyebrow">The Standard</span>
          <h2>${issue.closingStandard}</h2>
        </div>
      </section>
      <footer class="article-footer">
        <p class="source-note"><strong>Source note:</strong> ${issue.sources.join("; ")}.</p>
        <div class="footer-actions">
          <a class="back-link" href="${withBase("/")}">Series library</a>
          <div class="controls" aria-label="Issue actions">
            <button class="control" type="button" data-copy data-copy-url="${shareUrl}">Copy link</button>
            <button class="control" type="button" data-print>Print / PDF</button>
          </div>
        </div>
        <div class="article-brand" aria-label="${brand.attribution} ${brand.name}">
          <span>${brand.attribution}</span>
          <img src="${withBase(brand.logos.onLight)}" alt="${brand.name}">
        </div>
      </footer>
    </main>`;
  initIssue();
}

function initAudio() {
  const player = document.querySelector("[data-audio-player]");
  if (!player) return;

  const audio = player.querySelector("[data-audio]");
  const play = player.querySelector("[data-audio-play]");
  const back = player.querySelector("[data-audio-back]");
  const forward = player.querySelector("[data-audio-forward]");
  const range = player.querySelector("[data-audio-range]");
  const current = player.querySelector("[data-audio-current]");
  const duration = player.querySelector("[data-audio-duration]");
  const speed = player.querySelector("[data-audio-speed]");
  const status = player.querySelector("[data-audio-status]");
  const formatTime = (value) => {
    if (!Number.isFinite(value)) return "0:00";
    return `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, "0")}`;
  };

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
    range.max = String(audio.duration);
    range.setAttribute("aria-valuetext", `${formatTime(audio.currentTime)} of ${formatTime(audio.duration)}`);
    [play, back, forward, range, speed].forEach((control) => { control.disabled = false; });
  });
  audio.addEventListener("timeupdate", () => {
    current.textContent = formatTime(audio.currentTime);
    range.value = String(audio.currentTime);
    range.setAttribute("aria-valuetext", `${formatTime(audio.currentTime)} of ${formatTime(audio.duration)}`);
  });
  audio.addEventListener("play", () => {
    play.textContent = "Ⅱ";
    play.setAttribute("aria-label", "Pause audio edition");
    status.textContent = "Playing";
  });
  audio.addEventListener("pause", () => {
    play.textContent = "▶";
    play.setAttribute("aria-label", "Play audio edition");
    status.textContent = audio.currentTime > 0 ? "Paused" : "Ready to listen";
  });
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    play.textContent = "▶";
    play.setAttribute("aria-label", "Replay audio edition");
    current.textContent = "0:00";
    range.value = "0";
    range.setAttribute("aria-valuetext", `0:00 of ${formatTime(audio.duration)}`);
    status.textContent = "Finished";
  });
  audio.addEventListener("error", () => {
    status.textContent = "Audio unavailable — transcript remains available";
  });

  play.addEventListener("click", async () => {
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      status.textContent = "Playback could not start";
    }
  });
  back.addEventListener("click", () => {
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  });
  forward.addEventListener("click", () => {
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 15);
  });
  range.addEventListener("input", () => {
    audio.currentTime = Number(range.value);
  });
  speed.addEventListener("change", () => {
    audio.playbackRate = Number(speed.value);
  });
}

function initReveal() {
  const elements = [...document.querySelectorAll(".reveal")];
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  elements.forEach((element) => observer.observe(element));
}

function initIssue() {
  initReveal();
  initAudio();
  const progress = document.querySelector(".progress__bar");
  const updateProgress = () => {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const value = distance > 0 ? Math.min(window.scrollY / distance, 1) : 0;
    progress.style.width = `${value * 100}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const navLinks = [...document.querySelectorAll(".section-nav a")];
  const sections = [...document.querySelectorAll("[data-section]")];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.setAttribute("aria-current", String(link.hash === `#${visible.target.id}`)));
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.4] }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  document.querySelector("[data-print]").addEventListener("click", () => window.print());
  document.querySelector("[data-copy]").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const shareUrl = button.dataset.copyUrl;
    let copied = false;

    try {
      await navigator.clipboard.writeText(shareUrl);
      copied = true;
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = shareUrl;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.append(fallback);
      fallback.select();
      copied = document.execCommand("copy");
      fallback.remove();
    }

    if (copied) {
      button.textContent = "Correct link copied";
    } else {
      button.textContent = "Copy failed";
      window.prompt("Copy this permanent link:", shareUrl);
    }

    window.setTimeout(() => {
      button.textContent = "Copy link";
    }, 1800);
  });
}

const slugMatch = path.match(/^\/issues\/([^/]+)$/);
if (path === "/") {
  home();
} else if (slugMatch && getIssue(slugMatch[1])) {
  issuePage(getIssue(slugMatch[1]));
} else {
  document.title = "Issue not found — The Standard";
  root.innerHTML = `
    <header>${masthead(true)}</header>
    <main class="library">
      <span class="eyebrow">404</span>
      <h1 style="font-family:var(--serif);font-size:clamp(48px,8vw,100px);font-weight:400">This issue is not in the library.</h1>
      <a class="back-link" href="${withBase("/")}">Return to The Standard</a>
    </main>`;
}
