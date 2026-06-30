export default function BrandLogo({ tone = "light", compact = false }) {
  const src = tone === "dark" ? "/brand/logo-dark.png" : "/brand/logo-light.png";

  return (
    <span className={`brand-logo brand-logo-${tone}${compact ? " compact" : ""}`}>
      <img
        className="brand-logo-mark"
        src={src}
        alt="DreamAndScale"
        width="615"
        height="106"
      />
    </span>
  );
}
