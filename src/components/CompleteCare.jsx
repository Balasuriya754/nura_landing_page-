import { useState, useEffect, useRef, useCallback } from 'react';

const careGroups = [
  {
    title: 'Medical Care',
    items: ['Doctor visits at home', 'Blood tests & diagnostics', 'Insurance coordination'],
  },
  {
    title: 'Daily Support',
    items: ['Medication reminders', 'Mobility & hygiene assistance', 'Home safety improvements'],
  },
  {
    title: 'Emotional Well-being',
    items: ['Mental health support', 'Regular check-ins', 'Friendly companionship'],
  },
  {
    title: 'Emergency & Monitoring',
    items: ['24/7 emergency coordination', 'Real-time alerts & updates'],
  },
];

const CheckCircle = () => (
  <svg
    width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const MobileCarousel = () => {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isPausedRef = useRef(false);
  const intervalRef = useRef(null);
  const total = careGroups.length;

  // Scroll to a specific index imperatively
  const scrollToIndex = useCallback((index) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    // Use the track's own scrollWidth / total to get exact card+gap width
    const scrollWidth = track.scrollWidth;
    const scrollPerCard = scrollWidth / total;
    track.scrollTo({ left: index * scrollPerCard, behavior: 'smooth' });
    setActiveIndex(index);
  }, [total]);

  // Detect active card from scroll position
  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const scrollWidth = track.scrollWidth;
    const scrollPerCard = scrollWidth / total;
    const newIndex = Math.round(track.scrollLeft / scrollPerCard);
    if (newIndex >= 0 && newIndex < total) {
      setActiveIndex(newIndex);
    }
  }, [total]);

  // Auto-advance
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (isPausedRef.current) return;
      setActiveIndex(prev => {
        const next = (prev + 1) % total;
        if (trackRef.current) {
          const track = trackRef.current;
          const scrollPerCard = track.scrollWidth / total;
          track.scrollTo({ left: next * scrollPerCard, behavior: 'smooth' });
        }
        return next;
      });
    }, 3500);
  }, [total]);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  const goTo = (index) => {
    isPausedRef.current = true;
    scrollToIndex(index);
    clearInterval(intervalRef.current);
    setTimeout(() => {
      isPausedRef.current = false;
      startInterval();
    }, 6000);
  };

  const prev = () => goTo((activeIndex - 1 + total) % total);
  const next = () => goTo((activeIndex + 1) % total);

  return (
    <div className="care-benefits-carousel-wrapper">
      <div
        ref={trackRef}
        className="care-benefits-track"
        onScroll={handleScroll}
        onMouseEnter={() => { isPausedRef.current = true; }}
        onMouseLeave={() => { isPausedRef.current = false; }}
        onTouchStart={() => { isPausedRef.current = true; }}
        onTouchEnd={() => setTimeout(() => { isPausedRef.current = false; }, 2000)}
      >
        {careGroups.map((group, index) => (
          <div className="care-benefit-group" key={index}>
            <div className="benefit-group-header">
              <div className="benefit-group-icon">
                <CheckCircle />
              </div>
              <h4 className="benefit-group-title">{group.title}</h4>
            </div>
            <ul className="benefit-list">
              {group.items.map((item, itemIndex) => (
                <li key={itemIndex} className="benefit-item">
                  <span className="benefit-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="care-benefits-controls">
        <button className="care-benefits-btn" onClick={prev} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="care-benefits-progress">
          {careGroups.map((_, i) => (
            <button
              key={i}
              className={`care-benefits-dot${i === activeIndex ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>

        <button className="care-benefits-btn" onClick={next} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const CompleteCare = () => (
  <section className="complete-care-section" id="services">
    <div className="section-header">
      <div className="section-tag">COMPLETE CARE</div>
      <h2 className="section-title">One Membership. Everything They Need.</h2>
      <p className="section-sub">
        No coordination. No multiple providers. One simple plan for your parents' daily, medical, and emotional care.
      </p>
      <div className="section-line" />
    </div>

    <div className="complete-care-inner">
      <div className="care-image-panel">
        <div className="care-image-wrapper">
          <img
            src="complete.jpg"
            alt="Compassionate caregiving"
            className="care-image"
          />
        </div>
      </div>

      <div className="care-benefits-panel">
        {/* Desktop Grid — hidden via CSS on mobile */}
        <div className="care-benefits-grid">
          {careGroups.map((group, index) => (
            <div className="care-benefit-group" key={index}>
              <div className="benefit-group-header">
                <div className="benefit-group-icon"><CheckCircle /></div>
                <h4 className="benefit-group-title">{group.title}</h4>
              </div>
              <ul className="benefit-list">
                {group.items.map((item, i) => (
                  <li key={i} className="benefit-item">
                    <span className="benefit-check">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Carousel — shown via CSS on mobile */}
        <MobileCarousel />
      </div>
    </div>

    <div className="care-highlight-box">
      <div className="highlight-content">
        <p className="highlight-text">
          We take care of everything — so you don't have to manage it from miles away.
        </p>
        <a href="#consult-form" className="care-highlight-cta">
          Talk to a Care Expert
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </section>
);

export default CompleteCare;