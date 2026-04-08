/**
 * Hero.jsx — Full-viewport cinematic hero
 * FIX: Removed double padding-top. The nav is position:fixed, so the hero
 * only needs padding-top equal to the navbar height (72px). The previous
 * code added an extra 16px / 12px / 10px gap that caused the visible space.
 */

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from 'framer-motion';
import { trackCtaClick } from '../lib/firebase';

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.76, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};
const FADE_IN = {
  hidden: { opacity: 0 },
  visible: (d = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut', delay: d },
  }),
};
const SLIDE_RIGHT = {
  hidden: { opacity: 0, x: -20 },
  visible: (d = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.52 12.84 19.79 19.79 0 0 1 1.44 4.18 2 2 0 0 1 3.41 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
  </svg>
);
const IconArrow = () => (
  <svg
    width="13" height="13" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CYCLE_WORDS = ['Healthy?', 'Happy?', 'Safe?', 'Cared For?'];

// ─── NAV HEIGHT CONSTANT ───────────────────────────────────────────────────────
// Keep this in sync with your nav height in CSS. If your nav is 72px tall on
// desktop and 60px on mobile, use these values.
const NAV_H        = 72;   // px – desktop nav height
const NAV_H_MOB    = 60;   // px – mobile nav height

export default function Hero() {
  const heroRef  = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [wordIndex, setWordIndex]     = useState(0);
  const [ctaVisible, setCtaVisible]   = useState(true);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const videoScale     = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.28, 0.72]);
  const contentY       = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  useMotionValueEvent(scrollYProgress, 'change', v => setCtaVisible(v < 0.72));

  useEffect(() => {
    const t = setInterval(
      () => setWordIndex(i => (i + 1) % CYCLE_WORDS.length),
      2800,
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const play = () => vid.play().catch(() => {});
    vid.addEventListener('canplaythrough', play, { once: true });
    play();
  }, []);

  return (
    <>
      <style>{`
        /* ══ Shell ══ */
        .hr-shell {
          position: relative;
          width: 100%;
          /* Use 100svh so the hero exactly fills the viewport on every device */
          min-height: 100svh;
          height: 100svh;
          overflow: hidden;
          background: #07030f;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ══ Video ══ */
        .hr-vid-wrap { position: absolute; inset: 0; will-change: transform; }
        .hr-vid {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          opacity: 0;
          transition: opacity 1.8s ease;
          filter: brightness(1.12) saturate(1.04);
        }
        .hr-vid.loaded { opacity: 1; }

        /* ══ Overlays ══ */
        .hr-ov-base {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(162deg,
            rgba(7,3,15,0.50) 0%,
            rgba(18,5,40,0.14) 46%,
            rgba(7,3,15,0.52) 100%);
        }
        .hr-ov-scroll {
          position: absolute; inset: 0;
          background: rgba(7,3,15,1);
          pointer-events: none;
        }
        .hr-vignette {
          position: absolute; inset: 0; pointer-events: none;
          background:
            linear-gradient(to top,  rgba(7,3,15,0.94) 0%, rgba(7,3,15,0.42) 30%, transparent 56%),
            linear-gradient(to right, rgba(7,3,15,0.36) 0%, transparent 40%);
        }
        .hr-ov-top {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to bottom, rgba(7,3,15,0.30) 0%, transparent 18%);
        }
        .hr-corner-glow {
          position: absolute; top: 0; left: 0;
          width: 300px; height: 300px; pointer-events: none;
          background: radial-gradient(circle at top left, rgba(196,125,192,0.10), transparent 68%);
        }

        /* ══ INNER ══
           padding-top = exact nav height, no extra gap.
           We center the content vertically within the remaining space
           by making the grid use the full min-height and align-items:center.
        ══ */
        .hr-inner {
          position: relative; z-index: 10;
          width: 100%; max-width: 1280px;
          /* TOP: nav height only – no extra gap */
          padding: ${NAV_H}px 60px 60px;
          display: grid;
          grid-template-columns: 58fr 42fr;
          gap: 48px;
          align-items: center;
          /* Fill full viewport height so content is vertically centred */
          min-height: 100svh;
          will-change: transform;
          box-sizing: border-box;
        }

        /* LEFT */
        .hr-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 3.5px; text-transform: uppercase;
          color: #c47dc0; margin-bottom: 20px;
        }
        .hr-eyebrow-line {
          width: 28px; height: 1px;
          background: #c47dc0; opacity: 0.65; flex-shrink: 0;
        }

        .hr-h1 {
          font-family: 'Lora', serif;
          font-size: clamp(40px, 5vw, 60px);
          font-weight: 700; color: #ffffff;
          line-height: 1.06; letter-spacing: -1px;
          margin: 0 0 6px;
        }
        .hr-h1 em { font-style: italic; color: #e8c5e8; }

        .hr-cycle-row {
          display: block; position: relative;
          height: 1.14em;
          min-width: min(100%, 520px);
          margin-top: 6px; margin-bottom: 28px;
        }
        .hr-cycle-word {
          position: absolute; left: 0; top: 0;
          white-space: nowrap; font-style: italic; color: #c47dc0;
          font-family: 'Lora', serif;
          font-weight: 700; font-size: inherit;
        }

        .hr-tamil {
          font-family: 'Noto Sans Tamil', sans-serif;
          font-size: 15px;
          font-weight: 400; color: rgba(255,255,255,0.72);
          line-height: 1.90; margin-bottom: 10px; max-width: 520px;
        }
        .hr-sub {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.48);
          font-style: italic; line-height: 1.72; max-width: 480px;
          font-weight: 300;
        }

        /* RIGHT */
        .hr-right {
          display: flex; flex-direction: column;
          gap: 28px; align-items: flex-start;
        }

        .hr-stats { display: flex; gap: 0; width: 100%; }
        .hr-stat {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; padding: 0 12px;
          border-right: 1px solid rgba(255,255,255,0.14);
          gap: 5px;
        }
        .hr-stat:first-child { padding-left: 0; }
        .hr-stat:last-child  { border-right: none; }
        .hr-stat-num {
          font-family: 'Lora', serif;
          font-size: clamp(28px, 3vw, 38px);
          font-weight: 700; color: #fff; line-height: 1;
          text-shadow: 0 2px 20px rgba(0,0,0,0.55);
        }
        .hr-stat-lbl {
          font-family: 'Inter', sans-serif;
          font-size: 12px; color: rgba(255,255,255,0.44);
          font-weight: 400; letter-spacing: 0.2px;
          text-align: center; line-height: 1.3;
        }

        .hr-divider {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.10);
        }

        .hr-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: #ffffff; color: #3d1a6e;
          padding: 15px 28px; border-radius: 999px;
          font-family: 'Inter', sans-serif;
          font-size: 15px; font-weight: 700; text-decoration: none;
          transition: all 0.28s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 8px 32px rgba(0,0,0,0.30);
          white-space: nowrap;
        }
        .hr-btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 16px 44px rgba(0,0,0,0.36);
          color: #2a0f4f;
        }
        .hr-btns { display: flex; gap: 12px; flex-wrap: wrap; width: 100%; }

        .hr-col-divider {
          position: absolute;
          left: calc(58% - 24px); top: 16%; height: 68%;
          width: 1px;
          background: linear-gradient(to bottom,
            transparent, rgba(196,125,192,0.16), transparent);
          pointer-events: none;
        }

        /* Scroll indicator */
        .hr-scroll {
          position: absolute; bottom: 32px; right: 52px;
          display: flex; flex-direction: column; align-items: center;
          gap: 8px; z-index: 20;
        }
        .hr-scroll-label {
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(255,255,255,0.28);
        }
        .hr-scroll-line {
          width: 1px; height: 50px;
          background: rgba(255,255,255,0.12);
          position: relative; overflow: hidden; border-radius: 1px;
        }
        .hr-scroll-line::after {
          content: ''; position: absolute; top: -40%; left: 0;
          width: 100%; height: 38%; background: #c47dc0;
          border-radius: 1px;
          animation: hrScroll 2.2s ease-in-out infinite;
        }
        @keyframes hrScroll { 0% { top: -40%; } 100% { top: 140%; } }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hr-inner {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: ${NAV_H_MOB}px 32px 60px;
            align-items: flex-end;
          }
          .hr-col-divider { display: none; }
          .hr-right { width: 100%; }
          .hr-h1 { font-size: clamp(36px, 7vw, 48px); }
          .hr-scroll { right: 28px; }
        }
        @media (max-width: 640px) {
          .hr-inner {
            padding: ${NAV_H_MOB}px 20px 52px;
            gap: 24px;
          }
          .hr-h1 { font-size: clamp(32px, 8vw, 44px); }
          .hr-btns { flex-direction: column; }
          .hr-btn-primary { width: 100%; justify-content: center; }
          .hr-scroll { display: none; }
        }
        @media (max-width: 400px) {
          .hr-inner {
            padding: ${NAV_H_MOB}px 16px 44px;
          }
          .hr-h1 { font-size: clamp(28px, 9vw, 36px); }
        }
      `}</style>

      <section
        className="hr-shell"
        ref={heroRef}
        data-nav-theme="hero"
        aria-label="60Plus Global — Professional senior care services across Tamil Nadu"
      >
        {/* Video background */}
        <motion.div className="hr-vid-wrap" style={{ scale: videoScale }}>
          <video
            ref={videoRef}
            className={`hr-vid${videoLoaded ? ' loaded' : ''}`}
            src="/videos/smile.mp4"
            autoPlay muted loop playsInline preload="auto"
            onCanPlayThrough={() => setVideoLoaded(true)}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/videos/smile.webm" type="video/webm" />
            <source src="/videos/smile.mp4"  type="video/mp4" />
          </video>
        </motion.div>

        {/* Overlays */}
        <div className="hr-ov-base" />
        <motion.div className="hr-ov-scroll" style={{ opacity: overlayOpacity }} />
        <div className="hr-vignette" />
        <div className="hr-ov-top" />
        <div className="hr-corner-glow" />

        {/* Content */}
        <motion.div className="hr-inner" style={{ y: contentY }}>
          <div className="hr-col-divider" />

          {/* LEFT — headline */}
          <div>
            <motion.div
              className="hr-eyebrow"
              variants={SLIDE_RIGHT} custom={0.22}
              initial="hidden" animate="visible"
            >
              <span className="hr-eyebrow-line" />
              Senior Care · Tamil Nadu
            </motion.div>

            <motion.h1
              className="hr-h1"
              variants={FADE_UP} custom={0.34}
              initial="hidden" animate="visible"
            >
              When You're Away,<br />
              <em>Are They </em>
              <span className="hr-cycle-row" aria-live="polite" aria-atomic="true">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    className="hr-cycle-word"
                    initial={{ opacity: 0, y: 22, filter: 'blur(5px)' }}
                    animate={{
                      opacity: 1, y: 0, filter: 'blur(0px)',
                      transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
                    }}
                    exit={{
                      opacity: 0, y: -16, filter: 'blur(4px)',
                      transition: { duration: 0.24, ease: 'easeIn' },
                    }}
                  >
                    {CYCLE_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              className="hr-tamil" lang="ta"
              variants={FADE_UP} custom={0.50}
              initial="hidden" animate="visible"
            >
              "நீங்கள் அருகில் இல்லாத நேரங்களில் அவர்கள் தனியாக இருக்கலாம் —
              நாங்கள் அவர்களுடன் இருக்கிறோம்."
            </motion.p>

            <motion.p
              className="hr-sub"
              variants={FADE_UP} custom={0.60}
              initial="hidden" animate="visible"
            >
              Trusted in-home care, regular check-ins, and round-the-clock
              support — so your parents are never alone.
            </motion.p>
          </div>

          {/* RIGHT — stats + CTA */}
          <div className="hr-right">
            <motion.div
              className="hr-stats"
              variants={FADE_UP} custom={0.46}
              initial="hidden" animate="visible"
              role="list"
            >
              {[
                { number: '50,000+', label: 'Families served'    },
                { number: '600+',    label: 'Doctors in network' },
                { number: '100+',    label: 'Care services'      },
              ].map(({ number, label }) => (
                <div className="hr-stat" key={label} role="listitem">
                  <span className="hr-stat-num">{number}</span>
                  <span className="hr-stat-lbl">{label}</span>
                </div>
              ))}
            </motion.div>

            <div className="hr-divider" />

            <AnimatePresence>
              {ctaVisible && (
                <motion.div
                  className="hr-btns"
                  initial={{ opacity: 1 }}
                  exit={{
                    opacity: 0, y: -10, scale: 0.94,
                    transition: { duration: 0.30 },
                  }}
                >
                  <motion.a
                    href="#consult-form"
                    className="hr-btn-primary"
                    variants={FADE_UP} custom={0.58}
                    initial="hidden" animate="visible"
                    onClick={() => trackCtaClick('hero_primary_cta_click')}
                  >
                    <IconPhone />
                    Take Action Now
                    <IconArrow />
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="hr-scroll"
          variants={FADE_IN} custom={1.2}
          initial="hidden" animate="visible"
          aria-hidden="true"
        >
          <span className="hr-scroll-label">Scroll</span>
          <div className="hr-scroll-line" />
        </motion.div>
      </section>
    </>
  );
}