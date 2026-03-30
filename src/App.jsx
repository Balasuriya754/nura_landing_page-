import { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import useContactForm from './hooks/useContactForm';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

const heroSlideImages = [
  'public/hero/innerbanner-1.png',
  'public/hero/Mahadevan_Sitting2_LJ_India.jpg',
  'public/hero/old%20person6.jpg',
  'public/hero/caretender.jpg',
];

const collageScrollImages = [
  'public/hero/innerbanner-1.png',
  'public/hero/Mahadevan_Sitting2_LJ_India.jpg',
  
  'public/hero/old%20person6.jpg',
  'public/hero/caretender.jpg',
];

/* ─── Inline quote strip — embedded inside sections ─── */
const QuoteStrip = ({ tamil, english, type = 'guilt' }) => (
  <div className={`qs qs--${type}`}>
    <span className="qs-bar" />
    <div className="qs-text">
      <span className="qs-tamil tamil">{tamil}</span>
      <span className="qs-eng">{english}</span>
    </div>
    <span className="qs-bar" />
  </div>
);

/* ─── WA Float ─── */
const WaFloat = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 1200); return () => clearTimeout(t); }, []);
  return (
    <a
      href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21"
      className={`wa-fab ${visible ? 'wa-fab--on' : ''}`}
      target="_blank" rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <span className="wa-ring r1" />
      <span className="wa-ring r2" />
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z"/>
      </svg>
    </a>
  );
};

/* ─── Consult FAB ─── */
const ConsultFAB = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <a href="#consult" className={`consult-fab ${visible ? 'consult-fab--on' : ''}`} aria-label="Free Consultation">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.07 2.18 2 2 0 012.05 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
      <span>Free Consult</span>
    </a>
  );
};

/* ─── NAV ─── */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = ['Services', 'Why Us', 'Statistics', 'Pricing', 'FAQ'];
  const hrefs = ['#services', '#why', '#stats', '#pricing', '#faq'];
  return (
    <>
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <div className="nav-logo">
          <img src="/so.png" alt="SixtyPlus Global" />
          <span>SixtyPlus Global</span>
        </div>
        <div className="nav-links">
          {links.map((l, i) => <a key={l} href={hrefs[i]}>{l}</a>)}
        </div>
        <a href="#consult" className="nav-cta">Talk to Us</a>
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map((l, i) => <a key={l} href={hrefs[i]} onClick={() => setMenuOpen(false)}>{l}</a>)}
        <a href="#consult" className="mob-cta" onClick={() => setMenuOpen(false)}>Talk to Us</a>
      </div>
    </>
  );
};

