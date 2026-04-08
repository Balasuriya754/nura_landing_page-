// components/Pricing.jsx
import { trackCtaClick } from '../lib/firebase';

const Pricing = ({ config }) => {
  const {
    planName,
    tagline,
    price,
    period,
    ctaLabel,
    ctaTrackingKey,
    features,
    highlights,
    urgencyText,
  } = config;

  return (
    <section className="pkg-section" id="pricing">
      <div className="pkg-inner">
        {/* LEFT */}
        <div className="pkg-left">
          <div className="section-tag tag-on-dark">Pricing</div>
          <h2 className="pkg-h2">{planName}</h2>
          <p className="pkg-sub">{tagline}</p>

          <div className="pkg-highlights">
            {highlights.map(text => (
              <div className="pkg-hl" key={text}>
                <span className="pkg-hl-check" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="pkg-quote-box">
            <p className="pkg-quote-tamil tamil">
              "உங்கள் அம்மா அப்பாவுக்கு கொடுக்கும் மிகப்பெரிய பரிசு — இந்த ஒரு தொலைபேசி அழைப்பு."
            </p>
            <p className="pkg-quote-eng">
              "The greatest gift you can give your parents — is this one phone call."
            </p>
          </div>
        </div>

        {/* RIGHT — plan card */}
        <div className="pkg-card">
          <div className="pkg-card-header">
            <div>
              <div className="pkg-name">{planName}</div>
              <div className="pkg-tag-line">{tagline}</div>
            </div>
            <div className="pkg-price-block">
              <span className="pkg-amount">${price}</span>
              <span className="pkg-period">{period}</span>
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

          <a
            href="#consult-form"
            className="pkg-cta"
            onClick={() => trackCtaClick(ctaTrackingKey)}
          >
            {ctaLabel}
          </a>

          <p className="pkg-sub-cta" style={{ padding: '18px 30px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z" />
            </svg>
            <span className="pkg-sub-cta-text">
              Prefer WhatsApp?{' '}
              <a href="https://wa.me/919499944939" target="_blank" rel="noopener noreferrer">
                +91 94999 44939
              </a>
            </span>
          </p>

          <p className="pkg-urgency" style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(123,63,199,0.7)', marginTop: '4px', marginBottom: '20px' }}>
            {urgencyText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;