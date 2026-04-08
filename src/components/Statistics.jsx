// components/Statistics.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { trackCtaClick } from '../lib/firebase';

const statsData = [
  {
    region: 'India',
    num: '138M',
    desc: 'Seniors live alone today. Projected to reach 300 million by 2050.',
    bars: [35, 50, 65, 80, 100, 120],
  },
  {
    region: 'South India',
    num: '34%',
    desc: 'Seniors report living without regular family support. Rising 8% every 5 years.',
    bars: [30, 44, 58, 72, 90, 108],
  },
  {
    region: 'Tamil Nadu',
    num: '1 in 3',
    desc: 'Seniors live alone. Tamil Nadu has the highest ageing population index in India.',
    bars: [38, 52, 65, 80, 100, 118],
  },
];

const YEARS = ['2010', '2015', '2020', '2025', '2030', '2050'];

const StatCard = ({ s }) => (
  <div className="stat-card">
    <div className="stat-top">
      <span className="stat-region">{s.region}</span>
      <span className="stat-num">{s.num}</span>
    </div>
    <p className="stat-desc">{s.desc}</p>
    <div className="mini-chart">
      {s.bars.map((h, j) => (
        <div
          key={j}
          className={`bar ${j === s.bars.length - 1 ? 'highlight' : ''}`}
          style={{ height: h + '%' }}
        />
      ))}
    </div>
    <div className="bar-labels">{YEARS.map(y => <span key={y}>{y}</span>)}</div>
    <p className="stat-note">Source: Census of India / UN Population Division</p>
  </div>
);

const MobileCarousel = () => {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);
  const intervalRef = useRef(null);
  const total = statsData.length;

  const scrollToIndex = useCallback((index) => {
    if (!trackRef.current) return;
    const card = trackRef.current.children[index];
    if (!card) return;
    const scrollLeft = card.offsetLeft - trackRef.current.offsetLeft;
    trackRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const next = useCallback(() => scrollToIndex((activeIndex + 1) % total), [activeIndex, total, scrollToIndex]);
  const prev = useCallback(() => scrollToIndex((activeIndex - 1 + total) % total), [activeIndex, total, scrollToIndex]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, 4000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, next]);

  // Pause on hover / touch
  const pause = () => { setIsPaused(true); clearInterval(intervalRef.current); };
  const resume = () => setIsPaused(false);

  // Touch handlers
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; pause(); };
  const onTouchMove = (e) => { touchDelta.current = e.touches[0].clientX - touchStartX.current; };
  const onTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 50) {
      touchDelta.current < 0 ? next() : prev();
    }
    touchDelta.current = 0;
    resume();
  };

  // Snap on scroll end
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let scrollTimeout;
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const cardWidth = track.children[0]?.offsetWidth || 1;
        const gap = 14;
        const idx = Math.round(track.scrollLeft / (cardWidth + gap));
        setActiveIndex(Math.min(Math.max(idx, 0), total - 1));
      }, 80);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => { track.removeEventListener('scroll', onScroll); clearTimeout(scrollTimeout); };
  }, [total]);

  return (
    <>
      <style>{`
        .stats-carousel {
          position: relative;
          z-index: 1;
          padding: 0 0 12px;
        }
        .stats-carousel-track {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 0 18px;
          cursor: grab;
        }
        .stats-carousel-track::-webkit-scrollbar { display: none; }
        .stats-carousel-track.snapping { scroll-behavior: smooth; }
        .stats-carousel-track > .stat-card {
          flex: 0 0 calc(100vw - 72px);
          max-width: 320px;
          scroll-snap-align: center;
          box-shadow: 0 2px 16px rgba(91, 45, 142, 0.08);
        }

        /* Progress bar */
        .stats-carousel-progress {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
        }
        .stats-carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(91, 45, 142, 0.18);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .stats-carousel-dot.active {
          width: 24px;
          border-radius: 4px;
          background: var(--purple, #5B2D8E);
        }

        /* Arrow buttons */
        .stats-carousel-arrows {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 14px;
        }
        .stats-carousel-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(91, 45, 142, 0.2);
          background: #fff;
          color: var(--purple, #5B2D8E);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s;
          padding: 0;
        }
        .stats-carousel-btn:hover {
          background: var(--purple, #5B2D8E);
          color: #fff;
          border-color: var(--purple, #5B2D8E);
        }
        .stats-carousel-btn svg {
          width: 16px;
          height: 16px;
        }

        /* Auto-scroll indicator */
        .stats-carousel-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 16px;
        }
      `}</style>

      <div
        className="stats-carousel"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div ref={trackRef} className="stats-carousel-track snapping">
          {statsData.map((s, i) => (
            <StatCard key={i} s={s} />
          ))}
        </div>

        <div className="stats-carousel-controls">
          <button className="stats-carousel-btn" onClick={prev} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="stats-carousel-progress">
            {statsData.map((_, i) => (
              <button
                key={i}
                className={`stats-carousel-dot${i === activeIndex ? ' active' : ''}`}
                onClick={() => { scrollToIndex(i); pause(); setTimeout(resume, 6000); }}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>

          <button className="stats-carousel-btn" onClick={next} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </>
  );
};

const Statistics = () => (
  <section className="stats-section" id="stats">
    <div className="stats-bg" />

    <div className="section-header" style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-tag">The Reality</div>
      <h2 className="section-title">The Silent Crisis No One<br />Is Talking About</h2>
      <p className="section-sub">Senior citizens living alone — the numbers grow every year.</p>
      <div className="section-line" />
    </div>

    {/* Desktop grid */}
    <div className="stats-grid">
      {statsData.map((s, i) => <StatCard key={i} s={s} />)}
    </div>

    {/* Mobile carousel */}
    <div className="stats-mob-carousel">
      <MobileCarousel />
    </div>

    <div className="stats-banner" style={{ position: 'relative', zIndex: 1 }}>
      <div className="stats-banner-content">
        <blockquote>
          "In Tamil Nadu, 1 in 3 elders lives alone. Their silence is not peace — it's the absence of someone to call."
        </blockquote>
        <cite>— Geriatric Care Research, Tamil Nadu 2024</cite>
      </div>
      <a
        href="#consult-form"
        className="stats-banner-cta"
        onClick={() => trackCtaClick('stats_banner_cta_click')}
      >
        Start Care Today →
      </a>
    </div>
  </section>
);

export default Statistics;