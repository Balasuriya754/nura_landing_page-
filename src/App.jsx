import { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import useContactForm from './hooks/useContactForm';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AdminDashboard from './pages/AdminDashboard';
import { trackCtaClick } from './lib/firebase';

// CTA click tracker helper - triggers analytics and navigates
const trackAndNavigate = (eventName, event) => {
  event.preventDefault();
  trackCtaClick(eventName);
  const href = event.currentTarget.getAttribute('href');
  if (href) {
    window.location.hash = href;
  }
};

const heroSlideImages = [
  'hero/innerbanner-1.png',
  'hero/Mahadevan_Sitting2_LJ_India.jpg',
  'hero/old%20person6.jpg',
  'hero/caretender.jpg',
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
  const handleWhatsAppClick = () => {
    trackCtaClick('whatsapp_float_click');
  };
  return (
    <a
      href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21"
      className={`wa-fab ${visible ? 'wa-fab--on' : ''}`}
      target="_blank" rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={handleWhatsAppClick}
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
// const ConsultFAB = () => {
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const fn = () => setVisible(window.scrollY > 400);
//     window.addEventListener('scroll', fn, { passive: true });
//     return () => window.removeEventListener('scroll', fn);
//   }, []);
//   return (
//     <a href="#consult-form" className={`consult-fab ${visible ? 'consult-fab--on' : ''}`} aria-label="Free Consultation">
//       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.07 2.18 2 2 0 012.05 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
//       </svg>
//       <span>Free Consult</span>
//     </a>
//   );
// };

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
          <img src="so.png" alt="SixtyPlus Global" />
          {/* <span>SixtyPlus Global</span> */}
        </div>
        <div className="nav-links">
          {links.map((l, i) => <a key={l} href={hrefs[i]} onClick={(e) => { trackCtaClick(`nav_link_${l.toLowerCase().replace(/\s+/g, '_')}_click`) }}>{l}</a>)}
        </div>
        <a href="#consult-form" className="nav-cta" onClick={(e) => { trackCtaClick('nav_desktop_cta_click') }}>Talk to Us</a>
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map((l, i) => <a key={l} href={hrefs[i]} onClick={() => { trackCtaClick(`nav_mobile_link_${l.toLowerCase().replace(/\s+/g, '_')}_click`) }}>{l}</a>)}
        <a href="#consult-form" className="mob-cta" onClick={() => { trackCtaClick('nav_mobile_cta_click') }}>Talk to Us</a>
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
        </div>
        <div className="hero-content">
          <span className="hero-eyebrow">Trusted by 50,000+ families across Tamil Nadu</span>
          <h1 className="hero-h1">
            When You're Away<br /> Who's <em>Taking Care</em> of Your <em>Parents?</em>
          </h1>
          <div className="hero-quote">
            <p className="hq-tamil tamil">"நீங்கள் அருகில் இல்லாத நேரங்களில் அவர்கள் தனியாக இருக்கலாம்…
நாங்கள் அவர்களுடன் இருக்கிறோம் — நீங்கள் நிம்மதியாக இருக்கலாம்."</p>
            <p className="hq-eng">Trusted in-home care, regular check-ins, and support — so your parents are never alone.</p>
          </div>
          <div className="hero-stats-row">
            {[
              ['50,000+', 'Families we serve'],
              ['600+', 'Doctors in network'],
              ['100+', 'Care services']
            ].map(([n, l]) => (
              <div key={l} className="hstat">
                <div className="hstat-num">{n}</div>
                <div className="hstat-lbl">{l}</div>
              </div>
            ))}
          </div>
          <div className="hero-btns">
            <a href="#consult-form" className="btn-primary" onClick={(e) => { trackCtaClick('hero_primary_cta_click') }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.17-6.17 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Talk to a Care Expert →
            </a>
            {/* <a href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21"
              className="btn-wa" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z"/>
              </svg>
              WhatsApp Us 
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── SERVICES ─── */
const servicesGroups = [
  {
    title: 'Daily Support',
    items: [
      { icon: 'heart', title: 'Assisted Daily Care', desc: 'Scheduled visits for hygiene, mobility, and basic care' },
      { icon: 'pill', title: 'Medication Support', desc: 'Reminders and tracking to ensure medicines are taken on time' },
      { icon: 'phone', title: 'Regular Well-being Check-ins', desc: 'Periodic calls or visits to stay updated on well-being' }
    ]
  },
  {
    title: 'Medical Support',
    items: [
      { icon: 'doctor', title: 'Doctor Visits at Home', desc: 'Arrange consultations at home based on availability' },
      { icon: 'activity', title: 'Physiotherapy', desc: 'Guided sessions from certified professionals' },
      { icon: 'video', title: 'Online Consultation', desc: 'Connect with doctors remotely for quick medical advice' }
    ]
  },
  {
    title: 'Safety & Monitoring',
    items: [
      { icon: 'alert', title: '24/7 Emergency Support', desc: 'Round-the-clock assistance coordination for urgent needs' },
      { icon: 'home', title: 'Home Safety Guidance', desc: 'Recommendations to make your home safer and reduce risks' },
      { icon: 'bell', title: 'Well-being Alerts', desc: 'Get regular updates on your parents’ well-being' }
    ]
  }
];

const Services = () => {
  const getIcon = (name) => {
    const icons = {
      heart: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
      pill: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></svg>,
      phone: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.17-6.17 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
      doctor: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M12 5 9.04 17h1.92L12 5Z" /></svg>,
      activity: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
      video: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>,
      alert: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>,
      home: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
      bell: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
    };
    return icons[name] || null;
  };

  return (
    <section className="services-section" id="services">
      <div className="section-header">
        <div className="section-tag">Everything Your Parents Need — In One Place</div>
        <h2 className="section-title">Complete Care for Your Parents —<br />At Home</h2>
        <p className="section-sub">Flexible support based on your parents' needs — from daily assistance to medical help.</p>
        <div className="section-line" />
      </div>
      <div className="services-groups"> 
        {servicesGroups.map((group, gIndex) => (
          <div className="services-group" key={group.title}>
            <h3 className="services-group-title">{group.title}</h3>
            <div className="services-grid-group">
              {group.items.map((item, i) => (
                <div className="service-card-icon" key={i}>
                  <div className="svc-icon-wrap">
                    {getIcon(item.icon)}
                  </div>
                  <div className="svc-body-icon">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="services-closing">
        <p>
          We take care of everything — with attention, coordination, and regular follow-ups.<br />
          <span className="services-closing-sub">So you can stay reassured.</span>
        </p>
        <a href="#consult-form" className="services-cta" onClick={(e) => { trackCtaClick('services_section_cta_click') }}>See How It Works →</a>
      </div>
    </section>
  );
};

/* ─── WHY + FORM ─── */
const WhyAndForm = () => {
  const { formData, errors, submitted, loading, handleChange, submitForm } = useContactForm();
  return (
    <section className="why-section" id="why">
      <span id="consult" style={{ display: 'block', visibility: 'hidden', height: 0 }} />
      <div className="ba-strip">
        <div className="ba-panel">
          <img src="lonely_old_man.jpg" alt="Elderly man alone" />
          <div className="ba-overlay ba-dark">
            <p className="ba-quote">He sits by the window.<br />Counting hours. Counting days.</p>
            <p className="ba-tamil tamil">அவர்கள் ஜன்னலருகே அமைதியாக காத்திருக்கிறார்கள்… யாராவது வருவார்களா என்று.</p>
          </div>
        </div>
        <div className="ba-arrow">→</div>
        <div className="ba-panel">
          <img src="errands1.jpg" alt="Caretaker with elderly" style={{ objectPosition: 'center 20%' }} />
          <div className="ba-overlay ba-hope">
            <p className="ba-quote">She smiles again.<br />Feels cared for every day.</p>
            <p className="ba-tamil tamil">அவர்கள் மீண்டும் சிரிக்க ஆரம்பிக்கிறார்கள்… யாரோ அக்கறையுடன் இருக்கிறார்கள்.</p>
          </div>
        </div>
      </div>
      <div className="ba-connector">
        <p>We make sure your parents are never alone.</p>
      </div>
      <div className="why-inner">
        <div className="why-left">
          <div className="section-tag">Why Choose Us</div>
          <h2>Trusted by Tamil Families, Built for Their Care</h2>
          <p>Caring for parents isn't just about services — it's about consistency, trust, and knowing someone is always there when you can't be.</p>
          <div className="benefit-list">
            {['Dedicated care coordinator for your family', 'Verified and trusted care professionals', 'Regular updates so you stay informed', 'Flexible support based on changing needs', 'Tamil-speaking team for clear communication', 'Trusted by families across Tamil Nadu and beyond'].map((item, i) => (
              <div className="benefit-item" key={i}>
                <div className="benefit-check">✓</div>
                <span>{item}</span>
              </div>
            ))}
          </div>
          {/* <a href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21" className="wa-btn" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z"/></svg>
            WhatsApp Us Now
          </a> */}
          {/* <div className="wa-num">+91 94999 44939</div> */}
        </div>
        <div className="form-box" id="consult-form">
          <div className="form-header"><h3>Speak with a Care Expert</h3><p>Get personalized guidance within 24 hours</p></div>
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
              <button type="submit" className="form-submit" disabled={loading}>{loading ? 'Submitting...' : 'Talk to a Care Expert Today'}</button>
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
      <div className="stats-banner-content">
        <blockquote>"In Tamil Nadu, 1 in 3 elders lives alone. Their silence is not peace — it's the absence of someone to call."</blockquote>
        <cite>— Geriatric Care Research, Tamil Nadu 2024</cite>
      </div>
      <a href="#consult-form" className="stats-banner-cta" onClick={(e) => { trackCtaClick('stats_banner_cta_click') }}>Start Care Today →</a>
    </div>
  </section>
);

/* ─── COMPLETE CARE SECTION ─── */
const CompleteCare = () => {
  const careGroups = [
    {
      title: 'Medical Care',
      items: [
        'Doctor visits at home',
        'Blood tests & diagnostics',
        'Insurance coordination'
      ]
    },
    {
      title: 'Daily Support',
      items: [
        'Medication reminders',
        'Mobility & hygiene assistance',
        'Home safety improvements'
      ]
    },
    {
      title: 'Emotional Well-being',
      items: [
        'Mental health support',
        'Regular check-ins',
        'Friendly companionship'
      ]
    },
    {
      title: 'Emergency & Monitoring',
      items: [
        '24/7 emergency coordination',
        'Real-time alerts & updates'
      ]
    }
  ];

  return (
    <section className="complete-care-section">
      <div className="section-header">
        <div className="section-tag">COMPLETE CARE</div>
        <h2 className="section-title max-w-2xl mx-auto">One Membership. Everything They Need.</h2>
        <p className="section-sub">No coordination. No multiple providers.<br />One simple plan that covers your parents' daily, medical, and emotional care.</p>
        <div className="section-line" />
      </div>

      <div className="complete-care-inner">
        <div className="care-image-panel">
          <div className="care-image-wrapper">
            <img
              src="complete.jpg"
              alt="Caregiver providing compassionate care to elderly person"
              className="care-image"
            />
          </div>
        </div>

        <div className="care-benefits-panel">
          <div className="care-benefits-grid">
            {careGroups.map((group, index) => (
              <div className="care-benefit-group" key={index}>
                <div className="benefit-group-header">
                  <div className="benefit-group-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
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
        </div>
      </div>

      <div className="care-highlight-box">
        <div className="highlight-content">
          <p className="highlight-text">
           We take care of everything — so you don’t have to manage it from miles away.
          </p>
          <a href="#consult-form" className="care-highlight-cta" onClick={(e) => { trackCtaClick('care_highlight_cta_click') }}>
            Talk to a Care Expert
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

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
      <h2 className="section-title">Why Families Trust 60Plus Global<br />With Their Parents' Care</h2>
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

    <div className="adv-quote-section">
      <QuoteStrip
        tamil='"அவர்களுக்கு நீங்கள் கடந்த காலத்தை திரும்ப கொடுக்க முடியாது. ஆனால் நிகழ்காலத்தை கொடுக்கலாம்."'
        english={`"You can't give back the past. But you can give them the present."`}
        type="guilt"
      />
    </div>
  </section>
);

/* ─── PRICING ─── */
const Pricing = () => {
  const features = [
    { category: 'Medical Care', items: ['Doctor Home Visits', 'Blood Tests at Home', 'Medical Records Digitalisation', 'Senior Medical Insurance Guidance'] },
    { category: 'Daily Support', items: ['Medicine Reminders', 'Companion AI', 'Emotional & Mental Health Support'] },
    { category: 'Safety & Emergency', items: ['24x7 Emergency Support', 'Home Safety Assessment', 'Free Senior Community Access'] },
  ];
  return (
    <section className="pkg-section" id="pricing">
      <div className="pkg-inner">
        <div className="pkg-left">
          <div className="section-tag tag-on-dark">Pricing</div>
          <h2 className="pkg-h2">Simple.<br />Transparent.<br />One Plan.</h2>
          <p className="pkg-sub">No hidden charges. No complicated tiers. Everything your parent needs, covered.</p>
          <div className="pkg-highlights">
            {['One dedicated care manager for your family', 'No hidden costs or surprise fees', 'Everything handled for you — we coordinate all services', 'Designed specifically for NRI families'].map(text => (
              <div className="pkg-hl" key={text}>
                <span className="pkg-hl-check" />
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
              <div className="pkg-tag-line">Complete care for your parents — handled end-to-end</div>
            </div>
            <div className="pkg-price-block">
              <span className="pkg-amount">$50</span>
              <span className="pkg-period">/ month</span>
            </div>
          </div>
          <div className="pkg-features">
            {features.map((group, groupIndex) => (
              <div key={groupIndex}>
                <div className="pkg-feat-category">{group.category}</div>
                {group.items.map((f, i) => (
                  <div className="pkg-feat" key={`${groupIndex}-${i}`}>
                    <div className="pkg-feat-dot" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <a href="#consult-form" className="pkg-cta" onClick={(e) => { trackCtaClick('pricing_section_cta_click') }}>Get Peace of Mind — $50/month</a>
          <p className="pkg-sub-cta" style={{padding: '18px 30px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z"/>
            </svg>
            <span className="pkg-sub-cta-text">Prefer WhatsApp? <a href="https://wa.me/919499944939" target="_blank" rel="noopener noreferrer">+91 94999 44939</a></span>
          </p>
          <p className="pkg-urgency" style={{textAlign: 'center', fontSize: '11px', color: 'rgba(123, 63, 199, 0.7)', marginTop: '4px', marginBottom: '20px'}}>
            Limited onboarding slots each month
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── FAQ ─── */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  // Objection-handling questions - first 2 are highest priority fears
  const faqs = [
    { q: 'நீங்கள் எந்த மாவட்டங்களில் சேவை செய்கிறீர்கள்?', a: 'தமிழ்நாட்டில் உள்ள அனைத்து மாவட்டங்களிலும் எங்கள் சேவை கிடைக்கிறது — சென்னை, கோயம்புத்தூர், மதுரை, திருச்சி, சேலம், வேலூர், திருநெல்வேலி உட்பட அனைத்து மாவட்டங்களிலும்.' },
    { q: 'எந்த வயதிலிருந்து உங்கள் சேவையை பெறலாம்?', a: '55 வயதுக்கு மேற்பட்ட அனைவரும் 60Plus Global சேவையை பயன்படுத்திக்கொள்ளலாம்.' },
    { q: 'நீங்கள் ஒரு முதியோர் இல்லமா?', a: 'இல்லை. நாங்கள் உங்கள் அம்மா அப்பாவை அவர்களின் சொந்த வீட்டிலேயே கவனித்துக்கொள்கிறோம்.' },
    { q: 'சேவை எவ்வளவு விரைவாக தொடங்கும்?', a: 'நீங்கள் எங்களிடம் பதிவு செய்த 24 மணி நேரத்திற்குள் ஒரு கேர் மேனேஜர் உங்களை தொடர்பு கொள்வார்.' },
    { q: 'உடல்நலம் சரியாக இருக்கும்போதும் சேர்வது அவசியமா?', a: 'கண்டிப்பாக ஆம். 60Plus என்பது நோய் வந்த பிறகு செய்யும் சேவை அல்ல — நோய் வருவதற்கு முன்பே தடுக்கும் preventive care.' },
  ];
  return (
    <section className="faq-section" id="faq">
      <div className="section-header" style={{ maxWidth: '820px', margin: '0 auto 24px' }}>
        <div className="section-tag">FAQ</div>
        <h2 className="section-title tamil">நீங்கள் யோசிப்பது இதுதான்...<br />நாங்கள் நேராக பதில் சொல்கிறோம்</h2>
        <p className="section-sub" style={{ color: '#7b3fc7', fontWeight: 500 }}>Clear answers before you decide.</p>
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
      <div className="faq-finale" style={{ textAlign: 'center' }}>
        <p className="faq-finale-tamil tamil">"இன்று ஒரு அழைப்பு. அவர்களுக்கு ஒரு புதிய வாழ்க்கை."</p>
        <p className="faq-finale-eng">"One call today. A new life for them."</p>
        <a href="#consult-form" className="faq-finale-btn" onClick={(e) => { trackCtaClick('faq_section_cta_click') }}>Talk to a Care Expert Today</a>
        <p className="faq-urgency">Limited onboarding slots each week</p>
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
          <img src="so.png" alt="SixtyPlus Global" />
          <div className="footer-logo-content">
            <p className="footer-tagline">Helping you care for your parents — even from miles away.</p>
          </div>
        </div>
        <div className="footer-social">
          <span className="footer-social-label">Follow us</span>
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
        <h5>Call or WhatsApp</h5>
        <a href="tel:+919499944939" className="footer-phone">+91 94999 44939</a>
        <a href="https://wa.me/919499944939" target="_blank" rel="noopener noreferrer" className="footer-wa">WhatsApp 24/7</a>
        <span className="footer-availability">Available 24/7 for urgent support</span>
      </div>
    </div>
    {/* <div className="footer-cta">
          <div className="footer-cta-content">
            <h3>Still thinking about your parents?</h3>
            <p>Speak to a care expert today.</p>
            <a href="#consult-form" className="footer-cta-btn">Talk to Us Now</a>
            <p className="footer-cta-sub">No pressure. Just guidance.</p>
          </div>
        </div> */}
    <div className="footer-bottom">
      <p>© 2025 SixtyPlus Global. All rights reserved.</p>
      <div className="footer-bottom-links">
        <a href="/terms-and-conditions" className="footer-link-btn">Terms & Conditions</a>
        <a href="/privacy-policy" className="footer-link-btn">Privacy Policy</a>
      </div>
    </div>
    {/* <div className="footer-bottom-line">Because they cared for you first.</div> */}
  </footer>
);

/* ─── APP ─── */
export default function App() {
  return (
    <Routes>
  <Route path="/admin/*" element={<AdminDashboard />} />
  <Route path="/" element={<>
          <Nav />
          <WaFloat />
          {/* <ConsultFAB /> */}
          <main>
            <Hero />
            <Services />
            <WhyAndForm />
            <Statistics />
            <CompleteCare />
            <CompetitiveAdvantage  />
            <Pricing />
            <FAQ />
          </main>
          <Footer />
        </>} />
  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
</Routes>
  );
}