/* Aurelia Interiors — Vanilla JS */
(function(){

  // ---------- Footer injection (shared) ----------
  const footerHTML = `
    <footer class="footer" data-testid="site-footer">
      <div class="container footer__grid">
        <div class="footer__brand">
          <a href="index.html" class="brand">
            <span class="brand__mark">A</span>
            <span class="brand__name">Aurelia<em>Interiors</em></span>
          </a>
          <p>A Mumbai-based studio crafting timeless interiors and bespoke furniture for discerning residences and boutique commercial spaces since 2014.</p>
          <div class="socials">
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="reviews.html">Reviews</a></li>
            <li><a href="faq.html">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="services.html">Interior Design</a></li>
            <li><a href="services.html">Modular Kitchen</a></li>
            <li><a href="services.html">Wardrobes</a></li>
            <li><a href="services.html">Office Interiors</a></li>
            <li><a href="services.html">False Ceiling</a></li>
            <li><a href="services.html">Renovation</a></li>
          </ul>
        </div>
        <div>
          <h4>Get in Touch</h4>
          <p><i class="fa-solid fa-phone" style="color:#c9a961;margin-right:.5rem"></i> +91 99999 99999</p>
          <p><i class="fa-solid fa-envelope" style="color:#c9a961;margin-right:.5rem"></i> studio@aurelia-interiors.com</p>
          <p><i class="fa-solid fa-location-dot" style="color:#c9a961;margin-right:.5rem"></i> 12 Linking Road, Bandra West,<br/>Mumbai 400050, India</p>
          <p><a href="https://maps.google.com/?q=Bandra+West+Mumbai" target="_blank" rel="noopener"><i class="fa-solid fa-map" style="color:#c9a961;margin-right:.5rem"></i> View on Google Maps</a></p>
        </div>
      </div>
      <div class="footer__bottom">
        © <span id="year"></span> Aurelia Interiors Pvt. Ltd. — All rights reserved. Crafted with care in Mumbai.
      </div>
    </footer>`;
  const mount = document.getElementById('footer-mount');
  if(mount){ mount.outerHTML = footerHTML; }
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Navbar scroll ----------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if(!nav) return;
    if(window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    const bt = document.getElementById('backToTop');
    if(bt){
      if(window.scrollY > 500) bt.classList.add('visible');
      else bt.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if(toggle && links){
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open'); links.classList.remove('open');
    }));
  }

  // Back to top
  const bt = document.getElementById('backToTop');
  if(bt){ bt.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' })); }

  // ---------- Hero carousel (right to left) ----------
  const slider = document.getElementById('heroSlider');
  if(slider){
    const slides = slider.querySelectorAll('.hero__slide');
    const dotsWrap = document.getElementById('heroDots');
    let index = 0;
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('data-testid', 'hero-dot-' + i);
      if(i===0) b.classList.add('active');
      b.addEventListener('click', () => go(i));
      dotsWrap.appendChild(b);
    });
    const dots = dotsWrap.querySelectorAll('button');
    slides[0].classList.add('active');
    function go(i){
      slides[index].classList.remove('active');
      dots[index].classList.remove('active');
      index = (i + slides.length) % slides.length;
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }
    setInterval(() => go(index + 1), 5000);
  }

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Also auto-reveal common wrappers
  document.querySelectorAll('.section > .container > *').forEach(el => {
    if(!el.classList.contains('reveal')) { el.classList.add('reveal'); io.observe(el); }
  });

  // ---------- Counter animation ----------
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const dur = 1800;
      const start = performance.now();
      function tick(t){
        const p = Math.min((t - start) / dur, 1);
        el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3)));
        if(p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

  // ---------- Portfolio filter ----------
  const filterBar = document.querySelector('.filter-bar');
  if(filterBar){
    filterBar.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if(!b) return;
      filterBar.querySelectorAll('button').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      const cat = b.dataset.filter;
      document.querySelectorAll('.masonry__item').forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
      });
    });
  }

  // ---------- Lightbox ----------
  const lb = document.getElementById('lightbox');
  if(lb){
    const lbImg = lb.querySelector('img');
    document.querySelectorAll('.masonry__item').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.querySelector('img').src.replace('w=800', 'w=1600');
        lbImg.src = src;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', (e) => {
      if(e.target === lb || e.target.classList.contains('lightbox__close')) lb.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') lb.classList.remove('open'); });
  }

  // ---------- FAQ ----------
  document.querySelectorAll('.faq__q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq__item');
      item.classList.toggle('open');
    });
  });

  // ---------- Contact form ----------
  const form = document.getElementById('contactForm');
  if(form){
    const msg = document.getElementById('formMsg');
    const backend = (window.__BACKEND_URL__ || '') + '/api/contact';
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      msg.className = 'form-msg';
      msg.textContent = 'Sending...';
      msg.style.display = 'block';
      try {
        const res = await fetch(backend, {
          method:'POST',
          headers:{ 'Content-Type':'application/json' },
          body: JSON.stringify(data)
        });
        if(!res.ok) throw new Error('Failed');
        msg.className = 'form-msg success';
        msg.textContent = 'Thank you! Our design team will reach out within 24 hours.';
        form.reset();
      } catch(err){
        msg.className = 'form-msg error';
        msg.textContent = 'Something went wrong. Please try again or WhatsApp us directly.';
      }
    });
  }

})();
