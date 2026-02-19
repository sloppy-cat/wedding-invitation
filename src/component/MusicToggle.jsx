import { useBgm } from "./BgmContext";
import speaker from "../icons/speaker.png";
import mute from "../icons/mute.png";


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
        cursor: "pointer",
        display: "flex",           // 추가
        alignItems: "center",      // 추가
        justifyContent: "center"   // 추가
      }}
    >
      {isPlaying ?
        <img src={speaker} alt="음악 재생 중" style={{ width: "24px", height: "24px" }} /> :
        <img src={mute} alt="음악 정지" style={{ width: "24px", height: "24px" }} />
      }
    </button>
  );
}
