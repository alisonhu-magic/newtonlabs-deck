import type { Canvas, Provider } from "./content";
import { MARK, canvasSlug } from "./content";

function Logo({ src, name }: { src: string; name: string }) {
  return (
    <span
      className="fs-logo"
      role="img"
      aria-label={name}
      style={{ backgroundImage: src ? `url('${src}')` : undefined }}
    />
  );
}

function Card({
  item,
  fixed,
}: {
  item: Provider;
  fixed?: boolean;
}) {
  return (
    <div className={fixed ? "fs-card-fixed" : "fs-card"}>
      <Logo src={item.icon} name={item.name} />
      <span className="fs-name">{item.name}</span>
    </div>
  );
}

function Body({ canvas }: { canvas: Canvas }) {
  if (canvas.merged) {
    return (
      <div className="fs-groups fs-groups-fill">
        {canvas.groups.map((g) => (
          <div key={g.label} className="fs-group">
            <div className="fs-sub">{g.label}</div>
            <div className="fs-group-row">
              {g.items.map((item) => (
                <Card key={item.name} item={item} fixed />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="fs-rows">
      {canvas.rows.map((row, i) => (
        <div key={i} className="fs-row">
          {row.map((item) => (
            <Card key={item.name} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Chip({ canvas }: { canvas: Canvas }) {
  return (
    <div className="fs-chip">
      <span>{canvas.n}</span>
      <span>{canvas.stage}</span>
      <span className="fs-chip-rule" aria-hidden />
      <span>{canvas.tag}</span>
    </div>
  );
}

export function CategoryCanvas({
  canvas,
  format,
}: {
  canvas: Canvas;
  format: "sq" | "ls";
}) {
  return (
    <div
      className={`fs-canvas fs-canvas-${format}`}
      data-export={`${format}-${canvasSlug(canvas.label)}`}
    >
      <img className="fs-mark" src={MARK} alt="Newton Foundation" />
      <div className="fs-header">
        <Chip canvas={canvas} />
        <h2 className="fs-title">{canvas.label}</h2>
      </div>
      <div className="fs-body">
        <Body canvas={canvas} />
      </div>
      <div className="fs-footer">
        <span className="fs-count">{canvas.countLabel}</span>
        <span className="fs-rule" />
        <span>Digital Asset Compliance Landscape 2026</span>
      </div>
    </div>
  );
}

export function BannerCanvas({ canvas }: { canvas: Canvas }) {
  return (
    <div
      className="fs-canvas fs-canvas-bn"
      data-export={`bn-${canvasSlug(canvas.label)}`}
    >
      <img className="fs-mark" src={MARK} alt="Newton Foundation" />
      <div className="fs-bn-copy">
        <Chip canvas={canvas} />
        <h2 className="fs-title">{canvas.label}</h2>
        <p className="fs-bn-series">Digital Asset Compliance Landscape 2026</p>
      </div>
      <div className="fs-bn-pills">
        {canvas.items.map((item) => (
          <span key={item.name} className="fs-pill">
            <Logo src={item.icon} name={item.name} />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
