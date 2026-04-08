// components/Testimonials.jsx
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A NEW TESTIMONIAL:
//   1. Add a new object to the TESTIMONIALS array below.
//   2. Fill in: name, role, location, quote, videoSrc, thumbnail.
//   3. Done — the card renders automatically.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback } from 'react';
import { trackCtaClick } from '../lib/firebase';

/* ══════════════════════════════════════════════════════════════════════════════
   TESTIMONIAL DATA
══════════════════════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Rajan',
    role: 'Daughter',
    location: 'Based in Toronto, Canada',
    quote: "Senior’s feedback on 60Plus India",
    videoSrc: '/videos/testimonial_1.mp4',
    thumbnail: '/testimonials/priya.jpg',
  },
  {
    id: 2,
    name: 'Karthik Sundaram',
    role: 'Son',
    location: 'Based in London, UK',
    quote: 'Overcoming barriers',
    videoSrc: '/videos/testimonials_2.mp4',
    thumbnail: '/testimonials/karthik.jpg',
  },
  {
    id: 3,
    name: 'Dr. Meena Iyer',
    role: 'Daughter',
    location: 'Based in New Jersey, USA',
    //quote: "Appreciating 60Plus India",
    videoSrc: '/videos/testimonial_4.mp4',
    thumbnail: '/testimonials/meena.jpg',
  },
  {
    id: 4,
    name: 'Rajesh & Kavitha',
    role: 'Family',
    location: 'Based in Dubai, UAE',
    quote: 'We enrolled both our parents in the same month. The difference in their energy and happiness is visible. Thank you, 60Plus.',
    videoSrc: '/videos/testimonial_5.mp4',
    thumbnail: '/testimonials/rajesh.jpg',
  },
  {
    id: 5,
    name: 'Anitha Krishnan',
    role: 'Daughter-in-law',
    location: 'Based in Sydney, Australia',
    quote: "What I appreciate most is the Tamil-speaking care team. My in-laws feel comfortable and understood — that's priceless.",
    videoSrc: '/videos/testimonial_3.mp4',
    thumbnail: '/testimonials/anitha.jpg',
  },
];

/* ══════════════════════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════════════════════ */
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

const MuteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <line x1="23" y1="9" x2="17" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="17" y1="9" x2="23" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const UnmuteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const FullscreenIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

const ExitFullscreenIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
    <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
    <path d="M3 16h3a2 2 0 0 1 2 2v3" />
    <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════════════
   FORMAT TIME  mm:ss
══════════════════════════════════════════════════════════════════════════════ */
const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

