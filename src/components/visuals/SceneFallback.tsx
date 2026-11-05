const labels = [
  "LINUX",
  "DNS",
  "GIT",
  "SEC",
  "SQL",
  "BASH",
  "REACT",
  "WEB",
  "NAT",
  "VLAN",
  "VM",
  "IT",
];
export default function SceneFallback({
  variant = "workspace",
}: {
  variant?: string;
}) {
  return (
    <div
      className={`scene-fallback scene-fallback-${variant}`}
      aria-hidden="true"
    >
      <div className="fallback-orbit" />
      <div className="fallback-orbit orbit-two" />
      <div className="fallback-keyboard">
        {labels.map((label, index) => (
          <span
            key={label}
            style={{ "--key-index": index } as React.CSSProperties}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="fallback-core">&lt;/&gt;</div>
    </div>
  );
}
