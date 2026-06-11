import React, { useState, useEffect, useRef, useCallback } from 'react';

const API_BASE = 'http://localhost:8000/api';

/* ═══════════════════════════════════════════
   ICONS (inline SVG so we don't need lucide)
   ═══════════════════════════════════════════ */
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

/* ═══════════════════════════════════════════
   STARRY CANVAS
   ═══════════════════════════════════════════ */
function StarryCanvas() {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.01 });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let shootingStars = [];
    let raf;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initStars() {
      stars = [];
      const density = 0.00008;
      const starCount = Math.min(300, Math.max(80, Math.floor(canvas.width * canvas.height * density)));
      const colors = [
        'rgb(255, 255, 255)',    // White
        'rgb(230, 242, 255)',    // Cool white
        'rgb(165, 243, 252)',    // Soft Teal
        'rgb(253, 230, 138)',    // Soft Amber
      ];

      for (let i = 0; i < starCount; i++) {
        const radius = Math.random() * 1.5 + 0.3;
        const baseOpacity = Math.random() * 0.6 + 0.2;
        let color = colors[0];
        const rand = Math.random();
        if (rand < 0.6) color = colors[0];
        else if (rand < 0.8) color = colors[1];
        else if (rand < 0.92) color = colors[2];
        else color = colors[3];

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          color,
          baseOpacity,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.005 + Math.random() * 0.012,
          depth: (radius / 1.8) * 0.07 + 0.02
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const offsetX = mouse.x - canvas.width / 2;
      const offsetY = mouse.y - canvas.height / 2;

      for (const s of stars) {
        s.phase += s.twinkleSpeed;
        const opacity = Math.max(0.1, Math.min(1.0, s.baseOpacity + Math.sin(s.phase) * 0.25));
        let sx = (s.x - offsetX * s.depth) % canvas.width;
        if (sx < 0) sx += canvas.width;
        let sy = (s.y - offsetY * s.depth) % canvas.height;
        if (sy < 0) sy += canvas.height;

        ctx.beginPath();
        ctx.arc(sx, sy, s.radius, 0, Math.PI * 2);
        const rgba = s.color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
        ctx.fillStyle = rgba;
        ctx.fill();

        if (s.radius > 1.2 && opacity > 0.6) {
          ctx.beginPath();
          ctx.arc(sx, sy, s.radius * 2.5, 0, Math.PI * 2);
          const glowRgba = s.color.replace('rgb(', 'rgba(').replace(')', `, ${opacity * 0.15})`);
          ctx.fillStyle = glowRgba;
          ctx.fill();
        }
      }

      if (shootingStars.length < 2 && Math.random() < 0.0006) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * (canvas.height * 0.5);
        const angle = Math.PI / 6 + Math.random() * (Math.PI / 6);
        const speed = Math.random() * 8 + 6;
        const length = Math.random() * 100 + 60;

        shootingStars.push({
          x: startX,
          y: startY,
          angle,
          speed,
          length,
          life: 1.0,
          decay: 0.015 + Math.random() * 0.015
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const p = shootingStars[i];
        p.life -= p.decay;
        if (p.life <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        const startX = p.x;
        const startY = p.y;
        const endX = p.x - Math.cos(p.angle) * p.length;
        const endY = p.y - Math.sin(p.angle) * p.length;

        const grad = ctx.createLinearGradient(startX, startY, endX, endY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.life})`);
        grad.addColorStop(0.2, `rgba(0, 201, 167, ${p.life * 0.7})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    draw();

    const handleResize = () => { resize(); initStars(); };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
    };
  }, [isVisible]);

  return <canvas ref={canvasRef} className="starry-canvas" />;
}

/* ═══════════════════════════════════════════
   TYPING ANIMATION HOOK
   ═══════════════════════════════════════════ */
function useTypewriter(strings, typeSpeed = 70, deleteSpeed = 35, pauseTime = 2000) {
  const [text, setText] = useState('');
  const idx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout;
    function tick() {
      const current = strings[idx.current];
      if (!deleting.current) {
        charIdx.current++;
        setText(current.slice(0, charIdx.current));
        if (charIdx.current === current.length) {
          deleting.current = true;
          timeout = setTimeout(tick, pauseTime);
          return;
        }
        timeout = setTimeout(tick, typeSpeed);
      } else {
        charIdx.current--;
        setText(current.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          idx.current = (idx.current + 1) % strings.length;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, deleteSpeed);
      }
    }
    tick();
    return () => clearTimeout(timeout);
  }, [strings, typeSpeed, deleteSpeed, pauseTime]);

  return text;
}

