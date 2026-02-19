import { createContext, useContext, useEffect, useRef, useState } from "react";

const BgmContext = createContext();

export function BgmProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      localStorage.setItem("bgm", "on");
    } catch (e) {
      console.log(e);
      console.log("자동재생 차단됨");
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
    localStorage.setItem("bgm", "off");
  };

  const toggle = () => {
    isPlaying ? pause() : play();
  };

useEffect(() => {
  const unlockAudio = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      localStorage.setItem("bgm", "on");
    } catch (e) {
      console.log("재생 실패:", e);
    }

    // 한 번만 실행
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("mousedown", unlockAudio);
  };

  window.addEventListener("pointerdown", unlockAudio);
  window.addEventListener("touchstart", unlockAudio);
  window.addEventListener("mousedown", unlockAudio);

  return () => {
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("mousedown", unlockAudio);
  };
}, []);

  return (
    <BgmContext.Provider value={{ isPlaying, toggle }}>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}/frozen_silence.mp3`}
        loop
      />
      {children}
    </BgmContext.Provider>
  );
}

export function useBgm() {
  return useContext(BgmContext);
}
