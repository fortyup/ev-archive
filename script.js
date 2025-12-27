const heroBg = document.querySelector('.hero-bg');
const heroSection = document.querySelector('.hero-section');
const backToTopBtn = document.querySelector('.back-to-top');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let entries = [];
let boxes = [];

const parallax = () => {
    if (!heroBg || !heroSection) return;
    const rect = heroSection.getBoundingClientRect();
    if (rect.bottom <= 0) return;
    const scrolled = Math.max(0, window.pageYOffset);
    heroBg.style.transform = `translateY(${scrolled * 0.35}px) scale(1.03)`;
};

const revealEntries = () => {
    if (!entries.length) return;
    const triggerY = window.innerHeight * 0.8;
    entries.forEach(entry => {
        const entryTop = entry.getBoundingClientRect().top;
        const shouldShow = entryTop < triggerY;
        if (shouldShow) {
            entry.classList.add('visible');
        } else if (!prefersReducedMotion) {
            entry.classList.remove('visible');
        }
    });

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < window.innerHeight * 0.85) {
            box.classList.add('active');
        } else if (!prefersReducedMotion) {
            box.classList.remove('active');
        }
    });
};

const toggleBackToTop = () => {
    if (!backToTopBtn) return;
    const shouldShow = window.scrollY > 400;
    backToTopBtn.classList.toggle('visible', shouldShow);
};

let ticking = false;
const onScroll = () => {
    if (prefersReducedMotion) return;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            parallax();
            revealEntries();
            toggleBackToTop();
            ticking = false;
        });
        ticking = true;
    }
};

const createLazyImage = (episode) => {
    const img = document.createElement('img');
    img.src = episode.image;
    img.alt = episode.imageAlt;
    img.loading = 'lazy';
    img.className = 'lazy-img';
    img.addEventListener('load', () => img.classList.add('is-loaded'));
    return img;
};

const buildEpisodeEntry = (episode) => {
    const entry = document.createElement('div');
    entry.className = 'episode-entry';

    const hexNode = document.createElement('div');
    hexNode.className = 'hex-node';
    const hexInner = document.createElement('div');
    hexInner.className = 'hex-inner';
    hexInner.textContent = episode.hex;
    hexNode.appendChild(hexInner);

    const resumeBox = document.createElement('div');
    resumeBox.className = `resume-box ${episode.orientation === 'right' ? 'right-content' : 'left-content'}`;
    resumeBox.innerHTML = `
        <div class="ep-number">${episode.phase}</div>
        <h2 class="ep-title">${episode.title}</h2>
        <span class="ep-subtitle-jp">${episode.subtitle}</span>
        <p class="ep-text">${episode.description}</p>
        <a href="#" class="btn-more">ACCÉDER AUX DONNÉES</a>
    `;

    const mediaWrapper = document.createElement('div');
    mediaWrapper.className = `entry-media ${episode.orientation === 'right' ? 'media-left' : 'media-right'}`;
    const hexFrame = document.createElement('div');
    hexFrame.className = 'hex-frame';
    const img = createLazyImage(episode);
    hexFrame.appendChild(img);
    mediaWrapper.appendChild(hexFrame);

    if (episode.orientation === 'right') {
        entry.append(mediaWrapper, hexNode, resumeBox);
    } else {
        entry.append(resumeBox, hexNode, mediaWrapper);
    }

    return entry;
};

const renderTimeline = (episodes = []) => {
    const timeline = document.querySelector('.timeline-container');
    if (!timeline) return;
    timeline.innerHTML = '';
    const fragment = document.createDocumentFragment();
    episodes.forEach(episode => fragment.appendChild(buildEpisodeEntry(episode)));
    timeline.appendChild(fragment);
    entries = Array.from(timeline.querySelectorAll('.episode-entry'));
    boxes = Array.from(timeline.querySelectorAll('.resume-box'));
};

const showTimelineError = (message) => {
    const timeline = document.querySelector('.timeline-container');
    if (!timeline) return;
    timeline.innerHTML = `<p class="ep-text">${message}</p>`;
    entries = [];
    boxes = [];
};

const initializeInteractions = () => {
    if (!prefersReducedMotion) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', revealEntries);
        parallax();
    } else {
        if (heroBg) heroBg.style.transform = '';
        entries.forEach(entry => entry.classList.add('visible'));
        boxes.forEach(box => box.classList.add('active'));
        window.addEventListener('scroll', toggleBackToTop, { passive: true });
    }
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            const behavior = prefersReducedMotion ? 'auto' : 'smooth';
            window.scrollTo({ top: 0, behavior });
        });
    }
    toggleBackToTop();
    revealEntries();
};

const loadTimeline = async () => {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        renderTimeline(data.episodes || []);
    } catch (error) {
        console.error('Impossible de charger les données de la timeline', error);
        showTimelineError('Impossible de charger les données de la timeline.');
    }
    initializeInteractions();
};

document.addEventListener('DOMContentLoaded', loadTimeline);