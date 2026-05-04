// MiniCrew — App entry
const SECTIONS = [
  { id:"hero",     label:"Bevezető",     hu:"start" },
  { id:"services", label:"Szolgáltatás", hu:"négy dolog" },
  { id:"process",  label:"Folyamat",     hu:"hogy megy" },
  { id:"results",  label:"Eredmények",   hu:"ügyfeleink" },
  { id:"pricing",  label:"Csomagok",     hu:"mit kínálunk" },
  { id:"cta",      label:"Kapcsolat",    hu:"írj nekünk" },
];

function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "blendMode": "screen",
    "mascotOpacity": 0.95,
    "spotlight": true
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeIdx, setActiveIdx] = useState(0);
  const progress = useScrollProgress();

  // Active section detection
  useEffect(() => {
    const observers = SECTIONS.map((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveIdx(i); });
      }, { rootMargin: "-40% 0px -40% 0px" });
      io.observe(el);
      return io;
    });
    return () => { observers.forEach(o => o?.disconnect()); };
  }, []);

  return (
    <>
      <div className="grain"/>

      {/* Top progress bar */}
      <div className="mc-progress" aria-hidden="true">
        <div style={{ transform:`scaleX(${progress})` }}/>
      </div>

      <FloatingNav items={SECTIONS} activeIdx={activeIdx} />

      <main>
        <Hero tweaks={tweaks} />
        <Services />
        <Process />
        <Results />
        <Pricing />
        <CTA />
      </main>
      <Footer />

      <TweaksPanel title="MiniCrew Tweaks">
        <TweakSection label="Hero" />
        <TweakSelect label="Blend mode" value={tweaks.blendMode}
          options={["screen","lighten","normal","difference","exclusion"]}
          onChange={(v) => setTweak("blendMode", v)} />
        <TweakSlider label="Mascot opacity" value={tweaks.mascotOpacity} min={0.2} max={1} step={0.05}
          onChange={(v) => setTweak("mascotOpacity", v)} />
        <TweakToggle label="Cursor spotlight" value={tweaks.spotlight}
          onChange={(v) => setTweak("spotlight", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
