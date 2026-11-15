import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Music, ListMusic, Mic2, MonitorPlay } from "lucide-react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = "/bgmusic.mp3";

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = volume;

    const onLoadedMetadata = () => setDuration(audioRef.current?.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime || 0);
    const onEnded = () => setIsPlaying(false);

    audioRef.current.addEventListener("loadedmetadata", onLoadedMetadata);
    audioRef.current.addEventListener("timeupdate", onTimeUpdate);
    audioRef.current.addEventListener("ended", onEnded);

    return () => {
      audioRef.current?.removeEventListener("loadedmetadata", onLoadedMetadata);
      audioRef.current?.removeEventListener("timeupdate", onTimeUpdate);
      audioRef.current?.removeEventListener("ended", onEnded);
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (sec: number) => {
    if (isNaN(sec) || sec === 0) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const restartSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center justify-between w-full h-full gap-4 sm:gap-8">
      {/* Left: Artwork + Title + Artist */}
      <div className="flex items-center gap-3 min-w-0 w-64 lg:w-72">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg shadow-lg overflow-hidden group">
          <img 
            src="/projects/lgds.png" 
            alt="Artwork" 
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${isPlaying ? "scale-110" : "scale-100"}`} 
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <Music className={`h-4 w-4 text-white/90 ${isPlaying ? "animate-bounce" : ""}`} />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-foreground truncate tracking-tight">
            Background Music
          </span>
          <span className="text-[10px] text-ink-soft truncate font-medium">
            xBuuzz.CMD — Creative Systems
          </span>
        </div>
      </div>

      {/* Center: Playback Controls + Progress Bar */}
      <div className="flex flex-1 flex-col items-center max-w-xl">
        <div className="flex items-center gap-6 mb-1.5 mt-2">
          <button
            onClick={restartSong}
            className="text-ink-soft hover:text-foreground transition-colors"
            title="Phát lại"
          >
            <SkipBack size={16} fill="currentColor" />
          </button>
          <button
            onClick={togglePlay}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background hover:scale-105 active:scale-95 transition"
            title={isPlaying ? "Tạm dừng" : "Phát"}
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
          </button>
          <button
            onClick={restartSong}
            className="text-ink-soft hover:text-foreground transition-colors"
            title="Chuyển tiếp"
          >
            <SkipForward size={16} fill="currentColor" />
          </button>
        </div>

        <div className="w-full flex items-center gap-3 text-[10px] text-ink-soft font-medium">
          <span className="w-9 text-right tabular-nums">{formatTime(currentTime)}</span>
          <div className="relative flex-1 flex items-center h-1.5 cursor-pointer group">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
            />
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/60 group-hover:bg-primary transition-all rounded-full relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-sm" />
              </div>
            </div>
          </div>
          <span className="w-9 tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume + Extra Actions (To fill space) */}
      <div className="flex items-center gap-4 justify-end w-64 lg:w-72">
        <div className="flex items-center gap-3 px-3 py-1 bg-white/5 rounded-full border border-white/5">
          <button onClick={() => setIsMuted(!isMuted)} className="text-ink-soft hover:text-foreground transition-colors">
            {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setIsMuted(false);
            }}
            className="w-20 lg:w-24 h-1 accent-white cursor-pointer bg-white/10 rounded-full"
          />
        </div>
        <div className="hidden lg:flex items-center gap-3 ml-2 border-l border-white/10 pl-4">
          <button className="text-ink-soft hover:text-foreground transition-colors" title="Lời bài hát">
            <Mic2 size={15} />
          </button>
          <button className="text-ink-soft hover:text-foreground transition-colors" title="Danh sách phát">
            <ListMusic size={15} />
          </button>
          <button className="text-ink-soft hover:text-foreground transition-colors" title="Thiết bị khác">
            <MonitorPlay size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