/* ══════════════════════════════════════════════════════════════════════════════
   SINGLE TESTIMONIAL CARD
   playingId / setPlayingId — lifted state that ensures only one video plays
══════════════════════════════════════════════════════════════════════════════ */
const TestimonialCard = ({ t, playingId, setPlayingId }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isPlaying = playingId === t.id;

  // When another card starts playing, pause this one
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (!isPlaying) {
      vid.pause();
    }
  }, [isPlaying]);

  const handlePlay = useCallback((e) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    if (isPlaying) {
      vid.pause();
      setPlayingId(null);
    } else {
      // Lifting state pauses every other card via their useEffect
      setPlayingId(t.id);
      vid.play().catch(() => {});
      trackCtaClick(`testimonial_video_play_${t.id}`);
    }
  }, [isPlaying, setPlayingId, t.id]);

  const handleMute = (e) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setCurrentTime(vid.currentTime);
    setProgress(vid.duration ? (vid.currentTime / vid.duration) * 100 : 0);
  };

  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (vid) setDuration(vid.duration);
  };

  const handleScrub = (e) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    vid.currentTime = pct * vid.duration;
    setProgress(pct * 100);
    setCurrentTime(pct * vid.duration);
  };

  const handleEnded = () => {
    setPlayingId(null);
    setProgress(0);
    setCurrentTime(0);
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="tm-card" ref={containerRef}>

      {/* ── Video area ── */}
      <div className="tm-video-area" onClick={handlePlay}>
        <video
          ref={videoRef}
          className="tm-video"
          src={t.videoSrc}
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={(e) => {
            // Seek to first frame and pause to show as thumbnail
            const vid = e.target;
            if (vid && vid.currentTime === 0) {
              vid.currentTime = 0.1;
            }
          }}
          onSeeked={() => {
            // Pause after seeking to first frame
            if (videoRef.current && !isPlaying) {
              videoRef.current.pause();
            }
          }}
          onEnded={handleEnded}
        />

        {/* No tint overlay — clean video */}
        <div className="tm-video-overlay" />

        {/* Badge */}
        <span className="tm-badge">Member Story</span>

        {/* Centre play/pause — fades when playing, shows on hover */}
        <button
          className={`tm-play-btn ${isPlaying ? 'tm-play-btn--playing' : ''}`}
          onClick={handlePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Controls bar — shown on hover or while playing */}
        <div className={`tm-controls ${isPlaying ? 'tm-controls--visible' : ''}`}>
          <div className="tm-scrubber" onClick={handleScrub} role="slider" aria-valuenow={Math.round(progress)}>
            <div className="tm-scrubber-track">
              <div className="tm-scrubber-fill" style={{ width: `${progress}%` }} />
              <div className="tm-scrubber-thumb" style={{ left: `${progress}%` }} />
            </div>
          </div>
          <div className="tm-controls-row">
            <button className="tm-ctrl-btn" onClick={handlePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <span className="tm-time">{fmt(currentTime)} / {fmt(duration)}</span>
            <button className="tm-ctrl-btn tm-ctrl-mute" onClick={handleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
              {muted ? <MuteIcon /> : <UnmuteIcon />}
            </button>
            <button className="tm-ctrl-btn tm-ctrl-fullscreen" onClick={handleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
              {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   TESTIMONIALS SECTION
══════════════════════════════════════════════════════════════════════════════ */
const Testimonials = () => {
  const trackRef = useRef(null);

  // Single global gate — only one video plays at a time
  const [playingId, setPlayingId] = useState(null);

  // Arrow enabled states — driven by real scroll position
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Auto-scroll state
  const [isPaused, setIsPaused] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);

  const total = TESTIMONIALS.length;

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 4);
  }, []);

  // Update active dot based on scroll position
  const updateDot = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.tm-card');
    if (!card) return;
    const cardWidth = card.offsetWidth + 20;
    const idx = Math.round(track.scrollLeft / cardWidth);
    setActiveDot(Math.min(Math.max(idx, 0), total - 1));
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateArrows();
    updateDot();
    const onScroll = () => { updateArrows(); updateDot(); };
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { updateArrows(); updateDot(); });
    return () => {
      track.removeEventListener('scroll', onScroll);
    };
  }, [updateArrows, updateDot]);

  // Auto-scroll interval
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector('.tm-card');
      const cardWidth = card ? card.offsetWidth + 20 : 320;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const nextScroll = track.scrollLeft + cardWidth;
      if (nextScroll >= maxScroll - 4) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 4500);
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const pause = () => { setIsPaused(true); clearInterval(intervalRef.current); };
  const resume = () => setIsPaused(false);

  // Scroll by exactly one card width + gap
  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.tm-card');
    const cardWidth = card ? card.offsetWidth + 20 : 320; // 20px = gap
    track.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  };

  // Touch handlers
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; pause(); };
  const onTouchMove = (e) => { touchDelta.current = e.touches[0].clientX - touchStartX.current; };
  const onTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 50) {
      touchDelta.current < 0 ? scroll(1) : scroll(-1);
    }
    touchDelta.current = 0;
    resume();
  };

  return (
    <>
      <style>{`
        /* ── Section ── */
        .tm-section {
          position: relative;
          background: #f7f5fa;
          overflow: hidden;
          padding: 96px 0 80px;
        }
        .tm-section::before {
          content: '';
          position: absolute;
          top: -80px; right: -120px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(196,125,192,0.08) 0%, transparent 68%);
          pointer-events: none;
          border-radius: 50%;
        }

        /* ── Header ── */
        .tm-header {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
          padding: 0 60px 52px;
          text-align: center;
        }
        .tm-eyebrow {
          display: inline-block;
          background: #fff;
          color: #5B2D8E;
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 20px;
          border: 1px solid #e2d5f5;
          margin-bottom: 14px;
        }
        .tm-title {
  font-family: 'Lora', serif;
  font-size: 34px;
  color: #5B2D8E;
  font-weight: 600;             /* was missing / lighter */
  text-transform: uppercase;    /* adds the bold caps look */
  letter-spacing: 0.5px;
  line-height: 1.15;
  margin: 0 0 14px;
}
        .tm-title em { font-style: italic; color: #5B2D8E; }
        .tm-line {
          width: 48px;
          height: 3px;
          background: #C47DC0;
          border-radius: 2px;
          margin: 18px auto 0;
        }
        .tm-subtext {
          font-family: 'Inter', sans-serif;
          font-size: 15px; font-weight: 400;
          color: #5a5a70;
          line-height: 1.75; max-width: 480px;
          margin: 0 auto;
        }
        .tm-subtext strong { color: #1a1a2e; font-weight: 600; }

        /* ── Track wrapper ── */
        .tm-track-wrap {
          position: relative;
          z-index: 2;
          padding: 0 76px 8px;
        }
        .tm-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 8px;
          align-items: stretch;
        }
        .tm-track::-webkit-scrollbar { display: none; }

        /* ── Arrow buttons ── */
        .tm-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-65%);
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #ffffff;
          border: 1.5px solid #e2d5f5;
          color: #5B2D8E;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
          transition: background 0.22s ease, border-color 0.22s ease,
                      color 0.22s ease, transform 0.22s ease;
        }
        .tm-arrow:hover:not(:disabled) {
          background: #5B2D8E;
          border-color: #5B2D8E;
          color: #fff;
          transform: translateY(-65%) scale(1.08);
        }
        .tm-arrow:disabled { opacity: 0.28; cursor: not-allowed; }
        .tm-arrow--left  { left: 14px; }
        .tm-arrow--right { right: 14px; }

        /* ── Card ── */
        .tm-card {
          flex: 0 0 300px;
          scroll-snap-align: start;
          background: #ffffff;
          border: 1px solid #e2d5f5;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 18px rgba(0,0,0,0.06);
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.28s ease,
                      box-shadow 0.32s ease;
        }
        .tm-card:hover {
          transform: translateY(-4px);
          border-color: #c47dc0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        /* ── Video area ── */
        .tm-video-area {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 13;
          background: #000;
          cursor: pointer;
          overflow: hidden;
          flex-shrink: 0;
        }
        .tm-video {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .tm-video-overlay {
          position: absolute; inset: 0;
          background: transparent;
          pointer-events: none;
        }

        /* Badge */
        .tm-badge {
          position: absolute; top: 13px; left: 13px;
          background: #5B2D8E;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          padding: 4px 10px; border-radius: 999px;
          pointer-events: none;
        }

        /* Centre play/pause */
        .tm-play-btn {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 54px; height: 54px;
          border-radius: 50%;
          background: #5B2D8E;
          border: 2px solid rgba(255,255,255,0.40);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: opacity 0.22s ease, transform 0.22s ease, background 0.22s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.30);
          opacity: 1;
        }
        .tm-play-btn.tm-play-btn--playing { opacity: 0; }
        .tm-video-area:hover .tm-play-btn.tm-play-btn--playing { opacity: 1; }
        .tm-play-btn:hover {
          transform: translate(-50%, -50%) scale(1.10);
          background: #301252;
          box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        }

        /* Controls bar */
        .tm-controls {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 10px 12px 12px;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }
        .tm-controls--visible,
        .tm-video-area:hover .tm-controls {
          opacity: 1;
          pointer-events: all;
        }

        /* Scrubber */
        .tm-scrubber {
          width: 100%; padding: 6px 0;
          cursor: pointer; margin-bottom: 6px;
        }
        .tm-scrubber-track {
          position: relative;
          width: 100%; height: 3px;
          background: rgba(255,255,255,0.30);
          border-radius: 99px; overflow: visible;
        }
        .tm-scrubber-fill {
          position: absolute; left: 0; top: 0; bottom: 0;
          background: #C47DC0; border-radius: 99px;
          pointer-events: none; transition: width 0.1s linear;
        }
        .tm-scrubber-thumb {
          position: absolute; top: 50%;
          transform: translate(-50%, -50%);
          width: 10px; height: 10px;
          background: #fff; border-radius: 50%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
          pointer-events: none; transition: left 0.1s linear;
        }
        .tm-scrubber:hover .tm-scrubber-thumb { width: 13px; height: 13px; }

        .tm-controls-row {
          display: flex; align-items: center; gap: 8px;
        }
        .tm-ctrl-btn {
          width: 26px; height: 26px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.20);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.18s ease;
          flex-shrink: 0; padding: 0;
        }
        .tm-ctrl-btn:hover { background: rgba(255,255,255,0.30); }
        .tm-ctrl-mute { margin-left: auto; }
        .tm-ctrl-fullscreen { margin-left: 4px; }
        .tm-time {
          font-family: 'Inter', sans-serif;
          font-size: 11px; color: rgba(255,255,255,0.85);
          letter-spacing: 0.5px; white-space: nowrap;
        }

        /* Fullscreen mode */
        .tm-card:fullscreen,
        .tm-card:-webkit-full-screen {
          background: #000;
          border-radius: 0;
          border: none;
          width: 100vw;
          height: 100vh;
          max-width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .tm-card:fullscreen .tm-video-area,
        .tm-card:-webkit-full-screen .tm-video-area {
          width: 100%;
          height: 100%;
          flex: none;
          aspect-ratio: unset;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tm-card:fullscreen .tm-video,
        .tm-card:-webkit-full-screen .tm-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* CTA strip - banner block */
        .tm-cta-strip {
          position: relative; z-index: 2;
          max-width: 820px;
          margin: 48px auto 0;
          padding: 0 24px;
        }
        .tm-cta-banner {
          background: linear-gradient(135deg, #1e0838 0%, #3d1a6e 100%);
          border-radius: 16px;
          padding: 32px 28px;
          text-align: center;
          box-shadow: 0 8px 32px rgba(30, 8, 56, 0.25);
        }
        .tm-cta-banner p {
          font-family: 'Lora', Georgia, serif;
          font-size: 16px; color: rgba(255,255,255,0.92);
          margin-bottom: 18px;
          font-style: italic;
          line-height: 1.5;
        }
        .tm-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #C47DC0; color: #ffffff;
          text-decoration: none;
          padding: 13px 28px; border-radius: 999px;
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 700; border: none;
          box-shadow: 0 6px 20px rgba(196,125,192,0.40);
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .tm-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(196,125,192,0.50);
          background: #b56ab0;
        }

        /* Dots + controls strip */
        .tm-controls-strip {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 24px;
          position: relative;
          z-index: 2;
        }
        .tm-controls-strip .tm-ctrl-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #fff;
          border: 1.5px solid #e2d5f5;
          color: #5B2D8E;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          padding: 0;
          flex-shrink: 0;
        }
        .tm-controls-strip .tm-ctrl-btn:hover {
          background: #5B2D8E;
          border-color: #5B2D8E;
          color: #fff;
        }
        .tm-controls-strip .tm-ctrl-btn svg {
          width: 16px; height: 16px;
        }
        .tm-dots {
          display: flex;
          gap: 10px;
        }
        .tm-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(91, 45, 142, 0.18);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .tm-dot--active {
          width: 24px;
          border-radius: 4px;
          background: #5B2D8E;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .tm-card { flex: 0 0 280px; }
        }
        @media (max-width: 768px) {
          .tm-section { padding: 64px 0 60px; }
          .tm-header { padding: 0 20px 36px; }
          .tm-track-wrap { padding: 0 56px 8px; }
          .tm-arrow { width: 38px; height: 38px; }
          .tm-arrow--left  { left: 8px; }
          .tm-arrow--right { right: 8px; }
          .tm-card { flex: 0 0 260px; }
          .tm-cta-strip { padding: 0 20px; }
          .tm-cta-banner { padding: 24px 20px; }
          .tm-title { font-size: 26px; }
          .tm-controls-strip { display: flex; }
        }
        @media (max-width: 480px) {
          .tm-track-wrap { padding: 0 48px 8px; }
          .tm-arrow { width: 34px; height: 34px; }
          .tm-arrow--left  { left: 4px; }
          .tm-arrow--right { right: 4px; }
          .tm-card { flex: 0 0 240px; }
          .tm-title { font-size: 22px; }
        }
      `}</style>

      <section className="tm-section" id="testimonials">

        {/* Header */}
        <div className="tm-header">
          <div className="tm-eyebrow">Real Families. Real Stories.</div>
          <h2 className="tm-title">
            HEAR WHAT FAMILIES SAY ABOUT 60PLUS CARE
          </h2>
          <p className="tm-subtext">
            Thousands of NRI families trust us with their most precious people.
            These are their <strong>unscripted stories</strong> — in their own words,
            from their own hearts.
          </p>
          <div className="tm-line" />
        </div>

        {/* Cards + Arrows */}
        <div
          className="tm-track-wrap"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >

          <button
            className="tm-arrow tm-arrow--left"
            onClick={() => { scroll(-1); pause(); setTimeout(resume, 6000); }}
            disabled={!canPrev}
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="tm-track" ref={trackRef}>
            {TESTIMONIALS.map((t) => (
              <TestimonialCard
                key={t.id}
                t={t}
                playingId={playingId}
                setPlayingId={setPlayingId}
              />
            ))}
          </div>

          <button
            className="tm-arrow tm-arrow--right"
            onClick={() => { scroll(1); pause(); setTimeout(resume, 6000); }}
            disabled={!canNext}
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

        </div>

        {/* Dots + arrows control strip */}
        <div className="tm-controls-strip">
          <button className="tm-ctrl-btn" onClick={() => { scroll(-1); pause(); setTimeout(resume, 6000); }} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="tm-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`tm-dot${i === activeDot ? ' tm-dot--active' : ''}`}
                onClick={() => {
                  const track = trackRef.current;
                  if (!track) return;
                  const card = track.querySelector('.tm-card');
                  const cardWidth = card ? card.offsetWidth + 20 : 320;
                  track.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                  pause();
                  setTimeout(resume, 6000);
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button className="tm-ctrl-btn" onClick={() => { scroll(1); pause(); setTimeout(resume, 6000); }} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* CTA strip */}
        <div className="tm-cta-strip">
          <div className="tm-cta-banner">
            <p>"Join 50,000+ families who chose peace of mind."</p>
            <a
              href="#consult-form"
              className="tm-cta-btn"
              onClick={() => trackCtaClick('testimonials_cta_click')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.52 12.84 19.79 19.79 0 0 1 1.44 4.18 2 2 0 0 1 3.41 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
              </svg>
              Talk to a Care Expert
            </a>
          </div>
        </div>

      </section>
    </>
  );
};

export default Testimonials;