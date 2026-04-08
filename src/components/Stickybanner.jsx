// components/StickyBanner.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Behaviour:
//   • Hidden at page top
//   • Appears only when user scrolls DOWN (not up)
//   • Automatically hides when the #consult-form section is in viewport
//   • Slides in from the bottom with a smooth spring animation
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import { trackCtaClick } from '../lib/firebase';

// Banner height in px — keep in sync with .sb-inner padding + content height.
// We expose this as a CSS custom property on <body> so WaFloat and Footer
// can shift themselves up without any prop-drilling.
const StickyBanner = ({ bannerConfig }) => {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);
  const formHidden  = useRef(true);
  const bannerRef   = useRef(null);

  // Default banner content if no config provided
  const {
    text = 'Your parents deserve daily care — not just occasional visits.',
    subtext = 'Limited onboarding slots this month.',
    ctaLabel = 'Take Action Now',
  } = bannerConfig || {};

  // Push --sb-h onto body whenever visibility changes
  useEffect(() => {
    if (visible && bannerRef.current) {
      const h = bannerRef.current.offsetHeight;
      document.body.style.setProperty('--sb-h', `${h}px`);
    } else {
      document.body.style.setProperty('--sb-h', '0px');
    }
  }, [visible]);

  // Clean up on unmount
  useEffect(() => () => document.body.style.removeProperty('--sb-h'), []);

  useEffect(() => {
    const formEl = document.getElementById('consult-form');

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrolledDown = currentY > lastScrollY.current;
      lastScrollY.current = currentY;

      if (formEl) {
        const rect = formEl.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        formHidden.current = !inView;
      }

      if (scrolledDown && currentY > 300 && formHidden.current) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        /* Initialise variable — overridden by JS */
        body { --sb-h: 0px; }

        /* ── Banner shell ── */
        .sb-banner {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 999;

          /* Matches site palette: deep purple → muted purple */
          background: linear-gradient(100deg, #1a0a2e 0%, #3d1a6e 55%, #2a0f4f 100%);
          border-top: 1px solid rgba(196,125,192,0.22);
          box-shadow: 0 -8px 40px rgba(0,0,0,0.55);

          /* Slide-in / slide-out */
          transform: translateY(100%);
          opacity: 0;
          transition:
            transform 0.42s cubic-bezier(0.22, 1, 0.36, 1),
            opacity   0.32s ease;
          will-change: transform, opacity;
        }
        .sb-banner.sb-banner--visible {
          transform: translateY(0);
          opacity: 1;
        }

        /* ── Inner layout ── */
        .sb-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 14px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        /* ── Left copy ── */
        .sb-copy {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
          min-width: 0;
        }

        /* Pulse dot */
        .sb-pulse {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #c47dc0;
          flex-shrink: 0;
          position: relative;
        }
        .sb-pulse::after {
          content: '';
          position: absolute; inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(196,125,192,0.45);
          animation: sbPulse 1.8s ease-out infinite;
        }
        @keyframes sbPulse {
          0%   { transform: scale(0.85); opacity: 1; }
          80%  { transform: scale(1.9);  opacity: 0; }
          100% { transform: scale(0.85); opacity: 0; }
        }

        .sb-text {
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          font-weight: 500;
          color: rgba(255,255,255,0.92);
          line-height: 1.45;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sb-text strong {
          color: #fff;
          font-weight: 700;
        }
        .sb-text span {
          color: rgba(196,125,192,0.85);
          font-weight: 400;
        }

        /* ── Right CTAs ── */
        .sb-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Primary CTA */
        .sb-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 28px;
          border-radius: 999px;
          background: #ffffff;
          color: #3d1a6e;
          font-family: 'Inter', sans-serif;
          font-size: 15px; font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          box-shadow:  0 4px 20px rgba(0,0,0,0.28);
          transition: all 0.26s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sb-btn-primary:hover {
          transform: translateY(-2px) scale(1.03);
        //   box-shadow:  0 8px 28px rgba(0,0,0,0.38);  
        //   background: #1a0a2e;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .sb-inner { padding: 14px 24px; gap: 16px; }
        }
        @media (max-width: 640px) {
          .sb-inner {
            padding: 10px 14px;
            gap: 8px;
            flex-wrap: nowrap;
          }
          .sb-copy { gap: 8px; }
          .sb-text {
            font-size: 13px;
            white-space: normal;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .sb-btn-primary {
            padding: 10px 14px;
            font-size: 12px;
            flex-shrink: 0;
          }
          .sb-pulse { width: 8px; height: 8px; }
        }
      `}</style>

      <div
        ref={bannerRef}
        className={`sb-banner${visible ? ' sb-banner--visible' : ''}`}
        role="complementary"
        aria-label="Quick action banner"
      >
        <div className="sb-inner">

          {/* Left: copy */}
          <div className="sb-copy">
            <span className="sb-pulse" aria-hidden="true" />
            <p className="sb-text">
              <strong>{text}</strong>{' '}
              <span>{subtext}</span>
            </p>
          </div>

          {/* Right: CTA */}
          <div className="sb-actions">
            {/* Primary CTA — scrolls to form */}
            <a
              href="#consult-form"
              className="sb-btn-primary"
              onClick={() => trackCtaClick('sticky_banner_primary_cta_click')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.52 12.84 19.79 19.79 0 0 1 1.44 4.18 2 2 0 0 1 3.41 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
              </svg>
              {ctaLabel}
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default StickyBanner