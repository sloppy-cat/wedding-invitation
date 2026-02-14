import { createContext, useContext, useRef, useState } from "react";

const BgmContext = createContext();

export function BgmProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    if (!audioRef.current) return;
    await audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <BgmContext.Provider value={{ play, pause, isPlaying }}>
      <audio
        ref={audioRef}
        src="/wedding-invitation/frozen_silence.mp3"
        loop
        controls
      />
      {children}
    </BgmContext.Provider>
  );
}

export function useBgm() {
  return useContext(BgmContext);
}
