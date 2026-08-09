/* ==========================================
   MANSI KUMARI PORTFOLIO - INTERACTIVE JS
   Particle Mesh, Color Grading, Counter & UI
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  initParticleCanvas();
  initTypewriter();
  initScrollEffects();
  initStatCounters();
  initSkillObserver();
  initSavedTheme();
});

/* ------------------------------------------
   1. Theme Presets & Custom Color Picker
   ------------------------------------------ */
function setTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
  localStorage.setItem("portfolio_theme", themeName);
}

function initSavedTheme() {
  const savedTheme = localStorage.getItem("portfolio_theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  const colorPicker = document.getElementById("colorPicker");
  if (colorPicker) {
    colorPicker.addEventListener("input", (e) => {
      const color = e.target.value;
      applyCustomAccent(color);
    });
  }
}

function applyCustomAccent(hex) {
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.style.setProperty("--accent-end", hex);
  document.documentElement.style.setProperty("--accent-glow", `${hex}40`);
  document.documentElement.style.setProperty("--border-glow", `${hex}60`);
  document.documentElement.style.setProperty(
    "--text-gradient",
    `linear-gradient(135deg, ${hex} 0%, #a855f7 100%)`
  );
  document.documentElement.style.setProperty(
    "--accent-gradient",
    `linear-gradient(135deg, ${hex}, #7000ff)`
  );
}

/* ------------------------------------------
   2. Background Particle Network Canvas
   ------------------------------------------ */
function initParticleCanvas() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(width / 25), 50);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ------------------------------------------
   3. Multi-title Typewriter Effect
   ------------------------------------------ */
function initTypewriter() {
  const target = document.getElementById("typed");
  if (!target) return;

  const titles = [
    "Software Engineer • AI System Architect",
    "Model Context Protocol (MCP) Specialist",
    "Published Author of 3 Kindle Books",
    "Full-Stack Integration Developer",
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeCycle() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      target.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      target.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2200; // Pause at end of title
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500;
    }

    setTimeout(typeCycle, typeSpeed);
  }

  typeCycle();
}

/* ------------------------------------------
   4. Scroll Progress & Back To Top
   ------------------------------------------ */
function initScrollEffects() {
  const progressBar = document.getElementById("scrollProgress");
  const backToTopBtn = document.getElementById("backToTop");
  const navLinks = document.querySelectorAll(".navbar-custom .nav-link");
  const sections = document.querySelectorAll("section, header");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    // Active link highlighting
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (scrollTop >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ------------------------------------------
   5. Stat Counters Animation
   ------------------------------------------ */
function initStatCounters() {
  const counters = document.querySelectorAll(".stat-number");
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach((counter) => {
            const target = +counter.getAttribute("data-target");
            const duration = 2000;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target >= 1000 ? `${(target / 1000).toFixed(0)}k+` : `${target}+`;
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current);
              }
            }, stepTime);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const summarySection = document.getElementById("summary");
  if (summarySection) observer.observe(summarySection);
}

/* ------------------------------------------
   6. Skills Progress Bars & Filtering
   ------------------------------------------ */
function initSkillObserver() {
  const progressBars = document.querySelectorAll(".progress-bar-fill");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const val = bar.getAttribute("data-progress");
          bar.style.width = `${val}%`;
        }
      });
    },
    { threshold: 0.2 }
  );

  progressBars.forEach((bar) => observer.observe(bar));
}

function filterSkills(category, btnElement) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((b) => b.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");

  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item) => {
    const itemCat = item.getAttribute("data-category");
    if (category === "all" || itemCat.includes(category)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

/* ------------------------------------------
   7. Copy Email Toast Notification
   ------------------------------------------ */
function copyEmail() {
  const email = "techwithmak25@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Email copied: ${email}`);
  }).catch(() => {
    showToast("Email: techwithmak25@gmail.com");
  });
}

function showToast(msg) {
  const toast = document.getElementById("toastAlert");
  const msgSpan = document.getElementById("toastMessage");
  if (!toast || !msgSpan) return;

  msgSpan.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
