// MiniCrew — Sections (Services, Process, Results, Pricing, CTA, Footer)

/* ──────────────────────────── SERVICES ────────────────────────────── */
const SERVICES = [
{ no: "01", t: "Social media videók", hu: "Reels · TikTok · Shorts",
  body: "Forgatókönyvtől a vágásig. Algoritmus-tudatos tartalom, ami nem csak elér, hanem konvertál — lájk helyett vásárlót hoz.",
  details: ["forgatókönyv és ritmus", "forgatás és világítás", "vágás · felirat · zene", "platform-specifikus export"] },
{ no: "02", t: "Weboldal tervezés", hu: "Landing-től full site-ig",
  body: "Modern, gyors, mobilbarát oldalak. Karbantartással együtt — egy gájddal, hogy te is tudd jövőben írni vagy bővíteni.",
  details: ["UX & wireframe", "design rendszer", "Webflow vagy egyedi kód", "SEO alapok és analytics"] },
{ no: "03", t: "Content stratégia", hu: "Adatvezérelt terv",
  body: "Melyik platformon, mikor, mit — nem találgatás. Havi riporttal és optimalizálással. Mindig tudod, miért csinálunk valamit.",
  details: ["audit és versenytárs-elemzés", "havi tartalmi naptár", "KPI és riport", "negyedéves stratégia"] },
{ no: "04", t: "Vágás & post-produkció", hu: "Meglévő anyagból profi",
  body: "Már van felvételed? Profi, feliratos, zenés videót készítünk belőle — gyorsan átadva, platformra optimalizálva.",
  details: ["vágás és ritmus", "szín és hangutó-mix", "feliratozás", "thumbnail design"] }];


function Services() {
  const [open, setOpen] = useState(0);
  return (
    <section id="services" className="mc-section" data-screen-label="02 Services">
      <div className="container">
        <Eyebrow no="II">Amit csinálunk</Eyebrow>
        <h2 className="mc-h2 serif">
          Négy dolog. <em>Mindegyiket jól.</em>
        </h2>

        <div className="mc-svc-grid">
          <ol className="mc-svc-list">
            {SERVICES.map((s, i) =>
            <li
              key={s.no}
              className={"mc-svc-item " + (open === i ? "open" : "")}
              onClick={() => setOpen(i)}
              onMouseEnter={() => setOpen(i)}>
              
                <span className="mc-svc-no mono">{s.no}</span>
                <span className="mc-svc-t serif">{s.t}</span>
                <span className="mc-svc-hu serif-it cream-dim">— {s.hu}</span>
                <span className="mc-svc-arrow">→</span>
              </li>
            )}
          </ol>

          <article key={open} className="mc-svc-detail">
            <div className="mc-svc-detail-no mono">N° {SERVICES[open].no} / 04</div>
            <h3 className="mc-svc-detail-t serif">{SERVICES[open].t}</h3>
            <p className="mc-svc-detail-hu serif-it">{SERVICES[open].hu}</p>
            <p className="mc-svc-detail-body cream-dim">{SERVICES[open].body}</p>
            <ul className="mc-svc-bullets">
              {SERVICES[open].details.map((d, i) =>
              <li key={i}><span className="mono mc-svc-bul-mark">→</span> {d}</li>
              )}
            </ul>
          </article>
        </div>
      </div>
    </section>);

}

/* ──────────────────────────── PROCESS ────────────────────────────── */
const STEPS = [
{ no: "I", t: "Briefing", time: "Online · 30 perc", d: "Megismerjük a vállalkozást, a célt és a hangnemet. Nincs felesleges meeting." },
{ no: "II", t: "Adatbekérő", time: "48 órán belül", d: "Konkrét célok, mérőszámok, deliverable-ök. Mindent papíron rögzítünk — meglepetés nélkül." },
{ no: "III", t: "Koncepció & gyártás", time: "Megbeszélt határidőre", d: "Forgatókönyv, design, gyártás. Profin legyártjuk, te közben a vállalkozásoddal foglalkozol." },
{ no: "IV", t: "Átadás & revízió", time: "Revíziós körrel", d: "Élesítés, dokumentáció, és addig finomítunk, amíg büszke leszel rá — és nyersz vele." }];


