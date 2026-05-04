// MiniCrew — Hero v2
// Dynamic canvas spotlight (gold beams from corners + cursor light + drifting particles)
// Darker tone (--ink-0 background). Headline + desc text reveal as cursor approaches.
// Strongman appears in right column, lights up under cursor proximity.
// Bottom: rotating stamp tagline.

function HeroCanvas({ heroRef, h1Ref, descRef, logoRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;
    const ctx = canvas.getContext("2d");
    let W = 0,H = 0,raf = 0,lx = 0,ly = 0,mx = 0,my = 0,entered = false;
    function resize() {W = canvas.width = hero.offsetWidth;H = canvas.height = hero.offsetHeight;}
    resize();
    window.addEventListener("resize", resize);

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      entered = true;

      const h1 = h1Ref.current,desc = descRef.current,logo = logoRef.current;
      if (h1) {
        const cx = W * 0.32,cy = H * 0.5;
        const d = Math.hypot(mx - cx, my - cy);
        const max = Math.hypot(W * 0.55, H * 0.55);
        const prox = Math.max(0, 1 - d / max);
        h1.style.color = `rgba(245,236,215,${0.32 + prox * 0.62})`;
      }
      if (desc) {
        const cx = W * 0.32,cy = H * 0.62;
        const d = Math.hypot(mx - cx, my - cy);
        const max = Math.hypot(W * 0.55, H * 0.55);
        const prox = Math.max(0, 1 - d / max);
        desc.style.color = `rgba(245,236,215,${0.20 + prox * 0.45})`;
      }
      if (logo) {
        const cx = W * 0.74,cy = H * 0.50;
        const d = Math.hypot(mx - cx, my - cy);
        const max = Math.hypot(W * 0.42, H * 0.55);
        const prox = Math.max(0, 1 - d / max);
        logo.style.opacity = 0.05 + prox * 0.55;
      }
    };
    document.addEventListener("mousemove", onMove);

    const particles = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * 1920, y: Math.random() * 1080,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
        baseO: Math.random() * 0.35 + 0.06, phase: Math.random() * Math.PI * 2
      });
    }

    function drawBeam(ox, oy, spread, alpha) {
      const angle = Math.atan2(ly - oy, lx - ox);
      const len = Math.hypot(W, H) * 1.2;
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, len);
      g.addColorStop(0, `rgba(212,175,55,${alpha})`);
      g.addColorStop(0.35, `rgba(212,175,55,${alpha * 0.2})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.arc(ox, oy, len, angle - spread, angle + spread);
      ctx.closePath();
      ctx.fill();
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!entered) {mx = W * 0.74;my = H * 0.46;}
      lx = lerp(lx, mx, 0.06);ly = lerp(ly, my, 0.06);

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0802";ctx.fillRect(0, 0, W, H);

      // beams from top corners
      drawBeam(0, 0, 0.20, 0.10);
      drawBeam(W, 0, 0.20, 0.10);
      drawBeam(0, 0, 0.07, 0.06);
      drawBeam(W, 0, 0.07, 0.06);

      // cursor light (warm gold)
      const g1 = ctx.createRadialGradient(lx, ly, 0, lx, ly, 480);
      g1.addColorStop(0, "rgba(212,175,55,0.18)");
      g1.addColorStop(0.4, "rgba(212,175,55,0.05)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;ctx.fillRect(0, 0, W, H);

      // cursor inner cream
      const g2 = ctx.createRadialGradient(lx, ly, 0, lx, ly, 180);
      g2.addColorStop(0, "rgba(245,236,215,0.10)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;ctx.fillRect(0, 0, W, H);

      // drifting particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;p.y += p.vy;p.phase += 0.014;
        if (p.x < 0) p.x = W;if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;if (p.y > H) p.y = 0;
        const d = Math.hypot(p.x - lx, p.y - ly);
        const prox = Math.max(0, 1 - d / 280);
        const o = (p.baseO + Math.sin(p.phase) * 0.08) * (1 + prox * 2.4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + prox * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${Math.min(o, 0.85)})`;
        ctx.fill();
      }

      // vignette
      const v = ctx.createRadialGradient(W / 2, H / 2, H * 0.30, W / 2, H / 2, H * 0.92);
      v.addColorStop(0, "transparent");
      v.addColorStop(1, "rgba(4,3,1,0.82)");
      ctx.fillStyle = v;ctx.fillRect(0, 0, W, H);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="mc-hero-canvas" aria-hidden="true" />;
}

function Hero({ tweaks }) {
  const heroRef = useRef(null);
  const h1Ref = useRef(null);
  const descRef = useRef(null);
  const logoRef = useRef(null);

  return (
    <section ref={heroRef} className="mc-hero-v2" id="hero" data-screen-label="01 Hero">
      <HeroCanvas heroRef={heroRef} h1Ref={h1Ref} descRef={descRef} logoRef={logoRef} />

      {/* top hairline labels */}
      <div className="mc-hero-top">
        <span className="mono cream-dim">★ Vol. XXVI · Budapest 2026</span>
        <span className="mono" style={{ color: "var(--gold)" }}>EST. MMXIX</span>
      </div>

      <div className="mc-hero-grid">
        {/* LEFT — copy */}
        <div className="mc-hero-left">
          <div className="mc-hero-eyebrow">
            <span className="mono" style={{ color: "var(--gold)" }}>✦ B2B CONTENT</span>
            <span className="mono cream-dim">·</span>
            <span className="mono cream-dim">HIGH-VALUE PROJEKTEK · BUDAPEST</span>
          </div>

          <h1 ref={h1Ref} className="mc-hero-h1 serif">
            Tartalom, ami<br/><em>megmutatja</em> mire<br/>képes a vállalkozásod.
          </h1>

          <p ref={descRef} className="mc-hero-desc">
            Komplex termék. Magas ár. Hosszú döntési folyamat.
            Mi pontosan erre vagyunk kitalálva — videókkal és weboldalakkal,
            amik nem csak szépek, hanem el is adnak.
          </p>

          <div className="mc-hero-actions">
            <GoldButton href="#services">Munkáink</GoldButton>
            <GoldButton href="#cta" ghost>Beszéljünk →</GoldButton>
          </div>
        </div>

        {/* RIGHT — strongman */}
        <div className="mc-hero-right">
          <img
            ref={logoRef}
            src={(typeof window !== 'undefined' && window.__resources && window.__resources.strongman) || "assets/strongman.png"}
            alt="MiniCrew strongman"
            className="mc-hero-logo"
            style={{ mixBlendMode: tweaks.blendMode || "screen" }} />
        </div>
      </div>
    </section>);

}

Object.assign(window, { Hero });
