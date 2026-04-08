// components/FAQ.jsx
import { useState } from 'react';
import { trackCtaClick } from '../lib/firebase';

const faqs = [
  {
    q: 'நீங்கள் எந்த மாவட்டங்களில் சேவை செய்கிறீர்கள்?',
    a: 'தமிழ்நாட்டில் உள்ள அனைத்து மாவட்டங்களிலும் எங்கள் சேவை கிடைக்கிறது — சென்னை, கோயம்புத்தூர், மதுரை, திருச்சி, சேலம், வேலூர், திருநெல்வேலி உட்பட அனைத்து மாவட்டங்களிலும்.',
  },
  {
    q: 'எந்த வயதிலிருந்து உங்கள் சேவையை பெறலாம்?',
    a: '55 வயதுக்கு மேற்பட்ட அனைவரும் 60Plus Global சேவையை பயன்படுத்திக்கொள்ளலாம்.',
  },
  {
    q: 'நீங்கள் ஒரு முதியோர் இல்லமா?',
    a: 'இல்லை. நாங்கள் உங்கள் அம்மா அப்பாவை அவர்களின் சொந்த வீட்டிலேயே கவனித்துக்கொள்கிறோம்.',
  },
  {
    q: 'சேவை எவ்வளவு விரைவாக தொடங்கும்?',
    a: 'நீங்கள் எங்களிடம் பதிவு செய்த 24 மணி நேரத்திற்குள் ஒரு கேர் மேனேஜர் உங்களை தொடர்பு கொள்வார்.',
  },
  {
    q: 'உடல்நலம் சரியாக இருக்கும்போதும் சேர்வது அவசியமா?',
    a: 'கண்டிப்பாக ஆம். 60Plus என்பது நோய் வந்த பிறகு செய்யும் சேவை அல்ல — நோய் வருவதற்கு முன்பே தடுக்கும் preventive care.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section" id="faq">
      <div className="section-header" style={{ maxWidth: '820px', margin: '0 auto 24px' }}>
        <div className="section-tag">FAQ</div>
        <h2 className="section-title tamil">
          நீங்கள் யோசிப்பது இதுதான்...<br />நாங்கள் நேராக பதில் சொல்கிறோம்
        </h2>
        <p className="section-sub" style={{ color: '#7b3fc7', fontWeight: 500 }}>
          Clear answers before you decide.
        </p>
        <div className="section-line" />
      </div>

      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div
            className={`faq-item ${openIndex === i ? 'open' : ''}`}
            key={i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="faq-q">
              <div className="faq-num">{i + 1}</div>
              <div className="faq-q-text tamil">{faq.q}</div>
              <div className="faq-arrow">▾</div>
            </div>
            <div className="faq-a">
              <p className="tamil">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-finale" style={{ textAlign: 'center' }}>
        <p className="faq-finale-tamil tamil">"இன்று ஒரு அழைப்பு. அவர்களுக்கு ஒரு புதிய வாழ்க்கை."</p>
        <p className="faq-finale-eng">"One call today. A new life for them."</p>
        <a
          href="#consult-form"
          className="faq-finale-btn"
          onClick={() => trackCtaClick('faq_section_cta_click')}
        >
          Talk to a Care Expert Today
        </a>
        <p className="faq-urgency">Limited onboarding slots each week</p>
      </div>
    </section>
  );
};

export default FAQ;