import { useBgm } from "./BgmContext";

export default function MusicToggle() {
  const { isPlaying, toggle } = useBgm();

  return (
    <button
      onClick={toggle}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        fontSize: "22px",
        background: "rgba(255,255,255,0.6)",
        border: "none",
        borderRadius: "50%",
        width: "48px",
        height: "48px",
        backdropFilter: "blur(6px)",
        cursor: "pointer"
      }}
    >
      {isPlaying ? "🔊" : "🔈"}
    </button>
  );
}
