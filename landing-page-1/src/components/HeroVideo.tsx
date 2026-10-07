import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface HeroVideoProps {
  className?: string;
  aspectRatio?: string;
}

export default function HeroVideo({
  className = '',
  aspectRatio = 'aspect-[4/5] sm:aspect-[9/12] lg:aspect-[9/13] max-h-[590px]',
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={`relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-surface-secondary border border-border-subtle shadow-[0_20px_50px_rgba(43,45,36,0.12)] ${aspectRatio} group select-none ${className}`}>
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-[1.02]"
        aria-label="South Asian wellness and nutritional care preview video"
      >
        <source
          src="https://videos.pexels.com/video-files/8844502/8844502-uhd_2160_4096_24fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://www.pexels.com/download/video/8844502/"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/35 pointer-events-none" />

      {/* Top Overlay Badge & Interactive Controls */}
      <div className="absolute top-4 sm:top-5 inset-x-4 sm:inset-x-5 flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-[12px] font-500 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-sand animate-pulse" />
          <span className="tracking-wide">100% Online Clinic</span>
        </div>

        {/* Media Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/20 text-white transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="translate-x-0.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/20 text-white transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
