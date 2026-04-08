// components/CompetitiveAdvantage.jsx
import QuoteStrip from './QuoteStrip';

const advData = [
  {
    tag: 'TN',
    title: 'உங்கள் மொழியில் சேவை',
    desc: 'We speak Tamil. Our care managers communicate in your language — not just English.',
  },
  {
    tag: '24/7',
    title: '24x7 Care, No Holidays',
    desc: "Emergencies don't follow office hours. Neither do we. Always on.",
  },
  {
    tag: 'NRI',
    title: 'Trusted by Tamil Families Globally',
    desc: 'NRIs across USA, UK, Canada & Australia trust us for their parents back home.',
  },
  {
    tag: '1:1',
    title: 'One Family. One Care Manager.',
    desc: 'Not a call centre. A dedicated person who knows your parent by name and heart.',
  },
];

const CompetitiveAdvantage = () => (
  <section className="adv-section">
    <div className="section-header">
      <div className="section-tag">Our Difference</div>
      <h2 className="section-title">
        Why Families Trust 60Plus Global<br />With Their Parents' Care
      </h2>
      <div className="section-line" />
    </div>

    {/* Desktop grid */}
    <div className="adv-grid">
      {advData.map((a, i) => (
        <div className="adv-card" key={i}>
          <div className="adv-top">
            <div className="adv-tag">{a.tag}</div>
            <div className="adv-title tamil">{a.title}</div>
          </div>
          <div className="adv-body"><p>{a.desc}</p></div>
        </div>
      ))}
    </div>

    {/* Mobile horizontal scroll */}
    <div className="adv-h-scroll h-scroll-wrap">
      <div className="h-scroll-inner">
        {advData.map((a, i) => (
          <div className="adv-card adv-mob" key={i}>
            <div className="adv-top">
              <div className="adv-tag">{a.tag}</div>
              <div className="adv-title tamil">{a.title}</div>
            </div>
            <div className="adv-body"><p>{a.desc}</p></div>
          </div>
        ))}
      </div>
    </div>

    <div className="adv-quote-section">
      <QuoteStrip
  tamil="அவர்களுக்கு நீங்கள் கடந்த காலத்தை திரும்ப கொடுக்க முடியாது. ஆனால் நிகழ்காலத்தை கொடுக்கலாம்."
  english="You can't give back the past, but you can give them the present."
  type="guilt"
/>

    </div>
  </section>
);

export default CompetitiveAdvantage;