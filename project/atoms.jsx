// MiniCrew — shared UI atoms
// Loaded into window scope.

const { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } = React;

/* ─────────────────────────────────────────────────────────────────────
   Vintage Stamp — circular text seal used for the tagline / badges
   ────────────────────────────────────────────────────────────────── */
function VintageStamp({ text, sub = "", size = 180, rotate = -8, color = "var(--gold)", innerGlyph = "★" }) {
  const id = useMemo(() => "p" + Math.random().toString(36).slice(2, 8), []);
  const r = size / 2 - 1;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      <defs>
        <path id={id} d={`M ${size / 2}, ${size / 2} m -${r - 12}, 0 a ${r - 12},${r - 12} 0 1,1 ${(r - 12) * 2},0 a ${r - 12},${r - 12} 0 1,1 -${(r - 12) * 2},0`} />
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="1" />
      <circle cx={size / 2} cy={size / 2} r={r - 6} fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="2 4" />
      <circle cx={size / 2} cy={size / 2} r={r - 22} fill="none" stroke={color} strokeWidth="0.5" />
      <text fill={color} fontFamily="var(--mono)" fontSize="9" letterSpacing="3">
        <textPath href={`#${id}`} startOffset="0">{text}</textPath>
      </text>
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fill={color} fontFamily="var(--mono)" fontSize="14" letterSpacing="2">{innerGlyph}</text>
      {sub && <text x={size / 2} y={size / 2 + 22} textAnchor="middle" fill={color} fontFamily="var(--mono)" fontSize="7" letterSpacing="2" opacity="0.7">{sub}</text>}
    </svg>);

}

/* ─────────────────────────────────────────────────────────────────────
   Ornament divider — vintage-style horizontal rule with a glyph in middle
   ────────────────────────────────────────────────────────────────── */
function Ornament({ glyph = "✦", color = "var(--gold)", thin = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, color, opacity: thin ? 0.5 : 0.9 }}>
      <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${color === "var(--gold)" ? "rgba(212,175,55,.4)" : "rgba(245,236,215,.3)"})` }} />
      <span style={{ fontFamily: "var(--serif)", fontSize: 14 }}>{glyph}</span>
      <span style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${color === "var(--gold)" ? "rgba(212,175,55,.4)" : "rgba(245,236,215,.3)"})` }} />
    </div>);

}

/* ─────────────────────────────────────────────────────────────────────
   Section eyebrow — small ornamented label
   ────────────────────────────────────────────────────────────────── */
function Eyebrow({ no, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", letterSpacing: "0.18em" }}>
        {no && <span style={{ marginRight: 10, opacity: .55 }}>§ {no}</span>}
        {children}
      </span>
      <span style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(212,175,55,.6), transparent)" }} />
    </div>);

}

/* ─────────────────────────────────────────────────────────────────────
   Spotlight cursor — wraps a section, lights an area around the cursor
   ────────────────────────────────────────────────────────────────── */
function useSpotlight(ref, intensity = 1) {
  useEffect(() => {
    const el = ref.current;if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px");
      el.style.setProperty("--my", e.clientY - r.top + "px");
      el.style.setProperty("--mi", intensity);
    };
    const onLeave = () => {el.style.setProperty("--mi", 0);};
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {el.removeEventListener("mousemove", onMove);el.removeEventListener("mouseleave", onLeave);};
  }, [ref, intensity]);
}

/* ─────────────────────────────────────────────────────────────────────
   In-view hook — drives scroll animations
   ────────────────────────────────────────────────────────────────── */
function useInView(opts = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {setInView(true);io.disconnect();}
    }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

/* ─────────────────────────────────────────────────────────────────────
   Scroll progress — 0..1 across full document
   ────────────────────────────────────────────────────────────────── */
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {window.removeEventListener("scroll", onScroll);window.removeEventListener("resize", onScroll);};
  }, []);
  return p;
}

/* ─────────────────────────────────────────────────────────────────────
   Magnetic CTA — gold pill button with hover halftone fill
   ────────────────────────────────────────────────────────────────── */
function GoldButton({ children, ghost = false, small = false, onClick, href, ...rest }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} className={`mc-btn ${ghost ? "mc-btn-ghost" : ""} ${small ? "mc-btn-sm" : ""}`} {...rest}>
      <span className="mc-btn-label">{children}</span>
      <span className="mc-btn-arrow" aria-hidden="true">→</span>
    </Tag>);

}

Object.assign(window, {
  VintageStamp, Ornament, Eyebrow, GoldButton,
  useSpotlight, useInView, useScrollProgress
});