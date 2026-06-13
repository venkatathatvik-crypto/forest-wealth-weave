const layers = [
  { label: "Manufacturers / OEMs", sub: "Production · Packaging", count: 1 },
  { label: "Aggregators", sub: "2+FAPL · Warehousing", count: 2 },
  { label: "Financial Institutions", sub: "MFI · NBFC · Cooperatives", count: 3 },
  { label: "Partners", sub: "Channel & Strategic", count: 3 },
  { label: "Branches", sub: "Last-Mile Touchpoints", count: 4 },
  { label: "Customers", sub: "Rural · Semi-Urban · Urban", count: 5 },
];

export function EcosystemNetwork() {
  const width = 560;
  const height = 560;
  const rowY = (i: number) => 60 + i * ((height - 120) / (layers.length - 1));

  return (
    <div className="relative w-full max-w-[620px] mx-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label="Distribution ecosystem network"
      >
        <defs>
          <linearGradient id="goldLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#B8902C" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4D27A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Connecting lines */}
        {layers.slice(0, -1).map((layer, i) => {
          const next = layers[i + 1];
          const y1 = rowY(i);
          const y2 = rowY(i + 1);
          const xs1 = Array.from({ length: layer.count }, (_, k) =>
            (width / (layer.count + 1)) * (k + 1),
          );
          const xs2 = Array.from({ length: next.count }, (_, k) =>
            (width / (next.count + 1)) * (k + 1),
          );
          return xs1.flatMap((x1, a) =>
            xs2.map((x2, b) => (
              <line
                key={`${i}-${a}-${b}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#goldLine)"
                strokeWidth="1.2"
                strokeDasharray="3 6"
                style={{
                  animation: `dash-flow ${6 + ((a + b) % 4)}s linear infinite`,
                }}
              />
            )),
          );
        })}

        {/* Nodes */}
        {layers.map((layer, i) => {
          const y = rowY(i);
          return Array.from({ length: layer.count }).map((_, k) => {
            const x = (width / (layer.count + 1)) * (k + 1);
            return (
              <g key={`n-${i}-${k}`}>
                <circle cx={x} cy={y} r={26} fill="url(#nodeGlow)" filter="url(#soft)" />
                <circle
                  cx={x}
                  cy={y}
                  r={9}
                  fill="#0B3D2E"
                  stroke="#D4AF37"
                  strokeWidth="1.4"
                />
                <circle cx={x} cy={y} r={3.5} fill="#D4AF37" />
              </g>
            );
          });
        })}

        {/* Labels */}
        {layers.map((layer, i) => {
          const y = rowY(i);
          return (
            <g key={`l-${i}`}>
              <text
                x={width - 8}
                y={y - 4}
                textAnchor="end"
                fill="#0B3D2E"
                style={{ font: "500 13px Inter, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                {layer.label}
              </text>
              <text
                x={width - 8}
                y={y + 12}
                textAnchor="end"
                fill="#B8902C"
                opacity="0.95"
                style={{ font: "400 11px Inter, sans-serif" }}
              >
                {layer.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}