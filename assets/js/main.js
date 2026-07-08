/**
 * Dr. Pramod Kumar - Academic Portfolio
 * Main JavaScript Module
 * ============================================================
 * Handles: Navigation, Theme, Loading, Animations, Interactions
 * ============================================================
 */

'use strict';

const App = (() => {
  // ----- DOM References -----
  let body;
  let nav;
  let menuToggle;
  let mobileNav;
  let mobileOverlay;
  let themeToggle;

  // ----- State -----
  let isMenuOpen = false;
  let isDarkMode = localStorage.getItem('theme') === 'dark';

  // ============================================================
  // INIT
  // ============================================================
  function queryDOMElements() {
    body = document.body;
    nav = document.querySelector('.nav');
    menuToggle = document.querySelector('.menu-toggle');
    mobileNav = document.querySelector('.mobile-nav');
    mobileOverlay = document.querySelector('.mobile-nav-overlay');
    themeToggle = document.querySelector('.theme-toggle');
  }

  function init() {
    queryDOMElements();
    setTheme(isDarkMode);
    initNavigation();
    initScrollProgress();
    initMobileMenu();
    initThemeToggle();
    initSmoothScroll();
    initCounters();
    initScrollAnimations();
    initPublicationFilters();
    initLightbox();
    initParticles();
    initHeaderAnimation();
    initResearchModal();
    initScrollToTop();
    setActiveNavLink();
  }

  // ============================================================
  // THEME
  // ============================================================
  function setTheme(dark) {
    isDarkMode = dark;
    body.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    if (themeToggle) {
      themeToggle.innerHTML = dark ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  function toggleTheme() {
    setTheme(!isDarkMode);
  }

  function initThemeToggle() {
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
  }

  // ============================================================
  // NAVIGATION
  // ============================================================
  function initNavigation() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      // Add scrolled class
      if (currentScroll > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Hide/show on scroll
      if (currentScroll > lastScroll && currentScroll > nav.offsetHeight) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ============================================================
  // SCROLL PROGRESS INDICATOR
  // ============================================================
  function initScrollProgress() {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progress.style.width = scrolled + '%';
    }, { passive: true });
  }

  // ============================================================
  // MOBILE MENU
  // ============================================================
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    body.style.overflow = isMenuOpen ? 'hidden' : '';
  }

  function initMobileMenu() {
    if (menuToggle) {
      menuToggle.addEventListener('click', toggleMenu);
    }
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', toggleMenu);
    }

    // Close on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
      });
    });
  }

  // ============================================================


  // ============================================================
  // SMOOTH SCROLL (Lenis via CDN)
  // ============================================================
  function initSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1.1,
        smoothTouch: false,
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenis.on('scroll', ({ scroll }) => {
        // Trigger scroll-based animations
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Expose to window for GSAP integration
      window.lenis = lenis;
    }
  }

  // ============================================================
  // COUNTER ANIMATIONS
  // ============================================================
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter'));
          const duration = parseInt(el.getAttribute('data-duration')) || 2000;
          const suffix = el.getAttribute('data-suffix') || '';
          let start = 0;
          const increment = target / (duration / 16);

          function updateCounter() {
            start += increment;
            if (start < target) {
              el.textContent = Math.floor(start) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target + suffix;
            }
          }
          updateCounter();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // ============================================================
  // SCROLL ANIMATIONS (AOS)
  // ============================================================
  function initScrollAnimations() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
        disable: 'mobile',
      });
    }
  }

  // ============================================================
  // PUBLICATION FILTERS
  // ============================================================
  function initPublicationFilters() {
    const filterBtns = document.querySelectorAll('.pub-filter-btn');
    const searchInput = document.querySelector('.pub-search');
    const pubCards = document.querySelectorAll('.pub-card');

    if (!filterBtns.length && !pubCards.length) return;

    function filterPublications() {
      const activeFilter = document.querySelector('.pub-filter-btn.active');
      const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

      let matchCount = 0;
      pubCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const text = card.textContent.toLowerCase();
        
        // Multi-category match fix: split data-category list and check if it contains the target tag
        const categoriesList = category.split(' ');
        const matchFilter = filterValue === 'all' || categoriesList.includes(filterValue);
        const matchSearch = !searchTerm || text.includes(searchTerm);

        if (matchFilter && matchSearch) {
          card.style.display = 'block';
          card.style.opacity = '1';
          matchCount++;
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });

      // Handle "No Results" message
      let noResultsMsg = document.getElementById('no-pubs-msg');
      if (matchCount === 0) {
        if (!noResultsMsg) {
          noResultsMsg = document.createElement('div');
          noResultsMsg.id = 'no-pubs-msg';
          noResultsMsg.className = 'glass-card text-center p-12 mt-6';
          noResultsMsg.style.gridColumn = '1 / -1';
          noResultsMsg.style.width = '100%';
          noResultsMsg.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--text-muted);margin:0 auto 1rem;display:block"><use href="/assets/icons/scientific-icons.svg#icon-publication"/></svg>
            <h3 class="text-xl font-bold mb-2">No Publications Found</h3>
            <p style="color:var(--text-muted)">We couldn't find any papers matching your active filters or search term.</p>
          `;
          const container = document.getElementById('publications-list') || document.querySelector('.space-y-4');
          if (container) {
            container.appendChild(noResultsMsg);
          }
        }
        noResultsMsg.style.display = 'block';
      } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
      }
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterPublications();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', filterPublications);
    }
  }

  // ============================================================
  // LIGHTBOX
  // ============================================================
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (!lightbox) return;

    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-lightbox');
        lightboxImg.src = imgSrc;
        lightbox.classList.add('open');
        body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ============================================================
  // PARTICLES
  // ============================================================
  function initParticles() {
    if (typeof particlesJS !== 'undefined') {
      const particleContainers = document.querySelectorAll('.hero-particle, .particle-container');
      
      particleContainers.forEach((container, index) => {
        const id = container.id || `particles-${index}`;
        if (!container.id) container.id = id;

        particlesJS(id, {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#00D4FF' },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: true },
            size: { value: 2, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#00D4FF',
              opacity: 0.1,
              width: 1
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: true, mode: 'repulse' },
              onclick: { enable: true, mode: 'push' }
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { particles_nb: 4 }
            }
          },
          retina_detect: true
        });
      });
    }
  }

  // ============================================================
  // DNA CANVAS ANIMATION
  // ============================================================
  // ============================================================
  // HEADER & FOOTER CANVAS ANIMATIONS (Topic-Specific)
  // ============================================================
  function initHeaderAnimation() {
    const containers = document.querySelectorAll('.dna-container, .footer-dna');
    if (!containers.length) return;

    containers.forEach(container => {
      // 1. Create canvas
      const canvas = document.createElement('canvas');
      container.appendChild(canvas);
      container.classList.add('canvas-active');

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 2. Determine animation type
      let animType = 'dna'; // Default
      
      if (container.classList.contains('dna-container')) {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        if (page === 'research.html') {
          animType = 'molecules';
        } else if (page === 'publications.html') {
          animType = 'publications';
        } else if (page === 'journey.html') {
          animType = 'grants';
        } else if (page === 'grants.html') {
          animType = 'media';
        } else if (page === 'lab.html') {
          animType = 'lab';
        } else if (page === 'recognition.html') {
          animType = 'recognition';
        } else if (page === 'gallery.html') {
          animType = 'gallery';
        } else if (page === 'collaboration.html') {
          animType = 'collaborations';
        } else if (page === 'media.html') {
          animType = 'media';
        } else if (page === 'contact.html') {
          animType = 'contact';
        }
      }

      // 3. State variables
      let width = 0;
      let height = 0;
      let angleOffset = 0;
      let waveOffset = 0;
      let lastTheme = '';
      let colorHighlight = '#0F6E67';
      let colorSecondary = '#C98A2C';

      // Persistent states for custom animations (encapsulated per canvas)
      const moleculesState = [];
      const publicationsState = [];
      const grantsState = [];
      const labState = [];
      const recognitionState = [];
      const contactState = [];
      const mediaState = [];
      let sphereNodes = null;

      // Responsive configuration parameters
      let config = {
        numNodes: 0,
        helixRadius: 0,
        waveAmplitude: 0,
        nodeRadius: 5,
        rotationSpeed: 0.015,
        waveSpeed: 0.012,
        phaseFrequency: 0.2,
        waveFrequency: 0.06
      };

      // 4. Color parsing & styling helpers
      function hexToRgba(hex, alpha) {
        hex = hex.trim();
        if (hex.startsWith('rgb')) {
          return hex.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
        }
        if (hex.startsWith('#')) {
          let c = hex.substring(1);
          if (c.length === 3) {
            c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
          }
          const num = parseInt(c, 16);
          return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
        }
        return hex;
      }

      function updateColors() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        if (currentTheme !== lastTheme) {
          lastTheme = currentTheme;
          const bodyStyles = getComputedStyle(document.body);
          // Fallbacks based on theme
           const fallbackHighlight = '#0F6E67';
           const fallbackSecondary = '#C98A2C';
          colorHighlight = bodyStyles.getPropertyValue('--highlight').trim() || fallbackHighlight;
          colorSecondary = bodyStyles.getPropertyValue('--secondary').trim() || fallbackSecondary;
        }
      }

      // 5. Resize handler
      function resize() {
        const rect = container.getBoundingClientRect();
        width = rect.width;
        height = rect.height;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        // Adjust parameters to container size
        config.helixRadius = Math.max(25, Math.min(height * 0.20, 65));
        config.waveAmplitude = Math.max(10, Math.min(height * 0.07, 35));
        config.numNodes = Math.max(15, Math.ceil(width / 35));
        config.nodeRadius = height > 500 ? 5 : 4;

        // Clear states on resize to rebuild them layout-properly
        moleculesState.length = 0;
        publicationsState.length = 0;
        grantsState.length = 0;
        labState.length = 0;
        recognitionState.length = 0;
        contactState.length = 0;
        sphereNodes = null;
      }

      window.addEventListener('resize', resize);
      resize();

      // ============================================================
      // RENDERING ENGINES
      // ============================================================

      // A. DNA (Home & About)
      function drawDNA() {
        const renderQueue = [];
        const pointsA = [];
        const pointsB = [];

        for (let i = 0; i < config.numNodes; i++) {
          const t = i / (config.numNodes - 1);
          const x = t * width;
          const angle = angleOffset + (t * Math.PI * 2 * (width / 500) * config.phaseFrequency);
          const yBase = (height / 2) + config.waveAmplitude * Math.sin(waveOffset + (t * Math.PI * 2 * config.waveFrequency));

          const yA = yBase + config.helixRadius * Math.cos(angle);
          const zA = Math.sin(angle);
          const yB = yBase - config.helixRadius * Math.cos(angle);
          const zB = -Math.sin(angle);

          pointsA.push({ x, y: yA, z: zA, index: i });
          pointsB.push({ x, y: yB, z: zB, index: i });
        }

        for (let i = 0; i < config.numNodes; i++) {
          const ptA = pointsA[i];
          const ptB = pointsB[i];
          if (i % 2 === 0) {
            const zAvg = (ptA.z + ptB.z) / 2;
            renderQueue.push({
              z: zAvg,
              draw: () => {
                const alpha = 0.25 + 0.35 * ((zAvg + 1) / 2);
                const grad = ctx.createLinearGradient(ptA.x, ptA.y, ptB.x, ptB.y);
                grad.addColorStop(0, hexToRgba(colorHighlight, alpha));
                grad.addColorStop(1, hexToRgba(colorSecondary, alpha));
                ctx.beginPath();
                ctx.moveTo(ptA.x, ptA.y);
                ctx.lineTo(ptB.x, ptB.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.stroke();
              }
            });
          }
        }

        for (let i = 0; i < config.numNodes - 1; i++) {
          const ptA1 = pointsA[i];
          const ptA2 = pointsA[i + 1];
          const ptB1 = pointsB[i];
          const ptB2 = pointsB[i + 1];

          const zAvgA = (ptA1.z + ptA2.z) / 2;
          renderQueue.push({
            z: zAvgA,
            draw: () => {
              const alpha = 0.15 + 0.45 * ((zAvgA + 1) / 2);
              ctx.beginPath();
              ctx.moveTo(ptA1.x, ptA1.y);
              ctx.lineTo(ptA2.x, ptA2.y);
              ctx.strokeStyle = hexToRgba(colorHighlight, alpha);
              ctx.lineWidth = 2.5;
              ctx.stroke();
            }
          });

          const zAvgB = (ptB1.z + ptB2.z) / 2;
          renderQueue.push({
            z: zAvgB,
            draw: () => {
              const alpha = 0.15 + 0.45 * ((zAvgB + 1) / 2);
              ctx.beginPath();
              ctx.moveTo(ptB1.x, ptB1.y);
              ctx.lineTo(ptB2.x, ptB2.y);
              ctx.strokeStyle = hexToRgba(colorSecondary, alpha);
              ctx.lineWidth = 2.5;
              ctx.stroke();
            }
          });
        }

        for (let i = 0; i < config.numNodes; i++) {
          const ptA = pointsA[i];
          const ptB = pointsB[i];

          renderQueue.push({
            z: ptA.z,
            draw: () => {
              const scale = (ptA.z + 1.5) / 2.5;
              const r = config.nodeRadius * scale;
              const alpha = 0.35 + 0.55 * ((ptA.z + 1) / 2);
              ctx.beginPath();
              ctx.arc(ptA.x, ptA.y, r, 0, Math.PI * 2);
              ctx.fillStyle = hexToRgba(colorHighlight, alpha);
              if (ptA.z > 0.4) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = colorHighlight;
              }
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          });

          renderQueue.push({
            z: ptB.z,
            draw: () => {
              const scale = (ptB.z + 1.5) / 2.5;
              const r = config.nodeRadius * scale;
              const alpha = 0.35 + 0.55 * ((ptB.z + 1) / 2);
              ctx.beginPath();
              ctx.arc(ptB.x, ptB.y, r, 0, Math.PI * 2);
              ctx.fillStyle = hexToRgba(colorSecondary, alpha);
              if (ptB.z > 0.4) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = colorSecondary;
              }
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          });
        }

        renderQueue.sort((a, b) => a.z - b.z);
        renderQueue.forEach(item => item.draw());
      }

      // B. Molecules (Research)
      function initMoleculesState() {
        if (moleculesState.length > 0) return;
        const count = 3;
        for (let i = 0; i < count; i++) {
          moleculesState.push({
            x: width * (0.25 + 0.5 * Math.random()),
            y: height * (0.3 + 0.4 * Math.random()),
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.2,
            rx: Math.random() * Math.PI,
            ry: Math.random() * Math.PI,
            rz: Math.random() * Math.PI,
            vrx: (Math.random() + 0.2) * 0.008,
            vry: (Math.random() + 0.2) * 0.008,
            vrz: (Math.random() + 0.2) * 0.005,
            scale: Math.max(0.6, Math.min(height * 0.002, 1.2)) * (0.8 + 0.4 * Math.random())
          });
        }
      }

      function drawMolecules() {
        initMoleculesState();
        
        moleculesState.forEach(mol => {
          mol.x += mol.vx;
          mol.y += mol.vy;
          mol.rx += mol.vrx;
          mol.ry += mol.vry;
          mol.rz += mol.vrz;

          if (mol.x < 100 || mol.x > width - 100) mol.vx *= -1;
          if (mol.y < 50 || mol.y > height - 50) mol.vy *= -1;

          const R = 35 * mol.scale;
          const localNodes = [];
          const bonds = [];

          for (let j = 0; j < 6; j++) {
            const angle = j * Math.PI / 3;
            localNodes.push({ x: R * Math.cos(angle), y: R * Math.sin(angle), z: 0, type: 'C' });
            bonds.push([j, (j + 1) % 6]);
          }
          for (let j = 0; j < 6; j++) {
            const angle = j * Math.PI / 3;
            localNodes.push({ x: 1.5 * R * Math.cos(angle), y: 1.5 * R * Math.sin(angle), z: 12 * Math.sin(j), type: 'H' });
            bonds.push([j, j + 6]);
          }

          const projected = [];
          localNodes.forEach(node => {
            let y1 = node.y * Math.cos(mol.rx) - node.z * Math.sin(mol.rx);
            let z1 = node.y * Math.sin(mol.rx) + node.z * Math.cos(mol.rx);
            let x2 = node.x * Math.cos(mol.ry) + z1 * Math.sin(mol.ry);
            let z2 = -node.x * Math.sin(mol.ry) + z1 * Math.cos(mol.ry);
            let x3 = x2 * Math.cos(mol.rz) - y1 * Math.sin(mol.rz);
            let y3 = x2 * Math.sin(mol.rz) + y1 * Math.cos(mol.rz);

            projected.push({ x: mol.x + x3, y: mol.y + y3, z: z2, type: node.type });
          });

          const queue = [];
          bonds.forEach(([idx1, idx2]) => {
            const pt1 = projected[idx1];
            const pt2 = projected[idx2];
            const zAvg = (pt1.z + pt2.z) / 2;
            queue.push({
              z: zAvg,
              draw: () => {
                const alpha = 0.25 + 0.35 * ((zAvg + R) / (2 * R));
                ctx.beginPath();
                ctx.moveTo(pt1.x, pt1.y);
                ctx.lineTo(pt2.x, pt2.y);
                ctx.strokeStyle = hexToRgba(colorSecondary, alpha * 0.7);
                ctx.lineWidth = pt1.type === 'C' && pt2.type === 'C' ? 2 : 1;
                ctx.stroke();
              }
            });
          });

          projected.forEach((pt) => {
            queue.push({
              z: pt.z,
              draw: () => {
                const scale = (pt.z + R * 2) / (R * 3);
                const r = (pt.type === 'C' ? 6 : 3.5) * scale;
                const alpha = 0.35 + 0.55 * ((pt.z + R) / (2 * R));
                
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
                ctx.fillStyle = hexToRgba(pt.type === 'C' ? colorHighlight : colorSecondary, alpha);
                if (pt.z > 10) {
                  ctx.shadowBlur = 8;
                  ctx.shadowColor = pt.type === 'C' ? colorHighlight : colorSecondary;
                }
                ctx.fill();
                ctx.shadowBlur = 0;
              }
            });
          });

          queue.sort((a, b) => a.z - b.z);
          queue.forEach(item => item.draw());
        });
      }

      // C. Publications (Publications)
      function initPublicationsState() {
        if (publicationsState.length > 0) return;
        const mainNodesCount = 5;
        for (let i = 0; i < mainNodesCount; i++) {
          publicationsState.push({
            type: 'main',
            x: width * (0.2 + 0.6 * Math.random()),
            y: height * (0.3 + 0.4 * Math.random()),
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.2,
            radius: 8 + Math.random() * 4,
            pulseOffset: Math.random() * Math.PI * 2
          });
        }
        for (let i = 0; i < 20; i++) {
          const parentIdx = Math.floor(Math.random() * mainNodesCount);
          const parent = publicationsState[parentIdx];
          publicationsState.push({
            type: 'citation',
            parentIdx: parentIdx,
            orbitRadius: 40 + Math.random() * 60,
            orbitAngle: Math.random() * Math.PI * 2,
            orbitSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
            radius: 3 + Math.random() * 2,
            x: 0,
            y: 0
          });
        }
      }

      function drawPublications() {
        initPublicationsState();

        publicationsState.forEach(node => {
          if (node.type === 'main') {
            node.x += node.vx;
            node.y += node.vy;
            if (node.x < 50 || node.x > width - 50) node.vx *= -1;
            if (node.y < 50 || node.y > height - 50) node.vy *= -1;
          } else {
            const parent = publicationsState[node.parentIdx];
            node.orbitAngle += node.orbitSpeed;
            node.x = parent.x + node.orbitRadius * Math.cos(node.orbitAngle);
            node.y = parent.y + node.orbitRadius * Math.sin(node.orbitAngle);
          }
        });

        ctx.lineWidth = 1;
        publicationsState.forEach(node => {
          if (node.type === 'citation') {
            const parent = publicationsState[node.parentIdx];
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(parent.x, parent.y);
            ctx.strokeStyle = hexToRgba(colorSecondary, 0.18);
            ctx.stroke();

            publicationsState.forEach(other => {
              if (other !== node && other.type === 'citation') {
                const dist = Math.hypot(node.x - other.x, node.y - other.y);
                if (dist < 70) {
                  ctx.beginPath();
                  ctx.moveTo(node.x, node.y);
                  ctx.lineTo(other.x, other.y);
                  ctx.strokeStyle = hexToRgba(colorHighlight, (1 - dist / 70) * 0.12);
                  ctx.stroke();
                }
              }
            });
          }
        });

        publicationsState.forEach(node => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          if (node.type === 'main') {
            const pulse = 1 + 0.1 * Math.sin(Date.now() * 0.002 + node.pulseOffset);
            ctx.fillStyle = hexToRgba(colorHighlight, 0.8);
            ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
            ctx.shadowBlur = 8;
            ctx.shadowColor = colorHighlight;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = hexToRgba(colorSecondary, 0.5);
            ctx.fill();
          }
        });
      }

      // D. Grants (Grants)
      function initGrantsState() {
        if (grantsState.length > 0) return;
        for (let i = 0; i < 25; i++) {
          grantsState.push({
            type: 'bubble',
            t: Math.random(),
            speed: 0.001 + Math.random() * 0.0015,
            yOffset: (Math.random() - 0.5) * 30,
            radius: 3 + Math.random() * 5,
            pulsePhase: Math.random() * Math.PI
          });
        }
        for (let i = 0; i < 4; i++) {
          grantsState.push({
            type: 'milestone',
            xRatio: 0.2 + i * 0.22,
            pulsePhase: Math.random() * Math.PI
          });
        }
      }

      function drawGrants() {
        initGrantsState();

        ctx.beginPath();
        ctx.lineWidth = 2;
        const grad = ctx.createLinearGradient(0, height / 2, width, height / 2);
        grad.addColorStop(0, hexToRgba(colorSecondary, 0.05));
        grad.addColorStop(0.5, hexToRgba(colorHighlight, 0.25));
        grad.addColorStop(1, hexToRgba(colorSecondary, 0.05));
        ctx.strokeStyle = grad;
        
        for (let x = 0; x <= width; x += 10) {
          const y = (height / 2) + Math.sin(x * 0.005 + Date.now() * 0.0008) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        grantsState.forEach(item => {
          if (item.type === 'milestone') {
            const x = item.xRatio * width;
            const yBase = (height / 2) + Math.sin(x * 0.005 + Date.now() * 0.0008) * 20;
            const pulse = Math.sin(Date.now() * 0.0015 + item.pulsePhase);
            const alpha = 0.15 + 0.25 * (pulse + 1) / 2;

            ctx.beginPath();
            ctx.moveTo(x, 20);
            ctx.lineTo(x, height - 20);
            ctx.strokeStyle = hexToRgba(colorSecondary, alpha);
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.beginPath();
            ctx.arc(x, yBase, 8 + pulse * 2, 0, Math.PI * 2);
            ctx.fillStyle = hexToRgba(colorHighlight, alpha + 0.3);
            ctx.shadowBlur = 10;
            ctx.shadowColor = colorHighlight;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });

        grantsState.forEach(item => {
          if (item.type === 'bubble') {
            item.t += item.speed;
            if (item.t > 1) {
              item.t = 0;
              item.speed = 0.001 + Math.random() * 0.0015;
            }

            const x = item.t * width;
            const yBase = (height / 2) + Math.sin(x * 0.005 + Date.now() * 0.0008) * 20;
            const y = yBase + item.yOffset + Math.sin(Date.now() * 0.002 + item.pulsePhase) * 10;
            const alpha = 0.15 + 0.45 * Math.sin(item.t * Math.PI);

            ctx.beginPath();
            ctx.arc(x, y, item.radius, 0, Math.PI * 2);
            ctx.fillStyle = hexToRgba(colorHighlight, alpha);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, item.radius + 3, 0, Math.PI * 2);
            ctx.strokeStyle = hexToRgba(colorSecondary, alpha * 0.5);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      // E. Lab (Floating Beakers, Flasks, Test Tubes)
      function initLabState() {
        if (labState.length > 0) return;
        const count = 12;
        for (let i = 0; i < count; i++) {
          const type = ['beaker', 'flask', 'testtube'][Math.floor(Math.random() * 3)];
          labState.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            scale: Math.random() * 0.4 + 0.5,
            angle: Math.random() * Math.PI * 2,
            vAngle: (Math.random() - 0.5) * 0.01,
            opacity: Math.random() * 0.2 + 0.1,
            wigglePhase: Math.random() * Math.PI * 2,
            type: type,
            color: Math.random() > 0.5 ? colorHighlight : colorSecondary
          });
        }
      }

      function drawLab() {
        initLabState();
        ctx.shadowBlur = 0;

        labState.forEach(item => {
          item.x += item.vx;
          item.y += item.vy;
          item.angle += item.vAngle;
          item.wigglePhase += 0.05;

          if (item.x < -60) item.x = width + 60;
          if (item.x > width + 60) item.x = -60;
          if (item.y < -60) item.y = height + 60;
          if (item.y > height + 60) item.y = -60;

          ctx.save();
          ctx.translate(item.x, item.y);
          ctx.rotate(item.angle);
          ctx.scale(item.scale, item.scale);

          ctx.strokeStyle = hexToRgba(item.color, item.opacity);
          ctx.fillStyle = hexToRgba(item.color, item.opacity * 0.15);
          ctx.lineWidth = 2.5;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';

          if (item.type === 'flask') {
            ctx.beginPath();
            ctx.moveTo(-12, -30);
            ctx.lineTo(12, -30);
            ctx.lineTo(12, -10);
            ctx.lineTo(32, 25);
            ctx.lineTo(-32, 25);
            ctx.lineTo(-12, -10);
            ctx.lineTo(-12, -30);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-20, 5);
            for (let w = -20; w <= 20; w += 2) {
              const wy = 5 + Math.sin(w * 0.2 + item.wigglePhase) * 2;
              ctx.lineTo(w, wy);
            }
            ctx.lineTo(26, 23);
            ctx.lineTo(-26, 23);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(14, 10); ctx.lineTo(18, 10);
            ctx.moveTo(10, 0); ctx.lineTo(13, 0);
            ctx.moveTo(6, -10); ctx.lineTo(9, -10);
            ctx.strokeStyle = hexToRgba(item.color, item.opacity * 0.7);
            ctx.lineWidth = 1.5;
            ctx.stroke();

          } else if (item.type === 'beaker') {
            ctx.beginPath();
            ctx.moveTo(-22, -25);
            ctx.quadraticCurveTo(-26, -27, -22, -29);
            ctx.lineTo(-18, -25);
            ctx.lineTo(18, -25);
            ctx.lineTo(18, 25);
            ctx.quadraticCurveTo(18, 29, 14, 29);
            ctx.lineTo(-14, 29);
            ctx.quadraticCurveTo(-18, 29, -18, 25);
            ctx.lineTo(-18, -25);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-16, 2);
            for (let w = -16; w <= 16; w += 2) {
              const wy = 2 + Math.sin(w * 0.2 + item.wigglePhase) * 2;
              ctx.lineTo(w, wy);
            }
            ctx.lineTo(16, 27);
            ctx.lineTo(-16, 27);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(10, 15); ctx.lineTo(14, 15);
            ctx.moveTo(10, 5); ctx.lineTo(14, 5);
            ctx.moveTo(10, -5); ctx.lineTo(14, -5);
            ctx.moveTo(10, -15); ctx.lineTo(14, -15);
            ctx.strokeStyle = hexToRgba(item.color, item.opacity * 0.7);
            ctx.lineWidth = 1.5;
            ctx.stroke();

          } else if (item.type === 'testtube') {
            ctx.beginPath();
            ctx.moveTo(-10, -25);
            ctx.quadraticCurveTo(-12, -27, -10, -29);
            ctx.lineTo(10, -29);
            ctx.quadraticCurveTo(12, -27, 10, -25);
            ctx.lineTo(8, -25);
            ctx.lineTo(8, 15);
            ctx.arc(0, 15, 8, 0, Math.PI);
            ctx.lineTo(-8, -25);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-7, -5);
            for (let w = -7; w <= 7; w += 2) {
              const wy = -5 + Math.sin(w * 0.3 + item.wigglePhase) * 1.5;
              ctx.lineTo(w, wy);
            }
            ctx.lineTo(7, 15);
            ctx.arc(0, 15, 7, 0, Math.PI);
            ctx.lineTo(-7, 15);
            ctx.closePath();
            ctx.fill();
          }

          ctx.fillStyle = hexToRgba(item.color, item.opacity * 0.6);
          for (let j = 0; j < 3; j++) {
            const bx = Math.sin(item.wigglePhase * 0.5 + j) * 8;
            const by = -28 - ( (item.wigglePhase * 10 + j * 15) % 35 );
            const bSize = Math.max(1, 2.5 - (( -28 - by ) * 0.05));
            ctx.beginPath();
            ctx.arc(bx, by, bSize, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        });
      }

      // F. Recognition (Awards)
      function initRecognitionState() {
        if (recognitionState.length > 0) return;
        const count = 10;
        for (let i = 0; i < count; i++) {
          const type = ['trophy', 'medal', 'badge'][Math.floor(Math.random() * 3)];
          recognitionState.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            scale: Math.random() * 0.35 + 0.5,
            angle: (Math.random() - 0.5) * 0.5,
            vAngle: (Math.random() - 0.5) * 0.006,
            opacity: Math.random() * 0.2 + 0.1,
            wigglePhase: Math.random() * Math.PI * 2,
            type: type,
            color: Math.random() > 0.5 ? colorHighlight : colorSecondary
          });
        }
        for (let i = 0; i < 15; i++) {
          recognitionState.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0,
            vy: -0.25 - Math.random() * 0.2,
            scale: Math.random() * 0.3 + 0.4,
            angle: Math.random() * Math.PI * 2,
            vAngle: 0.01,
            opacity: Math.random() * 0.25 + 0.1,
            wigglePhase: Math.random() * Math.PI * 2,
            type: 'star-burst',
            color: colorHighlight
          });
        }
      }

      function drawRecognition() {
        initRecognitionState();
        ctx.shadowBlur = 0;

        recognitionState.forEach(item => {
          item.x += item.vx;
          item.y += item.vy;
          item.angle += item.vAngle;
          item.wigglePhase += 0.03;

          if (item.x < -50) item.x = width + 50;
          if (item.x > width + 50) item.x = -50;
          if (item.y < -50) item.y = height + 50;
          if (item.y > height + 50) item.y = -50;

          ctx.save();
          ctx.translate(item.x, item.y);
          ctx.rotate(item.angle);
          ctx.scale(item.scale, item.scale);

          ctx.strokeStyle = hexToRgba(item.color, item.opacity);
          ctx.fillStyle = hexToRgba(item.color, item.opacity * 0.15);
          ctx.lineWidth = 2.5;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';

          if (item.type === 'trophy') {
            ctx.beginPath();
            ctx.moveTo(-16, -22);
            ctx.lineTo(16, -22);
            ctx.bezierCurveTo(16, -10, 12, 5, 0, 8);
            ctx.bezierCurveTo(-12, 5, -16, -10, -16, -22);
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(0, 8);
            ctx.lineTo(0, 20);
            ctx.moveTo(-12, 20);
            ctx.lineTo(12, 20);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-16, -18);
            ctx.bezierCurveTo(-26, -18, -26, -6, -12, -4);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(16, -18);
            ctx.bezierCurveTo(26, -18, 26, -6, 12, -4);
            ctx.stroke();

          } else if (item.type === 'medal') {
            ctx.beginPath();
            ctx.moveTo(-10, -25);
            ctx.lineTo(0, -10);
            ctx.lineTo(10, -25);
            ctx.strokeStyle = hexToRgba(item.color, item.opacity * 0.6);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, 13, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            const cx = 0, cy = 0, spikes = 5, outerRadius = 6, innerRadius = 3;
            let rot = Math.PI / 2 * 3;
            let x = cx, y = cy;
            const step = Math.PI / spikes;
            ctx.moveTo(cx, cy - outerRadius);
            for (let s = 0; s < spikes; s++) {
              x = cx + Math.cos(rot) * outerRadius;
              y = cy + Math.sin(rot) * outerRadius;
              ctx.lineTo(x, y);
              rot += step;
              x = cx + Math.cos(rot) * innerRadius;
              y = cy + Math.sin(rot) * innerRadius;
              ctx.lineTo(x, y);
              rot += step;
            }
            ctx.lineTo(cx, cy - outerRadius);
            ctx.closePath();
            ctx.fillStyle = hexToRgba(item.color, item.opacity * 0.8);
            ctx.fill();

          } else if (item.type === 'badge') {
            ctx.beginPath();
            ctx.arc(0, -6, 14, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.arc(0, -6, 8, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-6, 4);
            ctx.lineTo(-10, 22);
            ctx.lineTo(-4, 18);
            ctx.lineTo(-1, 4);
            ctx.moveTo(6, 4);
            ctx.lineTo(10, 22);
            ctx.lineTo(4, 18);
            ctx.lineTo(1, 4);
            ctx.stroke();

          } else if (item.type === 'star-burst') {
            const pulse = 0.5 + 0.5 * Math.sin(item.wigglePhase);
            const r = item.scale * 6 * pulse;
            ctx.save();
            ctx.rotate(item.angle + item.wigglePhase * 0.1);
            ctx.beginPath();
            ctx.moveTo(0, -r);
            ctx.lineTo(r/3, -r/3);
            ctx.lineTo(r, 0);
            ctx.lineTo(r/3, r/3);
            ctx.lineTo(0, r);
            ctx.lineTo(-r/3, r/3);
            ctx.lineTo(-r, 0);
            ctx.lineTo(-r/3, -r/3);
            ctx.closePath();
            ctx.fillStyle = hexToRgba(item.color, item.opacity * (0.3 + 0.7 * pulse));
            ctx.fill();
            ctx.restore();
          }

          ctx.restore();
        });
      }

      // G. Gallery (Aperture Rings)
      function drawGallery() {
        const cx = width * 0.75;
        const cy = height / 2;
        const baseRadius = Math.min(height * 0.35, 120);

        ctx.lineWidth = 1;
        ctx.strokeStyle = hexToRgba(colorHighlight, 0.15);
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius * 1.3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = hexToRgba(colorSecondary, 0.25);
        ctx.beginPath();
        ctx.setLineDash([6, 12]);
        ctx.arc(cx, cy, baseRadius, angleOffset, angleOffset + Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = hexToRgba(colorHighlight, 0.18);
        ctx.beginPath();
        ctx.setLineDash([12, 6]);
        ctx.arc(cx, cy, baseRadius * 0.7, -angleOffset * 1.5, -angleOffset * 1.5 + Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        const sides = 6;
        const irisAngle = angleOffset * 0.5;
        const ptList = [];
        for (let i = 0; i < sides; i++) {
          const a = irisAngle + (i * Math.PI * 2 / sides);
          const px = cx + baseRadius * 0.5 * Math.cos(a);
          const py = cy + baseRadius * 0.5 * Math.sin(a);
          ptList.push({ x: px, y: py, a: a });
        }

        ctx.strokeStyle = hexToRgba(colorSecondary, 0.3);
        ctx.lineWidth = 1.5;
        for (let i = 0; i < sides; i++) {
          const p1 = ptList[i];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p1.x + baseRadius * 0.4 * Math.cos(p1.a + Math.PI/3), p1.y + baseRadius * 0.4 * Math.sin(p1.a + Math.PI/3));
          ctx.stroke();
        }

        const centerPulse = baseRadius * 0.15 + Math.sin(Date.now() * 0.001) * 5;
        ctx.beginPath();
        ctx.arc(cx, cy, centerPulse, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(colorHighlight, 0.15);
        ctx.fill();
        ctx.strokeStyle = hexToRgba(colorHighlight, 0.4);
        ctx.stroke();
      }

      // H. Collaborations (Globe)
      function drawCollaborations() {
        const cx = width * 0.75;
        const cy = height / 2;
        const rGlobe = Math.min(height * 0.35, 110);

        if (!sphereNodes) {
          sphereNodes = [];
          const count = 35;
          for (let i = 0; i < count; i++) {
            const theta = Math.acos((Math.random() * 2) - 1);
            const phi = Math.random() * Math.PI * 2;
            sphereNodes.push({
              x: Math.sin(theta) * Math.cos(phi),
              y: Math.cos(theta),
              z: Math.sin(theta) * Math.sin(phi)
            });
          }
        }

        const rotY = angleOffset * 0.8;
        const rotX = Math.PI / 6 + Math.sin(angleOffset * 0.2) * 0.15;

        const projected = [];
        sphereNodes.forEach(node => {
          let x1 = node.x * Math.cos(rotY) - node.z * Math.sin(rotY);
          let z1 = node.x * Math.sin(rotY) + node.z * Math.cos(rotY);
          let y2 = node.y * Math.cos(rotX) - z1 * Math.sin(rotX);
          let z2 = node.y * Math.sin(rotX) + z1 * Math.cos(rotX);

          projected.push({ x: cx + x1 * rGlobe, y: cy + y2 * rGlobe, z: z2 });
        });

        const queue = [];

        queue.push({
          z: -2.0,
          draw: () => {
            ctx.beginPath();
            ctx.arc(cx, cy, rGlobe, 0, Math.PI * 2);
            ctx.strokeStyle = hexToRgba(colorHighlight, 0.08);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        for (let i = 0; i < projected.length; i++) {
          const ptA = projected[i];
          for (let j = 1; j <= 2; j++) {
            const ptB = projected[(i + j) % projected.length];
            const zAvg = (ptA.z + ptB.z) / 2;
            
            queue.push({
              z: zAvg,
              draw: () => {
                const alpha = 0.05 + 0.2 * ((zAvg + 1) / 2);
                ctx.beginPath();
                ctx.moveTo(ptA.x, ptA.y);
                ctx.quadraticCurveTo(cx, cy, ptB.x, ptB.y);
                ctx.strokeStyle = hexToRgba(colorSecondary, alpha);
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }
            });
          }
        }

        projected.forEach(pt => {
          queue.push({
            z: pt.z,
            draw: () => {
              const alpha = 0.15 + 0.65 * ((pt.z + 1) / 2);
              const nodeR = 2.5 + 2 * ((pt.z + 1) / 2);
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, nodeR, 0, Math.PI * 2);
              ctx.fillStyle = hexToRgba(colorHighlight, alpha);
              if (pt.z > 0.6) {
                ctx.shadowBlur = 8;
                ctx.shadowColor = colorHighlight;
              }
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          });
        });

        queue.sort((a, b) => a.z - b.z);
        queue.forEach(item => item.draw());
      }

      // I. Media (Floating Bacteria)
      function initMediaState() {
        if (mediaState.length > 0) return;
        const count = 25;
        for (let i = 0; i < count; i++) {
          const type = ['bacillus', 'coccus', 'spirillum'][Math.floor(Math.random() * 3)];
          mediaState.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 8 + 6,
            length: Math.random() * 16 + 14,
            type: type,
            angle: Math.random() * Math.PI * 2,
            vAngle: (Math.random() - 0.5) * 0.02,
            opacity: Math.random() * 0.2 + 0.08,
            wigglePhase: Math.random() * Math.PI * 2,
            wiggleSpeed: Math.random() * 0.1 + 0.05,
            color: Math.random() > 0.5 ? colorHighlight : colorSecondary
          });
        }
      }

      function drawMedia() {
        initMediaState();

        mediaState.forEach(b => {
          b.x += b.vx;
          b.y += b.vy;
          b.angle += b.vAngle;
          b.wigglePhase += b.wiggleSpeed;

          if (b.x < -40) b.x = width + 40;
          if (b.x > width + 40) b.x = -40;
          if (b.y < -40) b.y = height + 40;
          if (b.y > height + 40) b.y = -40;

          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(b.angle);

          const alphaColor = hexToRgba(b.color, b.opacity);
          ctx.strokeStyle = alphaColor;
          ctx.fillStyle = hexToRgba(b.color, b.opacity * 0.3);
          ctx.lineWidth = 2;

          if (b.type === 'bacillus') {
            ctx.beginPath();
            ctx.roundRect(-b.length / 2, -b.radius, b.length, b.radius * 2, b.radius);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-b.length / 2, 0);
            for (let j = 0; j < 15; j++) {
              const tx = -b.length / 2 - j;
              const ty = Math.sin(j * 0.5 + b.wigglePhase) * 3;
              ctx.lineTo(tx, ty);
            }
            ctx.stroke();

          } else if (b.type === 'coccus') {
            ctx.beginPath();
            ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, -b.radius);
            ctx.lineTo(0, b.radius);
            ctx.stroke();

          } else if (b.type === 'spirillum') {
            ctx.beginPath();
            for (let j = -20; j <= 20; j += 2) {
              const tx = j;
              const ty = Math.sin(j * 0.25 + b.wigglePhase) * 5;
              if (j === -20) ctx.moveTo(tx, ty);
              else ctx.lineTo(tx, ty);
            }
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(20, Math.sin(20 * 0.25 + b.wigglePhase) * 5);
            ctx.lineTo(26, Math.sin(26 * 0.25 + b.wigglePhase) * 5 + Math.sin(b.wigglePhase) * 2);
            ctx.stroke();
          }

          ctx.restore();
        });
      }

      // J. Contact (Expanding Ripples)
      function initContactState() {
        if (contactState.length > 0) return;
        contactState.push({ x: 0.25 * width, y: height / 2, radius: 0, speed: 0.6, pulsePhase: 0 });
        contactState.push({ x: 0.5 * width, y: height / 2, radius: 0, speed: 0.6, pulsePhase: Math.PI / 3 });
        contactState.push({ x: 0.75 * width, y: height / 2, radius: 0, speed: 0.6, pulsePhase: 2 * Math.PI / 3 });
      }

      function drawContact() {
        initContactState();

        contactState.forEach(hub => {
          hub.radius += hub.speed;
          const maxRadius = Math.max(height * 0.5, 100);
          if (hub.radius > maxRadius) {
            hub.radius = 0;
          }

          const alpha = 1 - (hub.radius / maxRadius);
          
          ctx.beginPath();
          ctx.arc(hub.x, hub.y, hub.radius, 0, Math.PI * 2);
          ctx.strokeStyle = hexToRgba(colorHighlight, alpha * 0.35);
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(hub.x, hub.y, Math.max(0, hub.radius - 30), 0, Math.PI * 2);
          ctx.strokeStyle = hexToRgba(colorSecondary, alpha * 0.2);
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(hub.x, hub.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(colorHighlight, 0.7);
          ctx.fill();
        });
      }

      // 6. Draw Loop Router
      function draw() {
        if (width === 0 || height === 0) {
          requestAnimationFrame(draw);
          return;
        }

        ctx.clearRect(0, 0, width, height);
        updateColors();

        switch (animType) {
          case 'molecules':
            drawMolecules();
            break;
          case 'publications':
            drawPublications();
            break;
          case 'grants':
            drawGrants();
            break;
          case 'lab':
            drawLab();
            break;
          case 'recognition':
            drawRecognition();
            break;
          case 'gallery':
            drawGallery();
            break;
          case 'collaborations':
            drawCollaborations();
            break;
          case 'media':
            drawMedia();
            break;
          case 'contact':
            drawContact();
            break;
          case 'dna':
          default:
            drawDNA();
            break;
        }

        angleOffset += config.rotationSpeed;
        waveOffset += config.waveSpeed;

        requestAnimationFrame(draw);
      }

      requestAnimationFrame(draw);
    });
  }

  // ============================================================
  // SCROLL TO TOP
  // ============================================================
  function initScrollToTop() {
    const btn = document.querySelector('.scroll-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // GSAP ANIMATIONS (Global)
  // ============================================================
  function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
      ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(header, 
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        }
      });
    });

    // Animate research cards stagger
    gsap.utils.toArray('.research-card').forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(card,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out' }
          );
        }
      });
    });

    // Timeline items stagger
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(item,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.6, delay: i * 0.15, ease: 'power3.out' }
          );
        }
      });
    });
  }

  // ============================================================
  // INTERACTIVE RESEARCH MODAL
  // ============================================================
  function initResearchModal() {
    const modal = document.getElementById('research-modal');
    if (!modal) return;

    const modalTitle = document.getElementById('modal-title');
    const modalBadge = modal.querySelector('.modal-badge');
    const tabContents = {
      overview: document.getElementById('tab-overview'),
      projects: document.getElementById('tab-projects'),
      methods: document.getElementById('tab-methods')
    };

    const tabButtons = modal.querySelectorAll('.tab-btn');
    const closeBtn = modal.querySelector('.modal-close');
    const readMoreBtns = document.querySelectorAll('[data-research]');

    // Scientific details dataset for all 10 topics
    const researchData = {
      'oral-microbiome': {
        title: 'Oral Microbiome & Cancer',
        category: 'Microbiology & Oncology',
        overview: '<h4>Understanding Microbial Dysbiosis in Cancer</h4><p>The oral cavity harbors a complex microbiome. Our research focuses on identifying how shifts in microbial diversity and abundance contribute to oral squamous cell carcinoma (OSCC) progression.</p><p>We analyze saliva and tissue biopsies to catalog microenvironmental shifts and investigate whether specific bacterial species act as drivers or opportunistic colonizers of cancer sites.</p>',
        projects: '<h4>Active Projects & Translational Impact</h4><ul><li><strong>Indian Oral Cancer Microbiome Initiative:</strong> Characterizing taxonomic profiles in a multi-center cohort of 200+ oral cancer patients compared to healthy controls.</li><li><strong>Early Biomaker Discovery:</strong> Isolating specific subspecies signatures of <i>Fusobacterium nucleatum</i> and <i>Porphyromonas gingivalis</i> associated with high risk of lymph node metastasis.</li></ul>',
        methods: '<h4>Technology & Methodology</h4><ul><li>Shotgun Metagenomic Sequencing (Illumina & Oxford Nanopore)</li><li>16S rRNA gene profiling (V3-V4 hypervariable regions)</li><li>Anaerobic culturing and co-culture assay platforms</li><li>Metatranscriptomics to profile microbial active pathways</li></ul>'
      },
      'gut-microbiome': {
        title: 'Gut Microbiome & Systemic Disease',
        category: 'Microbial Ecology',
        overview: '<h4>Investigating the Gut-Brain-Immune Axis</h4><p>We explore the gut microbial ecology and its metabolic outputs, studying how bacterial metabolites regulate host immune responses and influence systemic pathologies like gastrointestinal cancers and metabolic disorders.</p>',
        projects: '<h4>Active Projects & Translational Impact</h4><ul><li><strong>Metabolic Syndrome Cohort profiling:</strong> Correlating short-chain fatty acid (SCFA) profiles with host inflammatory markers.</li><li><strong>Microbiome Modulation in Immunotherapy:</strong> Analyzing patient gut microbiomes to predict and modulate responsiveness to PD-1/PD-L1 checkpoint blockade.</li></ul>',
        methods: '<h4>Technology & Methodology</h4><ul><li>Fecal shotgun metagenomics and assembly binning</li><li>Gas Chromatography-Mass Spectrometry (GC-MS) for metabolite quantification</li><li>Gnotobiotic animal models & gut organoid platforms</li></ul>'
      },
      'cancer-biology': {
        title: 'Cancer Biology & Metastasis',
        category: 'Molecular Oncology',
        overview: '<h4>Somatic Signatures and Tumor Progression</h4><p>We study the fundamental pathways governing cell proliferation, migration, and drug resistance. Our focus is on somatic mutations, copy number variations, and epigenetic modifications in oral cancers.</p>',
        projects: '<h4>Active Projects & Translational Impact</h4><ul><li><strong>Genomic Characterization of HPV-Negative HNSCC:</strong> Investigating driver genes in HPV-negative patients who present with aggressive disease.</li><li><strong>Targeting the PI3K/Akt Pathway:</strong> Evaluating novel small-molecule inhibitors in patient-derived primary cancer cell lines.</li></ul>',
        methods: '<h4>Technology & Methodology</h4><ul><li>Whole Exome Sequencing (WES) & Targeted Gene Panels</li><li>Patient-Derived Xenografts (PDX) & 3D Spheroid cultures</li><li>High-resolution flow cytometry and Western Blotting</li></ul>'
      },
      'tumor-immunology': {
        title: 'Tumor Immunology',
        category: 'Immunology',
        overview: '<h4>Mapping the Tumor Microenvironment</h4><p>We characterize the cellular composition of the tumor microenvironment (TME), mapping how cancer cells evade detection by cytolytic T cells, NK cells, and macrophages.</p>',
        projects: '<h4>Active Projects & Translational Impact</h4><ul><li><strong>T-Cell Exhaustion Profiling:</strong> Assessing exhaustion markers (PD-1, TIM-3, LAG-3) in TILs isolated from oral cancer patients.</li><li><strong>Myeloid-Derived Suppressor Cells (MDSCs):</strong> Investigating the accumulation and immunosuppressive capacity of MDSCs in systemic circulation.</li></ul>',
        methods: '<h4>Technology & Methodology</h4><ul><li>Multiparametric Flow Cytometry (16-color)</li><li>Immunohistochemistry (IHC) & Multiplex Immunofluorescence</li><li>Single-cell RNA-sequencing (scRNA-Seq) data integration</li></ul>'
      },
      'immune-checkpoints': {
        title: 'Immune Checkpoints',
        category: 'Immunotherapy',
        overview: '<h4>Resistance Mechanisms to Checkpoint Blockades</h4><p>Evaluating clinical responses to immune checkpoint inhibitors (ICIs) and determining epigenetic or genetic factors that lead to primary or acquired immunotherapy resistance.</p>',
        projects: '<h4>Active Projects & Translational Impact</h4><ul><li><strong>ICI Biomarker Validation:</strong> Validating Tumor Mutational Burden (TMB) and Microsatellite Instability (MSI) metrics in Indian patient cohorts.</li><li><strong>Combination Therapy Targeting:</strong> Combining standard chemotherapy with epigenetic modifiers to reverse checkpoint resistance.</li></ul>',
        methods: '<h4>Technology & Methodology</h4><ul><li>Targeted Bisulfite Sequencing for methylation mapping</li><li>Recombinant protein binding assays</li><li>In vitro co-culture killing assays</li></ul>'
      },
      'vibrio-cholerae': {
        title: 'Vibrio cholerae Genomics',
        category: 'Epidemiology & Genomics',
        overview: '<h4>Antimicrobial Resistance & Clonal Evolution</h4><p>Tracking the genomic epidemiology of <i>Vibrio cholerae</i> outbreaks. We profile antibiotic resistance cassettes and trace transmission pathways in endemic zones.</p>',
        projects: '<h4>Active Projects & Translational Impact</h4><ul><li><strong>Surveillance of cholera strains:</strong> Monitoring the emergence of O1 El Tor variants with altered virulence profiles.</li><li><strong>Mobile Genetic Elements mapping:</strong> Detailing SXT/R391 integrating conjugative elements (ICEs) responsible for multi-drug resistance.</li></ul>',
        methods: '<h4>Technology & Methodology</h4><ul><li>Long-read Nanopore sequencing for structural variant assembly</li><li>Phylogenomic network analysis and molecular clock modeling</li><li>In vitro conjugation assays</li></ul>'
      },
      'genomic-surveillance': {
        title: 'Genomic Surveillance',
        category: 'Public Health',
        overview: '<h4>Real-Time Pathogen Tracking</h4><p>Establishing genomic surveillance frameworks for emerging and re-emerging pathogens to assist public health decision-making and epidemiological containment.</p>',
        projects: '<h4>Active Projects & Translational Impact</h4><ul><li><strong>Wastewater Pathogen Surveillance:</strong> Sequencing environmental wastewater samples to detect early outbreaks of viral and bacterial pathogens.</li><li><strong>Genomic Epidemiology of Respiratory Viruses:</strong> Tracking mutations in circulating respiratory pathogens.</li></ul>',
        methods: '<h4>Technology & Methodology</h4><ul><li>Targeted amplicon sequencing and metagenomic NGS</li><li>Automated bioinformatics pipelines for phylogenetic placement</li><li>HPC cloud computation systems</li></ul>'
      },
      'ngs-bioinformatics': {
        title: 'NGS & Bioinformatics Pipelines',
        category: 'Computational Biology',
        overview: '<h4>Developing Scalable Analysis Pipelines</h4><p>We build robust, open-source bioinformatics workflows for multi-omics data integration, somatic variant calling, and taxonomic classification.</p>',
        projects: '<h4>Active Projects & Translational Impact</h4><ul><li><strong>Somatic variant calling pipelines:</strong> Developing machine-learning filters to reduce false-positive variant calls in low-coverage FFPE samples.</li><li><strong>Metagenomics databases:</strong> Curating oral microbiome reference genomes specific to South Asian populations.</li></ul>',
        methods: '<h4>Technology & Methodology</h4><ul><li>Nextflow & Snakemake pipeline architectures</li><li>Python, R, and Bash scripting frameworks</li><li>Docker & Singularity containerized reproducibility</li></ul>'
      },
      'crispr-diagnostics': {
        title: 'CRISPR-Based Diagnostics',
        category: 'Biotechnology & Diagnostics',
        overview: '<h4>Point-of-Care Diagnostic Testing</h4><p>Engineering CRISPR-Cas12a and Cas13a systems for highly sensitive, specific, and rapid pathogen detection in resource-limited clinic settings.</p>',
        projects: '<h4>Active Projects & Translational Impact</h4><ul><li><strong>CRISPR Cervical Cancer Screen:</strong> Developing a paper-strip test for high-risk HPV16/18 subtypes from cervical swabs.</li><li><strong>MDR-TB CRISPR Assay:</strong> Rapid molecular diagnostic for detecting multi-drug resistant <i>Mycobacterium tuberculosis</i>.</li></ul>',
        methods: '<h4>Technology & Methodology</h4><ul><li>Cas12a/Cas13a gRNA design optimization</li><li>Isothermal Amplification (RPA/LAMP)</li><li>Lateral flow paper strip readout and fluorometric assays</li></ul>'
      },
      'spatial-transcriptomics': {
        title: 'Spatial Transcriptomics',
        category: 'Spatial Biology',
        overview: '<h4>Resolving Gene Expression in Native Architecture</h4><p>We map transcriptomic changes within the tissue architecture, allowing us to inspect tumor-stromal borders and local cellular interactions in high resolution.</p>',
        projects: '<h4>Active Projects & Translational Impact</h4><ul><li><strong>Spatial Immunology of OSCC:</strong> Deciphering spatial networks of excluded cytotoxic T cells at the tumor invasive margin.</li><li><strong>Ligand-Receptor Spatial Mapping:</strong> Profiling localized paracrine signaling in the microenvironment.</li></ul>',
        methods: '<h4>Technology & Methodology</h4><ul><li>Multiplexed Error-Robust Fluorescence in situ Hybridization (MERFISH)</li><li>Visium spatial transcriptomics platforms</li><li>Single-cell spatial alignment computational models</li></ul>'
      }
    };

    let activeData = null;

    // Open Modal
    readMoreBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-research');
        const data = researchData[id];
        if (!data) return;

        activeData = data;
        
        // Populate modal data
        modalTitle.textContent = data.title;
        modalBadge.textContent = data.category;
        
        tabContents.overview.innerHTML = data.overview;
        tabContents.projects.innerHTML = data.projects;
        tabContents.methods.innerHTML = data.methods;

        // Reset tabs to Overview
        tabButtons.forEach(b => b.classList.remove('active'));
        modal.querySelector('[data-tab="overview"]').classList.add('active');
        
        Object.values(tabContents).forEach(c => c.classList.remove('active'));
        tabContents.overview.classList.add('active');

        // Show modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
      });
    });

    // Tab switching
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        
        // Toggle active button
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle active content
        Object.values(tabContents).forEach(c => c.classList.remove('active'));
        tabContents[tab].classList.add('active');
      });
    });

    // Close Modal Function
    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ============================================================
  // ACTIVE NAV LINK
  // ============================================================
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const hrefPage = href.split('/').pop() || 'index.html';
      const normalizedHref = (hrefPage === '' || hrefPage === '/') ? 'index.html' : hrefPage;
      const normalizedCurrent = (currentPage === '' || currentPage === '/' || currentPage === 'pklab2') ? 'index.html' : currentPage;
      
      if (normalizedHref === normalizedCurrent) {
        link.classList.add('active');
      }
    });
  }

  // ============================================================
  // PUBLIC API
  // ============================================================
  return {
    init,
    toggleTheme,
    setTheme,
    toggleMenu,
    filterPublications: initPublicationFilters,
  };
})();

// ----- DOM Ready -----
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