/* ─── HERO ─── */
const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveSlide(s => (s + 1) % heroSlideImages.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-img-panel">
          <div className="hero-img-corner-br" />
          <div className="hero-slider">
            {heroSlideImages.map((img, i) => (
              <div key={i} className={`hero-slide ${i === activeSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${img})` }} />
            ))}
          </div>
          <div className="hero-slide-dots">
            {heroSlideImages.map((_, i) => (
              <button key={i} className={`hero-dot ${i === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(i)} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
          {/* <div className="hero-chip">
            <span className="chip-pulse" />
            50,000+ families served across Tamil Nadu
          </div> */}
        </div>
        <div className="hero-content">
          <span className="hero-eyebrow">India's #1 Emerging Senior Care Platform</span>
          <h1 className="hero-h1">
            Your Parents Might Be<br /><em>Hiding Something</em> From You.
          </h1>
          <div className="hero-quote">
            <span className="hq-label">What families say</span>
            <p className="hq-tamil tamil">"அம்மா வாய்ல 'நல்லா இருக்கேன்'னு சொல்றாங்க… கண்ணு வேற ஒண்ணு சொல்லுது."</p>
            <p className="hq-eng">"Mom says she's fine… but her eyes tell a different story."</p>
          </div>
          <div className="hero-stats-row">
            {[['50,000+', 'Families'], ['600+', 'Doctors'], ['100+', 'Tests']].map(([n, l]) => (
              <div key={l} className="hstat">
                <div className="hstat-num">{n}</div>
                <div className="hstat-lbl">{l}</div>
              </div>
            ))}
          </div>
          <div className="hero-btns">
            <a href="#consult" className="btn-primary">Get Free Consultation</a>
            <a href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21"
              className="btn-wa" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── SERVICES ─── */
const servicesData = [
  { img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', title: '24x7 Emergency Support', desc: 'One call away at any hour. Real people, real response.' },
  { img: 'public/doctor2.jpg', title: 'Doctor Home Visits', desc: 'Qualified doctors come to your parents — no travel stress, no waiting rooms.' },
   { img: 'public/ai-companion.jpg', title: 'Companion AI', desc: 'AI-powered conversation and safety monitoring around the clock.' },
   { img: 'public/grabbar.jpg', title: 'Senior-Safe Home', desc: 'Safety modifications so your parent never fears falling again.' },
  { img: 'public/physio_3.jpg', title: 'Physiotherapy & Rehab', desc: 'Professional physiotherapists support recovery right at home.' },
  { img: 'public/home_nurse_4.jpg', title: 'Nurse Assistance', desc: 'Trained nurses for daily medication, wound care, and comfort.' },
  
  { img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80', title: 'Medicine Management', desc: 'Timely reminders and full medication tracking — nothing missed.' },
 
  { img: 'public/online_doctor.jpg', title: 'Online Consultations', desc: 'Video consultations with specialists from the comfort of home.' },
  
];

const Services = () => (
  <section className="services-section" id="services">
    <div className="section-header">
      <div className="section-tag">What We Offer</div>
      <h2 className="section-title">Everything They Need.<br />Delivered to Their Door.</h2>
      <p className="section-sub">You can't always be there. We make sure someone always is.</p>
      <div className="section-line" />
    </div>
    <div className="services-grid">
      {servicesData.map((svc, i) => (
        <div className="service-card" key={i}>
          <div className="svc-img-wrap"><img src={svc.img} alt={svc.title} className="svc-img" /></div>
          <div className="svc-body"><h4>{svc.title}</h4><p>{svc.desc}</p></div>
        </div>
      ))}
    </div>
    <div className="svc-h-scroll h-scroll-wrap">
      <div className="h-scroll-inner">
        {servicesData.map((svc, i) => (
          <div className="svc-h-card" key={i}>
            <div className="svc-img-wrap"><img src={svc.img} alt={svc.title} className="svc-img" /></div>
            <div className="svc-body"><h4>{svc.title}</h4><p>{svc.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
    {/* End Services */}
  </section>
);

/* ─── WHY + FORM ─── */
const WhyAndForm = () => {
  const { formData, errors, submitted, loading, handleChange, submitForm } = useContactForm();
  return (
    <section className="why-section" id="why">
      <span id="consult" style={{ display: 'block', visibility: 'hidden', height: 0 }} />
      <div className="ba-strip">
        <div className="ba-panel">
          <img src="public/lonely_old_man.jpg" alt="Elderly man alone" />
          <div className="ba-overlay ba-dark">
            <span className="ba-label">Without 60Plus</span>
            <p className="ba-quote">He sits by the window.<br />Counting hours. Counting days.</p>
            <p className="ba-tamil tamil">உங்கள் அப்பா உங்களுக்காக காத்திருக்கிறார்.</p>
          </div>
        </div>
        <div className="ba-arrow">→</div>
        <div className="ba-panel">
          <img src="public/errands1.jpg" alt="Caretaker with elderly" style={{ objectPosition: 'center 20%' }} />
          <div className="ba-overlay ba-hope">
            <span className="ba-label">With 60Plus</span>
            <p className="ba-quote">She smiles when the doctor visits.<br />She laughs again.</p>
            <p className="ba-tamil tamil">அவங்க முகத்துல சிரிப்பு திரும்பும்.</p>
          </div>
        </div>
      </div>
      <div className="why-inner">
        <div className="why-left">
          <div className="section-tag">Why Choose Us</div>
          <h2>Why Tamil Families<br />Trust 60Plus Global</h2>
          <div className="accent-line" />
          <p>Silence and withdrawal are signs. We step in before it's too late — with medical care, emotional support, and a human who actually cares.</p>
          <div className="benefit-list">
            {['Psychologist & Psychiatrist Consultations', 'Emotional Support for Ageing Parents', 'Online & In-Person Sessions Available', 'Dedicated Care Manager for Your Family', 'Tamil-speaking Care Professionals', 'Trusted by NRI Families Globally'].map((item, i) => (
              <div className="benefit-item" key={i}>
                <div className="benefit-check">✓</div>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <a href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21" className="wa-btn" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z"/></svg>
            WhatsApp Us Now
          </a>
          <div className="wa-num">+91 94999 44939</div>
        </div>
        <div className="form-box">
          <div className="form-header"><h3>Get a Free Consultation</h3><p>Our care manager will call you within 24 hours</p></div>
          {submitted ? (
            <div className="form-success">
              <div className="form-success-icon">✓</div>
              <h4>Thank you!</h4>
              <p>Our care manager will reach out within 24 hours.</p>
            </div>
          ) : (
            <form className="form-body" onSubmit={submitForm} noValidate>
              <div className="form-grid">
                {[{ field: 'name', label: 'Name *', type: 'text', placeholder: 'Your full name' }, { field: 'email', label: 'Email ID *', type: 'email', placeholder: 'your@email.com' }, { field: 'location', label: 'Location of Parent *', type: 'text', placeholder: 'City, Tamil Nadu' }, { field: 'age', label: 'Age of Parent *', type: 'number', placeholder: 'e.g. 68' }].map(({ field, label, type, placeholder }) => (
                  <div className="form-group" key={field}>
                    <label>{label}</label>
                    <input type={type} placeholder={placeholder} value={formData[field]} onChange={e => handleChange(field, e.target.value)} className={errors[field] ? 'input-error' : ''} />
                    {errors[field] && <span className="error-msg">{errors[field]}</span>}
                  </div>
                ))}
              </div>
              <div className="form-group" style={{ marginBottom: 13 }}>
                <label>Phone Number *</label>
                <div className="phone-wrap">
                  <span className="phone-prefix">+91</span>
                  <input type="tel" placeholder="10-digit number" maxLength={10} value={formData.phone} onChange={e => handleChange('phone', e.target.value.replace(/\D/g, ''))} className={errors.phone ? 'input-error' : ''} />
                </div>
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>
              <div className="form-group" style={{ marginBottom: 13 }}>
                <label>Mobility Status *</label>
                <select value={formData.mobility} onChange={e => handleChange('mobility', e.target.value)} className={errors.mobility ? 'input-error' : ''}>
                  <option value="">Select status</option>
                  <option value="Independent and Active">Independent and Active</option>
                  <option value="Needs Partial Assistance">Needs Partial Assistance</option>
                  <option value="Requires full-time care">Requires full-time care</option>
                </select>
                {errors.mobility && <span className="error-msg">{errors.mobility}</span>}
              </div>
              <button type="submit" className="form-submit" disabled={loading}>{loading ? 'Submitting…' : 'Talk to a Care Expert Today'}</button>
              <p className="form-note">No spam. No pressure. 100% confidential.<br />Protected by reCAPTCHA — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{color:'inherit'}}>Privacy</a> & <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{color:'inherit'}}>Terms</a></p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

/* ─── STATISTICS ─── */
const statsData = [
  { region: 'India', num: '138M', desc: 'seniors live alone today. Projected to reach 300 million by 2050.', bars: [35, 50, 65, 80, 100] },
  { region: 'South India', num: '34%', desc: 'of seniors report living without regular family support. Rising 8% every 5 years.', bars: [30, 44, 58, 72, 90] },
  { region: 'Tamil Nadu', num: '1 in 3', desc: 'seniors lives alone. Tamil Nadu has the highest ageing population index in India.', bars: [38, 52, 65, 80, 100] },
];

const Statistics = () => (
  <section className="stats-section" id="stats">
    <div className="stats-bg" />

    {/* ── Sentimental old man figure ── */}
    <img
      src="/public/old%20person%20transparent.png"
      alt=""
      className="stats-figure"
      aria-hidden="true"
    />

    <div className="section-header" style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-tag">The Reality</div>
      <h2 className="section-title">The Silent Crisis No One<br />Is Talking About</h2>
      <p className="section-sub">Senior citizens living alone — the numbers grow every year.</p>
      <div className="section-line" />
    </div>
    <div className="stats-grid">
      {statsData.map((s, i) => (
        <div className="stat-card" key={i}>
          <div className="stat-top"><span className="stat-region">{s.region}</span><span className="stat-num">{s.num}</span></div>
          <p className="stat-desc">{s.desc}</p>
          <div className="mini-chart">{s.bars.map((h, j) => <div key={j} className={`bar ${j === s.bars.length - 1 ? 'highlight' : ''}`} style={{ height: h + '%' }} />)}</div>
          <div className="bar-labels">{['2010', '2015', '2020', '2025', '2030'].map(y => <span key={y}>{y}</span>)}</div>
          <p className="stat-note">Source: Census of India / UN Population Division</p>
        </div>
      ))}
    </div>
    <div className="stats-h-scroll h-scroll-wrap">
      <div className="h-scroll-inner">
        {statsData.map((s, i) => (
          <div className="stat-card stat-mob" key={i}>
            <div className="stat-top"><span className="stat-region">{s.region}</span><span className="stat-num">{s.num}</span></div>
            <p className="stat-desc">{s.desc}</p>
            <div className="mini-chart">{s.bars.map((h, j) => <div key={j} className={`bar ${j === s.bars.length - 1 ? 'highlight' : ''}`} style={{ height: h + '%' }} />)}</div>
            <div className="bar-labels">{['2010', '2015', '2020', '2025', '2030'].map(y => <span key={y}>{y}</span>)}</div>
            <p className="stat-note">Source: Census of India / UN Population Division</p>
          </div>
        ))}
      </div>
    </div>
    <div className="stats-banner" style={{ position: 'relative', zIndex: 1 }}>
      <div className="stats-banner-img"><img src="public/pension.jpg" alt="Senior" /></div>
      <div className="stats-banner-quote">
        <blockquote>"In Tamil Nadu, 1 in 3 elders lives alone. Their silence is not peace — it's the absence of someone to call."</blockquote>
        <cite>— Geriatric Care Research, Tamil Nadu 2024</cite>
      </div>
      <a href="#consult" className="stats-banner-cta">Be That Someone →</a>
    </div>
    {/* Quote embedded — leads into All Services */}
    <QuoteStrip
      tamil='"புள்ளிவிவரங்கள் சொல்வதை நம்புங்கள். ஆனால் செயல்படுவது உங்கள் கையில்."'
      english={`"Believe what the numbers say. But acting on it — that's in your hands."`}
      type="guilt"
    />
  </section>
);

/* ─── ALL SERVICES ─── */
const allSvcList = [
  'Doctor Home Visits', 'Emotional & Mental Health Support',
  'Medicine Management & Reminders', 'Blood Tests at Home',
  '24x7 Emergency Response', 'Companion AI — Always On',
  'Senior Citizen Medical Insurance', 'Digitalisation of Medical Records',
  'Home Safety Modifications', 'Free Senior Community',
];

const CollageSlider = () => {
  const [activeImg, setActiveImg] = useState(0);
  const ivRef = useRef(null);
  useEffect(() => {
    ivRef.current = setInterval(() => setActiveImg(s => (s + 1) % collageScrollImages.length), 3500);
    return () => clearInterval(ivRef.current);
  }, []);
  const goTo = (i) => {
    setActiveImg(i);
    clearInterval(ivRef.current);
    ivRef.current = setInterval(() => setActiveImg(s => (s + 1) % collageScrollImages.length), 3500);
  };
  return (
    <div className="collage-wrap">
      <div className="collage-corner tl" />
      <div className="collage-corner br" />
      <div className="collage-badge"><strong>10+</strong><span>Services Included</span></div>
      <div className="collage-frame">
        <div className="collage-track" style={{ transform: `translateX(-${activeImg * 100}%)` }}>
          {collageScrollImages.map((src, i) => (
            <div className="collage-slide" key={i}><img src={src} alt={`Care ${i + 1}`} /></div>
          ))}
        </div>
      </div>
      <div className="collage-dots">
        {collageScrollImages.map((_, i) => (
          <button key={i} className={`collage-dot ${i === activeImg ? 'active' : ''}`} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  );
};

const AllServices = () => (
  <section className="allsvc-section">
    <div className="section-header">
      <div className="section-tag">Complete Care</div>
      <h2 className="section-title">One Membership.<br />Everything They Deserve.</h2>
      <p className="section-sub">Stop piecing together partial solutions. One plan covers it all.</p>
      <div className="section-line" />
    </div>
    <div className="allsvc-inner">
      <CollageSlider />
      <div className="allsvc-list">
        {allSvcList.map((svc, i) => (
          <div className="svc-item" key={i}>
            <div className="svc-check">✓</div>
            <span>{svc}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── COMPETITIVE ADVANTAGE ─── */
const advData = [
  { tag: 'TN', title: 'உங்கள் மொழியில் சேவை', desc: 'We speak Tamil. Our care managers communicate in your language — not just English.' },
  { tag: '24/7', title: '24x7 Care, No Holidays', desc: "Emergencies don't follow office hours. Neither do we. Always on." },
  { tag: 'NRI', title: 'Trusted by Tamil Families Globally', desc: 'NRIs across USA, UK, Canada & Australia trust us for their parents back home.' },
  { tag: '1:1', title: 'One Family. One Care Manager.', desc: 'Not a call centre. A dedicated person who knows your parent by name and heart.' },
];

const CompetitiveAdvantage = () => (
  <section className="adv-section">
    <div className="section-header">
      <div className="section-tag">Our Difference</div>
      <h2 className="section-title">Why 60Plus Global.<br />Not Anyone Else.</h2>
      <div className="section-line" />
    </div>
    <div className="adv-grid">
      {advData.map((a, i) => (
        <div className="adv-card" key={i}>
          <div className="adv-top"><div className="adv-tag">{a.tag}</div><div className="adv-title tamil">{a.title}</div></div>
          <div className="adv-body"><p>{a.desc}</p></div>
        </div>
      ))}
    </div>
    <div className="adv-h-scroll h-scroll-wrap">
      <div className="h-scroll-inner">
        {advData.map((a, i) => (
          <div className="adv-card adv-mob" key={i}>
            <div className="adv-top"><div className="adv-tag">{a.tag}</div><div className="adv-title tamil">{a.title}</div></div>
            <div className="adv-body"><p>{a.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
    <div className="testi-grid">
      {[
        { img: 'public/errands1.jpg', quote: "I live in London. 60Plus made me feel like I'm right there with my parents in Chennai." },
        { img: 'public/hero_old_person6.jpg', quote: 'அம்மா இப்போ மருத்துவர் வீட்டுக்கு வருவாங்க. நான் கவலைப்பட வேண்டியதில்லை.' },
        { img: 'public/caretender.jpg', quote: "The care manager knows my father's name, his habits, his medicines. That personal care is rare." },
      ].map((t, i) => (
        <div className="testi-card" key={i}>
          <div className="testi-avatar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
          <div className="testi-body">
            <p>"{t.quote}"</p>
            <div className="testi-meta">{t.loc && <span>{t.loc}</span>}</div>
          </div>
        </div>
      ))}
    </div>
    {/* Quote leads into Pricing */}
    <QuoteStrip
      tamil='"அவர்களுக்கு நீங்கள்  கடந்த காலத்தை திரும்ப கொடுக்க முடியாது. ஆனால் நிகழ்காலத்தை கொடுக்கலாம்."'
      english={`"You can't give back the past. But you can give them the present."`}
      type="guilt"
    />
  </section>
);

/* ─── PRICING ─── */
const Pricing = () => {
  const features = ['Doctor Home Visits', '24x7 Emergency Support', 'Companion AI', 'Medicine Reminders', 'Blood Tests at Home', 'Emotional & Mental Health Support', 'Medical Records Digitalisation', 'Home Safety Assessment', 'Senior Medical Insurance Guidance', 'Free Senior Community Access'];
  return (
    <section className="pkg-section" id="pricing">
      <div className="pkg-inner">
        <div className="pkg-left">
          <div className="section-tag tag-on-dark">Pricing</div>
          <h2 className="pkg-h2">Simple.<br />Transparent.<br />One Plan.</h2>
          <p className="pkg-sub">No hidden charges. No complicated tiers. Everything your parent needs, covered.</p>
          <div className="pkg-highlights">
            {['Medical care at home', 'Dedicated care manager', 'Mental health support', '24x7 emergency line'].map(text => (
              <div className="pkg-hl" key={text}>
                <span className="pkg-hl-dot" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className="pkg-quote-box">
            <p className="pkg-quote-tamil tamil">"உங்கள் அம்மா அப்பாவுக்கு கொடுக்கும் மிகப்பெரிய பரிசு — இந்த ஒரு தொலைபேசி அழைப்பு."</p>
            <p className="pkg-quote-eng">"The greatest gift you can give your parents — is this one phone call."</p>
          </div>
        </div>
        <div className="pkg-card">
          <div className="pkg-card-header">
            <div>
              <div className="pkg-name">60Plus Care Plan</div>
              <div className="pkg-tag-line">All-inclusive senior care</div>
            </div>
            <div className="pkg-price-block">
              <span className="pkg-amount">$50</span>
              <span className="pkg-period">/ month</span>
            </div>
          </div>
          <div className="pkg-features">
            {features.map((f, i) => (
              <div className="pkg-feat" key={i}>
                <div className="pkg-feat-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <a href="#consult" className="pkg-cta">Enroll Now — $50/month</a>
          <p className="pkg-sub-cta">Or WhatsApp: <a href="https://wa.me/919499944939" target="_blank" rel="noopener noreferrer">+91 94999 44939</a></p>
        </div>
      </div>
    </section>
  );
};

/* ─── FAQ ─── */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q: 'நீங்கள் எந்த மாவட்டங்களில் சேவை செய்கிறீர்கள்?', a: 'தமிழ்நாட்டில் உள்ள அனைத்து மாவட்டங்களிலும் எங்கள் சேவை கிடைக்கிறது — சென்னை, கோயம்புத்தூர், மதுரை, திருச்சி, சேலம், வேலூர், திருநெல்வேலி உட்பட அனைத்து மாவட்டங்களிலும்.' },
    { q: 'எந்த வயதிலிருந்து உங்கள் சேவையை பெறலாம்?', a: '55 வயதுக்கு மேற்பட்ட அனைவரும் 60Plus Global சேவையை பயன்படுத்திக்கொள்ளலாம்.' },
    { q: 'நீங்கள் ஒரு முதியோர் இல்லமா?', a: 'இல்லை. நாங்கள் உங்கள் அம்மா அப்பாவை அவர்களின் சொந்த வீட்டிலேயே கவனித்துக்கொள்கிறோம்.' },
    { q: 'சேவை எவ்வளவு விரைவாக தொடங்கும்?', a: 'நீங்கள் எங்களிடம் பதிவு செய்த 24 மணி நேரத்திற்குள் ஒரு கேர் மேனேஜர் உங்களை தொடர்பு கொள்வார்.' },
    { q: 'உடல்நலம் சரியாக இருக்கும்போதும் சேர்வது அவசியமா?', a: 'கண்டிப்பாக ஆம். 60Plus என்பது நோய் வந்த பிறகு செய்யும் சேவை அல்ல — நோய் வருவதற்கு முன்பே தடுக்கும் preventive care.' },
  ];
  return (
    <section className="faq-section" id="faq">
      <div className="section-header">
        <div className="section-tag">FAQ</div>
        <h2 className="section-title tamil">உங்கள் கேள்விகளுக்கு பதில் இங்கே</h2>
        <p className="section-sub">We know you have questions. Here are the honest answers.</p>
        <div className="section-line" />
      </div>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div className={`faq-item ${openIndex === i ? 'open' : ''}`} key={i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            <div className="faq-q">
              <div className="faq-num">{i + 1}</div>
              <div className="faq-q-text tamil">{faq.q}</div>
              <div className="faq-arrow">▾</div>
            </div>
            <div className="faq-a"><p className="tamil">{faq.a}</p></div>
          </div>
        ))}
      </div>
      <div className="faq-finale">
        <p className="faq-finale-tamil tamil">"இன்று ஒரு அழைப்பு. அவர்களுக்கு ஒரு புதிய வாழ்க்கை."</p>
        <p className="faq-finale-eng">"One call today. A new life for them."</p>
        <a href="#consult" className="faq-finale-btn">Get Your Free Consultation</a>
      </div>
    </section>
  );
};

/* ─── FOOTER ─── */
const Footer = () => (
  <footer>
    <div className="footer-top">
      <div className="footer-brand">
        <div className="footer-logo-row">
          <img src="/so.png" alt="SixtyPlus Global" />
          <div><h4>SixtyPlus Global</h4><p>India's #1 Emerging Senior Preventive Care Platform</p></div>
        </div>
        <p className="footer-tagline">Caring for the ones who cared for you.</p>
        <div className="footer-social">
          {[
            { label: 'Instagram', href: 'https://www.instagram.com/life_after_sixty_tamil', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
            { label: 'YouTube', href: 'https://m.youtube.com/@LifeAfterSixty-Tamil', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
            </a>
          ))}
          <a href="https://wa.me/919499944939" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon social-wa">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z"/></svg>
          </a>
        </div>
      </div>
      <div className="footer-links-col">
        <h5>Quick Links</h5>
        {[['Services', '#services'], ['Why Us', '#why'], ['Statistics', '#stats'], ['Pricing', '#pricing'], ['FAQ', '#faq']].map(([l, h]) => <a key={l} href={h}>{l}</a>)}
      </div>
      <div className="footer-contact-col">
        <h5>Contact</h5>
        <a href="tel:+919499944939">+91 94999 44939</a>
        <a href="https://wa.me/919499944939" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2025 SixtyPlus Global. All rights reserved.</p>
      <div className="footer-bottom-links">
        <a href="/terms-and-conditions" className="footer-link-btn">Terms & Conditions</a>
        <a href="/privacy-policy" className="footer-link-btn">Privacy Policy</a>
      </div>
    </div>
  </footer>
);

/* ─── APP ─── */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Nav />
          <WaFloat />
          <ConsultFAB />
          <main>
            <Hero />
            <Services />
            <WhyAndForm />
            <Statistics />
            <AllServices />
            <CompetitiveAdvantage />
            <Pricing />
            <FAQ />
          </main>
          <Footer />
        </>
      } />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
    </Routes>
  );
}