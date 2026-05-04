// MiniCrew — Floating numbered nav
// A small vertical index of section numbers on the left edge.
// Hover (or focus) on any number expands to show the label.
// Active section's number is gold + has a hairline accent line.
// On mobile (≤720px) it collapses to a thin top bar with just numbers.

function FloatingNav({ items, activeIdx }) {
  const [hovered, setHovered] = useState(null);

  return (
    <nav className="mc-fnav" aria-label="Section navigation">
      <ol className="mc-fnav-list">
        {items.map((it, i) => {
          const active = i === activeIdx;
          const expanded = hovered === i || active;
          return (
            <li key={it.id} className={"mc-fnav-item " + (active ? "active " : "") + (expanded ? "expanded" : "")}>
              <a
                href={`#${it.id}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                aria-current={active ? "true" : undefined}>
                <span className="mc-fnav-line" aria-hidden="true"/>
                <span className="mc-fnav-label">{it.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Object.assign(window, { FloatingNav });
