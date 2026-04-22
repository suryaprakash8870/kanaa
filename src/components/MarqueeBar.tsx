const items = [
  "100% Natural",
  "Cold Pressed Oil",
  "Zero Preservatives",
  "Grandma's Recipe",
  "Made with Love",
  "South Indian Tradition",
  "Handcrafted in Small Batches",
  "No Artificial Colours",
  "100% Natural",
  "Cold Pressed Oil",
  "Zero Preservatives",
  "Grandma's Recipe",
  "Made with Love",
  "South Indian Tradition",
  "Handcrafted in Small Batches",
  "No Artificial Colours",
];

export default function MarqueeBar() {
  return (
    <div
      style={{
        background: "#214D34",
        overflow: "hidden",
        padding: "14px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="animate-marquee" style={{ display: "flex", gap: 0, width: "max-content" }}>
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#FAF7F2",
              letterSpacing: "1px",
              whiteSpace: "nowrap",
              padding: "0 28px",
              opacity: 0.88,
            }}
          >
            <svg width="5" height="5" viewBox="0 0 5 5" fill="#C9A24A">
              <circle cx="2.5" cy="2.5" r="2.5" />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
