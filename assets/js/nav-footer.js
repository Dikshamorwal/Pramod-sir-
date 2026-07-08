/**
 * Shared Navigation & Footer Component
 * Injected into all pages via JavaScript
 */

const navHTML = `
<nav class="nav" role="navigation" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="/" class="nav-logo" aria-label="Dr. Pramod Kumar - Home">
      <span class="nav-logo-icon">
        <svg width="32" height="32" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M16 8c0 0 16-8 32 0s16 16 0 24-32 8-32 24 16 8 32 0" stroke-linecap="round"/>
          <path d="M48 8c0 0-16-8-32 0s-16 16 0 24 32 8 32 24-16 8-32 0" stroke-linecap="round" opacity="0.4"/>
        </svg>
      </span>
      <span class="nav-logo-text">Dr. Pramod Kumar</span>
    </a>

    <ul class="nav-links">
      <li><a href="/" class="nav-link">Home</a></li>
      <li><a href="/about.html" class="nav-link">About</a></li>
      <li><a href="/journey.html" class="nav-link">Journey</a></li>
      <li><a href="/research.html" class="nav-link">Research</a></li>
      <li><a href="/publications.html" class="nav-link">Publications</a></li>
      <li><a href="/grants.html" class="nav-link">Grants</a></li>
      <li><a href="/lab.html" class="nav-link">Lab</a></li>
      <li><a href="/recognition.html" class="nav-link">Recognition</a></li>
      <li><a href="/contact.html" class="nav-link">Contact</a></li>
    </ul>

    <div style="display:flex;align-items:center;gap:0.5rem">
      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<aside class="mobile-nav" id="mobileNav" role="dialog" aria-label="Mobile navigation">
  <a href="/" class="mobile-nav-link">Home</a>
  <a href="/about.html" class="mobile-nav-link">About</a>
  <a href="/journey.html" class="mobile-nav-link">Journey</a>
  <a href="/research.html" class="mobile-nav-link">Research</a>
  <a href="/publications.html" class="mobile-nav-link">Publications</a>
  <a href="/grants.html" class="mobile-nav-link">Grants</a>
  <a href="/lab.html" class="mobile-nav-link">Lab</a>
  <a href="/recognition.html" class="mobile-nav-link">Recognition</a>
  <a href="/contact.html" class="mobile-nav-link">Contact</a>
</aside>

<div class="mobile-nav-overlay" id="mobileOverlay"></div>
`;

const footerHTML = `
<footer class="footer" role="contentinfo">
  <div class="footer-wave"></div>
  <div class="footer-dna">
    <svg width="100%" height="100%" viewBox="0 0 1200 200" preserveAspectRatio="none" opacity="0.03">
      <path d="M0 100 Q 150 0 300 100 Q 450 200 600 100 Q 750 0 900 100 Q 1050 200 1200 100" stroke="#00D4FF" fill="none" stroke-width="2"/>
      <path d="M0 100 Q 150 200 300 100 Q 450 0 600 100 Q 750 200 900 100 Q 1050 0 1200 100" stroke="#00B894" fill="none" stroke-width="1" opacity="0.5"/>
    </svg>
  </div>
  <div class="footer-inner">
    <div>
      <div class="footer-brand">
        <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" style="vertical-align:middle;margin-right:0.5rem">
          <path d="M16 8c0 0 16-8 32 0s16 16 0 24-32 8-32 24 16 8 32 0" stroke-linecap="round"/>
        </svg>
        Dr. Pramod Kumar
      </div>
      <p class="footer-description">
        Scientist D at ICMR-NICPR | Assistant Professor, AcSIR.<br>
        Advancing research in microbiology, genomics, cancer biology,<br>
        and molecular biology for global health impact.
      </p>
      <div class="footer-social">
        <a href="https://scholar.google.com" target="_blank" rel="noopener" aria-label="Google Scholar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>
        </a>
        <a href="https://researchgate.net" target="_blank" rel="noopener" aria-label="ResearchGate">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.857 15.143h-3.857l-1.714-2.571-1.714 2.571H7.714L12 9l4.286 6.143h2.571zm-7.714-2.572h2.571L12 10.286l-2.857 2.285z"/></svg>
        </a>
        <a href="https://orcid.org" target="_blank" rel="noopener" aria-label="ORCID">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM7.5 17.5h-3v-11h3v11zm0-12h-3v-1h3v1zm4.5 12h-3v-11h3v11zm0-12h-3v-1h3v1zm5.5 12h-3V11c0-1.657-1.343-3-3-3h-2.5v-1.5h2.5c2.485 0 4.5 2.015 4.5 4.5v6.5z"/></svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter/X">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
      </div>
    </div>

    <div>
      <h4 class="footer-heading">Quick Links</h4>
      <ul class="footer-links">
        <li class="footer-link"><a href="/about.html">About</a></li>
        <li class="footer-link"><a href="/research.html">Research</a></li>
        <li class="footer-link"><a href="/publications.html">Publications</a></li>
        <li class="footer-link"><a href="/lab.html">Lab Members</a></li>
        <li class="footer-link"><a href="/contact.html">Contact</a></li>
      </ul>
    </div>

    <div>
      <h4 class="footer-heading">Research Areas</h4>
      <ul class="footer-links">
        <li class="footer-link"><a href="/research.html">Oral Microbiome</a></li>
        <li class="footer-link"><a href="/research.html">Cancer Biology</a></li>
        <li class="footer-link"><a href="/research.html">Genomics</a></li>
        <li class="footer-link"><a href="/research.html">Tumor Immunology</a></li>
        <li class="footer-link"><a href="/research.html">CRISPR Diagnostics</a></li>
      </ul>
    </div>

    <div>
      <h4 class="footer-heading">Contact</h4>
      <ul class="footer-links">
        <li class="footer-link"><a href="/contact.html">ICMR-NICPR, Noida</a></li>
        <li class="footer-link"><a href="mailto:pramod.kumar@nicpr.gov.in">pramod.kumar@nicpr.gov.in</a></li>
        <li class="footer-link"><a href="tel:+911234567890">+91-123-4567890</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom">
    &copy; 2026 Dr. Pramod Kumar. All rights reserved. | 
    Designed with &hearts; for science
  </div>
</footer>
`;

// Inject navigation and footer
document.addEventListener('DOMContentLoaded', () => {
  // Inject nav at top of body
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    navPlaceholder.outerHTML = navHTML;
  } else {
    const bodyEl = document.body;
    const firstChild = bodyEl.firstChild;
    const temp = document.createElement('template');
    temp.innerHTML = navHTML.trim();
    bodyEl.insertBefore(temp.content.firstChild, firstChild);
    // Insert remaining nav elements
    bodyEl.insertBefore(temp.content, firstChild);
  }

  // Inject footer before closing body
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
});