/* ═══════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════ */
function Navbar() {
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
      });
      setActive(current);
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'about' },
    { href: '#experience', label: 'experience' },
    { href: '#projects', label: 'projects' },
    { href: '#contact', label: 'contact' },
  ];

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-logo">sameer<span>@dev</span>:~$</div>
      <ul className={`nav-links${mobileOpen ? ' mobile-open' : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              className={active === l.href.slice(1) ? 'active' : ''}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
        <MenuIcon />
      </button>
      <a className="nav-resume" href="mailto:bhandiwadsameer@gmail.com">get in touch →</a>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
const HERO_TITLES = [
  'Full-Stack Engineer',
  'Robotics Developer',
  'AI/ML Engineer',
  'Embedded Systems Dev',
];

function Hero({ profile }) {
  const typedText = useTypewriter(HERO_TITLES);

  return (
    <section className="hero" id="home">
      <div className="hero-content fade-in">
        <div className="hero-eyebrow">Electronics × Software × AI</div>
        <h1 className="hero-name">
          <span className="teal">&lt;</span>Sameer<br />
          Bhandiwad<span className="teal">/&gt;</span>
        </h1>
        <div className="hero-title">
          <span>{typedText}</span><span className="cursor-blink" />
        </div>
        <p className="hero-desc">
          Final-year <strong>ECE Engineer</strong> at MSRIT, Bengaluru — building at the intersection of
          embedded systems, robotics, and full-stack AI. From <strong>ISRO quadruped swarms</strong> to
          <strong> production RAG pipelines</strong>.
        </p>
        <div className="hero-ctas">
          <a className="btn-primary" href="#projects">View projects</a>
          <a className="btn-outline" href="#contact">Let's talk</a>
          <a className="btn-outline" href="https://github.com/brockOil" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </div>
      </div>
      <div className="hero-stats">
        <div className="stat"><div className="stat-num">4+</div><div className="stat-label">INTERNSHIPS</div></div>
        <div className="stat"><div className="stat-num">10+</div><div className="stat-label">PROJECTS</div></div>
        <div className="stat"><div className="stat-num">8+</div><div className="stat-label">TECH STACKS</div></div>
      </div>
      <div className="scroll-hint">
        <div className="scroll-line" />
        <span>SCROLL</span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════ */
function About({ skills }) {
  const skillGroups = skills ? [
    { title: 'Stacks', items: skills.stacks || [], fullWidth: true },
    { title: 'Languages', items: skills.languages || [] },
    { title: 'Frameworks', items: skills.frameworks || [] },
    { title: 'AI / ML', items: skills.ai_ml || [] },
    { title: 'Infra & Tools', items: skills.tools || [] },
  ] : [];

  return (
    <section id="about">
      <div className="section-label">// 01</div>
      <h2 className="section-title">About me</h2>
      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm a final-year <strong>Electronics and Telecommunication Engineering</strong> student at
            M.S. Ramaiah Institute of Technology, graduating in 2026. I work across embedded systems,
            robotics, and full-stack AI — building things that run on silicon and scale in the cloud.
          </p>
          <p>
            At <strong>ISRO</strong>, I developed fault-tolerant control architecture for a 12-DOF
            quadruped robot swarm. At <strong>IIFL Samasta</strong>, I'm building production-grade
            internal tools — meeting transcribers, document verifiers, and customer retention dashboards.
          </p>
          <p>
            Outside the terminal: I shoot photos, play basketball, and occasionally sing. Treasurer of
            the <strong>IEEE MTT-S RIT-B</strong> chapter.
          </p>
        </div>
        <div className="skills-grid">
          {skillGroups.map(g => (
            <div className={`skill-group${g.fullWidth ? ' full-width' : ''}`} key={g.title}>
              <div className="skill-group-title">{g.title}</div>
              <div className="skill-tags">
                {g.items.map(s => <span className="tag" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   EXPERIENCE
   ═══════════════════════════════════════════ */
function Experience({ experience }) {
  if (!experience) return null;
  return (
    <section id="experience" className="section-alt">
      <div className="section-label">// 02</div>
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {experience.map((exp, i) => (
          <div className="tl-item" key={i}>
            <div className="tl-dot" />
            <div className="tl-period">{exp.duration}</div>
            <div className="tl-role">
              {exp.role}
              {i === 0 && <span className="tl-current">current</span>}
            </div>
            <div className="tl-company">{exp.company}</div>
            <div className="tl-desc">{exp.details}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════ */
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

function Projects({ projects }) {
  if (!projects) return null;

  const featured = projects.slice(0, 3);
  const others = projects.slice(3);

  return (
    <section id="projects">
      <div className="section-label">// 03</div>
      <h2 className="section-title">Projects</h2>

      {/* Featured projects — large cards */}
      <div className="featured-grid">
        {featured.map((proj, i) => (
          <div className={`feat-card${i === 0 ? ' feat-card--wide' : ''}`} key={i}>
            <div className="feat-card__top">
              <span className="feat-num">0{i + 1}</span>
              <div className="feat-card__stack">
                {proj.tech.split(', ').slice(0, 3).map(t => (
                  <span className="stack-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
            <h3 className="feat-card__name">{proj.name}</h3>
            <p className="feat-card__desc">{proj.description}</p>
            <div className="feat-card__bottom">
              <div className="feat-card__stack-full">
                {proj.tech.split(', ').map(t => (
                  <span className="stack-tag" key={t}>{t}</span>
                ))}
              </div>
              {proj.github && (
                <a className="feat-card__link" href={proj.github} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon /> Source code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Other projects — compact rows */}
      <div className="other-projects">
        <div className="other-projects__label">Other noteworthy projects</div>
        {others.map((proj, i) => (
          <div className="other-row" key={i}>
            <div className="other-row__info">
              <span className="other-row__name">{proj.name}</span>
              <span className="other-row__desc">{proj.description}</span>
            </div>
            <div className="other-row__tags">
              {proj.tech.split(', ').map(t => (
                <span className="stack-tag" key={t}>{t}</span>
              ))}
            </div>
            {proj.github ? (
              <a className="other-row__link" href={proj.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
              </a>
            ) : (
              <span className="other-row__link other-row__link--empty" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="section-alt">
      <div className="section-label">// 04</div>
      <h2 className="section-title">Get in touch</h2>
      <div className="contact-inner">
        <p className="contact-desc">
          I'm actively looking for full-time roles and internships in{' '}
          <strong style={{ color: 'var(--text)' }}>AI/ML engineering</strong>,{' '}
          <strong style={{ color: 'var(--text)' }}>full-stack development</strong>, and{' '}
          <strong style={{ color: 'var(--text)' }}>embedded/robotics systems</strong>.
          If you're working on something interesting, let's talk.
        </p>
        <div className="contact-links">
          <a className="contact-link" href="mailto:bhandiwadsameer@gmail.com">
            <MailIcon /> bhandiwadsameer@gmail.com
          </a>
          <a className="contact-link" href="https://github.com/brockOil" target="_blank" rel="noopener noreferrer">
            <GitHubIcon /> github.com/brockOil
          </a>
          <a className="contact-link" href="https://www.linkedin.com/in/sameer-p-bhandiwad-b61756250/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon /> LinkedIn
          </a>
          <a className="contact-link" href="tel:+917892881245">
            <PhoneIcon /> +91 78928 81245
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
function App() {
  const [data, setData] = useState({ profile: null, experience: null, projects: null, skills: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profRes, expRes, projRes, skillRes] = await Promise.all([
          fetch(`${API_BASE}/profile`),
          fetch(`${API_BASE}/experience`),
          fetch(`${API_BASE}/projects`),
          fetch(`${API_BASE}/skills`),
        ]);
        setData({
          profile: await profRes.json(),
          experience: await expRes.json(),
          projects: await projRes.json(),
          skills: await skillRes.json(),
        });
      } catch (err) {
        console.error('Failed to fetch data. Ensure backend is running.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <div className="loading-text">Initializing...</div>
      </div>
    );
  }

  return (
    <>
      <StarryCanvas />
      <Navbar />
      <Hero profile={data.profile} />
      <About skills={data.skills} />
      <Experience experience={data.experience} />
      <Projects projects={data.projects} />
      <Contact />
      <footer>
        <span>Sameer P Bhandiwad — MSRIT '26</span>
        <span style={{ color: 'var(--teal)' }}>Built with ♥ in Bengaluru</span>
      </footer>
    </>
  );
}

export default App;