function Process() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  return (
    <section ref={ref} id="process" className="mc-section mc-process" data-screen-label="03 Process">
      <div className="container">
        <Eyebrow no="III">Hogyan dolgozunk</Eyebrow>
        <h2 className="mc-h2 serif">
          Egyszerű a folyamat.<br /><em>Mindent előre látsz.</em>
        </h2>

        <div className="mc-process-row">
          {STEPS.map((s, i) =>
          <div key={s.no} className="mc-process-cell"
          style={{ transitionDelay: `${i * 90}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}>
              <div className="mc-process-cell-top">
                <span className="serif-it mc-process-roman">{s.no}</span>
                <span className="mono cream-dim">FÁZIS · {String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mc-process-cell-t serif">{s.t}</h3>
              <div className="mc-process-cell-time mono">{s.time}</div>
              <p className="mc-process-cell-d cream-dim">{s.d}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ──────────────────── RESULTS / TESTIMONIALS ─────────────────────── */
const QUOTES = [
{ q: "Az első hét után háromszor annyi Instagram elérésünk lett. Végre van tartalmunk, amire büszkék vagyunk — nem csak posztolnunk kell.", who: "Kovács Márton", role: "Tulajdonos · Márton Kávézó" },
{ q: "A weboldalunk egy héten belül kész lett — azóta háromszor annyi ajánlatkérést kapunk. Megérte minden forintját.", who: "Varga Eszter", role: "CEO · StyleBox Kft." }];

const STATS = [
{ num: "48h", label: "Visszajelzési idő" },
{ num: "100%", label: "Házon belüli gyártás" },
{ num: "2×", label: "Gyorsabb mint egy ügynökség" }];


function Results() {
  return (
    <section id="results" className="mc-section mc-results" data-screen-label="04 Results">
      <div className="container">
        <Eyebrow no="IV">Ügyfeleink mondták</Eyebrow>
        <h2 className="mc-h2 serif">
          Eredmények,<br /><em>nem ígéretek.</em>
        </h2>

        <div className="mc-testi-row">
          {QUOTES.map((q, i) =>
          <article key={i} className="mc-testi">
              <div className="mc-testi-mark serif-it" aria-hidden="true">"</div>
              <p className="mc-testi-quote serif">{q.q}</p>
              <div className="mc-testi-by">
                <div className="mc-testi-name serif">{q.who}</div>
                <div className="mc-testi-role mono cream-dim">{q.role}</div>
              </div>
            </article>
          )}
        </div>

        <div className="mc-stats-row">
          {STATS.map((s, i) =>
          <div key={i} className="mc-stat">
              <div className="mc-stat-num serif">{s.num}</div>
              <div className="mc-stat-label mono cream-dim">{s.label}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ──────────────────────────── PRICING ────────────────────────────── */
const PLANS = [
{ name: "Social media", sub: "havi együttműködés",
  desc: "Folyamatos content gyártás Reels/TikTok/Shorts formátumban. Stratégiával együtt.",
  points: ["8–12 short-form videó / hó", "scripting + thumbnail", "platform-optimalizált export", "havi riport és optimalizálás", "prioritás visszajelzés"],
  cta: "Érdekel" },
{ name: "Weboldal", sub: "fix projekt",
  desc: "Modern, gyors, konvertáló oldal — landing-től teljes site-ig. Karbantartással együtt.",
  points: ["UX & design rendszer", "Webflow vagy egyedi kód", "SEO alapok + analytics", "tartalmi feltöltés", "6 hó support"],
  cta: "Beszéljünk" },
{ name: "Egyedi projekt", sub: "árajánlat alapján",
  desc: "Komplex kampány, márkafilm, B2B sales videó — minden, ami nem fér bele a sablonba.",
  points: ["teljes content stratégia", "videó + weboldal kombinálva", "dedikált kapcsolattartó", "negyedéves stratégia", "árajánlatra"],
  cta: "Kérek ajánlatot" }];


function Pricing() {
  return (
    <section id="pricing" className="mc-section mc-pricing" data-screen-label="05 Pricing">
      <div className="container">
        <Eyebrow no="V">Átlátható árazás</Eyebrow>
        <h2 className="mc-h2 serif">
          Csomagok.<br /><em>Mindig árajánlatra.</em>
        </h2>
        <p className="mc-h2-sub cream-dim">
          Minden projekt egyedi. Az alábbiakban a tipikus együttműködési formákat látod — pontos árat
          a briefing után, írásban kapod.
        </p>

        <div className="mc-pricing-row">
          {PLANS.map((p, i) =>
          <article key={p.name} className="mc-plan">
              <div className="mc-plan-no mono">N° {String(i + 1).padStart(2, "0")} / 03</div>
              <h3 className="mc-plan-name serif">{p.name}</h3>
              <div className="mc-plan-sub serif-it cream-dim">— {p.sub}</div>
              <p className="mc-plan-desc cream-dim">{p.desc}</p>
              <ul className="mc-plan-points">
                {p.points.map((pt, j) =>
              <li key={j}><span className="mc-plan-point-mark mono">✦</span> {pt}</li>
              )}
              </ul>
              <a href="#cta" className="mc-plan-cta mono">{p.cta} →</a>
            </article>
          )}
        </div>
      </div>
    </section>);

}

/* ──────────────────────────── CTA (form) ─────────────────────────── */
function CTA() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {e.preventDefault();setSent(true);};

  const ref = useRef(null);
  useSpotlight(ref, 0.7);
  return (
    <section ref={ref} id="cta" className="mc-section mc-cta mc-hero-spot" data-screen-label="06 CTA">
      <div className="container mc-cta-grid">
        <div className="mc-cta-left">
          <Eyebrow no="VI">Kapcsolat</Eyebrow>
          <h2 className="mc-h2 serif" style={{ marginBottom: 18 }}>
            Készen állsz<br />az <em>első lépésre?</em>
          </h2>
          <p className="cream-dim mc-cta-desc">
            Egy 30 perces hívás elég, hogy kiderüljön — együtt tudunk-e dolgozni. Kötelezettség nélkül.
          </p>
          <ul className="mc-cta-meta">
            <li><span className="mono cream-dim">EMAIL</span><a href="mailto:hello@minicrew.hu">hello@minicrew.hu</a></li>
            <li><span className="mono cream-dim">TELEFON</span><a href="tel:+3630">+36 30 ··· ····</a></li>
            <li><span className="mono cream-dim">CÍM</span><span>Budapest VII. ker.</span></li>
          </ul>
        </div>

        <form className="mc-cta-form" onSubmit={onSubmit}>
          <div className="mc-cta-form-no mono">No / 01 — Új projekt</div>
          {sent ?
          <div className="mc-cta-sent">
              <div className="serif-it" style={{ fontSize: 36, color: "var(--gold)", marginBottom: 12 }}>Köszönjük.</div>
              <p className="cream-dim">24 órán belül visszaírunk — addig is, jó nézést a többi munkánkon!</p>
            </div> :

          <>
              <label className="mc-cta-field">
                <span className="mono cream-dim">Neved</span>
                <input type="text" required placeholder="Kovács Márton" />
              </label>
              <label className="mc-cta-field">
                <span className="mono cream-dim">Email</span>
                <input type="email" required placeholder="te@vallakozasod.hu" />
              </label>
              <label className="mc-cta-field">
                <span className="mono cream-dim">Vállalkozás</span>
                <input type="text" placeholder="Cégnév · iparág" />
              </label>
              <label className="mc-cta-field">
                <span className="mono cream-dim">Mit szeretnél</span>
                <select defaultValue="">
                  <option value="" disabled>— válassz —</option>
                  <option>Social media videók</option>
                  <option>Weboldal</option>
                  <option>Content stratégia</option>
                  <option>Egyedi projekt</option>
                </select>
              </label>
              <label className="mc-cta-field mc-cta-field-area">
                <span className="mono cream-dim">Üzenet</span>
                <textarea rows="4" placeholder="Mesélj röviden a projektről…" />
              </label>
              <button type="submit" className="mc-cta-submit">
                <span>Küldés</span>
                <span aria-hidden="true">→</span>
              </button>
              <div className="mc-cta-fineprint mono cream-dim">
                A küldéssel elfogadod adatkezelési tájékoztatónkat.
              </div>
            </>
          }
        </form>
      </div>
    </section>);

}

/* ──────────────────────────── FOOTER ─────────────────────────────── */
function Footer() {
  return (
    <footer className="mc-footer" data-screen-label="07 Footer">
      <div className="container">
        <div className="mc-footer-grid">
          <div className="mc-footer-brand">
            <img src={(typeof window !== 'undefined' && window.__resources && window.__resources.strongman) || "assets/strongman.png"} alt="MiniCrew" className="mc-footer-logo" style={{ width: "0px", height: "130px", margin: "0px 0px -29.2px" }} />
            <div className="mc-footer-mark serif-it"></div>
            <p className="mc-footer-tag serif-it cream-dim">
              „Kis kalappal is lehet<br />nagyot köszönni."
            </p>
          </div>
          <div>
            <div className="mono cream-dim mc-footer-h">NAVIGÁCIÓ</div>
            <ul className="mc-footer-list">
              <li><a href="#services">Szolgáltatások</a></li>
              <li><a href="#process">Folyamat</a></li>
              <li><a href="#pricing">Csomagok</a></li>
              <li><a href="#cta">Ajánlatkérés</a></li>
            </ul>
          </div>
          <div>
            <div className="mono cream-dim mc-footer-h">KAPCSOLAT</div>
            <ul className="mc-footer-list">
              <li><a href="mailto:hello@minicrew.hu">hello@minicrew.hu</a></li>
              <li>+36 30 ··· ····</li>
              <li>Budapest VII., HU</li>
            </ul>
          </div>
          <div>
            <div className="mono cream-dim mc-footer-h">KÖVESS</div>
            <ul className="mc-footer-list">
              <li><a href="#">Instagram ↗</a></li>
              <li><a href="#">TikTok ↗</a></li>
              <li><a href="#">LinkedIn ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="mc-footer-bot">
          <span className="mono cream-dim">© 2025 MiniCrew · Minden jog fenntartva.</span>
          <span className="mono cream-dim">Budapest · Made with care.</span>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { Services, Process, Results, Pricing, CTA, Footer });